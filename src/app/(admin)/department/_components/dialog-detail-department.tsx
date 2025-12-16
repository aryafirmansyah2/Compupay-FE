"use client";
import { formatCurrency } from "@/components/ui/currency-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface StepItemCardProps {
  children: React.ReactNode;
  data?: any;
}

export default function DialogDetailDepartment({
  children,
  data,
}: StepItemCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Department detail</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <p className="text-sm ">Department Info</p>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <p className="text-muted-foreground text-xs">Name</p>
              <small className="text-sm leading-none font-medium">
                {data?.name}
              </small>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Range salary </p>
              <small className="text-sm leading-none font-medium">
                {`Rp ${formatCurrency(
                  data?.start_salary
                )} - Rp ${formatCurrency(data?.end_salary)}
                `}
              </small>
            </div>
            <div className="col-span-full">
              <p className="text-muted-foreground text-xs">Description </p>
              <small className="text-sm leading-none font-medium">
                {data?.description || "-"}
              </small>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
