import React from 'react';
import SocialBenchmark from './_components/social-benchmark';
import SocialStats from './_components/social-stats';
import Followers from './_components/followers';
import Likes from './_components/likes';
import Views from './_components/views';
import Comments from './_components/comments';
import Shares from './_components/shares';
import Saves from './_components/saves';

export default function SelfGrowthPage() {
  return (
    <section className=" grid gap-4  md:grid-cols-2  w-full">
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
    </section>
  );
}
