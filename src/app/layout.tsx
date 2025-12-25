import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/providers/AppProviders';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Ctrl+Sea',
  description: 'IoT Sailboat Control Interface',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AppProviders>{children}</AppProviders>
        <Toaster />
      </body>
    </html>
  );
}
