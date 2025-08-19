'use client';

import React from 'react';
import { viewsData } from '../_data/views';
import { OurBarChart } from '@/components/custom/our-chart';
import { ChartTooltipContent } from '@/components/ui/chart';
import { OurCard } from '@/components/custom/our-card';

export default function Views() {
  return (
    <OurCard title="Views" size="sm" className="col-span-full md:col-span-1">
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
    </OurCard>
  );
}
