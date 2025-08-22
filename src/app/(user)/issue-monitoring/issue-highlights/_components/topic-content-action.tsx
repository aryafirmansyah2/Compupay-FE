'use client';
import { CalendarDatePicker } from '@/components/ui/date-range-picker';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, SlidersHorizontal } from 'lucide-react';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import TopicContentFilter from './topic-content-filter';

const FormSchema = z.object({
  calendar: z.object({
    from: z.date(),
    to: z.date(),
  }),
  datePicker: z.object({
    from: z.date(),
    to: z.date(),
  }),
});
export default function TopicContentAction() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      calendar: {
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
      },
      datePicker: {
        from: new Date(),
        to: new Date(),
      },
    },
  });

  return (
    <div className="flex items-center justify-end gap-2 ">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="calendar"
            render={({ field }) => (
              <FormItem>
                <FormControl className="w-full">
                  <div className="relative flex items-center justify-between ">
                    <Input
                      type="text"
                      placeholder="Search..."
                      className={cn(
                        'max-w-64 w-full pl-10 pr-3 rounded-md bg-muted/50 text-muted-foreground'
                      )}
                    />
                    <Search className="absolute left-4 me-2 h-4 w-4" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex items-center justify-end gap-4">
        <TopicContentFilter />
      </div>
    </div>
  );
}
