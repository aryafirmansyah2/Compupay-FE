'use client';
import { cva } from 'class-variance-authority';
import { EllipsisVertical } from 'lucide-react';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import { cn, formatValue } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { FormatStyleType, IconType } from '@/types/types';
import { PercentageChangeBadge } from './percentage-change-badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useOverview } from '@/context/overviewContext';

export const cardContentVariants = cva(
  'flex flex-col justify-between gap-y-6',
  {
    variants: {
      size: {
        xs: 'h-32',
        sm: 'h-64',
        default: 'h-96',
        lg: 'h-[29rem]',
        fill: 'h-full',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface DashboardCardProps extends ComponentProps<'div'> {
  title: string;
  period?: string;
  action?: ReactNode;
  contentClassName?: string;
  size?: VariantProps<typeof cardContentVariants>['size'];
}

export function DashboardCard({
  title,
  period,
  action,
  children,
  contentClassName,
  size,
  ...props
}: DashboardCardProps) {
  return (
    <Card asChild {...props}>
      <article className="w-full flex flex-col justify-start ">
        <div className="flex justify-between p-6">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            {period && <CardDescription>{period}</CardDescription>}
          </div>
          {action}
        </div>
        <CardContent
          className={cn(cardContentVariants({ size }), contentClassName)}
        >
          {children}
        </CardContent>
      </article>
    </Card>
  );
}

interface DashboardOverviewCardProps extends ComponentProps<'div'> {
  data: {
    value: number;
    percentageChange: number;
  };
  title: string;
  period?: string;
  action?: ReactNode;
  icon: IconType;
  formatStyle?: FormatStyleType;
  contentClassName?: string;
}

export function DashboardOverviewCard({
  data,
  title,
  period,
  action,
  icon: Icon,
  formatStyle = 'regular',
  className,
  contentClassName,
  ...props
}: DashboardOverviewCardProps) {
  const value = formatValue(data.value, formatStyle);

  return (
    <Card
      className={cn('flex flex-col justify-between', className)}
      asChild
      {...props}
    >
      <article className="w-full flex flex-col justify-start ">
        <div className="flex justify-between p-6 gap-2">
          <div>
            <CardTitle className="inline-flex gap-x-2 items-center">
              <Card className="size-8 aspect-square flex items-center justify-center">
                <Icon className="size-4" aria-hidden />
              </Card>
              <span>{title}</span>
            </CardTitle>
            {period && <CardDescription>{period}</CardDescription>}
          </div>
          {action}
        </div>
        <CardContent
          className={cn('flex items-center gap-3', contentClassName)}
        >
          <p className="text-2xl font-semibold break-all">{value}</p>
          <PercentageChangeBadge value={data.percentageChange} />
        </CardContent>
      </article>
    </Card>
  );
}

interface DashboardProxyCardProps extends ComponentProps<'div'> {
  platform: string;
  accountName: string;
  icon: IconType;
  action?: ReactNode;
  chart: ReactNode;
  formatStyle?: FormatStyleType;
  contentClassName?: string;
}

export function DashboardProxyCard({
  platform,
  accountName,
  icon: Icon,
  action,
  chart,
  contentClassName,
  className,
  ...props
}: DashboardProxyCardProps) {
  return (
    <Card className={cn(' ', className)} asChild {...props}>
      <article className="w-full flex flex-col justify-start ">
        <div className="flex justify-between px-6 pt-6">
          <div className="inline-flex items-center gap-x-2">
            <Card className="size-10 aspect-square flex items-center justify-center">
              <Icon className="size-6" aria-hidden />
            </Card>
            <div>
              <CardTitle className="text-muted-foreground font-normal">
                {platform}
              </CardTitle>
              <div className="inline-flex flex-wrap items-baseline gap-x-1">
                <p className="text-sm font-semibold break-all">{accountName}</p>
              </div>
            </div>
          </div>
          {action}
        </div>
        <CardContent
          className={cn(
            'flex justify-center items-center p-0',
            contentClassName
          )}
        >
          {chart}
        </CardContent>
      </article>
    </Card>
  );
}

export function DashboardCardActionsDropdown({
  children,
  ...props
}: ComponentProps<typeof DropdownMenu>) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger
        aria-label="More actions"
        className={cn(
          '-mt-2 -me-2',
          buttonVariants({ variant: 'outline', size: 'icon' })
        )}
      >
        <EllipsisVertical className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {children ? (
          children
        ) : (
          <>
            {/* These items are just for showcase purposes. Use 'children' prop to add items. */}
            <DropdownMenuItem>Last week</DropdownMenuItem>
            <DropdownMenuItem disabled>Last month</DropdownMenuItem>
            <DropdownMenuItem>Last year</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DashboardCardActionsToggle() {
  const { toggleProxy, setToggleProxy } = useOverview();
  return (
    <>
      <ToggleGroup
        type="single"
        value={toggleProxy}
        onValueChange={setToggleProxy}
        variant="outline"
        className="hidden *:data-[slot=toggle-group-item]:!px-4 md:flex"
      >
        <ToggleGroupItem value="opposition">Opposition</ToggleGroupItem>
        <ToggleGroupItem value="coalition">Coalition</ToggleGroupItem>
        <ToggleGroupItem value="independent">Independent</ToggleGroupItem>
      </ToggleGroup>
      <Select value={toggleProxy} onValueChange={setToggleProxy}>
        <SelectTrigger
          className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate md:hidden"
          size="sm"
          aria-label="Select a value"
        >
          <SelectValue placeholder="opposition" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="opposition" className="rounded-lg">
            Opposition
          </SelectItem>
          <SelectItem value="coalition" className="rounded-lg">
            Coalition
          </SelectItem>
          <SelectItem value="independent" className="rounded-lg">
            Independent
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
