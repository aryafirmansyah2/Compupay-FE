"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { formatCurrency } from "@/components/ui/currency-input";

interface StepItemCardProps {
  children: React.ReactNode;
  data?: any;
}

export default function DialogDetailEmployeeAllowance({
  children,
  data,
}: StepItemCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Allowance Employee detail</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <p className="text-sm ">Allowance Employee Info</p>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <p className="text-muted-foreground text-xs">Employee</p>
              <small className="text-sm leading-none font-medium">
                {data?.users?.full_name}
              </small>
            </div>
            <div className="">
              <p className="text-muted-foreground text-xs">Type </p>
              <small className="text-sm leading-none font-medium">
                {data?.type}
              </small>
            </div>
            <div className="">
              <p className="text-muted-foreground text-xs">Allowance </p>
              <small className="text-sm leading-none font-medium">
                {data?.allowance?.allowance}
              </small>
            </div>
            <div className="">
              <p className="text-muted-foreground text-xs">Amount </p>
              <small className="text-sm leading-none font-medium">
                Rp {formatCurrency(data?.amount)}
              </small>
            </div>
            <div className="">
              <p className="text-muted-foreground text-xs">Effective Date </p>
              <small className="text-sm leading-none font-medium">
                {format(data?.effective_date, "dd-MM-yyyy")}
              </small>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
