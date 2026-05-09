"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { CurriculoCard } from "@/components/curriculos/CurriculoCard";
import { EmptyState } from "@/components/curriculos/EmptyState";
import { CurriculoCardSkeleton } from "@/components/ui/skeleton";
import { useCurriculos } from "@/hooks/useCurriculos";
import { FiSearch, FiX, FiPlus, FiAlertCircle, FiRefreshCw } from "react-icons/fi";

export default function ListaPage() {
  const { curriculos, loading, erro, carregar } = useCurriculos();
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const filtered = useMemo(() => {
    if (!debounced.trim()) return curriculos;
    const q = debounced.toLowerCase();
    return curriculos.filter((c) =>
      c.nome?.toLowerCase().includes(q) || c.cargo?.toLowerCase().includes(q)
    );
  }, [curriculos, debounced]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Currículos</h1>
            {!loading && !erro && (
              <p className="text-sm text-gray-500 mt-0.5">{curriculos.length} candidato(s) cadastrado(s)</p>
            )}
          </div>
          <Link href="/curriculos/cadastrar" className="btn btn-primary">
            <FiPlus size={15} /> Novo
          </Link>
        </div>

        <div className="relative mb-6 max-w-sm">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou cargo..."
            className="input pl-9 pr-8"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <FiX size={14} />
            </button>
          )}
        </div>

        {debounced && !loading && (
          <p className="text-sm text-gray-500 mb-4">{filtered.length} resultado(s) para &quot;{debounced}&quot;</p>
        )}

        {erro && (
          <div className="card flex items-center gap-3 text-red-600 mb-6">
            <FiAlertCircle size={18} className="flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">{erro}</p>
              <p className="text-xs text-gray-500 mt-0.5">Verifique se o Firebase está configurado corretamente no .env.local</p>
            </div>
            <button onClick={carregar} className="btn btn-outline text-xs flex-shrink-0">
              <FiRefreshCw size={13} /> Tentar novamente
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <CurriculoCardSkeleton key={i} />)}
          </div>
        ) : !erro && curriculos.length === 0 ? (
          <EmptyState />
        ) : !erro && filtered.length === 0 ? (
          <EmptyState filtered />
        ) : !erro ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => <CurriculoCard key={c.id} curriculo={c} />)}
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
