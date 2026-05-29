import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TagsInput from "@/components/ui/tags-input";
import InputFile from "@/components/ui/input-file";
import { max } from "date-fns";
import { formatFileSize } from "@/lib/utils";

const formSchema = z.object({
  disposedTo: z.array(z.string()).min(1, {
    message: "Please enter at least one tracking ID.",
  }),
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
  file: z
    .instanceof(File)
    .optional()
    .refine((file) => file !== undefined, {
      message: "Please upload a valid file.",
    }), // Menambahkan validasi untuk file
});

export default function OpdProcess() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      disposedTo: ["Dishub", "DLH"],
      status: "",
      file: undefined, // Menambahkan nilai default untuk file
    },
  });
  const watchValues = form.watch(); // Menonton seluruh nilai form
  console.log(watchValues);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleFileUpload = (file: File) => {
    console.log("File uploaded:", file.name);
    // Lakukan sesuatu dengan file yang diupload
  };

  // Menentukan jenis file yang valid (misalnya hanya .csv dan .txt)
  const validTypes = ["text/csv", "text/plain"];
  const maxSize = 10 * 1024 * 1024; // 10MB
  return (
    <div className="flex flex-col gap-4 text-balance leading-relaxed">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="disposedTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Disposed To</FormLabel>
                <FormControl>
                  <TagsInput
                    value={field.value ?? []} // split for handling array value
                    onChange={(tags) => field.onChange(tags)} // join the array back into a comma-separated string
                  />
                </FormControl>
                <FormDescription>You can add more than one OPD</FormDescription>
                <FormMessage>{}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Disposed To</FormLabel>
                <FormControl>
                  <InputFile
                    onFileUpload={handleFileUpload} // Fungsi untuk menangani file upload
                    validFileTypes={[
                      "text/csv",
                      "application/vnd.ms-excel",
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    ]} // Tipe file yang valid
                    field={field} // Field dari react-hook-form
                    label="Upload your file"
                    description="You can upload CSV or Excel files (max 10MB)." // Optional description
                  />
                </FormControl>
                <FormDescription>
                  <div className="flex justify-between">
                    <p>Accepted file types: {validTypes.join(", ")}</p>
                    <p>Max. size: {formatFileSize(maxSize)}</p>
                  </div>
                </FormDescription>

                <FormMessage>{}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select {...field}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Awaiting Processing by the Relevant OPD">
                      Awaiting Processing by the Relevant OPD
                    </SelectItem>
                    <SelectItem value="Currently Being Processed by the Relevant OPD">
                      Currently Being Processed by the Relevant OPD
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
