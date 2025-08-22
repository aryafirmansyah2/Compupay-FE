'use client';

import { File } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

export function TopicBoxPlaceholder() {
  return (
    <Card className="grow h-full ">
      <CardContent className="size-full flex flex-col justify-center items-center gap-2 p-0">
        <File className="size-24 text-primary/50" />
        <p className="text-muted-foreground">Select a Topic to see datail.</p>
      </CardContent>
    </Card>
  );
}
