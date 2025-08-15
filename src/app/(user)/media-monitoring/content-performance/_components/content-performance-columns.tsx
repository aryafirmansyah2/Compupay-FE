import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ShowMoreText } from '@/components/ui/show-more-text';
import { cn, formatDate, formatNumberSocialMedia } from '@/lib/utils';

export const contentPerformanceColumns = [
  {
    header: 'No',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'accountName',
    header: 'Account Name',
    cell: ({ row }) => {
      const { avatar, accountName } = row.original as {
        avatar: string;
        accountName: string;
      };

      return (
        <div className="flex items-center gap-x-4">
          <Avatar className="aspect-square">
            <AvatarImage
              src={avatar}
              alt="Avatar"
              className="border-2 border-muted rounded-full"
            />
            <AvatarFallback className="border-2 border-muted">
              {accountName?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xs font-semibold">{accountName}</h3>
        </div>
      );
    },
  },
  {
    accessorKey: 'platform',
    header: 'Platform',
    cell: ({ row }) => {
      const platform = row.getValue('platform') as string;

      return (
        <Badge>
          <span>{platform}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('date') as string;

      return formatDate(date);
    },
  },
  {
    accessorKey: 'caption',
    header: 'Caption',
    cell: ({ row }) => {
      const caption = row.getValue('caption') as string;

      return (
        <div className="w-96">
          <ShowMoreText
            text={caption}
            className="text-sm break-all text-wrap"
            maxLength={100}
          />
        </div>
      );
    },
  },

  {
    accessorKey: 'likes',
    header: 'Likes',
    cell: ({ row }) => {
      const likes = row.getValue('likes') as number;

      return <span>{formatNumberSocialMedia(likes)}</span>;
    },
  },
  {
    accessorKey: 'comments',
    header: 'Comments',
    cell: ({ row }) => {
      const comments = row.getValue('comments') as number;

      return <span>{formatNumberSocialMedia(comments)}</span>;
    },
  },
  {
    accessorKey: 'views',
    header: 'Views',
    cell: ({ row }) => {
      const views = row.getValue('views') as number;

      return <span>{formatNumberSocialMedia(views)}</span>;
    },
  },
  {
    accessorKey: 'shares',
    header: 'Shares',
    cell: ({ row }) => {
      const shares = row.getValue('shares') as number;

      return <span>{formatNumberSocialMedia(shares)}</span>;
    },
  },
  {
    accessorKey: 'saves',
    header: 'Saves',
    cell: ({ row }) => {
      const saves = row.getValue('saves') as number;

      return <span>{formatNumberSocialMedia(saves)}</span>;
    },
  },
];
