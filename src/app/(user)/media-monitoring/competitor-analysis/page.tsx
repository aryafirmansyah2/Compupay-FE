// app/(route)/competitor-analysis/page.tsx
'use client';
import React from 'react';
import TabsUnderlined, { TabItem } from '@/components/custom/our-tabs';
import CompetitorAnalysis from './_components/competitor-analysis';

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
      <TabsUnderlined tabs={tabs} />
    </section>
  );
}
