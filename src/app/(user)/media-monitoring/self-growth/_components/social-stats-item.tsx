import { PercentageChangeBadge } from '@/components/custom/our-badge';
import { SocialStatsType } from '../type';
import { formatNumberSocialMedia } from '@/lib/utils';

export function SocialStatsItem({ title, value, percentage }: SocialStatsType) {
  return (
    <div className="">
      <h3 className="text-sm text-muted-foreground">{title}</h3>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">
          {formatNumberSocialMedia(value)}
        </p>
        <PercentageChangeBadge value={percentage} />
      </div>
    </div>
  );
}
