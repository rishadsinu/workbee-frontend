import { SiteHeader } from "@/components/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import WorkerSidebar from "@/components/worker/worker-sidebar";
import { Outlet } from "react-router-dom";

export default function WorkerLayout() {
  return (
    <div>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-muted/30 ">
            <WorkerSidebar/>
            <div className="flex flex-1 flex-col w-full min-w-0">
                <SiteHeader/>

                <div className="flex-1 p-6 w-full">
                    <Outlet/>
                </div>
                
            </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
