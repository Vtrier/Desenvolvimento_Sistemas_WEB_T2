import { CurriculoDetailSkeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-24 bg-muted rounded animate-pulse mb-6" />
          <CurriculoDetailSkeleton />
        </div>
      </main>
      <Footer />
    </div>
  );
}
