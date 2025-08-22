import type { ReactNode } from 'react';
import { TopicWrapper } from './_components/topic-wrapper';

export default function ChatLayout({ children }: { children: ReactNode }) {
  return <TopicWrapper>{children}</TopicWrapper>;
}
