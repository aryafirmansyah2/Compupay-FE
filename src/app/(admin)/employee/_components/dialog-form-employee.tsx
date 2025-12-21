// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { toast } from "sonner";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { cn } from "@/lib/utils";
// import { Button, buttonVariants } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import CurrencyInput from "@/components/ui/currency-input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useFileUpload } from "@/hooks/use-file-upload";
// import { Label } from "@/components/ui/label";
// import Combobox, { ComboboxGroup } from "@/components/ui/combobox";
// import request from "@/utils/request";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

// const formSchemaa = z.object({
//   employee_number: z.string().min(1, "Employee number is required"),
//   full_name: z.string().min(1, "Name is required"),
//   email: z.string().min(1, "Email is required").email("Invalid email address"),
//   password: z.string().email("Invalid email address"),
//   profile_uri: z
//     .any()
//     .optional()
//     .refine(
//       (file) => !file || file?.size <= MAX_FILE_SIZE,
//       `Max image size is 5MB.`
//     )
//     .refine(
//       (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
//       "Only .jpg, .jpeg, .png and .webp formats are supported."
//     ),
//   role: z.string().min(1, "Role is required"),
//   status: z.string().min(1),
//   department_id: z.string().min(1, "Department is required"),
//   position_id: z.string().min(1, "Job title is required"),
//   salary: z.number().min(0),
//   join_date: z
//     .date({ message: "Join date is required" })
//     .max(new Date(), "Join date cannot be in the future."),
// });

// const formSchema = z.object({
//   employee_number: z.string().min(1, "Employee number is required"),
//   full_name: z.string().min(1, "Name is required"),
//   email: z.string().min(1, "Email is required").email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"), // Perbaiki ini
//   profile_uri: z.any().optional(),
//   status: z.string().min(1, "Status is required"),
//   department_id: z.string().min(1, "Department is required"),
//   position_id: z.string().min(1, "Job title is required"),
//   salary: z.number().min(0),
//   join_date: z.date({ message: "Join date is required" }),
// });

// interface StepItemCardProps {
//   type?: "update" | "create";
//   children: React.ReactNode;
//   data?: any;
//   fetchData: () => void;
// }

// export default function DialogFormEmployee({
//   type = "create",
//   children,
//   data,
//   fetchData,
// }: StepItemCardProps) {
//   const [open, setOpen] = useState(false);
//   const [dataDepartment, setDataDepartment] = useState<any[]>([]);
//   const [dataPosition, setDataPosition] = useState<ComboboxGroup[]>([]);
//   const [isLoadingOptions, setIsLoadingOptions] = useState(false);

//   const [{ files }, { removeFile, openFileDialog, getInputProps }] =
//     useFileUpload({
//       maxFiles: 1,
//       maxSize: MAX_FILE_SIZE,
//       accept: "image/*",
//       multiple: false,
//     });

//   const previewUrl = files[0]?.preview || null;
//   const fileName = files[0]?.file.name || null;

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       employee_number: "",
//       full_name: "",
//       email: "",
//       password: "",
//       profile_uri: null,
//       status: "Active",
//       department_id: "",
//       position_id: "",
//       salary: 0,
//       join_date: undefined,
//     },
//   });

//   // Fetch Options for Combobox
//   const fetchDataOption = useCallback(async () => {
//     setIsLoadingOptions(true);
//     try {
//       const [resDepartment, resPosition] = await Promise.all([
//         request.get(`/department`),
//         request.get(`/position`),
//       ]);

//       setDataDepartment(
//         resDepartment.data.data.map((item: any) => ({
//           value: String(item.id),
//           label: item.name,
//         }))
//       );

//       const positions = resPosition.data.data;
//       const grouped = positions.reduce((acc: ComboboxGroup[], current: any) => {
//         const deptName = current.department.name;
//         const existingGroup = acc.find((group) => group.heading === deptName);
//         const newItem = { value: current.id, label: current.name };

//         if (existingGroup) {
//           existingGroup.items.push(newItem);
//         } else {
//           acc.push({ heading: deptName, items: [newItem] });
//         }
//         return acc;
//       }, []);

//       setDataPosition(grouped);
//     } catch (err) {
//       console.error("Error fetching options", err);
//     } finally {
//       setIsLoadingOptions(false);
//     }
//   }, []);

//   // Effect to handle initialization and reset
//   useEffect(() => {
//     if (open) {
//       fetchDataOption();
//       if (type === "update" && data) {
//         form.reset({
//           employee_number: "",
//           full_name: "",
//           email: "",
//           password: "",
//           profile_uri: null,
//           status: "",
//           department_id: "",
//           position_id: "",
//           salary: 0,
//           join_date: undefined,
//         });
//       } else {
//         form.reset({
//           employee_number: "",
//           full_name: "",
//           email: "",
//           password: "",
//           profile_uri: null,
//           status: "",
//           department_id: "",
//           position_id: "",
//           salary: 0,
//           join_date: undefined,
//         });
//       }
//     }
//   }, [open, type, data, form, fetchDataOption]);

