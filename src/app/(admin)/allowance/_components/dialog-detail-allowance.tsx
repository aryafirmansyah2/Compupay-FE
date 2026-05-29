"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface StepItemCardProps {
  children: React.ReactNode;
  data: any;
}

export default function DialogDetailAllowance({
  children,
  data,
}: StepItemCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Allowance detail</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <p className="text-sm ">Allowance Info</p>
          {/* <div className="grid grid-cols-2 gap-4 "> */}
          <div>
            <p className="text-muted-foreground text-xs">Allowance</p>
            <small className="text-sm leading-none font-medium">
              {data?.allowance}
            </small>
          </div>
          <div className="col-span-full">
            <p className="text-muted-foreground text-xs">Description </p>
            <small className="text-sm leading-none font-medium">
              {data?.description}
            </small>
          </div>
          {/* </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
