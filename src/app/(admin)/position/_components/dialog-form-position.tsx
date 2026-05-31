"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import toast from "react-hot-toast";
import request from "@/utils/request";
import Combobox from "@/components/ui/combobox";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Position name is required" }),

  department_id: z.string().min(1, { message: "Department name is required" }),
});

interface StepItemCardProps {
  type?: "update" | "create";
  children: React.ReactNode;
  fetchData: () => void; // Function to fetch the latest data
  data?: any;
}

export default function DialogFormPosition({
  type,
  children,
  data,
  fetchData,
}: StepItemCardProps) {
  const [open, setOpen] = useState(false);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  // const initialLevel: Tag[] = [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: type === "update" && data ? data.name : "",
      department_id: type === "update" && data ? data.department_id : "",
      // level: type === "update" && data ? data.level : initialLevel,
    },
  });

  useEffect(() => {
    if (!open) {
      // Reset form values when modal is closed
      form.reset({
        name: type === "update" && data ? data.name : "",
        department_id: type === "update" && data ? data.department_id : "",
        // level: type === "update" && data ? data.level : initialLevel,
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
        const response = await request.post("/position", {
          name: values.name,
          department_id: values.department_id,
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
        const response = await request.put("/position/" + data.id, {
          name: values.name,
          department_id: values.department_id,
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

  const [dataDepartment, setDataDepartment] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataDepartment = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await request.get(`/department`);
      // Check if the data has actually changed before updating the state
      if (JSON.stringify(res.data.data) !== JSON.stringify(data)) {
        setDataDepartment(res.data.data);
      }
    } catch (err: any) {
      setError(err.message || "Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }, []); // Use search as dependency to refetch when the search value changes

  // UseEffect to trigger fetchData on search change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDataDepartment();
    }, 500); // Adding debounce delay of 500ms to avoid multiple calls while typing

    return () => clearTimeout(delayDebounceFn); // Cleanup debounce on search change
  }, [fetchDataDepartment]);

  const departmentOptions = useMemo(() => {
    return dataDepartment.map((d) => ({
      value: d?.id,
      label: d?.name?.trim() || "-",
    }));
  }, [dataDepartment]);

  console.log(departmentOptions);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {type == "create" ? "Create position" : "Update position"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Input position name"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Combobox
                      data={departmentOptions}
                      value={field.value}
                      onChange={(newValue) => {
                        field.onChange(newValue);
                      }}
                      placeholder="Select a department..."
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <TagInput
                      tags={(field.value as Tag[]) || []}
                      setTags={(newTags) => {
                        field.onChange(newTags);
                      }}
                      placeholder="Add a tag"
                      styleClasses={{
                        input: "w-full sm:max-w-[350px]",
                      }}
                      activeTagIndex={activeTagIndex}
                      setActiveTagIndex={setActiveTagIndex}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
