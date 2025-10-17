import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { stat } from "fs";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  trackingId: z.string().min(2, {
    message: "trackingId must be at least 2 characters.",
  }),
  reportUrl: z.string().url({ message: "Must be a valid URL" }),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
});

export default function FileVerification() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackingId: "",
      reportUrl: "",
      status: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="flex flex-col gap-4 text-balance leading-relaxed">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="trackingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tracking ID</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Input tracking id"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>(Copy from SP4N Lapor)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select {...field}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Awaiting Processing by the Relevant OPD">
                        Awaiting Processing by the Relevant OPD
                      </SelectItem>
                      <SelectItem value="Currently Being Processed by the Relevant OPD">
                        Currently Being Processed by the Relevant OPD
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="reportUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Report URL</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Input rweport URL"
                    {...field}
                  />
                </FormControl>
                <FormDescription>(Copy from SP4N Lapor)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
