'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Monitor, Send } from 'lucide-react';
import { useMqtt } from '@/hooks/use-mqtt';
import { useBoat } from '@/hooks/use-boat';
import { getTopics } from '@/lib/mqtt-topics';

const lcdSchema = z.object({
  line: z.string().max(32, 'Message cannot exceed 32 characters.').default(''),
});

type LcdFormValues = z.infer<typeof lcdSchema>;

export function LcdControl() {
  const { publish } = useMqtt();
  const { boatName } = useBoat();
  const topics = getTopics(boatName!);

  const form = useForm<LcdFormValues>({
    resolver: zodResolver(lcdSchema),
    defaultValues: {
      line: '',
    },
  });

  const onSubmit = (values: LcdFormValues) => {
    // The device might expect line breaks to be sent explicitly to split on screen
    // We'll split the string into two 16-char chunks.
    const line1 = values.line.substring(0, 16);
    const line2 = values.line.substring(16, 32);
    publish(topics.lcd, JSON.stringify({ line1, line2 }));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Monitor className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">LCD Control</CardTitle>
        </div>
        <CardDescription>Send text to the onboard display (max 32 chars).</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="line"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Message for the LCD..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Send to LCD
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
