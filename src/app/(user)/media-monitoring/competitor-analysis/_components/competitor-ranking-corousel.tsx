'use client';

import { useDirection } from '@radix-ui/react-direction';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CompetitorRankingType } from '../type';
import { CompetitorRankingItem } from './competitor-ranking-item';
import OurDrawer from '@/components/custom/our-drawer';

interface CompetitorRankingCarouselProps {
  title: string;
  description: string;
  data: CompetitorRankingType[];
}

export default function CompetitorRankingCarousel({
  title,
  description,
  data,
}: CompetitorRankingCarouselProps) {
  const direction = useDirection();

  const top3 = data.slice(0, 3);

  return (
    <div className="flex items-center justify-between gap-4">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2500,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        opts={{
          align: 'center',
          loop: true,
          direction,
        }}
        className="w-full flex items-center justify-between gap-4"
      >
        <CarouselContent className="flex-1">
          {top3.length &&
            top3.map((item, index) => (
              <CarouselItem key={index}>
                <CompetitorRankingItem
                  account={item.account}
                  avatar={item.avatar}
                  score={item.score}
                  index={index}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <OurDrawer
          action={
            <Button variant="outline" size="icon">
              <ChevronRight />
            </Button>
          }
          // tooltip="Show All"
          title={title}
          description={description}
          onSubmit={() => {}}
          submitButtonText="Submit"
          doneButtonText="Done"
        >
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-190px)] px-4">
            {data.map((item, index) => (
              <CompetitorRankingItem
                key={index}
                account={item.account}
                avatar={item.avatar}
                score={item.score}
                index={index}
              />
            ))}
          </div>
        </OurDrawer>
      </Carousel>
    </div>
  );
}
