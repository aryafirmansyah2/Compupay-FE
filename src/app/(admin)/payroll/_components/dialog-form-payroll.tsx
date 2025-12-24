"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Combobox, { ComboboxGroup } from "@/components/ui/combobox";
import CurrencyInput from "@/components/ui/currency-input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFileUpload } from "@/hooks/use-file-upload";
import request from "@/utils/request";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CANCELLED } from "dns";

/* ================== VALIDATION ================== */

const formSchema = z.object({
  ref_no: z.string(),
  user_id: z.string(),
  date_from: z.date(),
  date_to: z.date(),
  type: z.string(),
  status: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  type: "create" | "update";
  children: React.ReactNode;
  data?: any;
  fetchData: () => void;
}

/* ================== COMPONENT ================== */

export default function DialogFormPayroll({
  type,
  children,
  data,
  fetchData,
}: Props) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any[]>([]);
  const [positions, setPositions] = useState<ComboboxGroup[]>([]);

  /* ===== FORM ===== */
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ref_no: data?.ref_no || "",
      user_id: data?.user_id || "",
      date_from: data?.date_from ? new Date(data.date_from) : undefined,
      date_to: data?.date_to ? new Date(data.date_to) : undefined,
      type: data?.type || "",
      status: data?.status || "",
    },
  });
  /* ===== FETCH OPTIONS ===== */
  const fetchOptions = useCallback(async () => {
    try {
      const [deptRes] = await Promise.all([
        request.get("/user"),
        // request.get("/position"),
      ]);

      // setDepartments(
      //   deptRes.data.data.map((d: any) => ({
      //     value: String(d.id),
      //     label: d.name,
      //   }))
      // );

      const grouped = deptRes.data.data.reduce(
        (acc: ComboboxGroup[], cur: any) => {
          const group = acc.find((g) => g.heading === cur.department.name);
          const item = { value: String(cur.id), label: cur.full_name };

          if (group) group.items.push(item);
          else acc.push({ heading: cur.department.name, items: [item] });

          return acc;
        },
        []
      );

      setUser(grouped);
    } catch {
      toast.error("Failed to load options");
    }
  }, []);

  useEffect(() => {
    if (open) fetchOptions();
  }, [open, fetchOptions]);

  /* ===== SUBMIT ===== */
  const onSubmit = async (values: FormValues) => {
    const loading = toast.loading("Saving...");

    try {
      const formData = {
        ref_no: values.ref_no,
        user_id: values.user_id,
        date_from: values.date_from,
        date_to: values.date_to,
        type: values.type,
        status: values.status,
      };

      if (type === "create") {
        await request.post("/payroll", formData, {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await request.put(`/payroll/${data.id}`, formData, {
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

  /* ================== UI ================== */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Create User" : "Update User"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="ref_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ref Nommor</FormLabel>
                  <FormControl>
                    <Input placeholder="EMP-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* EMPLOYEE NUMBER */}
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <Combobox
                    data={user}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select department"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date From</FormLabel>
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
            <FormField
              control={form.control}
              name="date_to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date To</FormLabel>
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

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Combobox
                    data={[
                      { value: "PENDING", label: "PENDING" },
                      { value: "PAID", label: "PAID" },
                      { value: "CANCELLED", label: "CANCELLED" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select Status"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
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
