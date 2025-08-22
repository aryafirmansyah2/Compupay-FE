'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { VariantProps as ButtonVariantProps } from 'class-variance-authority';
import React, { ComponentProps, ReactNode, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { cn, formatCardValue } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button, buttonVariants } from '../ui/button';
import { ChevronLeft, ChevronRight, EllipsisVertical } from 'lucide-react';
import { FormatStyleType, IconType } from '@/types/types';
import { Badge } from '../ui/badge';
import { PercentageChangeBadge } from './our-badge';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

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

interface OurCardProps extends ComponentProps<'div'> {
  title: string;
  period?: string;
  action?: ReactNode;
  contentClassName?: string;
  size?: VariantProps<typeof cardContentVariants>['size'];
  /** Optional icon on the left of title */
  icon?: IconType;
}

export function OurCard({
  title,
  period,
  action,
  children,
  contentClassName,
  size,
  icon: Icon, // ⬅️ new
  ...props
}: OurCardProps) {
  return (
    <Card asChild {...props}>
      <article className="w-full flex flex-col justify-start">
        <div className="flex justify-between p-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {Icon && (
                <Card className="p-1 bg-muted">
                  <Icon className="size-full" />
                </Card>
              )}
              <div className="flex flex-col">
                <CardTitle>{title}</CardTitle>
                {period && <CardDescription>{period}</CardDescription>}
              </div>
            </div>
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

interface OurCardV2Props extends ComponentProps<'div'> {
  data: {
    value: number;
    percentageChange: number;
  };
  title: string;
  period: string;
  action?: ReactNode;
  icon: IconType;
  iconColor?: string;
  formatStyle?: FormatStyleType;
  children?: ReactNode;
  contentClassName?: string;
}

export function OurCardV2({
  data,
  title,
  period,
  action,
  icon: Icon,
  iconColor = 'var(--primary)',
  formatStyle = 'regular',
  className,
  children,
  contentClassName,
  ...props
}: OurCardV2Props) {
  const value = formatCardValue(data.value, formatStyle);

  return (
    <Card
      className={cn('flex flex-col justify-between', className)}
      asChild
      {...props}
    >
      <article>
        <div className="flex justify-between p-6">
          <div className="flex items-center gap-x-2">
            <Badge
              style={{
                backgroundColor: iconColor,
              }}
              className="size-12 aspect-square"
              aria-hidden
            >
              <Icon className="size-full" />
            </Badge>
            <div>
              <CardDescription>{period}</CardDescription>
              <PercentageChangeBadge
                variant="ghost"
                value={data.percentageChange}
                className="p-0"
              />
            </div>
          </div>
          {action}
        </div>
        <CardContent className={cn('space-y-1', contentClassName)}>
          <CardTitle className="text-muted-foreground font-normal">
            {title}
          </CardTitle>
          <p className="text-2xl font-semibold break-all">{value}</p>
          {children}
        </CardContent>
      </article>
    </Card>
  );
}

interface OurCardCarouselProps extends ComponentProps<'div'> {
  title: string;
  period?: string;
  slides: ReactNode[];
  contentClassName?: string;
  size?: VariantProps<typeof cardContentVariants>['size'];
  showDots?: boolean;
  loop?: boolean;
}

