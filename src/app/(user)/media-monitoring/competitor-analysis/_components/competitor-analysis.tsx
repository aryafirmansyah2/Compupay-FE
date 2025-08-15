import React from 'react';
import FairPerformance from './fair-performance';
import FollowersPerformance from './followers-performance';
import ActivityPerformance from './activity-performance';
import InteractionPerformance from './interaction-performance';
import ResponsivePerformance from './responsive-performance';

export default function CompetitorAnalysis() {
  return (
    <div className=" grid gap-4  md:grid-cols-2  w-full">
      <div className="col-span-full grid grid-cols-1 gap-4 md:grid-cols-3 h-full">
        <FairPerformance />
        <FollowersPerformance />
        <ActivityPerformance />
        <InteractionPerformance />
        <ResponsivePerformance />
      </div>
    </div>
  );
}
