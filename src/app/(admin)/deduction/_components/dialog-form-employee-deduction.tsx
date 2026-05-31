"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CurrencyInput from "@/components/ui/currency-input";
import Combobox, { ComboboxGroup } from "@/components/ui/combobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import request from "@/utils/request";

const formSchema = z.object({
  user_id: z.string().min(1, { message: "Employee is required" }),
  deduction_id: z.string().min(1, { message: "Deduction is required" }),
  type: z.enum(["MONTHLY", "SEMI_MONTHLY", "ONCE"]),
  amount: z.coerce.number().min(1, { message: "Amount is required" }),
  effective_date: z.date({
    message: "Effective date is required",
  }),
});

type FormValues = {
  user_id: string;
  deduction_id: string;
  type: "MONTHLY" | "SEMI_MONTHLY" | "ONCE";
  amount: number;
  effective_date: Date;
};

interface DialogFormEmployeeDeductionProps {
  type: "create" | "update";
  children: React.ReactNode;
  data?: any;
  fetchData: () => void;
}

export default function DialogFormEmployeeDeduction({
  type,
  children,
  data,
  fetchData,
}: DialogFormEmployeeDeductionProps) {
  const [open, setOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState<ComboboxGroup[]>([]);
  const [deductionData, setDeductionData] = useState<
    { value: string; label: string }[]
  >([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      user_id: "",
      deduction_id: "",
      type: "MONTHLY",
      amount: 0,
      effective_date: new Date(),
    },
  });

  const fetchOptions = useCallback(async () => {
    try {
      const [deductionRes, userRes] = await Promise.all([
        request.get("/deduction", { get_all: true }),
        request.get("/user", { get_all: true }),
      ]);

      setDeductionData(
        (deductionRes.data.data || []).map((item: any) => ({
          value: String(item.id),
          label: item.deduction,
        })),
      );

      const grouped = (userRes.data.data || []).reduce(
        (acc: ComboboxGroup[], cur: any) => {
          const heading = cur.department?.name || "No Department";
          const group = acc.find((g) => g.heading === heading);

          const item = {
            value: String(cur.id),
            label: cur.full_name,
          };

          if (group) {
            group.items.push(item);
          } else {
            acc.push({
              heading,
              items: [item],
            });
          }

          return acc;
        },
        [],
      );

      setEmployeeData(grouped);
    } catch {
      toast.error("Failed to load form options");
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    fetchOptions();

    form.reset({
      user_id: data?.user_id || "",
      deduction_id: data?.deduction_id || "",
      type: data?.type || "MONTHLY",
      amount: Number(data?.amount || 0),
      effective_date: data?.effective_date
        ? new Date(data.effective_date)
        : new Date(),
    });
  }, [open, data, form, fetchOptions]);

  const getErrorMessage = (err: any) => {
    return (
      err?.response?.data?.errors?.message ||
      err?.response?.data?.message ||
      err?.message ||
      "Submit failed"
    );
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const loading = toast.loading(
      type === "create"
        ? "Creating employee deduction..."
        : "Updating employee deduction...",
    );

    try {
      const payload = {
        user_id: values.user_id,
        deduction_id: values.deduction_id,
        type: values.type,
        amount: Number(values.amount),
        effective_date: values.effective_date.toISOString(),
      };

      if (type === "create") {
        await request.post("/employeeDeduction", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        toast.success("Employee deduction created successfully", {
          id: loading,
        });
      } else {
        await request.put(`/employeeDeduction/${data.id}`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        toast.success("Employee deduction updated successfully", {
          id: loading,
        });
      }

      setOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(getErrorMessage(err), {
        id: loading,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-[95vw] sm:max-w-[760px] max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, () => {
              toast.error("Please complete the required fields");
            })}
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle>
                {type === "create"
                  ? "Create Employee Deduction"
                  : "Update Employee Deduction"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <FormField
                control={form.control}
                name="user_id"
                render={({ field }) => (
                  <FormItem className="min-w-0 space-y-2">
                    <FormLabel className="block">Employee</FormLabel>
                    <div className="w-full min-w-0">
                      <Combobox
                        data={employeeData}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select an employee..."
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deduction_id"
                render={({ field }) => (
                  <FormItem className="min-w-0 space-y-2">
                    <FormLabel className="block">Deduction</FormLabel>
                    <div className="w-full min-w-0">
                      <Combobox
                        data={deductionData}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select a deduction..."
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="min-w-0 space-y-2">
                    <FormLabel className="block">Amount</FormLabel>
                    <div className="w-full min-w-0">
                      <CurrencyInput
                        value={Number(field.value || 0)}
                        onChange={(value) => field.onChange(Number(value))}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="effective_date"
                render={({ field }) => (
                  <FormItem className="min-w-0 space-y-2">
                    <FormLabel className="block">Effective Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <span className="truncate">
                            {field.value
                              ? format(field.value, "dd MMM yyyy")
                              : "Pick a date"}
                          </span>
                          <CalendarIcon className="ml-auto h-4 w-4 shrink-0" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) field.onChange(date);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="block">Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                    >
                      <label className="border-input has-data-[state=checked]:border-primary/80 has-data-[state=checked]:border-2 relative flex cursor-pointer items-center justify-center rounded-md border px-4 py-3 text-center shadow-xs transition outline-none">
                        <RadioGroupItem
                          id="deduction-monthly"
                          value="MONTHLY"
                          className="sr-only after:absolute after:inset-0"
                        />
                        <p className="text-foreground text-sm leading-none font-medium">
                          Monthly
                        </p>
                      </label>

                      <label className="border-input has-data-[state=checked]:border-primary/80 has-data-[state=checked]:border-2 relative flex cursor-pointer items-center justify-center rounded-md border px-4 py-3 text-center shadow-xs transition outline-none">
                        <RadioGroupItem
                          id="deduction-semi-monthly"
                          value="SEMI_MONTHLY"
                          className="sr-only after:absolute after:inset-0"
                        />
                        <p className="text-foreground text-sm leading-none font-medium">
                          Semi Monthly
                        </p>
                      </label>

                      <label className="border-input has-data-[state=checked]:border-primary/80 has-data-[state=checked]:border-2 relative flex cursor-pointer items-center justify-center rounded-md border px-4 py-3 text-center shadow-xs transition outline-none">
                        <RadioGroupItem
                          id="deduction-once"
                          value="ONCE"
                          className="sr-only after:absolute after:inset-0"
                        />
                        <p className="text-foreground text-sm leading-none font-medium">
                          Once
                        </p>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit">
                {type === "create" ? "Create" : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
