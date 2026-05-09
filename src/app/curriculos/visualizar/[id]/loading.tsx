import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { CurriculoDetailSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse mb-6" />
        <CurriculoDetailSkeleton />
      </main>
      <Footer />
    </div>
  );
}
