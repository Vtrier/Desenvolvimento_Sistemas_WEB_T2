"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { CurriculoCard } from "@/components/curriculos/CurriculoCard";
import { EmptyState } from "@/components/curriculos/EmptyState";
import { CurriculoCardSkeleton } from "@/components/ui/skeleton";
import { useCurriculos } from "@/hooks/useCurriculos";
import { FiSearch, FiX, FiPlus } from "react-icons/fi";

export default function ListaPage() {
  const { curriculos, loading } = useCurriculos();
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const filtered = useMemo(() => {
    if (!debounced.trim()) return curriculos;
    const q = debounced.toLowerCase();
    return curriculos.filter(
      (c) =>
        c.nome.toLowerCase().includes(q) ||
        c.cargo.toLowerCase().includes(q)
    );
  }, [curriculos, debounced]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Currículos</h1>
            {!loading && (
              <p className="text-sm text-gray-500 mt-0.5">
                {curriculos.length} candidato(s) cadastrado(s)
              </p>
            )}
          </div>
          <Link href="/curriculos/cadastrar" className="btn-primary">
            + Novo
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
        </div>

        {debounced && !loading && (
          <p className="text-sm text-gray-500 mb-4">
            {filtered.length} resultado(s) para &quot;{debounced}&quot;
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <CurriculoCardSkeleton key={i} />)}
          </div>
        ) : curriculos.length === 0 ? (
          <EmptyState />
        ) : filtered.length === 0 ? (
          <EmptyState filtered />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => <CurriculoCard key={c.id} curriculo={c} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
