import { OurCard } from '@/components/custom/our-card';
import React from 'react';
import ContentTopic from './_components/content-topic';

export default function IssueHightlightsPage() {
  return (
    <section className=" grid gap-4  md:grid-cols-2  w-full">
      <div className="col-span-full grid grid-cols-1 gap-4 md:grid-cols-3 h-full">
        <ContentTopic />
      </div>
    </section>
  );
}
