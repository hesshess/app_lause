import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarProvider } from "~/common/components/ui/sidebar";
import { Outlet } from "react-router";
import MessageRoomCard from "../components/message-room-card";

export default function MessagesLayout() {
  return (
    <SidebarProvider className="flex h-[calc(100vh-12rem)] min-h-full max-h-[calc(100vh-12rem)] overflow-hidden">
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 20 }).map((_, index) => (
                <MessageRoomCard
                  key={index}
                  id={index.toString()}
                  name={`User ${index}`}
                  lastMessage={`Last message ${index}`}
                  avatarUrl={`https://github.com/hesshess.png`}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="h-full flex-1 min-w-0">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
