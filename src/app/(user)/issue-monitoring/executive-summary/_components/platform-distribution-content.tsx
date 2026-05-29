'use client';
import { OurCard } from '@/components/custom/our-card';
import { OurHorizontalBarChart } from '@/components/custom/our-chart';
import OurDrawer from '@/components/custom/our-drawer';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import React from 'react';
import { platformDistribution } from '../_data/platform-distribution';

export default function PlatformDistributionContent() {
  return (
    <OurCard
      title="Platform Distribution"
      action={
        <OurDrawer
          direction="bottom"
          action={
            <Button variant="ghost" size="icon" className="-mt-2 -me-2">
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
      <OurHorizontalBarChart
        chartConfig={platformDistribution.chartConfig}
        data={platformDistribution.data}
        xKey="value"
        yKey="platform"
        margin={{ left: 10, right: 0 }}
      />
    </OurCard>
  );
}
