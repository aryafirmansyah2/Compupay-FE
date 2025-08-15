// OurDrawer.tsx
'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import React, { ComponentProps, ReactElement } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Button } from '../ui/button';

interface DrawerProps extends ComponentProps<'div'> {
  direction?: 'top' | 'bottom' | 'left' | 'right';
  action: ReactElement; // <- pastikan elemen tunggal (Button)
  title: string;
  description: string;
  tooltip?: React.ReactNode; // <- optional tooltip text/node
}

export default function OurDrawer({
  direction = 'right',
  action,
  title,
  description,
  children,
  tooltip,
}: DrawerProps) {
  const trigger = <DrawerTrigger asChild>{action}</DrawerTrigger>;

  return (
    <Drawer direction={direction}>
      {tooltip ? (
        <Tooltip>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      ) : (
        trigger
      )}

      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <div className="flex flex-col gap-4">{children}</div>
        </div>

        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
