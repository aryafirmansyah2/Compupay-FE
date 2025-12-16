"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CurrencyInput from "@/components/ui/currency-input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import request from "@/utils/request";

export const formSchema = z
  .object({
    name: z.string().min(1, { message: "Department name is required" }),

    start_salary: z
      .number({ message: "Start salary must be a number" })
      .min(0, { message: "Start salary must be a positive number" }),

    end_salary: z
      .number({ message: "End salary must be a number" })
      .min(0, { message: "End salary must be a positive number" }),

    description: z
      .string()
      .min(12, { message: "Description must be at least 12 characters long" }),
  })
  .superRefine((data, ctx) => {
    if (data.end_salary < data.start_salary) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["end_salary"],
        message: "End salary must be greater than or equal to start salary",
      });
    }
  });

interface StepItemCardProps {
  type?: "update" | "create";
  children: React.ReactNode;
  fetchData: () => void; // Function to fetch the latest data
  data?: any;
}

export default function DialogFormDepartment({
  type,
  children,
  data,
  fetchData,
}: StepItemCardProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: type === "update" && data ? data.name : "",
      start_salary: type === "update" && data ? data.start_salary : null,
      end_salary: type === "update" && data ? data.end_salary : null,
      description: type === "update" && data ? data.description : "",
    },
  });

  useEffect(() => {
    if (!open) {
      // Reset form values when modal is closed
      form.reset({
        name: type === "update" && data ? data.name : "",
        start_salary: type === "update" && data ? data.start_salary : null,
        end_salary: type === "update" && data ? data.end_salary : null,
        description: type === "update" && data ? data.description : "",
      });
    }
  }, [open, form, type, data]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    toast.loading("Loading...");
    toast.dismiss();

    try {
      if (type === "create") {
        // Call your API to create a new department
        const response = await request.post("/department", {
          name: values.name,
          start_salary: values.start_salary,
          end_salary: values.end_salary,
          description: values.description,
        });

        if (response.data) {
          toast.success("Department created successfully!", {
            position: "top-center",
            duration: 2000, // Ensure the toast is shown for 2 seconds
          });

          setOpen(false); // Close the modal after the toast has finished
          fetchData(); // Fetch the latest data
        }
      } else if (type === "update") {
        const response = await request.put("/department/" + data.id, {
          name: values.name,
          start_salary: values.start_salary,
          end_salary: values.end_salary,
          description: values.description,
        });

        if (response.data) {
          toast.success("Department updated successfully!", {
            position: "top-center",
            duration: 2000, // Ensure the toast is shown for 2 seconds
          });

          setOpen(false); // Close the modal after the toast has finished
          fetchData(); // Fetch the latest data
        }
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {type == "create" ? "Create department" : "Update department"}
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Input department name"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="start_salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start salary</FormLabel>
                      <FormControl>
                        <CurrencyInput
                          value={field.value}
                          onChange={field.onChange}
                          // {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="end_salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End salary</FormLabel>
                      <FormControl>
                        <CurrencyInput
                          value={field.value}
                          onChange={field.onChange}
                          // {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Input description of department"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {type == "create" ? "Create" : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
