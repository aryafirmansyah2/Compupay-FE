'use client';
import { OurPieChartV2 } from '@/components/custom/our-chart';

import React from 'react';
import { followersDatas } from '../_data/followers-performance';
import { OurCard, OurCardActionsDropdown } from '@/components/custom/our-card';

import { competitorRanking } from '../_data/competitor-ranking';
import CompetitorRankingCarousel from './competitor-ranking-corousel';

export default function FollowersPerformance() {
  return (
    <OurCard title="Followers" className="col-span-full md:col-span-1 ">
      <CompetitorRankingCarousel
        title="Ranking Followers"
        description="List ranking followers"
        data={competitorRanking}
      />
      <OurPieChartV2
        chartConfig={followersDatas.chartConfig}
        data={followersDatas.data}
        dataKey="value"
        nameKey="accountName"
        activeIndex={0}
      />
    </OurCard>
  );
}
