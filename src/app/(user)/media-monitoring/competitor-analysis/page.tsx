// app/(route)/competitor-analysis/page.tsx
'use client';
import React from 'react';
import TabsUnderlined from '@/components/custom/our-tabs';
import CompetitorAnalysis from './_components/competitor-analysis';
import { TabItem } from '@/types/types';
import { CalendarDatePicker } from '@/components/ui/date-range-picker';
import { OurCardActionsDropdown } from '@/components/custom/our-card';
import { Download, Icon, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CompetitorAnalysisPage() {
  const tabs: TabItem[] = [
    { name: 'Instagram', value: 'Instagram', content: <CompetitorAnalysis /> },
    { name: 'Tiktok', value: 'Tiktok', content: <CompetitorAnalysis /> },
    { name: 'Facebook', value: 'Facebook', content: <CompetitorAnalysis /> },
    { name: 'News', value: 'News', content: <CompetitorAnalysis /> },
    { name: 'X', value: 'X', content: <CompetitorAnalysis /> },
  ];

  return (
    <section className="w-full">
      <TabsUnderlined
        title="Competitor Analysis"
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
