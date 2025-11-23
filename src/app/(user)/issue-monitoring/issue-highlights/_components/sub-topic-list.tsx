import { OurCard } from "@/components/custom/our-card";
import React from "react";
import { subTopic } from "../_data/sub-topic";
import { SubTopicItem } from "./sub-topic-item";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SubTopicList() {
  return (
    <OurCard title="Sub Topic List">
      <ScrollArea className="h-[calc(100vh-600px)]">
        <div className="flex flex-col justify-start gap-4 pr-4">
          {subTopic &&
            subTopic.map((item, index) => (
              <SubTopicItem
                key={index}
                subTopic={item.subTopic}
                countMantions={item.countMantions}
                index={index}
              />
            ))}
        </div>
      </ScrollArea>
    </OurCard>
  );
}
