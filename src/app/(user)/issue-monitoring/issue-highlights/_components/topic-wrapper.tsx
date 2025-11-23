import type { ReactNode } from "react";
import TopicSidebar from "./topic-sidebar";

export function TopicWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-x-4 h-full">
      {" "}
      {/* Ensure grid takes full height */}
      <div className="h-full">
        {" "}
        {/* Sidebar should fill available height */}
        <TopicSidebar />
      </div>
      <div className="col-span-2 h-full">
        {" "}
        {/* Ensure the content fills available height */}
        {children}
      </div>
    </div>
  );
}
