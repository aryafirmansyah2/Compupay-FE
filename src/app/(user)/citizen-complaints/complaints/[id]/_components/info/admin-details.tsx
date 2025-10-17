import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CircleUserRound } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function AdminDetails() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
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
      <Card className="p-4">
        <p>Recent Admin</p>
        <Card className="mt-2 p-3 bg-muted/50 w-1/2">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border">
              <CircleUserRound className="w-6 h-6 " />
            </span>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Admin</p>
            </div>
          </div>
        </Card>
      </Card>
      <Card className="">
        <CardHeader className=" p-2 mb-4 bg-muted/50 border-b rounded-t-md ">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border">
              <CircleUserRound className="w-6 h-6 " />
            </span>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base sm:text-lg">
                Change Admin
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDetails;
