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
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

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

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const [positions, setPositions] = useState<ComboboxGroup[]>([]);

  /* ===== FORM ===== */
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  /* ===== FILE UPLOAD ===== */
  const [{ files }, { openFileDialog, removeFile, getInputProps }] =
    useFileUpload({
      maxFiles: 1,
      accept: "image/*",
    });

  const previewUrl = files[0]?.preview || null || "";
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

      await request.post("/user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("User saved", { id: loading });
      setOpen(false);
      form.reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.errors?.message || "Submit failed", {
        id: loading,
      });
    }
  };

  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await request.get(`/auth/me`);
      setData(res.data.data);
    } catch (err: any) {
      setError(err.message || "Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }, []); // Use search as dependency to refetch when the search value changes

  // UseEffect to trigger fetchData on search change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500); // Adding debounce delay of 500ms to avoid multiple calls while typing

    return () => clearTimeout(delayDebounceFn); // Cleanup debounce on search change
  }, [fetchData]);

  console.log(data);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Detail of data user profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Profile Image</Label>
          <div className="flex justify-between items-center gap-4 border p-4 rounded-md">
            <div className="flex gap-4 items-center">
              <Avatar className="h-12 w-12 rounded-lg">
                <AvatarImage
                  src={`http://localhost:3001/public${data?.profile_uri}`}
                  className="object-cover"
                />
                <AvatarFallback>EP</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{fileName || "No file chosen"}</p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG, WebP up to 5MB
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Employee Number</Label>
          <Input
            placeholder="EMP-001"
            value={data?.employee_number || ""}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input placeholder="EMP-001" value={data?.full_name || ""} readOnly />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input placeholder="EMP-001" value={data?.email || ""} readOnly />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" readOnly />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Department</Label>
            <Input
              placeholder="EMP-001"
              value={data?.department.name || ""}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label>Position</Label>
            <Input
              placeholder="EMP-001"
              value={data?.position.name || ""}
              readOnly
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Monthly Salary</Label>
          <CurrencyInput
            value={data?.salary || 0}
            onChange={() => {}}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label>Join Date</Label>
          <Input
            placeholder="EMP-001"
            value={data?.join_date ? format(data?.join_date, "dd-MM-yyyy") : ""}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
}
