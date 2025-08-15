import { socialMediaRanking } from '../_data/social-media-ranking';
import { SocialMediaRankingList } from './social-media-ranking-list';
import { OurCard, OurCardActionsDropdown } from '@/components/custom/our-card';

export function SocialMediaRanking() {
  return (
    <OurCard
      title="Top 5 Social Media"
      period="Last 30 days"
      action={<OurCardActionsDropdown />}
      size={'fill'}
    >
      <SocialMediaRankingList data={socialMediaRanking} />
    </OurCard>
  );
}
