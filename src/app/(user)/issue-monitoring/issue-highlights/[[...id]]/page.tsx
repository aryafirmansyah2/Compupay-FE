import { OurCard } from '@/components/custom/our-card';
import { TopicBoxPlaceholder } from '../_components/topic-box-placeholder';
import TopicBoxContent from '../_components/topic-box-content';

export default async function ChatBoxPage(props: {
  params: Promise<{ id: string[] }>;
}) {
  const params = await props.params;
  const topicIdParam = params.id?.[0];

  // If no chat is selected, show a placeholder UI
  if (!topicIdParam) return <TopicBoxPlaceholder />;

  // Otherwize show a chat box
  return <TopicBoxContent />;
}
