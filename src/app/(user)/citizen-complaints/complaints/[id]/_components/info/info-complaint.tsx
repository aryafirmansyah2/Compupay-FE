// components/VerticalTimeline.tsx
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock } from "lucide-react";
import { InfoItem } from "../../../type";
import StepDot from "../../../_components/step-dot";

const InfoComplaint = ({ info }: { info: InfoItem[] }) => {
  return (
    <ol className="relative border-muted-foreground/20 ">
      {info.map((s) => (
        <li key={s.key} className="mb-6 flex flex-col gap-2">
          {s.content}
        </li>
      ))}
    </ol>
  );
};

export default InfoComplaint;
