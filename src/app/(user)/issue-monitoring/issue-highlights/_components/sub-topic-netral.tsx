import { OurCard } from '@/components/custom/our-card';
import { OurHorizontalBarChart } from '@/components/custom/our-chart';
import React from 'react';
import { subTopicSentimen } from '../_data/sub-topic-sentimen';

export default function SubTopicNetral() {
  return (
    <OurCard title="Netral" size="sm">
      <OurHorizontalBarChart
        chartConfig={subTopicSentimen.netral.chartConfig}
        data={subTopicSentimen.netral.data}
        xKey="value"
        yKey="subTopic"
        margin={{ left: 10, right: 0 }}
      />
    </OurCard>
  );
}
