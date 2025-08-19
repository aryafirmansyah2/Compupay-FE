import React from 'react';
import { socialStats } from '../_data/social-stats';
import { SocialStatsList } from './social-stats-list';
import { OurCard } from '@/components/custom/our-card';

export default function SocialStats() {
  return (
    <OurCard
      title="Social Stats"
      size="fill"
      className="col-span-full md:col-span-1"
    >
      <SocialStatsList data={socialStats} />
    </OurCard>
  );
}
