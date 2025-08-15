import { cva } from 'class-variance-authority';
import {
  ArrowDown,
  ArrowUp,
  CircleSmall,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import {
  classifyNumber,
  cn,
  formatPercent,
  isNonNegative,
  makeAllPositive,
} from '@/lib/utils';

import { Badge } from '@/components/ui/badge';

export const percentageChangeBadgeVariants = cva('gap-0', {
  variants: {
    variant: {
      default:
        'data-[non-negative-change=true]:bg-success data-[non-negative-change=false]:bg-destructive',
      ghost:
        'bg-transparent text-sm text-foreground data-[non-negative-change=true]:text-success data-[non-negative-change=false]:text-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface PercentageChangeBadgeProps
  extends Omit<ComponentProps<typeof Badge>, 'variant'>,
    VariantProps<typeof percentageChangeBadgeVariants> {
  value: number;
}

export function PercentageChangeBadge({
  value,
  className,
  variant,
  ...props
}: PercentageChangeBadgeProps) {
  const isNonNegativeChange = isNonNegative(value);

  return (
    <Badge
      className={cn(percentageChangeBadgeVariants({ variant }), className)}
      data-non-negative-change={isNonNegativeChange}
      {...props}
      variant="destructive"
    >
      {isNonNegativeChange && <span>+</span>}
      <span>{formatPercent(value)}</span>
      <span className="ms-1" aria-hidden>
        {isNonNegativeChange ? (
          <TrendingUp className="size-4" />
        ) : (
          <TrendingDown className="size-4" />
        )}
      </span>
    </Badge>
  );
}

export const pointCoefficientChangeBadgeVariants = cva('gap-0', {
  variants: {
    variant: {
      default:
        'data-[point-coefficient-change=positive]:bg-success data-[point-coefficient-change=negative]:bg-destructive data-[point-coefficient-change=zero]:bg-muted',
      ghost:
        'bg-transparent text-sm text-foreground data-[point-coefficient-change=positive]:text-success data-[point-coefficient-change=negative]:text-destructive data-[point-coefficient-change=zero]:text-muted',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface PointCoefficientChangeBadgeProps
  extends Omit<ComponentProps<typeof Badge>, 'variant'>,
    VariantProps<typeof pointCoefficientChangeBadgeVariants> {
  value: number;
}

export function PointCoefficientChangeBadge({
  value,
  className,
  variant,
  ...props
}: PointCoefficientChangeBadgeProps) {
  const statusPointCoefficient = classifyNumber(value);

  return (
    <Badge
      className={cn(
        pointCoefficientChangeBadgeVariants({ variant }),
        className
      )}
      data-point-coefficient-change={statusPointCoefficient}
      {...props}
    >
      <span className="ms-1" aria-hidden>
        {(statusPointCoefficient == 'positive' && (
          <ArrowUp className="size-4" />
        )) ||
          (statusPointCoefficient == 'negative' && (
            <ArrowDown className="size-4" />
          )) || <CircleSmall className="size-4" />}
      </span>
      {(statusPointCoefficient == 'positive' ||
        statusPointCoefficient == 'negative') && (
        <span>{makeAllPositive(value)}</span>
      )}
    </Badge>
  );
}
