import { ContentPerformanceCard } from '@/components/shared/content-performance/content-performance-card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import React from 'react';
import ActionTable from './action-table';
import { contentPerformance } from '../_data/content-performance';
import ContentPerformanceTable from './content-performance-table';

export default function ContentPerformanceReport() {
  return (
    <ContentPerformanceCard
      title="Content Performance"
      action={
        <Button>
          <Download /> Export
        </Button>
      }
      size="fill"
      className="col-span-full md:col-span-3"
    >
      <ActionTable />
      <ContentPerformanceTable data={contentPerformance} />
    </ContentPerformanceCard>
  );
}
