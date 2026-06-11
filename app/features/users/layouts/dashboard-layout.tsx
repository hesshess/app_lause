import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "~/common/components/ui/sidebar";
import { Link, Outlet, useLocation } from "react-router";
import { HomeIcon, RocketIcon, SparklesIcon } from "lucide-react";
import type { Route } from "./+types/dashboard-layout";
import { makeSSRClient } from "~/supa-client";
import { getApplausesByUserId, getLoggedInUserId } from "../queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const applauses = await getApplausesByUserId(client, { userId });
  return { userId, applauses };
};

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  return (
    <SidebarProvider className="flex min-h-full">
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/my/dashboard"}
                >
                  <Link to="/my/dashboard">
                    <HomeIcon className="size-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/my/dashboard/ideas"}
                >
                  <Link to="/my/dashboard/ideas">
                    <SparklesIcon className="size-4" />
                    <span>Ideas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Applause Analytics</SidebarGroupLabel>
            <SidebarMenu>
              {loaderData.applauses.map((applause) => (
                <SidebarMenuItem key={applause.applause_id}>
                  <SidebarMenuButton asChild>
                    <Link to={`/my/dashboard/applauses/${applause.applause_id}`}>
                      <RocketIcon className="size-4" />
                      <span>{applause.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
