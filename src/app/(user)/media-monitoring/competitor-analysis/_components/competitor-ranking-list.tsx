'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { CompetitorRankingType } from '../type';
import { CompetitorRankingItem } from './competitor-ranking-item';
import OurDrawer from '@/components/custom/our-drawer';

interface CompetitorRankingListProps {
  title: string;
  description: string;
  data: CompetitorRankingType[];
}

export default function CompetitorRankingList({
  title,
  description,
  data,
}: CompetitorRankingListProps) {
  const top3 = data.slice(0, 3);
  return (
    <div className="flex items-center justify-between  gap-4">
      <div className="flex items-center gap-4 w-full overflow-scroll scrollbar-hide">
        {top3.length &&
          top3.map((item, index) => (
            <CompetitorRankingItem
              key={index}
              account={item.account}
              avatar={item.avatar}
              score={item.score}
              index={index}
            />
          ))}
      </div>
      <OurDrawer
        action={
          <Button variant="outline" size="icon">
            <ChevronRight />
          </Button>
        }
        // tooltip="Show All"
        title={title}
        description={description}
        onSubmit={() => {}}
        submitButtonText="Submit"
        doneButtonText="Done"
      >
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-190px)] px-4">
          {data.map((item, index) => (
            <CompetitorRankingItem
              key={index}
              account={item.account}
              avatar={item.avatar}
              score={item.score}
              index={index}
            />
          ))}
        </div>
      </OurDrawer>
    </div>
  );
}
