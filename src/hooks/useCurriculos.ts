"use client";

import { useState, useEffect, useCallback } from "react";
import {
  listarCurriculos,
  criarCurriculo,
  buscarCurriculoPorId,
  atualizarCurriculo,
  excluirCurriculo,
} from "@/lib/curriculoService";
import { Curriculo } from "@/data/curriculos";

export function useCurriculos() {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const dados = await listarCurriculos();
      setCurriculos(dados);
    } catch (e) {
      console.error(e);
      setErro("Não foi possível carregar os currículos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  async function addCurriculo(dados: Omit<Curriculo, "id" | "createdAt" | "updatedAt">): Promise<string> {
    const id = await criarCurriculo(dados);
    await carregar();
    return id;
  }

  async function updateCurriculo(id: string, dados: Partial<Omit<Curriculo, "id">>): Promise<void> {
    await atualizarCurriculo(id, dados);
    await carregar();
  }

  async function deleteCurriculo(id: string): Promise<void> {
    await excluirCurriculo(id);
    setCurriculos((prev) => prev.filter((c) => c.id !== id));
  }

  function getCurriculo(id: string): Curriculo | null {
    return curriculos.find((c) => c.id === id) ?? null;
  }

  return { curriculos, loading, erro, carregar, addCurriculo, updateCurriculo, deleteCurriculo, getCurriculo };
}

export function useCurriculoDetalhe(id: string) {
  const [curriculo, setCurriculo] = useState<Curriculo | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    buscarCurriculoPorId(id)
      .then((dados) => {
        setCurriculo(dados);
        if (!dados) setErro("Currículo não encontrado.");
      })
      .catch(() => setErro("Erro ao buscar currículo."))
      .finally(() => setLoading(false));
  }, [id]);

  return { curriculo, loading, erro };
}
