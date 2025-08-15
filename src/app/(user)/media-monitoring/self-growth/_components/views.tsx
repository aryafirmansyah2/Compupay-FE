'use client';
import {
  SelfGrowthActionsSelect,
  SelfGrowthCard,
  SelfGrowthCardActionsDropdown,
} from '@/components/shared/self-growth/self-growth-card';
import React from 'react';
import { viewsData } from '../_data/views';
import { OurBarChart } from '@/components/custom/our-chart';
import { ChartTooltipContent } from '@/components/ui/chart';

export default function Views() {
  return (
    <SelfGrowthCard
      title="Views"
      period="Last Month"
      action={
        <div className="flex items-center justify-start gap-4">
          <SelfGrowthActionsSelect /> <SelfGrowthCardActionsDropdown />
        </div>
      }
      size="sm"
      className="col-span-full md:col-span-1"
    >
      <OurBarChart
        chartConfig={viewsData.chartConfig}
        data={viewsData.data}
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
