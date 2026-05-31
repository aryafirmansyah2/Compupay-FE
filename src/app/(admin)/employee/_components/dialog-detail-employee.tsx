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
import CurrencyInput from "@/components/ui/currency-input";
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

export default function DialogDetailEmployee({
  children,
  data,
}: StepItemCardProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      //   console.log(values);a
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Employee detail</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between gap-4 border p-4 rounded-md">
          <div className="flex gap-4 ">
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarImage
                src={`http://localhost:3001/public/${
                  data.profile_uri || "default-avatar.png"
                }`}
                alt={"arya"}
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{data.full_name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {data.email}
              </span>
            </div>
          </div>
          <Badge className="px-2.5 py-1.5 rounded-full bg-primary/10 border-primary text-primary">
            {data.status}
          </Badge>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-sm ">Employee Info</p>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <p className="text-muted-foreground text-xs">Employee number</p>
              <small className="text-sm leading-none font-medium">
                {data.employee_number}
              </small>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Name </p>
              <small className="text-sm leading-none font-medium">
                {data.full_name}
              </small>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Email </p>
              <small className="text-sm leading-none font-medium">
                {data.email}
              </small>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Department </p>
              <small className="text-sm leading-none font-medium">
                {data.department.name}
              </small>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Position </p>
              <small className="text-sm leading-none font-medium">
                {data.position.name}
              </small>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Join date </p>
              <small className="text-sm leading-none font-medium">
                {format(data.join_date, "dd-MM-yyyy")}
              </small>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Salary </p>
              <small className="text-sm leading-none font-medium">
                {`Rp ${data.salary.toLocaleString("id-ID")}`}
              </small>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
