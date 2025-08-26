'use client';
import { OurCard } from '@/components/custom/our-card';
import {
  OurChartLegendContent,
  OurPieChart,
} from '@/components/custom/our-chart';
import OurDrawer from '@/components/custom/our-drawer';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import React from 'react';
import { globalSentiment } from '../_data/global-sentiment';
import { Card } from '@/components/ui/card';
import { formatValue } from '@/lib/utils';

export default function GlobalSentiment() {
  return (
    <OurCard
      title="Global Sentiment"
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
      <div className="h-full flex items-center">
        <div className="flex-1 h-full max-w-96 w-full ">
          <OurPieChart
            chartConfig={globalSentiment.chartConfig}
            data={globalSentiment.data}
            dataKey="value"
            nameKey="sentimen"
            innerRadius={60}
            showLegend={false}
          />
        </div>
        <div className="">
          {globalSentiment.data &&
            globalSentiment.data.map((item, index) => (
              <Card
                key={index}
                className={`p-4 flex flex-col items-start space-x-4 border-none bg-transparent`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-1.5 h-3 rounded-full`}
                    style={{ backgroundColor: item.fill }}
                  />
                  <div className="text-base text-foreground ">
                    {item.sentimen}
                  </div>
                </div>

                <div className="text-xl font-semibold flex items-center gap-2">
                  {formatValue(item.value, 'regular')}
                  <span className="text-sm text-muted-foreground font-normal">
                    mentions
                  </span>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </OurCard>
  );
}
