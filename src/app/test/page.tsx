"use client";

import React, { useState } from "react";
import { Tag, TagInput } from "emblor";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckCheckIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Please enter a valid email address." }),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
});

const InputFormDemo = () => {
  const initialTags: Tag[] = [
    { id: "3692720454", text: "Sports" },
    { id: "1304988732", text: "Programming" },
    { id: "192762072", text: "Travel" },
  ];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      tags: initialTags,
    },
  });

  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    toast.custom(() => (
      <Alert className="border-green-600 text-green-600 dark:border-green-400 dark:text-green-400">
        <CheckCheckIcon />
        <AlertTitle>
          Saved. Email: {values.email}. Tags:{" "}
          {values.tags.map((t) => t.text).join(", ")}
        </AlertTitle>
      </Alert>
    ));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-xs space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reset Your Password:</FormLabel>
              <FormControl>
                <Input placeholder="Email address" {...field} />
              </FormControl>
              <FormDescription>
                Enter your email address to receive a reset link.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagInput
                  tags={(field.value as Tag[]) || []}
                  setTags={(newTags) => {
                    field.onChange(newTags);
                  }}
                  placeholder="Add a tag"
                  styleClasses={{
                    input: "w-full sm:max-w-[350px]",
                  }}
                  activeTagIndex={activeTagIndex}
                  setActiveTagIndex={setActiveTagIndex}
                />
              </FormControl>
              <FormDescription>
                Tambah tag untuk kategori atau label.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Send Link</Button>
      </form>
    </Form>
  );
};

export default InputFormDemo;
