import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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

export function CompetitorRankingTop3({ index }: { index: number }) {
  return (
    <Card className={cn(avatarColor[index], 'w-full flex-1 ')}>
      <CardContent className="flex items-center gap-x-4 py-2 px-4">
        <div className="relative">
          <Avatar className={cn(' aspect-square ')}>
            <AvatarImage
              src={'/assets/provinsi/Gorontalo.png'}
              alt="Avatar"
              className={cn(
                'border-2 border-muted rounded-full ',
                avatarColor[index]
              )}
            />
            <AvatarFallback
              className={cn('border-2 border-muted', avatarColor[index])}
            >
              {'dinas'}
            </AvatarFallback>
          </Avatar>
          <div
            className={cn(
              'absolute -top-1 -left-1 w-5 h-5 bg-muted rounded-full flex items-center justify-center text-xs text-foreground font-semibold',
              badgeColor[index]
            )}
          >
            {index + 1}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-between ">
          <h3 className="text-xs font-semibold ">@Gorontalo</h3>
          <p className="text-xs text-muted-foreground font-semibold ">{86}</p>
        </div>
      </CardContent>
    </Card>
  );
}
