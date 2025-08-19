import React from 'react';
import SocialBenchmark from './social-benchmark';
import SocialStats from './social-stats';
import Followers from './followers';
import Likes from './likes';
import Views from './views';
import Comments from './comments';
import Shares from './shares';
import Saves from './saves';

export default function SelfGrowth() {
  return (
    <div className=" grid gap-4  md:grid-cols-2  w-full">
      <div className="col-span-full grid grid-cols-1 gap-4 md:grid-cols-3 h-full">
        <SocialBenchmark />
        <SocialStats />
        <Followers />
        <Likes />
        <Views />
        <Comments />
        <Shares />
        <Saves />
      </div>
    </div>
  );
}
