
import Navbar from "@/components/user/navbar";
import { BookTaskForm } from "./book-task-form";

export default function MakeQuotationForm() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center py-8">
        <div className="w-full max-w-7xl px-6">
          <BookTaskForm />
        </div>
      </main>
    </div>
  );
}