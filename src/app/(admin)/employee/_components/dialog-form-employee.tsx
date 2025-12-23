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

/* ================== VALIDATION ================== */

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  employee_number: z.string().min(1),
  full_name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6).optional(),
  department_id: z.string(),
  position_id: z.string(),
  salary: z.number(),
  join_date: z.date(),
  profile_uri: z.string().optional(), // STRING
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  type: "create" | "update";
  children: React.ReactNode;
  data?: any;
  fetchData: () => void;
}

/* ================== COMPONENT ================== */

export default function DialogFormUser({
  type,
  children,
  data,
  fetchData,
}: Props) {
  const [open, setOpen] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const [positions, setPositions] = useState<ComboboxGroup[]>([]);

  /* ===== FORM ===== */
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_number: data?.employee_number || "",
      full_name: data?.full_name || "",
      email: data?.email || "",
      department_id: data?.department_id || "",
      position_id: data?.position_id || "",
      salary: data?.salary || 0,
      join_date: data?.join_date ? new Date(data.join_date) : undefined,
      profile_uri: data?.profile_uri || "",
    },
  });

  /* ===== FILE UPLOAD ===== */
  const [{ files }, { openFileDialog, removeFile, getInputProps }] =
    useFileUpload({
      maxFiles: 1,
      accept: "image/*",
    });

  const previewUrl = files[0]?.preview || data?.profile_uri || "";
  const fileName = files[0]?.file.name || null;

  /* ===== FETCH OPTIONS ===== */
  const fetchOptions = useCallback(async () => {
    try {
      const [deptRes, posRes] = await Promise.all([
        request.get("/department"),
        request.get("/position"),
      ]);

      setDepartments(
        deptRes.data.data.map((d: any) => ({
          value: String(d.id),
          label: d.name,
        }))
      );

      const grouped = posRes.data.data.reduce(
        (acc: ComboboxGroup[], cur: any) => {
          const group = acc.find((g) => g.heading === cur.department.name);
          const item = { value: String(cur.id), label: cur.name };

          if (group) group.items.push(item);
          else acc.push({ heading: cur.department.name, items: [item] });

          return acc;
        },
        []
      );

      setPositions(grouped);
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
      const formData = new FormData();
      formData.append("employee_number", values.employee_number);
      formData.append("full_name", values.full_name);
      formData.append("email", values.email);
      formData.append("department_id", values.department_id);
      formData.append("position_id", values.position_id);
      formData.append("salary", String(values.salary));
      formData.append("join_date", values.join_date.toISOString());
      formData.append("status", "ACTIVE");

      if (values.password) {
        formData.append("password", values.password);
      }

      if (files[0]?.file instanceof File) {
        formData.append("profile_uri", files[0].file);
      }

      if (type === "create") {
        await request.post("/user", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await request.put(`/user/${data.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
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
            {/* IMAGE */}
            {/* <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <div className="flex gap-4 items-center">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={previewUrl} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  onClick={openFileDialog}
                  variant="outline"
                >
                  Upload
                </Button>
                <input {...getInputProps()} className="hidden" />
              </div>
            </FormItem>

            <FormField
              control={form.control}
              name="employee_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Number</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} />
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
                  <Combobox
                    data={departments}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <Combobox
                    data={positions}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <CurrencyInput
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="join_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Join Date</FormLabel>
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
            /> */}

            <FormField
              control={form.control}
              name="profile_uri"
              render={() => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <div className="flex justify-between items-center gap-4 border p-4 rounded-md">
                      <div className="flex gap-4 items-center">
                        <Avatar className="h-12 w-12 rounded-lg">
                          <AvatarImage
                            src={previewUrl ?? data?.profile_uri ?? ""}
                            className="object-cover"
                          />
                          <AvatarFallback>EP</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium">
                            {fileName || "No file chosen"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG, WebP up to 5MB
                          </p>
                        </div>
                      </div>
                      {fileName ? (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFile(files[0]?.id)}
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={openFileDialog}
                        >
                          Upload
                        </Button>
                      )}
                      <input {...getInputProps()} className="hidden" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* EMPLOYEE NUMBER */}
            <FormField
              control={form.control}
              name="employee_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Number</FormLabel>
                  <FormControl>
                    <Input placeholder="EMP-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <Input placeholder="John Doe" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      type="email"
                      placeholder="john@company.com"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="department_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Combobox
                      data={departments}
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
                name="position_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <Combobox
                      data={positions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select position"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Salary</FormLabel>
                  <CurrencyInput
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="join_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Join Date</FormLabel>
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

            {/* <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

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
