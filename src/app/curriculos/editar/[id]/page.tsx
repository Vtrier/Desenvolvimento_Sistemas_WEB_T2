"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { CurriculoForm } from "@/components/curriculos/CurriculoForm";
import { CurriculoDetailSkeleton } from "@/components/ui/skeleton";
import { useCurriculoDetalhe } from "@/hooks/useCurriculos";
import { FiArrowLeft } from "react-icons/fi";

export default function EditarPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const { curriculo, loading, erro } = useCurriculoDetalhe(id);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <Link
          href={`/curriculos/visualizar/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6"
        >
          <FiArrowLeft size={14} /> Voltar
        </Link>

        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Editar Currículo</h1>
          <p className="text-sm text-gray-500 mt-1">Altere os dados do candidato.</p>
        </div>

        {loading ? (
          <CurriculoDetailSkeleton />
        ) : erro ? (
          <div className="card text-center py-10">
            <p className="text-red-500 text-sm">{erro}</p>
            <Link href="/curriculos/visualizar" className="btn btn-outline mt-4">
              Voltar à lista
            </Link>
          </div>
        ) : (
          <CurriculoForm curriculo={curriculo ?? undefined} />
        )}
      </main>
      <Footer />
    </div>
  );
}
