import { SocialStatsItem } from './social-stats-item';
import { SocialStatsType } from '../type';

export function SocialStatsList({ data }: { data: SocialStatsType[] }) {
  return (
    <>
      {data.map((item, index) => (
        <SocialStatsItem
          key={item.title + index}
          title={item.title}
          value={item.value}
          percentage={item.percentage}
        />
      ))}
    </>
  );
}
