"use client";
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

export default function DialogDetailSalarySlip({
  children,
  data,
}: StepItemCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>salary-slip detail</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <p className="text-sm ">salary-slip Info</p>
          <div className="grid grid-cols-1 gap-4 ">
            <div>
              <p className="text-muted-foreground text-xs">Name</p>
              <small className="text-sm leading-none font-medium">
                {/* {data?.name} */}
              </small>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Department </p>
              <small className="text-sm leading-none font-medium">
                {/* {data?.department?.name} */}
              </small>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
