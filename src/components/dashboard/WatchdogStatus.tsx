'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMqtt } from '@/hooks/use-mqtt';
import { cn } from '@/lib/utils';
import { HeartPulse, Wifi, WifiOff } from 'lucide-react';

export function WatchdogStatus() {
  const { isOnline } = useMqtt();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <HeartPulse className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Connection Status</CardTitle>
        </div>
        <CardDescription>Real-time signal from the vessel.</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-4 rounded-lg p-8 text-center transition-colors',
            isOnline ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'
          )}
        >
          {isOnline ? (
            <Wifi className="h-16 w-16" />
          ) : (
            <WifiOff className="h-16 w-16" />
          )}
          <div className="font-headline text-3xl">
            {isOnline ? 'All Aboard!' : 'Man Overboard!'}
          </div>
          <p className="text-sm opacity-80">
            {isOnline ? 'Signal is strong and clear.' : 'Connection lost. No signal received.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
