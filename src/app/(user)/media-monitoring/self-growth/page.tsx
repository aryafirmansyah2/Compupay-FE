'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, SlidersHorizontal } from 'lucide-react';
import { OurCardActionsDropdown } from '@/components/custom/our-card';
import { CalendarDatePicker } from '@/components/ui/date-range-picker';
import TabsUnderlined from '@/components/custom/our-tabs';
import { TabItem } from '@/types/types';
import SelfGrowth from './_components/self-growth';

export default function SelfGrowthPage() {
  const tabs: TabItem[] = [
    { name: 'Instagram', value: 'Instagram', content: <SelfGrowth /> },
    { name: 'Tiktok', value: 'Tiktok', content: <SelfGrowth /> },
    { name: 'Facebook', value: 'Facebook', content: <SelfGrowth /> },
    { name: 'News', value: 'News', content: <SelfGrowth /> },
    { name: 'X', value: 'X', content: <SelfGrowth /> },
  ];

  return (
    <section className="w-full">
      <TabsUnderlined
        title="Self Growth"
        period="Saturday, December 24, 2025"
        tabs={tabs}
        action={
          <div className="flex gap-2">
            <CalendarDatePicker
              align="end"
              date={{ to: new Date(), from: new Date() }}
              onDateSelect={({ from, to }) => {}}
              variant="outline"
            />
            <OurCardActionsDropdown
              className="m-0"
              variant="outline"
              size="default"
              icon={SlidersHorizontal}
              label="Filters"
            />
            <Button variant="default">
              <Download /> Export
            </Button>
          </div>
        }
      />
    </section>
  );
}
