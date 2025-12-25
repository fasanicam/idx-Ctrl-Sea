'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMqtt } from '@/hooks/use-mqtt';
import { Gauge } from 'lucide-react';

const GAUGE_RADIUS = 80;
const GAUGE_CIRCUMFERENCE = Math.PI * GAUGE_RADIUS;

export function PowerGauge() {
  const { powerValue } = useMqtt();
  const offset = GAUGE_CIRCUMFERENCE - (powerValue / 100) * GAUGE_CIRCUMFERENCE;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Gauge className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Power Gauge</CardTitle>
        </div>
        <CardDescription>Potentiometer reading from the vessel.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="relative">
          <svg width="200" height="110" viewBox="0 0 200 110">
            {/* Background Arc */}
            <path
              d={`M 20 100 A ${GAUGE_RADIUS} ${GAUGE_RADIUS} 0 0 1 180 100`}
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Foreground Arc */}
            <path
              d={`M 20 100 A ${GAUGE_RADIUS} ${GAUGE_RADIUS} 0 0 1 180 100`}
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={GAUGE_CIRCUMFERENCE}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
            />
          </svg>
          <div className="absolute bottom-0 left-0 right-0 text-center">
            <span className="font-headline text-5xl font-bold text-foreground">
              {powerValue}
            </span>
            <span className="text-xl text-muted-foreground">%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
