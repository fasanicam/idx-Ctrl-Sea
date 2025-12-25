'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { FileText, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { type LogMessage } from '@/providers/MqttProvider';
import { useMqtt } from '@/hooks/use-mqtt';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const LogEntry = ({ log }: { log: LogMessage }) => (
  <div className="flex items-start gap-2 border-b border-border/50 py-2 text-sm">
    <div className="flex-shrink-0">
      {log.type === 'sent' ? (
        <ArrowRight className="h-4 w-4 text-blue-400" />
      ) : (
        <ArrowLeft className="h-4 w-4 text-green-400" />
      )}
    </div>
    <div className="flex-grow">
      <p className="font-mono text-xs text-muted-foreground">{log.timestamp}</p>
      <p
        className={cn(
          'font-semibold',
          log.type === 'sent' ? 'text-blue-300' : 'text-green-300'
        )}
      >
        {log.topic}
      </p>
      <p className="font-mono text-xs break-all">{log.payload}</p>
    </div>
  </div>
);

export function LogConsole() {
  const { logs, clearLogs } = useMqtt();
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <TooltipProvider>
      <Card className="flex h-full min-h-[300px] flex-col shadow-lg">
        <CardHeader className="flex-row items-center justify-between">
          <div className="space-y-1.5">
             <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline text-2xl">Log Console</CardTitle>
            </div>
            <CardDescription>Live feed of MQTT messages.</CardDescription>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={clearLogs}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Clear logs</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear logs</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-0">
          <ScrollArea className="h-full">
            <div className="p-4 pt-0" ref={viewportRef}>
              {logs.length > 0 ? (
                logs.map((log, index) => <LogEntry key={index} log={log} />)
              ) : (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  No messages yet. Waiting for signal...
                </p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
