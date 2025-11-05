
import Navbar from "@/components/user/navbar";
import { PostWorkForm } from "./post-work-form";

export default function PostQuotationForm() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center py-8">
        <div className="w-full max-w-7xl px-6">
          <PostWorkForm />
        </div>
      </main>
    </div>
  );
}