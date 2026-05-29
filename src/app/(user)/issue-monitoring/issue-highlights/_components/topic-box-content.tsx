"use client";
import { OurCard, OurCardActionsDropdown } from "@/components/custom/our-card";
import { OurToggle } from "@/components/custom/our-toggle";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { CalendarDatePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { cn, formatValue } from "@/lib/utils";
import { File, Search } from "lucide-react";
import React from "react";
import SubTopicPositive from "./sub-topic-positive";
import SubTopicNegative from "./sub-topic-negative";
import SubTopicNetral from "./sub-topic-netral";
import SubTopicSentimen from "./sub-topic-sentimen";
import TopicSentimen from "./topic-sentimen";
import SubTopicList from "./sub-topic-list";

import TopicContentPerformance from "./topic-content-performance";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TopicBoxContent() {
  const [toggleProxy, setToggleProxy] = React.useState("opposition");

  return (
    <OurCard
      title="Pemerintahan"
      className="h-[calc(100vh-150px)] "
      size="fill"
      contentClassName="p-0   "
    >
      <ScrollArea className="h-[calc(100vh-240px)] w-full ">
        <div className="grid grid-cols-2 gap-4 px-6">
          <TopicSentimen />
          <SubTopicList />
          <div className="col-span-full grid grid-cols-1 gap-4">
            <SubTopicSentimen />
          </div>
          <div className="col-span-full grid grid-cols-1 gap-4">
            <TopicContentPerformance />
          </div>
        </div>
      </ScrollArea>
    </OurCard>
  );
}
