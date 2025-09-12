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
}

const StepItemCard = ({
  title,
  status,
  icon: Icon,
  children,
}: StepItemCardProps) => {
  const iconMap = {
    ShieldCheck: <ShieldCheck className="h-4 w-4" />,
    Check: <Check className="h-4 w-4" />,
    BookText: <BookText className="h-4 w-4" />,
    FileCheck: <FileCheck className="h-4 w-4" />,
  };

  return (
    <Card className="overflow-hidden">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-0 transition-colors">
          <CardHeader className="p-0">
            <AccordionTrigger className="w-full px-4 py-3 sm:px-5 sm:py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Icon className="w-4 h-4" />
                </span>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base sm:text-lg">
                    {title}
                  </CardTitle>
                </div>
              </div>
            </AccordionTrigger>
          </CardHeader>
          <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
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
