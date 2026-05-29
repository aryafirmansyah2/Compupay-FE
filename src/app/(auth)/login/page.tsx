"use client";

import { useState } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import LoginForm from "./_components/login-form";
import { OTPForm } from "./_components/otp-form";
import { VerificationEmailForm } from "./_components/verification-email-form";
import { ResetPasswordForm } from "./_components/reset-password-form";

type Step = "login" | "verify-email" | "otp" | "reset-password";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("login");
  const [emailForOTP, setEmailForOTP] = useState("");
  const [resetToken, setResetToken] = useState("");

  return (
    <div className="grid min-h-svh lg:grid-cols-2 w-full">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-gradient-to-bl from-[#000000] via-[#000000] to-[#561772]">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium text-white">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            ComPay
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm bg-accent/30 p-10 rounded-2xl backdrop-blur-sm border border-white/10">
            {step === "login" && (
              <LoginForm onForgotPassword={() => setStep("verify-email")} />
            )}

            {step === "verify-email" && (
              <VerificationEmailForm
                onSuccess={(email) => {
                  setEmailForOTP(email);
                  setStep("otp");
                }}
                onBack={() => setStep("login")}
              />
            )}

            {step === "otp" && (
              <OTPForm
                email={emailForOTP}
                onSuccess={(token) => {
                  setResetToken(token);
                  setStep("reset-password");
                }}
                onBack={() => setStep("verify-email")}
              />
            )}

            {step === "reset-password" && (
              <ResetPasswordForm
                resetToken={resetToken}
                onSuccess={() => setStep("login")}
              />
            )}
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/assets/images/bg-login.png"
          alt="Login background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
