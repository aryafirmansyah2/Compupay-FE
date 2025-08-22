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
import { cn } from '@/lib/utils';

interface DrawerProps extends ComponentProps<'div'> {
  direction?: 'top' | 'bottom' | 'left' | 'right';
  action: ReactElement; // <- pastikan elemen tunggal (Button)
  title: string;
  description: string;
  tooltip?: React.ReactNode; // <- optional tooltip text/node
  onSubmit?: () => void; // Callback for submit action
  onDone?: () => void; // Callback for done action
  submitButtonText?: string; // Custom text for Submit button
  doneButtonText?: string; // Custom text for Done button
  headerActions?: React.ReactNode; // Custom header actions like close or other buttons
  contentClassName?: string;
}

export default function OurDrawer({
  direction = 'right',
  action,
  title,
  description,
  children,
  tooltip,
  onSubmit,
  onDone,
  submitButtonText = 'Submit', // Default text
  doneButtonText = 'Done', // Default text
  headerActions,
  contentClassName,
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
        <div className={cn(contentClassName)}>
          <DrawerHeader>
            {/* <div className="flex justify-between items-center">
              <div> */}
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
            {/* </div>
              {headerActions && (
                <div className="flex items-center">{headerActions}</div>
              )}
            </div> */}
          </DrawerHeader>

          <div>{children}</div>

          <DrawerFooter>
            {onSubmit && (
              <Button onClick={onSubmit} className="mr-2">
                {submitButtonText}
              </Button>
            )}
            <DrawerClose asChild>
              <Button
                variant="outline"
                onClick={onDone} // Optional callback for the Done button
              >
                {doneButtonText}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
