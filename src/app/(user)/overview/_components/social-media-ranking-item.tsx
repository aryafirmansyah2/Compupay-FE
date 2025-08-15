import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { SocialMediaRankingType } from '../type';
import { cn } from '@/lib/utils';
import { PointCoefficientChangeBadge } from '@/components/custom/our-badge';

const avatarColor = [
  'border-yellow-400 dark:border-yellow-500',
  'border-gray-300 dark:border-gray-400',
  'border-amber-600 dark:border-amber-700',
];

const badgeColor = [
  'bg-yellow-400 dark:bg-yellow-500',
  'bg-gray-300 dark:bg-gray-400',
  'bg-amber-600 dark:bg-amber-700',
];

export function SocialMediaRankingItem({
  data,
  index,
}: {
  data: SocialMediaRankingType;
  index: number;
}) {
  return (
    <li key={data.accountName}>
      <Card>
        <CardContent className="flex items-center gap-x-4 py-3 px-6">
          <div className="relative">
            <Avatar className={cn(' aspect-square rounded-sm')}>
              <AvatarImage
                src={data.avatar}
                alt="Avatar"
                className={cn(
                  'border-2 border-muted rounded-sm',
                  index >= 0 && index <= 2 && avatarColor[index]
                )}
              />
              <AvatarFallback
                className={cn(
                  'border-2 border-muted',
                  index >= 0 && index <= 2 && avatarColor[index]
                )}
              >
                {data.accountName}
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                'absolute -top-2 -right-2 w-5 h-5 bg-muted rounded-full flex items-center justify-center text-xs text-foreground font-semibold',
                index >= 0 && index <= 2 && badgeColor[index]
              )}
            >
              {index + 1}
            </div>
          </div>
          <div className="flex-1 w-0">
            <h3 className="text-sm font-semibold break-all truncate">
              {data.accountName}
            </h3>
            <p className="text-xs text-muted-foreground font-semibold break-all truncate">
              {data.score}
            </p>
          </div>
          <PointCoefficientChangeBadge
            variant="ghost"
            value={data.pointCoefficient}
          />
        </CardContent>
      </Card>
    </li>
  );
}
