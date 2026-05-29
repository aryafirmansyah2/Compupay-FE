"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CurrencyInput, { formatCurrency } from "@/components/ui/currency-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string(),
  employe_number: z.string().min(1),
  job_title: z.string().min(1),
  name_2198153691: z.string().min(1),
  department: z.string(),
  salary: z.int(),
  status: z.string(),
});

interface StepItemCardProps {
  children: React.ReactNode;
  data?: any;
}

export default function DialogDetailPayroll({
  children,
  data,
}: StepItemCardProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Payroll detail</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <p className="text-sm ">Payroll Info</p>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="">
              <p className="text-muted-foreground text-xs">Ref Nomor</p>
              <small className="text-sm leading-none font-medium">
                {data.ref_no}
              </small>
            </div>
            <div className="">
              <p className="text-muted-foreground text-xs">Employee</p>
              <small className="text-sm leading-none font-medium">
                {data.employee.full_name}
              </small>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Date From </p>
              <small className="text-sm leading-none font-medium">
                {format(data.date_from, "dd-MM-yyyy")}
              </small>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Date To </p>
              <small className="text-sm leading-none font-medium">
                {format(data.date_to, "dd-MM-yyyy")}
              </small>
            </div>
            <div className="col-span-full">
              <p className="text-muted-foreground text-xs">Salary </p>
              <small className="text-sm leading-none font-medium">
                Rp {formatCurrency(data.salary)}
              </small>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Allowance Amount </p>
              <small className="text-sm leading-none font-medium">
                Rp {formatCurrency(data.allowance_amount)}
              </small>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Deduction Amount </p>
              <small className="text-sm leading-none font-medium">
                Rp {formatCurrency(data.deductions)}
              </small>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Status</p>
              <small className="text-sm leading-none font-medium">
                {data.status}
              </small>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
