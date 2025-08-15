// components/custom/our-tabs.tsx
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '../ui/card';
import { CalendarDatePicker } from '../ui/date-range-picker';

export type TabItem = {
  name: string;
  value: string;
  content: React.ReactNode; // <-- bukan string lagi
};

export default function TabsUnderlined({ tabs }: { tabs: TabItem[] }) {
  return (
    <Tabs defaultValue={tabs[0]?.value} className="w-full flex flex-col gap-4">
      <TabsList className="w-full p-0 bg-background justify-start border-0 border-b rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-none bg-background h-full data-[state=active]:shadow-none border-0 border-b-2 border-transparent data-[state=active]:border-foreground dark:data-[state=active]:border-primary max-w-[100px] w-full"
          >
            <span className="text-[13px]">{tab.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="flex justify-between py-4">
        <div className="space-y-1">
          <CardTitle className="text-xl">{'Competitor Analysis'}</CardTitle>
          <CardDescription>{'Saturday, December 3, 2024'}</CardDescription>
          {/* <CardTitle>{title}</CardTitle>
                  {period && <CardDescription>{period}</CardDescription>} */}
        </div>
        {/* {action} */}
        <div className="flex gap-2 items-center">
          <CalendarDatePicker
            align="end"
            date={{ from: new Date(), to: new Date() }}
            onDateSelect={({ from, to }) => {}}
            variant="outline"
          />
          <Button variant={'outline'}>Submit</Button>
        </div>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
