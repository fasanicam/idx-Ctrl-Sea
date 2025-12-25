'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useBoat } from '@/hooks/use-boat';
import { Anchor, Sailboat } from 'lucide-react';

const formSchema = z.object({
  boatName: z.string().min(2, {
    message: 'A boat name must have at least 2 characters.',
  }).max(50, {
    message: 'A boat name cannot exceed 50 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Baptism() {
  const { setBoatName } = useBoat();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boatName: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setBoatName(data.boatName);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sailboat className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-3xl">Christen Your Vessel</CardTitle>
          <CardDescription className="font-body text-base">
            Every good boat needs a name. What shall we call yours?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="boatName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Boat Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., The Salty Spitoon"
                        className="text-center text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                <Anchor className="mr-2 h-4 w-4" />
                Set Sail!
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
