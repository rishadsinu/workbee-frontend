import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content area */}
        <div className="flex flex-1 flex-col w-full min-w-0">
          {/* Header */}
          <SiteHeader />

          {/* Page content changes */}
          <main className="flex-1 p-6 w-full">
            <Outlet />
          </main>

        </div>
      </div>
    </SidebarProvider>
  );
}
