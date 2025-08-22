import { OurCardCarousel } from '@/components/custom/our-card';
import React from 'react';
import SubTopicPositive from './sub-topic-positive';
import SubTopicNegative from './sub-topic-negative';
import SubTopicNetral from './sub-topic-netral';

export default function SubTopicSentimen() {
  return (
    <OurCardCarousel
      title="Sub Topic Sentimen"
      contentClassName="col-span-full md:col-span-1 "
      size={'fill'}
      slides={[
        <SubTopicPositive key="positive" />,
        <SubTopicNegative key="negative" />,
        <SubTopicNetral key="netral" />,
      ]}
      showDots={false}
    />
  );
}
