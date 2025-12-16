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

export default function DialogDetailPosition({ children }: StepItemCardProps) {
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
        {/* <div className="flex justify-between gap-4 border p-4 rounded-md">
          <div className="flex gap-4 ">
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarImage src={"assets/images/user-1.png"} alt={"arya"} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{"Arya Firmansyah"}</span>
              <span className="text-muted-foreground truncate text-xs">
                {"aryafirmansyah@gmail.com"}
              </span>
            </div>
          </div>
          <Badge className="px-2.5 py-1.5 rounded-full bg-primary/10 border-primary text-primary">
            {"Active"}
          </Badge>
        </div> */}
        <div className="flex flex-col gap-6">
          <p className="text-sm ">Department Info</p>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <p className="text-muted-foreground text-xs">Name</p>
              <small className="text-sm leading-none font-medium">
                Production
              </small>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Range salary </p>
              <small className="text-sm leading-none font-medium">
                Rp 12,000,000 - Rp 15,000,000
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
