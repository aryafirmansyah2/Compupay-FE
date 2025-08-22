import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ShowMoreText } from '@/components/ui/show-more-text';
import { cn, formatDate, formatNumberSocialMedia } from '@/lib/utils';
import Link from 'next/link';

export const topicContentColumns = [
  {
    header: 'No',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'text',
    header: 'Text',
    cell: ({ row }) => {
      const text = row.getValue('text') as string;

      return (
        <div className="w-40">
          <ShowMoreText
            text={text}
            className="text-sm break-all text-wrap"
            maxLength={100}
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) => {
      const link = row.getValue('link') as string;

      return (
        <div className="w-40">
          <Link href={link} className="text-sm break-all text-wrap">
            {link}
          </Link>
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
    accessorKey: 'likes',
    header: 'Likes',
    cell: ({ row }) => {
      const likes = row.getValue('likes') as number;

      return <span>{formatNumberSocialMedia(likes)}</span>;
    },
  },
  {
    accessorKey: 'sentiment',
    header: 'Sentiment',
    cell: ({ row }) => {
      const sentiment = row.getValue('sentiment') as string;

      return (
        <Badge>
          <span>{sentiment}</span>
        </Badge>
      );
    },
  },
];
