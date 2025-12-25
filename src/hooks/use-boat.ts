'use client';

import { BoatContext } from '@/providers/BoatProvider';
import { useContext } from 'react';

export const useBoat = () => {
  const context = useContext(BoatContext);
  if (!context) {
    throw new Error('useBoat must be used within a BoatProvider');
  }
  return context;
};
