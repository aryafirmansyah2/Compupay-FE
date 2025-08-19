'use client';
import { OurHorizontalBarChart } from '@/components/custom/our-chart';

import React from 'react';
import { responsiveDatas } from '../_data/responsive-performance';
import { OurCard, OurCardActionsDropdown } from '@/components/custom/our-card';
import { competitorRanking } from '../_data/competitor-ranking';
import CompetitorRankingCarousel from './competitor-ranking-corousel';

export default function ResponsivePerformance() {
  return (
    <OurCard title="Responsive" className="col-span-full md:col-span-1 ">
      <CompetitorRankingCarousel
        title="Ranking Responsive"
        description="List ranking responsive"
        data={competitorRanking}
      />
      <OurHorizontalBarChart
        chartConfig={responsiveDatas.chartConfig}
        data={responsiveDatas.data}
        xKey="value"
        yKey="accountName"
        margin={{ left: 0, right: 20 }}
      />
    </OurCard>
  );
}
