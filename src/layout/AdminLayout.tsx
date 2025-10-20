
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content area - This should stretch to fill remaining space */}
        <div className="flex flex-1 flex-col w-full min-w-0">
          {/* Header always at top */}
          <SiteHeader />

          {/* Page content */}
          <main className="flex-1 p-6 w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}