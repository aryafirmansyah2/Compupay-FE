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

const formSchema = z.object({
  emergencyLevel: z.string().min(2, {
    message: "emergencyLevel must be at least 2 characters.",
  }),
});

export default function VerifySituation() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emergencyLevel: "",
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
          <FormField
            control={form.control}
            name="emergencyLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Level</FormLabel>
                <Select {...field}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a emergency level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Information Request">
                      Information Request
                    </SelectItem>
                    <SelectItem value="Supervised">Supervised</SelectItem>
                    <SelectItem value="Unsupervised">Unsupervised</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
