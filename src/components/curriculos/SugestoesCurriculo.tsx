"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiAlertTriangle, FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";
import { sugerirCurriculos } from "@/utils/sugestoesCurriculo";
import { Curriculo } from "@/data/curriculos";
import type { Sugestao } from "@/utils/sugestoesCurriculo";

export function SugestoesCurriculo({ curriculos }: { curriculos: Curriculo[] }) {
  const [busca, setBusca] = useState("");
  const [buscaAtiva, setBuscaAtiva] = useState("");

  const sugeridos = useMemo(() => sugerirCurriculos(curriculos, buscaAtiva), [curriculos, buscaAtiva]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setBuscaAtiva(busca.trim())}
            placeholder="Ex: React, Node.js, Pleno, Dados..."
            className="input pl-9 pr-4"
          />
        </div>
        <button onClick={() => setBuscaAtiva(busca.trim())} className="btn btn-primary">Buscar</button>
        {buscaAtiva && (
          <button onClick={() => { setBusca(""); setBuscaAtiva(""); }} className="btn btn-outline">
            <FiX size={14} />
          </button>
        )}
      </div>

      {buscaAtiva && (
        <div>
          <p className="text-sm text-gray-500 mb-3">
            {sugeridos.length > 0
              ? `${sugeridos.length} currículo(s) com aderência para "${buscaAtiva}"`
              : `Nenhum currículo encontrado para "${buscaAtiva}"`}
          </p>
          <div className="space-y-3">
            {sugeridos.map((curriculo) => (
              <div key={curriculo.id} className="card flex items-center gap-4">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                  {curriculo.foto ? (
                    <Image src={curriculo.foto} alt={curriculo.nome} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center font-bold text-blue-600 bg-blue-50 text-sm">
                      {curriculo.nome?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{curriculo.nome}</p>
                  <p className="text-xs text-blue-600 truncate">{curriculo.cargo}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(curriculo.habilidades || []).slice(0, 4).map((h) => (
                      <span key={h} className="badge text-[10px] px-2 py-0">{h}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="relative h-12 w-12">
                    <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15.9" fill="none"
                        stroke={curriculo.aderencia >= 70 ? "#16a34a" : curriculo.aderencia >= 40 ? "#d97706" : "#dc2626"}
                        strokeWidth="3"
                        strokeDasharray={`${curriculo.aderencia} 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
                      {curriculo.aderencia}%
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-0.5">aderência</span>
                </div>
                <Link href={`/curriculos/visualizar/${curriculo.id}`} className="btn btn-outline text-xs flex-shrink-0">Ver</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function BadgeAnalise({ pontuacao }: { pontuacao: number; sugestoes: Sugestao[] }) {
  const cor =
    pontuacao >= 80 ? "text-green-600 bg-green-50 border-green-200"
    : pontuacao >= 50 ? "text-yellow-600 bg-yellow-50 border-yellow-200"
    : "text-red-600 bg-red-50 border-red-200";

  const icone =
    pontuacao >= 80 ? <FiCheckCircle size={14} />
    : pontuacao >= 50 ? <FiAlertTriangle size={14} />
    : <FiAlertCircle size={14} />;

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${cor}`}>
      {icone} Completude: {pontuacao}%
    </div>
  );
}

export function ListaSugestoes({ sugestoes }: { sugestoes: Sugestao[] }) {
  if (!sugestoes || sugestoes.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <FiCheckCircle size={15} /> Currículo completo! Nenhuma sugestão de melhoria.
      </div>
    );
  }
  return (
    <ul className="space-y-2">
      {sugestoes.map((s, i) => (
        <li key={i} className={`flex items-start gap-2 text-sm rounded-md px-3 py-2 ${s.tipo === "erro" ? "bg-red-50 text-red-700" : "bg-yellow-50 text-yellow-700"}`}>
          {s.tipo === "erro" ? <FiAlertCircle size={15} className="flex-shrink-0 mt-0.5" /> : <FiAlertTriangle size={15} className="flex-shrink-0 mt-0.5" />}
          {s.mensagem}
        </li>
      ))}
    </ul>
  );
}
