'use client';

import { BoatProvider } from './BoatProvider';
import { MqttProviderGate } from './MqttProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BoatProvider>
      <MqttProviderGate>{children}</MqttProviderGate>
    </BoatProvider>
  );
}
