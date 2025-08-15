import { OurPieChart } from '@/components/custom/our-chart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChartProps } from '@/types/types';
import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface ProxyItemProps {
  avatar: string;
  account: string;
  platform: string;
  link: string;
  data: ChartProps;
  dataKey: string;
  namekey: string;
  index: number;
}

const avatarColor = [
  'border-yellow-400 dark:border-yellow-500',
  'border-gray-300 dark:border-gray-400',
  'border-amber-600 dark:border-amber-700',
];

const badgeColor = [
  'bg-yellow-400 dark:bg-yellow-500',
  'bg-gray-300 dark:bg-gray-400',
  'bg-amber-600 dark:bg-amber-700',
];

export default function ProxyItem({
  avatar,
  account,
  platform,
  link,
  data,
  dataKey,
  namekey,
  index,
}: ProxyItemProps) {
  return (
    <div key="slide-1" className="flex flex-col w-full h-full mt-2">
      <div className=" flex gap-3 items-center">
        <div className="relative">
          <Avatar className={cn(' aspect-square rounded-sm')}>
            <AvatarImage
              src={avatar}
              alt="Avatar"
              className={cn(
                'border-2 border-muted rounded-sm',
                index >= 0 && index <= 2 && avatarColor[index]
              )}
            />
            <AvatarFallback
              className={cn(
                'border-2 border-muted',
                index >= 0 && index <= 2 && avatarColor[index]
              )}
            >
              {account}
            </AvatarFallback>
          </Avatar>
          <div
            className={cn(
              'absolute -top-2 -right-2 w-5 h-5 bg-muted rounded-full flex items-center justify-center text-xs text-foreground font-semibold',
              index >= 0 && index <= 2 && badgeColor[index]
            )}
          >
            {index + 1}
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex-1 flex flex-col  ">
            <span className="font-semibold tracking-tight">{account}</span>
            <span className=" text-sm text-muted-foreground">{platform}</span>
          </div>
          <Link href={link}>
            <Button size={'icon'} variant={'outline'}>
              <LinkIcon />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 mt-4">
        <div>
          <h1 className=" text-sm text-muted-foreground">Positive</h1>
          <span className="text-xl font-semibold">120</span>
        </div>
        <div>
          <h1 className=" text-sm text-muted-foreground">Positive</h1>
          <span className="text-xl font-semibold">120</span>
        </div>
        <div>
          <h1 className=" text-sm text-muted-foreground">Positive</h1>
          <span className="text-xl font-semibold">120</span>
        </div>
      </div>

      <Separator className="mt-4" />

      <OurPieChart
        chartConfig={data.chartConfig}
        data={data.data}
        dataKey={dataKey}
        nameKey={namekey}
        innerRadius={60}
      />
    </div>
  );
}
