import {
  SelfGrowthActionsSelect,
  SelfGrowthCard,
  SelfGrowthCardActionsDropdown,
} from '@/components/shared/self-growth/self-growth-card';
import React from 'react';
import { socialStats } from '../_data/social-stats';
import { SocialStatsList } from './social-stats-list';

export default function SocialStats() {
  return (
    <SelfGrowthCard
      title="Social Stats"
      period="Last Month"
      action={
        <div className="flex items-center justify-start gap-4">
          <SelfGrowthActionsSelect /> <SelfGrowthCardActionsDropdown />
        </div>
      }
      size="fill"
      className="col-span-full md:col-span-1"
    >
      <SocialStatsList data={socialStats} />
    </SelfGrowthCard>
  );
}
