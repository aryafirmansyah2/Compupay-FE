import { OurCard } from '@/components/custom/our-card';
import { OurHorizontalBarChart } from '@/components/custom/our-chart';
import React from 'react';
import { subTopicSentimen } from '../_data/sub-topic-sentimen';

export default function SubTopicNegative() {
  return (
    <OurCard title="Negative" size="sm">
      <OurHorizontalBarChart
        chartConfig={subTopicSentimen.negative.chartConfig}
        data={subTopicSentimen.negative.data}
        xKey="value"
        yKey="subTopic"
        margin={{ left: 10, right: 0 }}
      />
    </OurCard>
  );
}
