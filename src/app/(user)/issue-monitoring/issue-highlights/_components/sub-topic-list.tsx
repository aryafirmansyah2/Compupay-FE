import { OurCard } from '@/components/custom/our-card';
import React from 'react';
import { subTopic } from '../_data/sub-topic';
import { SubTopicItem } from './sub-topic-item';

export default function SubTopicList() {
  return (
    <OurCard title="Sub Topic List">
      <div className="flex flex-col justify-start gap-4 overflow-scroll">
        {subTopic &&
          subTopic.map((item, index) => (
            <SubTopicItem
              key={index}
              subTopic={item.subTopic}
              countMantions={item.countMantions}
              index={index}
            />
          ))}
      </div>
    </OurCard>
  );
}
