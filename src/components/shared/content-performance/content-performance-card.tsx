'use client';
import { cva } from 'class-variance-authority';
import { EllipsisVertical } from 'lucide-react';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

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

interface ContentPerformanceCardProps extends ComponentProps<'div'> {
  title: string;
  period?: string;
  action?: ReactNode;
  contentClassName?: string;
  size?: VariantProps<typeof cardContentVariants>['size'];
}

export function ContentPerformanceCard({
  title,
  period,
  action,
  children,
  contentClassName,
  size,
  ...props
}: ContentPerformanceCardProps) {
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

export function ContentPerformanceCardActionsDropdown({
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
