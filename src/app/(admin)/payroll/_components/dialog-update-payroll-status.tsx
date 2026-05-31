"use client";

import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import request from "@/utils/request";

type PayrollStatus = "PAID" | "CANCELED";

interface DialogUpdatePayrollStatusProps {
  children: ReactNode;
  data: any;
  fetchData: () => void;
}

export default function DialogUpdatePayrollStatus({
  children,
  data,
  fetchData,
}: DialogUpdatePayrollStatusProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<PayrollStatus>("PAID");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setStatus("PAID");
    }
  }, [open]);

  const getErrorMessage = (err: any) => {
    return (
      err?.response?.data?.errors?.message ||
      err?.response?.data?.message ||
      err?.message ||
      "Failed to update payroll status"
    );
  };

  const handleSubmit = async () => {
    const loading = toast.loading("Updating payroll status...");
    setIsSubmitting(true);

    try {
      await request.put(
        `/payroll/${data.id}`,
        {
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      toast.success(`Payroll status updated to ${status}`, {
        id: loading,
      });

      setOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(getErrorMessage(err), {
        id: loading,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPending = data?.status === "PENDING";

  const paidSelected = status === "PAID";
  const canceledSelected = status === "CANCELED";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Update Payroll Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">Payroll Reference</p>
            <p className="font-semibold">{data?.ref_no || "-"}</p>

            <p className="mt-3 text-sm text-muted-foreground">Current Status</p>
            <p className="font-semibold">{data?.status || "-"}</p>
          </div>

          {!isPending ? (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
              Payroll status can only be changed when the current status is
              PENDING.
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium">Select new status</p>

              <RadioGroup
                value={status}
                onValueChange={(value) => setStatus(value as PayrollStatus)}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                <label
                  className={[
                    "relative flex cursor-pointer items-center gap-3 rounded-md border p-4 shadow-xs transition outline-none",
                    paidSelected
                      ? "!border-green-600 border-2 bg-green-500/10"
                      : "border-input hover:!border-green-500 hover:bg-green-500/5",
                  ].join(" ")}
                >
                  <RadioGroupItem
                    value="PAID"
                    className="sr-only after:absolute after:inset-0"
                  />

                  <CheckCircle2
                    className={[
                      "h-5 w-5",
                      paidSelected ? "text-green-600" : "text-green-500",
                    ].join(" ")}
                  />

                  <div>
                    <p
                      className={[
                        "text-sm font-medium",
                        paidSelected ? "text-green-600" : "text-foreground",
                      ].join(" ")}
                    >
                      Paid
                    </p>
                    <p
                      className={[
                        "text-xs",
                        paidSelected
                          ? "text-green-600"
                          : "text-muted-foreground",
                      ].join(" ")}
                    >
                      Mark payroll as paid
                    </p>
                  </div>
                </label>

                <label
                  className={[
                    "relative flex cursor-pointer items-center gap-3 rounded-md border p-4 shadow-xs transition outline-none",
                    canceledSelected
                      ? "!border-red-600 border-2 bg-red-500/10"
                      : "border-input hover:!border-red-500 hover:bg-red-500/5",
                  ].join(" ")}
                >
                  <RadioGroupItem
                    value="CANCELED"
                    className="sr-only after:absolute after:inset-0"
                  />

                  <XCircle
                    className={[
                      "h-5 w-5",
                      canceledSelected ? "text-red-600" : "text-red-500",
                    ].join(" ")}
                  />

                  <div>
                    <p
                      className={[
                        "text-sm font-medium",
                        canceledSelected ? "text-red-600" : "text-foreground",
                      ].join(" ")}
                    >
                      Canceled
                    </p>
                    <p
                      className={[
                        "text-xs",
                        canceledSelected
                          ? "text-red-600"
                          : "text-muted-foreground",
                      ].join(" ")}
                    >
                      Cancel this payroll
                    </p>
                  </div>
                </label>
              </RadioGroup>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          {isPending && (
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Saving..." : "Update Status"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
