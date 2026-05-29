// components/StepDot.tsx
import { CheckCircle2, AlertCircle, Circle } from "lucide-react";
import { StepStatus } from "../type";

interface StepDotProps {
  status: StepStatus;
}

const StepDot = ({ status }: StepDotProps) => {
  if (status === "done") {
    return (
      <CheckCircle2 aria-label="Completed" className="h-5 w-5 text-green-600" />
    );
  }
  if (status === "current") {
    return (
      <span className="relative flex h-5 w-5 items-center justify-center">
        <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-primary/30" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" />
      </span>
    );
  }
  if (status === "blocked") {
    return (
      <AlertCircle aria-label="Blocked" className="h-5 w-5 text-red-600" />
    );
  }
  return (
    <Circle aria-label="Upcoming" className="h-5 w-5 text-muted-foreground" />
  );
};

export default StepDot;
