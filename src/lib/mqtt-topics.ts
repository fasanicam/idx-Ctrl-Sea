export const MQTT_BROKER_URL = 'wss://mqtt.dev.icam.school:443/mqtt';
export const WATCHDOG_TIMEOUT = 7000; // 7 seconds

const getTopicBase = (boatName: string) => `bzh/iot/boat/${boatName}`;

export const getTopics = (boatName: string) => {
  const base = getTopicBase(boatName);
  return {
    sail: `${base}/actionneurs/voile`,
    lcd: `${base}/actionneurs/lcd`,
    potentiometer: `${base}/capteurs/potentiometer`,
    status: `${base}/status`,
    allActionneurs: `${base}/actionneurs/#`,
    allCapteurs: `${base}/capteurs/#`,
  };
};

export type MqttTopics = ReturnType<typeof getTopics>;
