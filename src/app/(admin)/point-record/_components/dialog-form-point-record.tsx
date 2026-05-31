"use client";

import { ReactNode, useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
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
import request from "@/utils/request";
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import type { PointRecord } from "@/types/pointRecordTypes";

const formSchema = z.object({
  point: z.coerce.number().refine((value) => value === 0 || value === 1, {
    message: "Point must be 0 or 1",
  }),
});

type FormValues = {
  point: number;
};

interface Props {
  type: "update";
  children: ReactNode;
  data: PointRecord;
  fetchData: () => void;
}

export default function DialogFormPointRecord({
  type,
  children,
  data,
  fetchData,
}: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      point: Number(data?.point ?? 0),
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        point: Number(data?.point ?? 0),
      });
    }
  }, [open, data, form]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const loading = toast.loading("Saving point record...");

    try {
      await request.put(
        `/pointRecord/${data.id}`,
        {
          point: Number(values.point),
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      toast.success("Point record updated", { id: loading });
      setOpen(false);
      fetchData();
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Failed to update point record"), {
        id: loading,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>
            {type === "update" ? "Update Point Record" : "Point Record"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="point"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Point</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={1}
                      placeholder="0"
                      value={field.value ?? 0}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
