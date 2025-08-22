import { OurCard, OurCardActionsDropdown } from '@/components/custom/our-card';
import { OurPieChart } from '@/components/custom/our-chart';
import React from 'react';
import { topicSentimen } from '../_data/topic-sentimen';
import ContentInsight from './content-insight';
import OurDrawer from '@/components/custom/our-drawer';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

export default function TopicSentimen() {
  return (
    <OurCard
      title="Topic Sentimen"
      action={
        <OurDrawer
          direction="bottom"
          action={
            <Button variant="ghost" size="icon">
              <Brain />
            </Button>
          }
          tooltip="Insight"
          title="Insight Topic Sentiment"
          description="Set your daily activity goal."
          doneButtonText="Close"
          contentClassName="mx-auto w-full max-w-sm"
        >
          <p className="text-justify">
            Tingginya sentimen positif menunjukkan apresiasi publik terhadap
            langkah pemerintah, termasuk ajakan Wamen LH untuk menanam mangrove
            dan menjaga lingkungan. Ini menjadi modal penting dalam memperkuat
            kepercayaan masyarakat.
            <br /> <br />
            Sentimen negatif menjadi sinyal perlunya evaluasi terhadap
            pelaksanaan dan komunikasi kebijakan agar tidak menimbulkan
            ketidakpuasan lebih luas. <br /> <br />
            Sementara itu, sentimen netral mencerminkan peliputan informatif
            seputar agenda pemerintahan yang bersifat rutin dan resmi.
          </p>
        </OurDrawer>
      }
    >
      <OurPieChart
        chartConfig={topicSentimen.chartConfig}
        data={topicSentimen.data}
        dataKey="value"
        nameKey="sentimen"
        innerRadius={60}
      />
    </OurCard>
  );
}
