"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import request from "@/utils/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});

interface Props {
  onSuccess: (email: string) => void;
  onBack: () => void;
}

export function VerificationEmailForm({ onSuccess, onBack }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const loadingToast = toast.loading("Sending reset code...");
    try {
      await request.post("/auth/forget-password", { email: values.email });
      toast.success("OTP code sent to your email", { id: loadingToast });
      onSuccess(values.email);
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "Failed to send email. Please try again.";
      toast.error(msg, { id: loadingToast });
    }
  };

  return (
    <Card className="w-full shadow-none bg-transparent border-0">
      <CardHeader className="p-0 text-center mb-6">
        <CardTitle className="text-white">Forgot Password</CardTitle>
        <CardDescription className="text-white/60">
          Enter your email to receive reset instructions.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      {...field}
                      className="bg-white/10 text-white border-white/20"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Sending..." : "Send OTP Code"}
              </Button>
              <Button
                type="button"
                variant="link"
                onClick={onBack}
                className="w-full text-white/70"
              >
                Back to Login
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
