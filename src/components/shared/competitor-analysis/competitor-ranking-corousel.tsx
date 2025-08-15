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
import { CompetitorRankingTop3 } from './competitor-ranking-top3';

export function CompetitorRankingCarousel() {
  const direction = useDirection();

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
          <CarouselItem>
            <CompetitorRankingTop3 index={0} />
          </CarouselItem>
          <CarouselItem>
            <CompetitorRankingTop3 index={1} />
          </CarouselItem>
          <CarouselItem>
            <CompetitorRankingTop3 index={2} />
          </CarouselItem>
        </CarouselContent>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={'outline'} size={'icon'} className="">
              <ChevronRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Show All</p>
          </TooltipContent>
        </Tooltip>
      </Carousel>
    </div>
  );
}
