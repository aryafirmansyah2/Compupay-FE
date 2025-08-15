'use client';
import { cva, VariantProps } from 'class-variance-authority';
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
}

export function OurCard({
  title,
  period,
  action,
  children,
  contentClassName,
  size,
  ...props
}: OurCardProps) {
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

interface OurCardV3Props extends ComponentProps<'div'> {
  title: string;
  period?: string;
  slides: ReactNode[];
  contentClassName?: string;
  size?: VariantProps<typeof cardContentVariants>['size'];
  showDots?: boolean;
  loop?: boolean;
}

// export function OurCardV3({
//   title,
//   period,
//   slides,
//   contentClassName,
//   size,
//   showDots = true,
//   loop = false,
//   ...props
// }: OurCardV3Props) {
//   const [api, setApi] = useState<CarouselApi | null>(null);
//   const [canPrev, setCanPrev] = useState(false);
//   const [canNext, setCanNext] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [count, setCount] = useState(slides.length);

//   useEffect(() => {
//     if (!api) return;
//     const onSelect = () => {
//       setSelectedIndex(api.selectedScrollSnap());
//       setCanPrev(api.canScrollPrev());
//       setCanNext(api.canScrollNext());
//       setCount(api.scrollSnapList().length);
//     };
//     onSelect();
//     api.on('select', onSelect);
//     api.on('reInit', onSelect);
//     return () => {
//       api.off('select', onSelect);
//       api.off('reInit', onSelect);
//     };
//   }, [api]);

//   return (
//     <Card asChild {...props}>
//       <article className="w-full flex flex-col justify-start ">
//         <div className="flex justify-between p-6">
//           <div className="space-y-1 min-w-0">
//             <CardTitle className="truncate">{title}</CardTitle>
//             {period && <CardDescription>{period}</CardDescription>}
//           </div>
//           <OurCardCarouselActions
//             api={api}
//             canPrev={canPrev}
//             canNext={canNext}
//           />
//         </div>
//         <CardContent
//           className={cn(cardContentVariants({ size }), contentClassName)}
//         >
//           <div className="space-y-3 w-full">
//             <Carousel
//               setApi={setApi}
//               opts={{ align: 'start', loop }}
//               className="h-full w-full"
//             >
//               <CarouselContent>
//                 {slides.map((slide, i) => (
//                   <CarouselItem
//                     key={`slide-${i}`}
//                     className="basis-full bg-red-500 h-full items-start"
//                   >
//                     {React.cloneElement(slide as React.ReactElement, {
//                       key: `slide-content-${i}`,
//                     })}
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//             </Carousel>
//             {showDots && count > 1 && (
//               <div className="flex items-center justify-center gap-2 pt-1">
//                 {Array.from({ length: count }).map((_, i) => (
//                   <button
//                     key={`dot-${i}`}
//                     className={cn(
//                       'h-1.5 w-6 rounded-full bg-muted-foreground/30 transition-all',
//                       i === selectedIndex && 'w-8 bg-foreground/70'
//                     )}
//                     aria-label={`Go to slide ${i + 1}`}
//                     onClick={() => api?.scrollTo(i)}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </article>
//     </Card>
//   );
// }

export function OurCardV3({
  title,
  period,
  slides,
  contentClassName,
  size,
  showDots = true,
  loop = false,
  ...props
}: OurCardV3Props) {
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
          <OurCardCarouselActions
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

interface CarouselActionsProps {
  api: CarouselApi | null;
  canPrev: boolean;
  canNext: boolean;
}

export function OurCardCarouselActions({
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

export function OurCardActionsDropdown({
  children,
  ...props
}: ComponentProps<typeof DropdownMenu>) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger
        aria-label="More actions"
        className={cn(
          '-mt-2 -me-2',
          buttonVariants({ variant: 'ghost', size: 'icon' })
        )}
      >
        <EllipsisVertical className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {children ? (
          children
        ) : (
          <>
            <DropdownMenuItem>Last week</DropdownMenuItem>
            <DropdownMenuItem disabled>Last month</DropdownMenuItem>
            <DropdownMenuItem>Last year</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
