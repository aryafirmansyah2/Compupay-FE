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
  CircleUserRound,
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
import { InfoItem, StepItem } from "../type";
import VerticalTimeline from "../_components/vertical-timeline";
import StepItemCard from "../_components/step-item-card";
import InfoComplaint from "./_components/info/info-complaint";
import TabsUnderlined from "@/components/custom/our-tabs";
import { TabItem } from "@/types/types";
import { useForm } from "react-hook-form";
import ReproterDetails from "./_components/info/reproter-details";
import AdminDetails from "./_components/info/admin-details";
import ComplaintDetails from "./_components/info/complaint-details";
import ChatComplaints from "./_components/chat/chat-reproter";
import NeedVerification from "./_components/action/need-verification";
import VerifySituation from "./_components/action/verify-situation";
import FileVerification from "./_components/action/file-verification";
import OpdProcess from "./_components/action/opd-process";

export default function DetailComplaint() {
  const form = useForm();

  const info: InfoItem[] = [
    {
      key: "received",
      label: "Need Verification",
      content: (
        <StepItemCard
          title="Admin Details"
          status="done"
          icon={ShieldCheck}
          isOpen
        >
          <AdminDetails />
        </StepItemCard>
      ),
    },
    {
      key: "triage",
      label: "Situation Verification",
      content: (
        <StepItemCard
          title="Reporter Details"
          status="done"
          icon={Check}
          isOpen
        >
          <ReproterDetails />
        </StepItemCard>
      ),
    },
    {
      key: "assigned",
      label: "Verification of Completeness of Files",
      content: (
        <StepItemCard
          title="Complaint Details - (645563661645)"
          status="done"
          icon={BookText}
          isOpen
        >
          <ComplaintDetails />
        </StepItemCard>
      ),
    },
  ];
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
          <NeedVerification />
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
          <VerifySituation />
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
          <FileVerification />
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
          <OpdProcess />
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
  const tabs: TabItem[] = [
    {
      name: "Info",
      value: "Info",
      content: (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
          <InfoComplaint info={info} />
        </div>
      ),
    },
    {
      name: "Action",
      value: "Action",
      content: (
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
      ),
    },
    {
      name: "Chat",
      value: "Chat",
      content: (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
          <ChatComplaints />
        </div>
      ),
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
            <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between h-full">
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
              <TabsUnderlined tabs={tabs} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </TooltipProvider>
  );
}
