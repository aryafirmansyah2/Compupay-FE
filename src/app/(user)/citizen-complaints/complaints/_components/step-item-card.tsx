// components/StepItemCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  Check,
  BookText,
  Settings,
  FileCheck,
} from "lucide-react";
import { IconType } from "@/types/types";

interface StepItemCardProps {
  title: string;
  status: string;
  children: React.ReactNode;
  icon: IconType;
  isOpen?: boolean;
}

const StepItemCard = ({
  title,
  status,
  icon: Icon,
  isOpen,
  children,
}: StepItemCardProps) => {
  return (
    <Card className="overflow-hidden">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={isOpen ? "item-1" : undefined}
      >
        <AccordionItem value="item-1" className="border-0 transition-colors">
          <CardHeader className="p-0 bg-muted/50 data-[state=open]:border-b ">
            <AccordionTrigger className="w-full px-4 py-3 sm:px-5 sm:py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Icon className="w-4 h-4 text-white" />
                </span>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base sm:text-lg">
                    {title}
                  </CardTitle>
                </div>
              </div>
            </AccordionTrigger>
          </CardHeader>
          <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up border-t-1 pt-4">
            <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5">
              {children}
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default StepItemCard;
