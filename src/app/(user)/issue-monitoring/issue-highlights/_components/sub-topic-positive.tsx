import { OurCard } from '@/components/custom/our-card';
import { OurHorizontalBarChart } from '@/components/custom/our-chart';
import React from 'react';
import { subTopicSentimen } from '../_data/sub-topic-sentimen';

export default function SubTopicPositive() {
  return (
    <OurCard title="Positive" size="sm">
      <OurHorizontalBarChart
        chartConfig={subTopicSentimen.positive.chartConfig}
        data={subTopicSentimen.positive.data}
        xKey="value"
        yKey="subTopic"
        margin={{ left: 10, right: 0 }}
      />
    </OurCard>
  );
}
