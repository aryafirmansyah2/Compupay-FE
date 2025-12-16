import React from "react";

interface StepItemCardProps {
  children: React.ReactNode;
}
export default function DialogDetailPayroll({ children }: StepItemCardProps) {
  return <div>{children}</div>;
}
