'use client';

import { createContext, useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import mqtt, { type MqttClient } from 'mqtt';
import { getTopics, MQTT_BROKER_URL, WATCHDOG_TIMEOUT, type MqttTopics } from '@/lib/mqtt-topics';
import { useBoat } from '@/hooks/use-boat';

export interface LogMessage {
  type: 'sent' | 'received';
  topic: string;
  payload: string;
  timestamp: string;
}

interface MqttContextType {
  publish: (topic: string, payload: string | Buffer | object) => void;
  logs: LogMessage[];
  clearLogs: () => void;
  connectionStatus: 'connected' | 'connecting' | 'disconnected' | 'error';
  powerValue: number;
  isOnline: boolean;
}

export const MqttContext = createContext<MqttContextType | undefined>(undefined);

export function MqttProvider({ boatName, children }: { boatName: string; children: ReactNode }) {
  const clientRef = useRef<MqttClient | null>(null);
  const watchdogTimer = useRef<NodeJS.Timeout | null>(null);

  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected' | 'error'>('disconnected');
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [powerValue, setPowerValue] = useState(0);
  const [isOnline, setIsOnline] = useState(false);

  const topics = getTopics(boatName);

  const addLog = useCallback((type: 'sent' | 'received', topic: string, payload: unknown) => {
    const payloadString = typeof payload === 'object' ? JSON.stringify(payload) : String(payload);
    const newLog: LogMessage = {
      type,
      topic,
      payload: payloadString,
      timestamp: new Date().toLocaleTimeString(),
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);
  }, []);

  const resetWatchdog = useCallback(() => {
    if (watchdogTimer.current) {
      clearTimeout(watchdogTimer.current);
    }
    if (!isOnline) setIsOnline(true);
    watchdogTimer.current = setTimeout(() => {
      setIsOnline(false);
      addLog('received', 'system', 'Watchdog timeout: connection lost.');
    }, WATCHDOG_TIMEOUT + 1000); // Add a grace period
  }, [isOnline, addLog]);

  useEffect(() => {
    if (!clientRef.current) {
      setConnectionStatus('connecting');
      const client = mqtt.connect(MQTT_BROKER_URL);
      clientRef.current = client;

      client.on('connect', () => {
        setConnectionStatus('connected');
        addLog('received', 'system', `Connected to broker and subscribed to topics for ${boatName}.`);
        client.subscribe([topics.status, topics.potentiometer], (err) => {
          if (err) {
            addLog('received', 'system', `Subscription error: ${err.message}`);
          }
        });
        resetWatchdog(); // Assume online on connect and start timer
      });

      client.on('message', (topic, message) => {
        const payload = message.toString();
        addLog('received', topic, payload);

        if (topic === topics.status && payload === 'Online') {
          resetWatchdog();
        } else if (topic === topics.potentiometer) {
          const value = parseInt(payload, 10);
          if (!isNaN(value)) {
            setPowerValue(Math.max(0, Math.min(100, value)));
          }
        }
      });

      client.on('error', (err) => {
        setConnectionStatus('error');
        addLog('received', 'system', `Connection error: ${err.message}`);
        console.error('MQTT Error:', err);
        client.end();
      });

      client.on('reconnect', () => {
        setConnectionStatus('connecting');
        addLog('received', 'system', 'Reconnecting to broker...');
      });

      client.on('close', () => {
        setConnectionStatus('disconnected');
        if (watchdogTimer.current) clearTimeout(watchdogTimer.current);
        setIsOnline(false);
        addLog('received', 'system', 'Disconnected from broker.');
      });
    }

    return () => {
      if (clientRef.current) {
        if (watchdogTimer.current) clearTimeout(watchdogTimer.current);
        clientRef.current.end();
        clientRef.current = null;
      }
    };
  }, [boatName, addLog, resetWatchdog, topics]);

  const publish = useCallback(
    (topic: string, payload: string | Buffer | object) => {
      if (clientRef.current && connectionStatus === 'connected') {
        const payloadString = typeof payload === 'object' ? JSON.stringify(payload) : payload;
        clientRef.current.publish(topic, payloadString);
        addLog('sent', topic, payloadString);
      } else {
        addLog('sent', 'system', `Failed to publish. Not connected.`);
        console.error('Cannot publish, MQTT client not connected.');
      }
    },
    [connectionStatus, addLog]
  );

  const clearLogs = useCallback(() => setLogs([]), []);

  return (
    <MqttContext.Provider
      value={{
        publish,
        logs,
        clearLogs,
        connectionStatus,
        powerValue,
        isOnline,
      }}
    >
      {children}
    </MqttContext.Provider>
  );
}


// This component ensures MqttProvider is only rendered when a boatName exists.
export function MqttProviderGate({ children }: { children: ReactNode }) {
  const { boatName, isLoading } = useBoat();

  // If loading, MqttProvider shouldn't be rendered. `page.tsx` shows a loader.
  if (isLoading) return null;

  if (boatName) {
    return <MqttProvider boatName={boatName}>{children}</MqttProvider>;
  }
  
  // If no boat name, page.tsx will render the Baptism component.
  // We render children so that React can mount the page component.
  return <>{children}</>;
}
