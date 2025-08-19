'use client';

import React from 'react';
import { likesData } from '../_data/likes';
import { OurBarChart } from '@/components/custom/our-chart';
import { ChartTooltipContent } from '@/components/ui/chart';
import { OurCard } from '@/components/custom/our-card';

export default function Likes() {
  return (
    <OurCard
      title="Likes"
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
    </OurCard>
  );
}
