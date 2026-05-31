"use client";

import { User2, ChevronUp } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routeGroups } from "@/config/routes";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useCallback, useEffect, useMemo, useState } from "react";
import request from "@/utils/request";

type SidebarUser = {
  full_name?: string;
  email?: string;
};

const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();

  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState<string | undefined>();
  const [data, setData] = useState<SidebarUser | null>(null);

  const logoSrc = "/assets/logo/logo-v2.png";

  const filteredNavMain = useMemo(() => {
    if (!userRole) return [];

    return routeGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item: any) => {
          if (!item.roles) return true;
          return item.roles.includes(userRole);
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [userRole]);

  const fetchData = useCallback(async () => {
    try {
      const res = await request.get("/auth/me");
      setData(res.data.data || null);
    } catch {
      setData(null);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    setUserRole(Cookies.get("role"));
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });
    Cookies.remove("role", { path: "/" });
    Cookies.remove("position", { path: "/" });

    router.push("/login");
  };

  if (!mounted) {
    return null;
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Image
                  src={logoSrc}
                  alt="logo"
                  width={state === "collapsed" ? 40 : 125}
                  height={state === "collapsed" ? 40 : 40}
                  priority
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {filteredNavMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent className="space-y-1">
              {group.items.map((item) => (
                <SidebarMenu key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.startsWith(item.url)}
                      tooltip={item.title}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>

                    {item.title === "Inbox" && (
                      <SidebarMenuBadge>24</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                </SidebarMenu>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  <span>{data?.full_name || "Profile"}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
