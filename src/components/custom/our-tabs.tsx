// components/custom/our-tabs.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardDescription, CardTitle } from "../ui/card";
import { TabItem } from "@/types/types";
import { ReactNode } from "react";
export interface TabsUnderlinedProps {
  title?: string;
  period?: string;
  action?: ReactNode;
  tabs: TabItem[]; // <-- bukan string lagi
}

export default function TabsUnderlined({
  title,
  period,
  action,
  tabs,
}: TabsUnderlinedProps) {
  return (
    <Tabs defaultValue={tabs[0]?.value} className="w-full flex flex-col gap-4">
      {title && period && action && (
        <div className="flex justify-between py-4">
          <div className="space-y-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            {period && <CardDescription>{period}</CardDescription>}
          </div>

          <div className="flex gap-2 items-center">{action}</div>
        </div>
      )}

      <TabsList className="w-full p-0 bg-transparent justify-start border-0 border-b rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-none bg-transparent h-full data-[state=active]:shadow-none border-0 border-b-2 border-transparent data-[state=active]:border-foreground dark:data-[state=active]:border-primary max-w-[100px] w-full"
          >
            <span className="text-[13px]">{tab.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
