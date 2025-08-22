import type { ReactNode } from 'react';
import TopicSidebar from './topic-sidebar';

export function TopicWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-x-4">
      <TopicSidebar />
      <div className="col-span-2">{children}</div>
    </div>
  );
}