export function OurCardCarousel({
  title,
  period,
  slides,
  contentClassName,
  size,
  showDots = true,
  loop = false,
  ...props
}: OurCardCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [count, setCount] = useState(slides.length);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
      setCount(api.scrollSnapList().length);
    };
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  return (
    <Card asChild {...props}>
      <article className="w-full flex flex-col justify-start ">
        <div className="flex justify-between p-6">
          <div className="space-y-1 min-w-0">
            <CardTitle className="truncate">{title}</CardTitle>
            {period && <CardDescription>{period}</CardDescription>}
          </div>
          <OurCardActionsCarousel
            api={api}
            canPrev={canPrev}
            canNext={canNext}
          />
        </div>
        <CardContent
          className={cn(cardContentVariants({ size }), contentClassName)}
        >
          <div className="w-full h-full">
            <Carousel
              setApi={setApi}
              opts={{ align: 'start', loop }}
              className="h-full w-full"
            >
              <CarouselContent className=" h-full items-start">
                {slides.map((slide, i) => (
                  <CarouselItem key={`slide-${i}`} className="h-full ">
                    {React.cloneElement(slide as React.ReactElement<any>, {
                      className: cn(
                        (slide as React.ReactElement<any>).props?.className,
                        'h-full w-full'
                      ),
                    })}
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {showDots && count > 1 && (
              <div className="flex items-center justify-center gap-2 pt-1">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    className={cn(
                      'h-1.5 w-6 rounded-full bg-muted-foreground/30 transition-all',
                      i === selectedIndex && 'w-8 bg-foreground/70'
                    )}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => api?.scrollTo(i)}
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </article>
    </Card>
  );
}

interface OurCardTabsdProps extends ComponentProps<'div'> {
  title: string;
  period?: string;
  defaultValueTabs: string;
  action?: ReactNode;
  contentClassName?: string;
  size?: VariantProps<typeof cardContentVariants>['size'];
}

export function OurCardTabs({
  title,
  period,
  defaultValueTabs,
  action,
  children,
  contentClassName,
  size,
  ...props
}: OurCardTabsdProps) {
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

interface CarouselActionsProps {
  api: CarouselApi | null;
  canPrev: boolean;
  canNext: boolean;
}

export function OurCardActionsCarousel({
  api,
  canPrev,
  canNext,
}: CarouselActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => api?.scrollPrev()}
        disabled={!canPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => api?.scrollNext()}
        disabled={!canNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface OurCardActionsDropdownProps
  extends ComponentProps<typeof DropdownMenu> {
  children?: React.ReactNode;
  icon?: IconType; // Dinamis: menerima ikon
  label?: string; // Dinamis: menerima label untuk trigger
  variant?: ButtonVariantProps<typeof buttonVariants>['variant'];
  size?: ButtonVariantProps<typeof buttonVariants>['size'];
  className?: string; // Dinamis: menerima className untuk kustomisasi
}

export function OurCardActionsDropdown({
  children,
  icon: Icon = EllipsisVertical, // Default ikon jika tidak ada
  label,
  variant = 'ghost',
  size = 'icon',
  className = '',
  ...props
}: OurCardActionsDropdownProps) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger
        aria-label={label}
        className={cn(
          '-mt-2 -me-2',
          buttonVariants({ variant: variant, size: size }),
          className // Menambahkan className dinamis
        )}
      >
        {Icon && <Icon />} {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {children ? (
          children
        ) : (
          <>
            <DropdownMenuItem>Last week</DropdownMenuItem>
            <DropdownMenuItem>Last month</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
type Option = { value: string; label: string };

type Props = {
  options: Option[];
  value: string; // nilai aktif (dikontrol parent Tabs)
  onChange: (value: string) => void; // panggil ini saat Select berubah
  className?: string;
  selectTriggerClassName?: string;
  tabsListClassName?: string;
  tabsTriggerClassName?: string;
};

export function OurCardActionsTabs({
  options,
  value,
  onChange,
  className,
  selectTriggerClassName,
  tabsListClassName,
  tabsTriggerClassName,
}: Props) {
  return (
    <div className={cn('-mt-2 -me-2', className)}>
      {/* Mobile: Select */}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id="view-selector"
          size="sm"
          className={cn('flex w-fit md:hidden', selectTriggerClassName)}
        >
          <SelectValue placeholder="Select a view" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <TabsList
        className={cn(
          'hidden md:flex bg-transparent border border-border',
          tabsListClassName
        )}
      >
        {options.map((opt) => (
          <TabsTrigger
            key={opt.value}
            value={opt.value}
            className={cn(tabsTriggerClassName)}
          >
            {opt.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
