import { clsx } from 'clsx';
import { format, intervalToDuration } from 'date-fns';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';
import { FormatStyleType } from '@/types/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number,
  locales: string = 'id',
  currency: string = 'IDR'
) {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, locales: string = 'id') {
  return new Intl.NumberFormat(locales, {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(value);
}

export function isNonNegative(num: number) {
  return num >= 0;
}

export function formatNumberSocialMedia(value: number): string {
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return value.toString();
}

export function formatDuration(value: string | number | Date) {
  const numberValue = Number(value);
  const isNegative = numberValue < 0;
  const absoluteValue = Math.abs(numberValue);

  const duration = intervalToDuration({ start: 0, end: absoluteValue });

  const hours = duration.hours ? `${duration.hours}h` : '';
  const minutes = duration.minutes ? `${duration.minutes}m` : '';
  const seconds = duration.seconds ? `${duration.seconds}s` : '';

  const formattedDuration = `${hours} ${minutes} ${seconds}`.trim();

  return isNegative ? `-${formattedDuration}` : formattedDuration;
}

export function formatCardValue(
  value: number,
  formatStyle: FormatStyleType
): string | number {
  switch (formatStyle) {
    case 'percent':
      return formatPercent(value);
    case 'duration':
      return formatDuration(value);
    case 'currency':
      return formatCurrency(value);
    case 'socialMedia':
      return formatNumberSocialMedia(value);
    default:
      return value.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
  }
}

export function formatDate(value: string | number | Date) {
  return format(value, 'PP');
}

export function classifyNumber(
  value: number
): 'positive' | 'negative' | 'zero' {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return 'zero';
}

export function makeAllPositive(value: number): number {
  return Math.abs(value);
}
