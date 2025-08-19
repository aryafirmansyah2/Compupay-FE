'use client';
import { OurLineChart } from '@/components/custom/our-chart';

import React from 'react';
import { fairDatas } from '../_data/fair-performance';
import { ChartTooltipContent } from '@/components/ui/chart';
import { useIsMobile } from '@/hooks/use-mobile';
import { OurCard, OurCardActionsDropdown } from '@/components/custom/our-card';
import { competitorRanking } from '../_data/competitor-ranking';

import CompetitorRankingList from './competitor-ranking-list';
import CompetitorRankingCarousel from './competitor-ranking-corousel';

export default function FairPerformance() {
  const isMobile = useIsMobile();
  return (
    <OurCard
      title="Fair Score Performance"
      className="col-span-full md:col-span-2"
    >
      {isMobile ? (
        <CompetitorRankingCarousel
          title="Ranking Fair Performance"
          description="List ranking fair ranking"
          data={competitorRanking}
        />
      ) : (
        <CompetitorRankingList
          title="Ranking Fair Performance"
          description="List ranking fair ranking"
          data={competitorRanking}
        />
      )}

      <OurLineChart
        chartConfig={fairDatas.chartConfig}
        data={fairDatas.data}
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
