"use client";
import { useCallback, useEffect, useState } from "react";
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
import CurrencyInput from "@/components/ui/currency-input";
import Combobox, { ComboboxGroup } from "@/components/ui/combobox";
import { allowance } from "../_data/allowance";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, set } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import request from "@/utils/request";

const formSchema = z.object({
  user_id: z.string().min(1, { message: "Employee is required" }),
  allowance_id: z.string().min(1, { message: "Allowance is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  amount: z.number().min(1, { message: "Amount is required" }),
  effective_date: z.date(),
});

type FormValues = z.infer<typeof formSchema>;

interface StepItemCardProps {
  type: "create" | "update";
  children: React.ReactNode;
  data?: any;
  fetchData: () => void;
}

export default function DialogFormEmployeeAllowance({
  type,
  children,
  data,
  fetchData,
}: StepItemCardProps) {
  const [open, setOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState<any[]>([]);
  const [allowanceData, setAllowanceData] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: type === "update" && data ? data.user_id : "",
      allowance_id: type === "update" && data ? data.allowance_id : "",
      type: type === "update" && data ? data.type : "monthly",
      amount: type === "update" && data ? data.amount : 0,
      effective_date:
        type === "update" && data ? new Date(data.effective_date) : undefined,
    },
  });

  const fetchOptions = useCallback(async () => {
    try {
      const [deptRes, posRes] = await Promise.all([
        request.get("/allowances"),
        request.get("/user"),
      ]);

      setAllowanceData(
        deptRes.data.data.map((d: any) => ({
          value: String(d.id),
          label: d.allowance,
        }))
      );

      const grouped = posRes.data.data.reduce(
        (acc: ComboboxGroup[], cur: any) => {
          const group = acc.find((g) => g.heading === cur.department.name);
          const item = { value: String(cur.id), label: cur.full_name };

          if (group) group.items.push(item);
          else acc.push({ heading: cur.department.name, items: [item] });

          return acc;
        },
        []
      );

      setEmployeeData(grouped);
    } catch {
      toast.error("Failed to load options");
    }
  }, []);

  useEffect(() => {
    if (open) fetchOptions();
  }, [open, fetchOptions]);

  const onSubmit = async (values: FormValues) => {
    const loading = toast.loading("Saving...");

    try {
      const formData = {
        user_id: values.user_id,
        allowance_id: values.allowance_id,
        type: values.type,
        amount: values.amount,
        effective_date: values.effective_date,
      };

      if (type === "create") {
        await request.post("/employeeAllowance", formData, {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await request.put(`/employeeAllowance/${data.id}`, formData, {
          headers: { "Content-Type": "application/json" },
        });
      }

      toast.success("User saved", { id: loading });
      setOpen(false);
      fetchData();
      form.reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.errors?.message || "Submit failed", {
        id: loading,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {type == "create"
                  ? "Create employee allowance"
                  : "Update employee allowance"}
              </DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="user_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee</FormLabel>
                      <Combobox
                        data={employeeData}
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        placeholder="Select an employee..."
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="allowance_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allowance</FormLabel>
                      <Combobox
                        data={allowanceData}
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        placeholder="Select a allowance..."
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <CurrencyInput
                        value={field.value}
                        onChange={field.onChange}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="effective_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Effective Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            {field.value
                              ? field.value.toDateString()
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex"
                    >
                      <label className="border-input has-data-[state=checked]:border-primary/80 has-data-[state=checked]:border-2 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50">
                        <RadioGroupItem
                          id="monthly"
                          value="MONTHLY"
                          className="sr-only after:absolute after:inset-0"
                        />
                        <p className="text-foreground text-sm leading-none font-medium">
                          Monthly
                        </p>
                      </label>
                      <label className="border-input has-data-[state=checked]:border-primary/80 has-data-[state=checked]:border-2 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50">
                        <RadioGroupItem
                          id="semi-monthly"
                          value="SEMI_MONTHLY"
                          className="sr-only after:absolute after:inset-0"
                        />
                        <p className="text-foreground text-sm leading-none font-medium">
                          Semi Monthly
                        </p>
                      </label>
                      <label className="border-input has-data-[state=checked]:border-primary/80 has-data-[state=checked]:border-2 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50">
                        <RadioGroupItem
                          id="once"
                          value="ONCE"
                          className="sr-only after:absolute after:inset-0"
                        />
                        <p className="text-foreground text-sm leading-none font-medium">
                          Once
                        </p>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription className="max-w-xs w-full ">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {type == "create" ? "Create" : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
