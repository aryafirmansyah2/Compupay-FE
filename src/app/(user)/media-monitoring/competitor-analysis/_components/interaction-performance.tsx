'use client';
import { OurBarChartV2 } from '@/components/custom/our-chart';

import React from 'react';
import { interactionDatas } from '../_data/interaction-performance';
import { OurCard, OurCardActionsDropdown } from '@/components/custom/our-card';

import { competitorRanking } from '../_data/competitor-ranking';
import CompetitorRankingCarousel from './competitor-ranking-corousel';

export default function InteractionPerformance() {
  return (
    <OurCard title="Interaction" className="col-span-full md:col-span-1 ">
      <CompetitorRankingCarousel
        title="Ranking Interaction"
        description="List ranking interaction"
        data={competitorRanking}
      />
      <OurBarChartV2
        chartConfig={interactionDatas.chartConfig}
        data={interactionDatas.data}
        xKey="accountName"
      />
    </OurCard>
  );
}
