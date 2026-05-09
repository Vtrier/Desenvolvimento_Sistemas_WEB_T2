"use client";

import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { SugestoesCurriculo } from "@/components/curriculos/SugestoesCurriculo";
import { useCurriculos } from "@/hooks/useCurriculos";
import { CurriculoCardSkeleton } from "@/components/ui/skeleton";

export default function SugestoesPage() {
  const { curriculos, loading, erro } = useCurriculos();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Sugestão de Currículos</h1>
          <p className="text-sm text-gray-500 mt-1">
            Busque por habilidades, cargo ou área para encontrar os candidatos com maior aderência.
          </p>
        </div>

        <div className="card mb-6">
          <p className="text-sm text-gray-600 mb-1 font-medium">Como funciona</p>
          <p className="text-sm text-gray-500">
            Digite as habilidades ou o cargo desejado (separados por espaço ou vírgula) e o sistema
            ordenará os currículos por aderência ao perfil buscado. Ex: <span className="font-medium text-gray-700">React Node.js Pleno</span>
          </p>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <CurriculoCardSkeleton key={i} />)}
          </div>
        ) : erro ? (
          <p className="text-sm text-red-500">{erro}</p>
        ) : (
          <SugestoesCurriculo curriculos={curriculos} />
        )}
      </main>
      <Footer />
    </div>
  );
}
