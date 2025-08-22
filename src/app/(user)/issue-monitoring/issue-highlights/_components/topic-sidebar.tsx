'use client';
import { OurCard, OurCardActionsDropdown } from '@/components/custom/our-card';
import { OurToggle } from '@/components/custom/our-toggle';
import { Badge } from '@/components/ui/badge';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { CalendarDatePicker } from '@/components/ui/date-range-picker';
import { Input } from '@/components/ui/input';
import { cn, formatCardValue } from '@/lib/utils';
import { File, Search } from 'lucide-react';
import React from 'react';
import { topic } from '../_data/topic';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

// export default function TopicSidebar() {
//   const [toggleProxy, setToggleProxy] = React.useState('opposition');

//   return (
//     <OurCard
//       title="List Topic"
//       period="Saturday, December 23, 2025"
//       action={<OurCardActionsDropdown />}
//       size="fill"
//       // className="max-w-[360px]"
//       contentClassName="justify-start h-[calc(100vh-234px)] gap-4  "
//     >
//       {/* Sticky wrapper */}
//       <div className="sticky top-0 z-10 bg-card flex flex-col gap-2 ">
//         <CalendarDatePicker
//           align="start"
//           date={{ to: new Date(), from: new Date() }}
//           onDateSelect={({ from, to }) => {}}
//           variant="outline"
//           closeOnSelect={true}
//         />

//         <div className="relative flex items-center">
//           <Input
//             type="text"
//             placeholder="Search..."
//             className={cn(
//               'w-full pl-10 pr-3 rounded-md bg-muted/50 text-muted-foreground'
//             )}
//           />
//           <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
//         </div>

//         <OurToggle
//           options={[
//             { value: 'opposition', label: 'Opposition' },
//             { value: 'coalition', label: 'Coalition' },
//             { value: 'independent', label: 'Independent' },
//           ]}
//           value={toggleProxy}
//           onChange={setToggleProxy}
//           placeholder="Choose an option"
//           className="w-full"
//         />
//       </div>

//       {/* Scrollable content */}
//       <ScrollArea className="h-[calc(100vh-5.5rem)] md:h-[calc(100vh-12.5rem)]">
//         {topic &&
//           topic.map((item, index) => (
//             <OurCard
//               key={index}
//               title={item.topic}
//               period={`${formatCardValue(
//                 item.countMentions,
//                 'regular'
//               )} Mentions`}
//               size="fill"
//               icon={File}
//               onClick={() => {}}
//             >
//               <div className="flex justify-between ">
//                 <div>
//                   <CardDescription>Positif</CardDescription>
//                   <CardTitle>
//                     {formatCardValue(item.positiveMentions, 'regular')}
//                   </CardTitle>
//                 </div>
//                 <div>
//                   <CardDescription>Negative</CardDescription>
//                   <CardTitle>
//                     {formatCardValue(item.negativeMentions, 'regular')}
//                   </CardTitle>
//                 </div>
//                 <div>
//                   <CardDescription>Netral</CardDescription>
//                   <CardTitle>
//                     {formatCardValue(item.netralMentions, 'regular')}
//                   </CardTitle>
//                 </div>
//               </div>
//             </OurCard>
//           ))}
//       </ScrollArea>
//     </OurCard>
//   );
// }

export default function TopicSidebar() {
  const [toggleProxy, setToggleProxy] = React.useState('opposition');

  return (
    <OurCard
      title="List Topic"
      period="Saturday, December 23, 2025"
      action={<OurCardActionsDropdown />}
      size="fill"
      contentClassName="justify-start gap-4"
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 z-10 bg-card flex flex-col gap-2 py-2">
        <CalendarDatePicker
          align="start"
          date={{ to: new Date(), from: new Date() }}
          onDateSelect={({ from, to }) => {}}
          variant="outline"
          closeOnSelect={true}
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
          className="w-full"
        />
      </div>

      {/* Scrollable content */}
      <ScrollArea className="h-[calc(100vh-15rem)] md:h-[calc(100vh-26rem)] overflow-auto">
        <ul className="flex flex-col gap-4">
          {topic &&
            topic.map((item, index) => (
              <Link
                key={index}
                href={`/issue-monitoring/issue-highlights/${item.id}`}
              >
                <OurCard
                  title={item.topic}
                  period={`${formatCardValue(
                    item.countMentions,
                    'regular'
                  )} Mentions`}
                  size="fill"
                  icon={File}
                  onClick={() => {}}
                >
                  <div className="flex justify-between ">
                    <div>
                      <CardDescription>Positif</CardDescription>
                      <CardTitle>
                        {formatCardValue(item.positiveMentions, 'regular')}
                      </CardTitle>
                    </div>
                    <div>
                      <CardDescription>Negative</CardDescription>
                      <CardTitle>
                        {formatCardValue(item.negativeMentions, 'regular')}
                      </CardTitle>
                    </div>
                    <div>
                      <CardDescription>Netral</CardDescription>
                      <CardTitle>
                        {formatCardValue(item.netralMentions, 'regular')}
                      </CardTitle>
                    </div>
                  </div>
                </OurCard>
              </Link>
            ))}
        </ul>
      </ScrollArea>
    </OurCard>
  );
}
