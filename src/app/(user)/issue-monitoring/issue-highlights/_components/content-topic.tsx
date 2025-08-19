'use client';
import { OurCard, OurCardActionsDropdown } from '@/components/custom/our-card';
import { OurToggle } from '@/components/custom/our-toggle';
import { CalendarDatePicker } from '@/components/ui/date-range-picker';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import React from 'react';

export default function ContentTopic() {
  const [toggleProxy, setToggleProxy] = React.useState('opposition');

  return (
    <OurCard
      title="List Topic"
      period="Saturday, December 23, 2025"
      action={<OurCardActionsDropdown />}
      size="fill"
      contentClassName="justify-start max-h-[70.5vh] gap-4 overflow-y-scroll"
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 z-10 bg-card flex flex-col gap-2 ">
        <CalendarDatePicker
          align="end"
          date={{ to: new Date(), from: new Date() }}
          onDateSelect={({ from, to }) => {}}
          variant="outline"
        />

        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Search..."
            className={cn(
              'w-full pl-10 pr-3 rounded-md bg-muted/50 text-muted-foreground'
            )}
          />
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        </div>

        <OurToggle
          options={[
            { value: 'opposition', label: 'Opposition' },
            { value: 'coalition', label: 'Coalition' },
            { value: 'independent', label: 'Independent' },
          ]}
          value={toggleProxy}
          onChange={setToggleProxy}
          placeholder="Choose an option"
        />
      </div>

      {/* Scrollable content */}
      <OurCard title="Topic 1" size="xs" />
      <OurCard title="Topic 2" size="xs" />
      <OurCard title="Topic 3" size="xs" />
      <OurCard title="Topic 4" size="xs" />
    </OurCard>
  );
}
