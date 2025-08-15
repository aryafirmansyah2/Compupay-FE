'use client';

import { useState } from 'react';
import { Slot } from '@radix-ui/react-slot';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { Button } from './button';

type ShowMoreTextProps = ComponentProps<'p'> & {
  text: string;
  maxLength?: number;
  asChild?: boolean;
};

export function ShowMoreText({
  className,
  text,
  maxLength = 250,
  asChild = false,
  ...props
}: ShowMoreTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const Comp = asChild ? Slot : 'p';

  if (text.length > maxLength) {
    return (
      <div
        data-slot="show-more-text"
        className={cn('text-base', className)}
        {...props}
      >
        <p>{isExpanded ? text : `${text.slice(0, maxLength)}...`}</p>
        <Button
          variant="link"
          size="sm"
          className="text-red-500 underline p-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </Button>
      </div>
    );
  }

  return (
    <Comp
      data-slot="show-more-text"
      className={cn('text-base', className)}
      {...props}
    >
      {text}
    </Comp>
  );
}
