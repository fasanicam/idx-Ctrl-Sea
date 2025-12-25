'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Sailboat } from 'lucide-react';
import { useMqtt } from '@/hooks/use-mqtt';
import { useBoat } from '@/hooks/use-boat';
import { getTopics } from '@/lib/mqtt-topics';

export function SailControl() {
  const [tension, setTension] = useState(0);
  const { publish } = useMqtt();
  const { boatName } = useBoat();
  const topics = getTopics(boatName!);

  const handleTensionChange = (value: number[]) => {
    setTension(value[0]);
  };
  
  const handleCommit = (value: number[]) => {
    publish(topics.sail, String(value[0]));
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Sailboat className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Sail Tension</CardTitle>
        </div>
        <CardDescription>Adjust the main sail tension.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4 pt-2">
          <Slider
            value={[tension]}
            onValueChange={handleTensionChange}
            onValueCommit={handleCommit}
            min={-100}
            max={100}
            step={1}
          />
          <div className="relative w-full text-center">
             <p className="font-headline text-4xl font-bold tabular-nums">
               {tension}
             </p>
             <p className="text-sm text-muted-foreground">Tension Level</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
