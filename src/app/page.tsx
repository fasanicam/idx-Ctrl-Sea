'use client';

import Baptism from '@/components/Baptism';
import { Dashboard } from '@/components/Dashboard';
import { Header } from '@/components/Header';
import { useBoat } from '@/hooks/use-boat';
import { CircleDotDashed } from 'lucide-react';

export default function Home() {
  const { boatName, isLoading } = useBoat();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background text-center">
        <CircleDotDashed className="h-12 w-12 animate-spin text-primary" />
        <h1 className="font-headline text-3xl text-primary">Loading Ctrl+Sea...</h1>
        <p className="text-muted-foreground">Checking the logs for your vessel...</p>
      </div>
    );
  }

  if (!boatName) {
    return <Baptism />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <Dashboard />
      </main>
    </div>
  );
}
