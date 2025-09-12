import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sidebar border-t border-sidebar-border">
      <div className="container flex justify-between items-center p-4 md:px-6">
        <p className="text-xs text-muted-foreground md:text-sm">
          © {currentYear}{" "}
          <a
            href="#"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "link" }), "inline p-0")}
          >
            N4P
          </a>
          .
        </p>
        <p className="text-xs text-muted-foreground md:text-sm">
          Designed & Developed by{" "}
          <a
            href="#"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "link" }), "inline p-0")}
          >
            Nevmock.id
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
