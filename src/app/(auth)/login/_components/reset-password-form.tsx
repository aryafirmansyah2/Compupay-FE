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

const schema = z
  .object({
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    new_password_confirmation: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .superRefine(({ new_password_confirmation, new_password }, ctx) => {
    if (new_password_confirmation !== new_password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["new_password_confirmation"],
      });
    }
  });

interface Props {
  resetToken: string;
  onSuccess: () => void;
}

export function ResetPasswordForm({ resetToken, onSuccess }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { new_password: "", new_password_confirmation: "" },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const loadingToast = toast.loading("Updating password...");
    try {
      await request.post("/auth/reset-password", {
        reset_token: resetToken,
        new_password: values.new_password,
        new_password_confirmation: values.new_password_confirmation,
      });
      toast.success("Password updated! You can now log in.", {
        id: loadingToast,
      });
      onSuccess();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to reset password.";
      toast.error(msg, { id: loadingToast });
    }
  };

  return (
    <Card className="w-full shadow-none bg-transparent border-0">
      <CardHeader className="p-0 text-center mb-6">
        <CardTitle className="text-white">Set New Password</CardTitle>
        <CardDescription className="text-white/60">
          Create a secure password for your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="bg-white/10 text-white border-white/20"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="bg-white/10 text-white border-white/20"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Processing..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
