import { Button } from "@/components/ui/button";
import FloatingIcons from "@/components/common/animatedIcons";
import Navbar from "@/components/user/navbar";

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar/>
      
      <main className="relative ml-50 flex items-center min-h-[calc(100vh-95px)] px-6 max-w-7xl mx-auto">
        <div className="flex-1 max-w-md mx-auto mr-25">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl font-bold text-foreground mb-4 leading-tight">
              Assign your task
              <br />
              to someone in just
              <br />
              90 seconds.
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              No more stress, no more
              <br />
              waiting.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base">
              Assign Now
            </Button>
          </div>
        </div>

        {/* icons */}
        <div className="flex-1 right-50">
          <FloatingIcons />
        </div>
      </main>
    </div>
  );
}
