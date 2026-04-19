"use client";

import { useState, useEffect } from "react";
import { Curriculo, MOCK_CURRICULOS } from "@/data/curriculos";

const STORAGE_KEY = "curriculos_data";

export function useCurriculos() {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setCurriculos(JSON.parse(stored));
        } else {
          setCurriculos(MOCK_CURRICULOS);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_CURRICULOS));
        }
      } catch {
        setCurriculos(MOCK_CURRICULOS);
      }
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const addCurriculo = (curriculo: Omit<Curriculo, "id" | "createdAt">) => {
    const novo: Curriculo = {
      ...curriculo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...curriculos, novo];
    setCurriculos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return novo;
  };

  const deleteCurriculo = (id: string) => {
    const updated = curriculos.filter((c) => c.id !== id);
    setCurriculos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const getCurriculo = (id: string) => {
    return curriculos.find((c) => c.id === id);
  };

  return { curriculos, loading, addCurriculo, deleteCurriculo, getCurriculo };
}
