import { OurCardCarousel } from '@/components/custom/our-card';
import React from 'react';
import SubTopicPositive from './sub-topic-positive';
import SubTopicNegative from './sub-topic-negative';
import SubTopicNetral from './sub-topic-netral';
import OurDrawer from '@/components/custom/our-drawer';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

export default function SubTopicSentimen() {
  return (
    <OurCardCarousel
      title="Sub Topic Sentimen"
      contentClassName="col-span-full md:col-span-1 "
      size={'fill'}
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
      slides={[
        <SubTopicPositive key="positive" />,
        <SubTopicNegative key="negative" />,
        <SubTopicNetral key="netral" />,
      ]}
      showDots={false}
    />
  );
}
