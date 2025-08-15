'use client';
import { cva } from 'class-variance-authority';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

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
import { Button, buttonVariants } from '@/components/ui/button';
import { Calendar, EllipsisVertical, ListFilter } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

interface CompetitorAnalysisCardProps extends ComponentProps<'div'> {
  title: string;
  period?: string;
  action?: ReactNode;
  contentClassName?: string;
  size?: VariantProps<typeof cardContentVariants>['size'];
}

export function CompetitorAnalysisCard({
  title,
  period,
  action,
  children,
  contentClassName,
  size,
  ...props
}: CompetitorAnalysisCardProps) {
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

interface CompetitorAnalysisTabsCardProps extends ComponentProps<'div'> {
  title: string;
  period?: string;
  defaultValueTabs?: string;
  action?: ReactNode;
  contentClassName?: string;
  size?: VariantProps<typeof cardContentVariants>['size'];
}

export function CompetitorAnalysisTabsCard({
  title,
  period,
  defaultValueTabs = 'engagement',
  action,
  children,
  contentClassName,
  size,
  ...props
}: CompetitorAnalysisTabsCardProps) {
  return (
    <Card asChild {...props}>
      <Tabs
        defaultValue={defaultValueTabs}
        className="w-full flex-col justify-start gap-6"
      >
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
      </Tabs>
    </Card>
  );
}

export function CompetitorAnalysisCardActionsDropdown({
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
        <ListFilter className="h-4 w-4" />
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

export function CompetitorAnalysisActionsTabs() {
  return (
    <div className="-mt-2 -me-2">
      <Select defaultValue="engagement">
        <SelectTrigger
          className="flex w-fit md:hidden"
          size="sm"
          id="view-selector"
        >
          <SelectValue placeholder="Select a view" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="engagement">Engagement</SelectItem>
          <SelectItem value="awareness">Awareness</SelectItem>
          <SelectItem value="convorsation">Convorsation</SelectItem>
        </SelectContent>
      </Select>
      <TabsList className=" hidden md:flex bg-transparent border-border border">
        <TabsTrigger value="engagement">Engagement</TabsTrigger>
        <TabsTrigger value="awareness">Awareness</TabsTrigger>
        <TabsTrigger value="convorsation">Convorsation</TabsTrigger>
      </TabsList>
    </div>
  );
}

export function CompetitorAnalysisActionsSelect() {
  return (
    <div className="-mt-2 -me-2">
      <Select defaultValue="instagram">
        <SelectTrigger className="flex w-fit " size="sm" id="view-selector">
          <SelectValue placeholder="Select a view" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="instagram">Instagram</SelectItem>
          <SelectItem value="tiktok">Tiktok</SelectItem>
          <SelectItem value="whatsapp">Whatsapp</SelectItem>
          <SelectItem value="x">X</SelectItem>
          <SelectItem value="portal berita">Portal Berita</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
