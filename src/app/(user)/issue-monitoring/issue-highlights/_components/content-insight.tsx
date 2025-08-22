import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Brain, SlidersHorizontal } from 'lucide-react';
import React from 'react';

export default function ContentInsight() {
  return (
    <Drawer direction={'bottom'}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="text-foreground " size="icon">
          <Brain />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Insight </DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div className="container flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <span>
            Tingginya sentimen positif menunjukkan apresiası publik terhadap
            langkah pemerintah, termasuk ajakan Wamen LH untuk menanam mangrove
            dan menjaga lingkungan. Ini menjadi modal penting dalam memperkuat
            kepercayaan masyarakat. Sentimen negatif menjadi sinyal perlunya
            evaluasi terhadap pelaksanaan dan komunikasi kebijakan agar tidak
            menimbulkan ketidakpuasan lebih luas. Sementara itu, sentimen netral
            mencerminkan peliputan informatif seputar agenda pemerintahan yang
            bersifat rutin dan resmi.
          </span>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
