"use client";

import { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  Dialog,
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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import request from "@/utils/request";

const formSchema = z.object({
  type: z.enum(["CHECK_IN", "CHECK_OUT"]),
  latitude: z.string(),
  longitude: z.string(),
  accuracy: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function DialogFormAttendance({
  children,
  type,
  fetchData,
}: any) {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        form.setValue(
          "latitude",
          position.coords.latitude.toString()
        );

        form.setValue(
          "longitude",
          position.coords.longitude.toString()
        );

        form.setValue(
          "accuracy",
          Math.round(
            position.coords.accuracy
          ).toString()
        );
      },

      (error) => {
        console.error(error);

        toast.error(
          "Failed to get location"
        );
      }
    );
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "CHECK_IN",
      latitude: "",
      longitude: "",
      accuracy: "5",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const loading = toast.loading("Saving attendance...");

    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // 🔥 waktu device
      formData.append("datetime_log", new Date().toISOString());

      if (photo) {
        formData.append("photo", photo);
      }

      await request.post("/attendance", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Attendance saved", {
        id: loading,
      });

      fetchData();

      setOpen(false);

      form.reset();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to save attendance",
        {
          id: loading,
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "create"
              ? "Create Attendance"
              : "Update Attendance"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>

                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded-md p-2"
                    >
                      <option value="CHECK_IN">
                        CHECK IN
                      </option>

                      <option value="CHECK_OUT">
                        CHECK OUT
                      </option>
                    </select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accuracy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accuracy</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <label className="text-sm font-medium">
                Photo
              </label>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPhoto(
                    e.target.files?.[0] || null
                  )
                }
              />
            </div>

            <DialogFooter>
              <Button type="submit">
                Save Attendance
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}