//   // Sync uploaded file to form state
//   useEffect(() => {
//     if (files.length > 0) {
//       form.setValue("profile_uri", files[0].file, { shouldValidate: true });
//     }
//   }, [files, form]);

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     const loadingToast = toast.loading(
//       type === "create" ? "Creating..." : "Updating..."
//     );

//     try {
//       const formData = new FormData();
//       formData.append("employee_number", values.employee_number);
//       formData.append("full_name", values.full_name);
//       formData.append("email", values.email);
//       formData.append("password", values.password);
//       formData.append("role", "USER");
//       formData.append("status", values.status);
//       formData.append("department_id", values.department_id);
//       formData.append("position_id", values.position_id);
//       formData.append("salary", String(values.salary));
//       formData.append("join_date", String(values.join_date));

//       if (files[0]?.file) {
//         const fileToUpload = files[0].file as File; // Casting manual
//         if (fileToUpload.size) {
//           // Cek sederhana untuk memastikan ini objek file biner
//           formData.append("profile_uri", fileToUpload);
//         }
//       }

//       console.log(formData);
//       const response =
//         type === "create"
//           ? await request.post("/user", formData)
//           : await request.put(`/user/${data.id}`, formData);

//       if (response.status === 200 || response.status === 201) {
//         toast.success(`Employee ${type}d successfully!`, { id: loadingToast });
//         setOpen(false);
//         fetchData();
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Failed to submit", {
//         id: loadingToast,
//       });
//       console.log(error);
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>
//             {type === "create" ? "Create Employee" : "Update Employee"}
//           </DialogTitle>
//           <DialogDescription>
//             Fill in the employee details below.
//           </DialogDescription>
//         </DialogHeader>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             {/* PROFILE UPLOAD */}
//             <FormField
//               control={form.control}
//               name="profile_uri"
//               render={() => (
//                 <FormItem>
//                   <FormLabel>Profile Image</FormLabel>
//                   <FormControl>
//                     <div className="flex justify-between items-center gap-4 border p-4 rounded-md">
//                       <div className="flex gap-4 items-center">
//                         <Avatar className="h-12 w-12 rounded-lg">
//                           <AvatarImage
//                             src={previewUrl ?? data?.profile_uri ?? ""}
//                             className="object-cover"
//                           />
//                           <AvatarFallback>EP</AvatarFallback>
//                         </Avatar>
//                         <div className="text-sm">
//                           <p className="font-medium">
//                             {fileName || "No file chosen"}
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             JPG, PNG, WebP up to 5MB
//                           </p>
//                         </div>
//                       </div>
//                       {fileName ? (
//                         <Button
//                           type="button"
//                           variant="destructive"
//                           size="sm"
//                           onClick={() => removeFile(files[0]?.id)}
//                         >
//                           Remove
//                         </Button>
//                       ) : (
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="sm"
//                           onClick={openFileDialog}
//                         >
//                           Upload
//                         </Button>
//                       )}
//                       <input {...getInputProps()} className="hidden" />
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* EMPLOYEE NUMBER */}
//             <FormField
//               control={form.control}
//               name="employee_number"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Employee Number</FormLabel>
//                   <FormControl>
//                     <Input placeholder="EMP-001" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="full_name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Full Name</FormLabel>
//                     <Input placeholder="John Doe" {...field} />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email Address</FormLabel>
//                     <Input
//                       type="email"
//                       placeholder="john@company.com"
//                       {...field}
//                     />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="department_id"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Department</FormLabel>
//                     <Combobox
//                       data={dataDepartment}
//                       value={field.value}
//                       onChange={field.onChange}
//                       placeholder="Select department"
//                     />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="position_id"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Position</FormLabel>
//                     <Combobox
//                       data={dataPosition}
//                       value={field.value}
//                       onChange={field.onChange}
//                       placeholder="Select position"
//                     />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="salary"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Monthly Salary</FormLabel>
//                   <CurrencyInput
//                     value={field.value}
//                     onChange={field.onChange}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="join_date"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel>Timeless Trends for You</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <FormControl>
//                         <Button
//                           variant={"outline"}
//                           className={cn(
//                             "pl-3 text-left font-normal",
//                             !field.value && "text-muted-foreground"
//                           )}
//                         >
//                           {field.value ? (
//                             format(field.value, "PPP")
//                           ) : (
//                             <span>Pick a date</span>
//                           )}
//                           <CalendarIcon className="ml-auto opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                       <Calendar
//                         mode="single"
//                         selected={field.value}
//                         onSelect={field.onChange}
//                         disabled={(date) =>
//                           date > new Date() || date < new Date("1900-01-01")
//                         }
//                       />
//                     </PopoverContent>
//                   </Popover>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* <FormField
//               control={form.control}
//               name="status"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Employment Status</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                     value={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select status" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="Active">Active</SelectItem>
//                       <SelectItem value="Inactive">Inactive</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             /> */}
//             <DialogFooter>
//               <DialogClose asChild>
//                 <Button variant="outline">Cancel</Button>
//               </DialogClose>
//             </DialogFooter>
//             <Button type="submit" disabled={form.formState.isSubmitting}>
//               {form.formState.isSubmitting
//                 ? "Processing..."
//                 : type === "create"
//                 ? "Create"
//                 : "Update"}
//             </Button>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }

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
          headers: "multipart/form-data",
        });
      } else {
        await request.put(`/user/${data.id}`, formData);
      }

      toast.success("User saved", { id: loading });
      setOpen(false);
      fetchData();
      form.reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Submit failed", {
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
