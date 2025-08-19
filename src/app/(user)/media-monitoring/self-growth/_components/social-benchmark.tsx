'use client';

import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { socialBenchmark } from '../_data/social-benchmark';
import { OurBarChart } from '@/components/custom/our-chart';
import { ChartTooltipContent } from '@/components/ui/chart';
import { OurCardActionsTabs, OurCardTabs } from '@/components/custom/our-card';

export default function SocialBenchmark() {
  const options = [
    { label: 'engagement', value: 'engagement' },
    { label: 'awareness', value: 'awareness' },
    { label: 'convorsation', value: 'convorsation' },
  ];
  const [tab, setTab] = React.useState(options[0].value);

  return (
    <OurCardTabs
      title="Social Benchmark"
      defaultValueTabs="engagement"
      action={
        <div className="flex items-center justify-start gap-4">
          <OurCardActionsTabs options={options} value={tab} onChange={setTab} />
        </div>
      }
      size="fill"
      className="col-span-full md:col-span-2"
    >
      <TabsContent value="engagement">
        <OurBarChart
          chartConfig={socialBenchmark.engagementMatric.chartConfig}
          data={socialBenchmark.engagementMatric.data}
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
      </TabsContent>

      <TabsContent value="awareness" className="flex flex-col ">
        <OurBarChart
          chartConfig={socialBenchmark.awarenessMatric.chartConfig}
          data={socialBenchmark.awarenessMatric.data}
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
      </TabsContent>

      <TabsContent value="convorsation" className="flex flex-col ">
        <OurBarChart
          chartConfig={socialBenchmark.convorsationMatric.chartConfig}
          data={socialBenchmark.convorsationMatric.data}
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
      </TabsContent>
    </OurCardTabs>
  );
}
