'use client';
import { OurRadarChart } from '@/components/custom/our-chart';

import React from 'react';
import { activityDatas } from '../_data/activity-performance copy';
import { OurCard, OurCardActionsDropdown } from '@/components/custom/our-card';

import { competitorRanking } from '../_data/competitor-ranking';
import CompetitorRankingCarousel from './competitor-ranking-corousel';

export default function ActivityPerformance() {
  return (
    <OurCard title="Activity" className="col-span-full md:col-span-1 ">
      <CompetitorRankingCarousel
        title="Ranking Activity"
        description="List ranking activity"
        data={competitorRanking}
      />
      <OurRadarChart
        chartConfig={activityDatas.chartConfig}
        data={activityDatas.data}
        dataKey="accountName"
      />
    </OurCard>
  );
}
