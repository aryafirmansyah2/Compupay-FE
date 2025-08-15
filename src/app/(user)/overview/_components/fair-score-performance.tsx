'use client';
import React from 'react';
import { fairDatas } from '../_data/fair-score';
import { OurCard, OurCardActionsDropdown } from '@/components/custom/our-card';
import { ChartTooltipContent } from '@/components/ui/chart';
import { OurLineChart } from '@/components/custom/our-chart';

export default function FairScorePerformance() {
  return (
    <OurCard
      title="Fair Score Performance"
      period="Last 30 days"
      action={<OurCardActionsDropdown />}
      className="col-span-full"
    >
      <OurLineChart
        chartConfig={fairDatas.chartConfig}
        data={fairDatas.data}
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
    </OurCard>
  );
}
