'use client';
import {
  SelfGrowthActionsSelect,
  SelfGrowthCard,
  SelfGrowthCardActionsDropdown,
} from '@/components/shared/self-growth/self-growth-card';
import React from 'react';
import { likesData } from '../_data/likes';
import { OurBarChart } from '@/components/custom/our-chart';
import { ChartTooltipContent } from '@/components/ui/chart';

export default function Likes() {
  return (
    <SelfGrowthCard
      title="Likes"
      period="Last Month"
      action={
        <div className="flex items-center justify-start gap-4">
          <SelfGrowthActionsSelect /> <SelfGrowthCardActionsDropdown />
        </div>
      }
      size="fill"
      className="col-span-full md:col-span-1"
      contentClassName="px-2 pb-4"
    >
      <OurBarChart
        chartConfig={likesData.chartConfig}
        data={likesData.data}
        xKey={'date'}
        xTickFormatter={(value) => {
          const date = new Date(value);
          return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });
        }}
        tooltipContent={
          <ChartTooltipContent
            cursor={false}
            labelFormatter={(value) => {
              return new Date(value).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              });
            }}
          />
        }
      />
    </SelfGrowthCard>
  );
}
