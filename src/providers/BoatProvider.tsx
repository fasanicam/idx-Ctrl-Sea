'use client';

import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';

const BOAT_NAME_STORAGE_KEY = 'ctrl-sea-boat-name';

interface BoatContextType {
  boatName: string | null;
  setBoatName: (name: string) => void;
  isLoading: boolean;
}

export const BoatContext = createContext<BoatContextType | undefined>(undefined);

export function BoatProvider({ children }: { children: ReactNode }) {
  const [boatName, setBoatNameState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedName = localStorage.getItem(BOAT_NAME_STORAGE_KEY);
      if (storedName) {
        setBoatNameState(storedName);
      }
    } catch (error) {
      console.error('Could not access localStorage', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setBoatName = useCallback((name: string) => {
    try {
      if (name) {
        localStorage.setItem(BOAT_NAME_STORAGE_KEY, name);
      } else {
        localStorage.removeItem(BOAT_NAME_STORAGE_KEY);
      }
      setBoatNameState(name);
    } catch (error) {
      console.error('Could not access localStorage', error);
    }
  }, []);

  return (
    <BoatContext.Provider value={{ boatName, setBoatName, isLoading }}>
      {children}
    </BoatContext.Provider>
  );
}
