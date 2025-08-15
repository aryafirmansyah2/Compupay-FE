import { Button } from '@/components/ui/button';
import { SocialMediaRankingType } from '../type';
import { SocialMediaRankingItem } from './social-media-ranking-item';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function SocialMediaRankingList({
  data,
}: {
  data: SocialMediaRankingType[];
}) {
  return (
    <div className="flex flex-col justify-between gap-4 h-full">
      <ul className="flex flex-col justify-between h-full">
        {data.map((item, index) => (
          <SocialMediaRankingItem
            key={item.accountName + index}
            data={item}
            index={index}
          />
        ))}
      </ul>
      <Link href="#">
        <Button
          variant={'default'}
          className="w-full flex items-center font-medium"
        >
          See All
          <ChevronRight />
        </Button>
      </Link>
    </div>
  );
}
