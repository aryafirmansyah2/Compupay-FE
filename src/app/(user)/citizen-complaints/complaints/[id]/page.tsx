"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ShieldCheck,
  Check,
  BookText,
  Settings,
  FileCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StepItem } from "../type";
import VerticalTimeline from "../_components/vertical-timeline";
import StepItemCard from "../_components/step-item-card";

export default function DetailComplaint() {
  const steps: StepItem[] = [
    {
      key: "received",
      label: "Need Verification",
      content: (
        <StepItemCard
          title="Step 1: Need Verification"
          status="done"
          icon={ShieldCheck}
        >
          <div className="flex flex-col gap-4 text-balance leading-relaxed"></div>
        </StepItemCard>
      ),
      at: "07 Sep 2025, 10:12",
      status: "done",
    },
    {
      key: "triage",
      label: "Situation Verification",
      content: (
        <StepItemCard
          title="Step 2: Situation Verification"
          status="done"
          icon={Check}
        >
          <div className="flex flex-col gap-4 text-balance leading-relaxed"></div>
        </StepItemCard>
      ),
      at: "07 Sep 2025, 10:35",
      status: "done",
    },
    {
      key: "assigned",
      label: "Verification of Completeness of Files",
      content: (
        <StepItemCard
          title="Step 2: Situation Verification"
          status="done"
          icon={BookText}
        >
          <div className="flex flex-col gap-4 text-balance leading-relaxed"></div>
        </StepItemCard>
      ),
      at: "07 Sep 2025, 11:02",
      status: "current",
    },
    {
      key: "investigation",
      label: "Related OPD Process",
      content: (
        <StepItemCard
          title="Step 2: Situation Verification"
          status="done"
          icon={Settings}
        >
          <div className="flex flex-col gap-4 text-balance leading-relaxed"></div>
        </StepItemCard>
      ),
      status: "next",
    },
    {
      key: "fixing",
      label: "Completed Handling",
      content: (
        <StepItemCard
          title="Step 2: Situation Verification"
          status="done"
          icon={FileCheck}
        >
          <div className="flex flex-col gap-4 text-balance leading-relaxed"></div>
        </StepItemCard>
      ),
      status: "next",
    },
  ];

  return (
    <TooltipProvider>
      <div className="mx-auto max-w-full space-y-6 ">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Card>
            <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <Avatar className={cn(" aspect-square  w-12 h-12 ")}>
                    <AvatarImage
                      src={"avatar_url_here"}
                      alt="Avatar"
                      className={cn("border-2 border-muted rounded-full ")}
                    />
                    <AvatarFallback
                      className={cn("border-2 border-muted text-2xl")}
                    >
                      JD
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <CardTitle className="text-2xl">John Doe</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    +62 812-3456-7890 &bull; laporan#123456
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      Minta Update
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent> Kirim pengingat ke petugas </TooltipContent>
                </Tooltip>
                <Button size="sm">Tandai Selesai</Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* <HorizontalStepper steps={steps} /> */}
              {/* <Separator /> */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Linimasa</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VerticalTimeline steps={steps} />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </TooltipProvider>
  );
}
