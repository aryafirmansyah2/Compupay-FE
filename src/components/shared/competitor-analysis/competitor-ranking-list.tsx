import React from 'react';
import { CompetitorRankingTop3 } from './competitor-ranking-top3';
import { Button } from '@/components/ui/button';
import { AlignJustify, ChevronRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function CompetitorRankingList() {
  return (
    <div className="flex items-center justify-between  gap-4">
      <div className="flex items-center gap-4 w-full overflow-scroll scrollbar-hide">
        <CompetitorRankingTop3 index={0} />
        <CompetitorRankingTop3 index={1} />
        <CompetitorRankingTop3 index={2} />
      </div>
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
    </div>
  );
}
