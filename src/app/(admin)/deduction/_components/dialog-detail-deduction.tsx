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
}

export default function DialogDetailAllowance({ children }: StepItemCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Allowance detail</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <p className="text-sm ">Allowance Info</p>
          {/* <div className="grid grid-cols-2 gap-4 "> */}
          <div>
            <p className="text-muted-foreground text-xs">Allowance</p>
            <small className="text-sm leading-none font-medium">
              Production
            </small>
          </div>
          <div className="col-span-full">
            <p className="text-muted-foreground text-xs">Description </p>
            <small className="text-sm leading-none font-medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </small>
          </div>
          {/* </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
