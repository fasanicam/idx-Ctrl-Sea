'use client';

import { MqttContext } from '@/providers/MqttProvider';
import { useContext } from 'react';

export const useMqtt = () => {
  const context = useContext(MqttContext);
  if (!context) {
    throw new Error('useMqtt must be used within an MqttProvider');
  }
  return context;
};
