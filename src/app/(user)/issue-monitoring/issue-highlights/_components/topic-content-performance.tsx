import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import React from 'react';

import { OurCard } from '@/components/custom/our-card';
import TopicContentTable from './topic-content-table';
import { topicContentPerformance } from '../_data/topic-content-performance';
import TopicContentAction from './topic-content-action';

export default function TopicContentPerformance() {
  return (
    <OurCard
      title="Topic Content Performance"
      action={
        <Button>
          <Download /> Export
        </Button>
      }
      size="fill"
      className="col-span-full md:col-span-3"
    >
      <TopicContentAction />
      <TopicContentTable data={topicContentPerformance} />
    </OurCard>
  );
}
