import React from 'react';
import { Overview } from './_components/overview';
import { SocialMediaRanking } from './_components/social-media-ranking';
import FairScorePerformance from './_components/fair-score-performance';
import ProxyOpposition from './_components/proxy-opposition';
import ProxyCoalition from './_components/proxy-coalition';
import ProxyIndependent from './_components/proxy-independent';

export default function OverviewPage() {
  return (
    <section className=" grid gap-4  md:grid-cols-2  w-full">
      <div className="col-span-full grid grid-cols-1 gap-4 md:grid-cols-3 h-full">
        <Overview />
        <SocialMediaRanking />
      </div>
      <FairScorePerformance />
      <div className="col-span-full grid grid-cols-1 gap-4 md:grid-cols-3 h-full">
        <ProxyOpposition />
        <ProxyCoalition />
        <ProxyIndependent />
      </div>
    </section>
  );
}
