import type { ReactNode } from "react";
import { TopicWrapper } from "./_components/topic-wrapper";
import { TopicProvider } from "@/context/issue-highlights-context/topic-context";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <TopicProvider>
      <TopicWrapper>{children}</TopicWrapper>
    </TopicProvider>
  );
}
