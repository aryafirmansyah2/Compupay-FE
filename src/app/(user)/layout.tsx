import AppSidebar from "@/components/layout/AppSidebar";
import { Footer } from "@/components/layout/Footer";

import Navbar from "@/components/layout/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="h-full">
      <AppSidebar />
      <div className="flex flex-col flex-1 w-full">
        <Navbar />
        <main className="h-full flex flex-col ">
          <div className="p-4">{children}</div>
        </main>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
