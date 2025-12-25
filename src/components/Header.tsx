'use client';

import { useBoat } from '@/hooks/use-boat';
import { useMqtt } from '@/hooks/use-mqtt';
import { cn } from '@/lib/utils';
import { Sailboat } from 'lucide-react';

export function Header() {
  const { boatName } = useBoat();
  const { connectionStatus } = useMqtt();

  const statusIndicator = {
    connected: {
      color: 'bg-green-500',
      text: 'Connected',
    },
    connecting: {
      color: 'bg-yellow-500 animate-pulse',
      text: 'Connecting',
    },
    disconnected: {
      color: 'bg-red-500',
      text: 'Disconnected',
    },
    error: {
      color: 'bg-red-700',
      text: 'Error',
    },
  };

  return (
    <header className="flex flex-col items-center justify-between gap-4 border-b-2 border-primary/20 bg-card p-4 sm:flex-row sm:gap-8">
      <div className="flex items-center gap-3">
        <Sailboat className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-4xl text-primary">Ctrl+Sea</h1>
      </div>
      <div className="flex items-center gap-4 text-right">
        <div>
          <p className="font-headline text-xl text-primary">{boatName}</p>
          <p className="text-sm text-muted-foreground">Your active vessel</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={cn('h-3 w-3 rounded-full', statusIndicator[connectionStatus].color)}
            title={`MQTT Status: ${statusIndicator[connectionStatus].text}`}
          />
        </div>
      </div>
    </header>
  );
}
