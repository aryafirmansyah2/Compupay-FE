import { OurCard } from '@/components/custom/our-card';
import React from 'react';
import PlatformDistributionContent from './_components/platform-distribution-content';
import GlobalSentiment from './_components/global-sentiment';
import PlatformSentiment from './_components/platform-sentiment';
import { globalSentiment } from './_data/global-sentiment';

export default function ExecutiveSummaryPage() {
  return (
    <div className=" grid gap-4  md:grid-cols-3  w-full">
      <div className="col-span-full grid grid-cols-2 gap-4">
        <PlatformDistributionContent />
        <GlobalSentiment />
      </div>
      <div className="col-span-full grid grid-cols-5 gap-4">
        <PlatformSentiment
          title="Instagram"
          titleInsight="Instagram Insight"
          descriptionInsight="you can get important information from this insight"
          data={globalSentiment}
        />
        <PlatformSentiment
          title="Facebook"
          titleInsight="Facebook Insight"
          descriptionInsight="you can get important information from this insight"
          data={globalSentiment}
        />
        <PlatformSentiment
          title="Tiktok"
          titleInsight="Tiktok Insight"
          descriptionInsight="you can get important information from this insight"
          data={globalSentiment}
        />
        <PlatformSentiment
          title="News"
          titleInsight="News Insight"
          descriptionInsight="you can get important information from this insight"
          data={globalSentiment}
        />
        <PlatformSentiment
          title="X"
          titleInsight="X Insight"
          descriptionInsight="you can get important information from this insight"
          data={globalSentiment}
        />
      </div>
      {/* <OurCard title="Pai 2 Chart" /> */}
    </div>
  );
}
