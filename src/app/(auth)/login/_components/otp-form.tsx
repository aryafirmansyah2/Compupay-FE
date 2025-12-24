"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import request from "@/utils/request";
import { Button } from "@/components/ui/button";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const schema = z.object({
  otp: z.string().min(6, "OTP code must be 6 digits"),
});

interface Props {
  email: string;
  onBack: () => void;
  onSuccess: (token: string) => void;
}

export function OTPForm({ email, onBack, onSuccess }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { otp: "" },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const loadingToast = toast.loading("Verifying code...");
    try {
      const response = await request.post("/auth/verify-otp", {
        email: email,
        otp: values.otp,
      });
      const token =
        response.data.reset_token || response.data.data?.reset_token;
      toast.success("Verification successful!", { id: loadingToast });
      onSuccess(token);
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Invalid or expired OTP code.";
      toast.error(msg, { id: loadingToast });
    }
  };

  return (
    <Card className="w-full shadow-none bg-transparent border-0">
      <CardHeader className="p-0 text-center mb-6">
        <CardTitle className="text-white">Verify OTP</CardTitle>
        <CardDescription className="text-white/60">
          Enter the 6-digit code sent to <br />{" "}
          <strong className="text-white">{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-center"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="text-white self-start">
                    Verification Code
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="gap-2">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="bg-white/10 border-white/20 text-white rounded-md size-10 md:size-12"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
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
                {form.formState.isSubmitting ? "Verifying..." : "Verify"}
              </Button>
              <Button
                type="button"
                variant="link"
                onClick={onBack}
                className="w-full text-white/70 text-xs"
              >
                Change Email
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
