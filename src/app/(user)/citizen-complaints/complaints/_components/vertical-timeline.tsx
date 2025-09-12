// components/VerticalTimeline.tsx
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock } from "lucide-react";
import { StepItem } from "../type";
import StepDot from "./step-dot";

const VerticalTimeline = ({ steps }: { steps: StepItem[] }) => {
  return (
    <ol className="relative ml-2 border-l border-muted-foreground/20 pl-6">
      {steps.map((s) => (
        <li key={s.key} className="mb-6 flex flex-col gap-2">
          <span className="absolute -left-[11px] mt-0.5 rounded-full bg-background p-0.5">
            <StepDot status={s.status} />
          </span>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold">{s.label}</h4>
            {s.status === "done" && <Badge variant="outline">Done</Badge>}
            {s.status === "current" && <Badge>In progress</Badge>}
            {s.status === "blocked" && (
              <Badge variant="destructive" className="gap-1">
                <AlertCircle className="h-3.5 w-3.5" /> Blocked
              </Badge>
            )}
          </div>
          {s.content}
          {s.at && (
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{s.at}</span>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
};

export default VerticalTimeline;
