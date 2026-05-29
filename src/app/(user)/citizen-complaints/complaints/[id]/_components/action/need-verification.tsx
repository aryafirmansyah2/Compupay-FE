import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import React from "react";

export default function NeedVerification() {
  return (
    <div className="flex flex-col gap-4 text-balance leading-relaxed">
      <Card className="border border-green-500 dark:bg-green-50/20 bg-green-50/50">
        <CardHeader className="flex flex-row items-center gap-4 text-green-500">
          <ShieldCheck className="h-6 w-6 text-green-500" />
          <div>
            <CardTitle className="text-lg font-medium">
              Verified Report
            </CardTitle>
            <CardDescription className="text-sm text-green-600">
              This report has been verified and is in the process of being
              handled.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
