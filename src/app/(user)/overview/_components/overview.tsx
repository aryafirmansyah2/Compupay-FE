'use client';

import {
  Award,
  Eye,
  Heart,
  MessageCircleMore,
  Share,
  UserRoundPlus,
} from 'lucide-react';

import {
  OurCardActionsDropdown,
  OurCardV2,
} from '@/components/custom/our-card';

export function Overview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:col-span-2 md:grid-cols-2 w-full">
      <OurCardV2
        data={{ value: 2000, percentageChange: 1.2 }}
        title="Followers"
        period="Last Month"
        action={<OurCardActionsDropdown />}
        icon={UserRoundPlus}
        formatStyle="socialMedia"
      />
      <OurCardV2
        data={{ value: 2000, percentageChange: 0.5 }}
        title="Likes"
        period="Last Month"
        action={<OurCardActionsDropdown />}
        icon={Heart}
        formatStyle="socialMedia"
      />
      <OurCardV2
        data={{ value: 2000, percentageChange: 0.2 }}
        title="Views"
        period="Last Month"
        action={<OurCardActionsDropdown />}
        icon={Eye}
        formatStyle="socialMedia"
      />
      <OurCardV2
        data={{ value: 2103, percentageChange: -0.1 }}
        title="Comments"
        period="Last Month"
        action={<OurCardActionsDropdown />}
        icon={MessageCircleMore}
        formatStyle="socialMedia"
      />
      <OurCardV2
        data={{ value: 2103, percentageChange: -0.1 }}
        title="Saves"
        period="Last Month"
        action={<OurCardActionsDropdown />}
        icon={Award}
        formatStyle="socialMedia"
      />
      <OurCardV2
        data={{ value: 2103, percentageChange: -0.1 }}
        title="Shares"
        period="Last Month"
        action={<OurCardActionsDropdown />}
        icon={Share}
        formatStyle="socialMedia"
      />
    </div>
  );
}
