import { Curriculo } from "@/data/curriculos";

export interface Sugestao {
  tipo: "erro" | "aviso";
  campo: string;
  mensagem: string;
}

export interface Analise {
  pontuacao: number;
  sugestoes: Sugestao[];
}

export function analisarCurriculo(curriculo: Curriculo): Analise {
  const sugestoes: Sugestao[] = [];
  let pontuacao = 100;

  if (!curriculo.resumo || curriculo.resumo.trim().length < 100) {
    sugestoes.push({
      tipo: "aviso",
      campo: "resumo",
      mensagem:
        curriculo.resumo?.trim().length > 0
          ? `Resumo muito curto (${curriculo.resumo.trim().length} caracteres). Recomendamos ao menos 100.`
          : "Resumo profissional não preenchido.",
    });
    pontuacao -= 20;
  }

  if (!curriculo.experiencias || curriculo.experiencias.length === 0) {
    sugestoes.push({ tipo: "erro", campo: "experiencias", mensagem: "Nenhuma experiência profissional cadastrada." });
    pontuacao -= 25;
  }

  if (!curriculo.formacoes || curriculo.formacoes.length === 0) {
    sugestoes.push({ tipo: "erro", campo: "formacoes", mensagem: "Nenhuma formação acadêmica cadastrada." });
    pontuacao -= 20;
  }

  const numHabilidades = Array.isArray(curriculo.habilidades) ? curriculo.habilidades.length : 0;
  if (numHabilidades < 3) {
    sugestoes.push({ tipo: "aviso", campo: "habilidades", mensagem: `Poucas habilidades (${numHabilidades}). Adicione ao menos 3.` });
    pontuacao -= 15;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!curriculo.email || !emailRegex.test(curriculo.email)) {
    sugestoes.push({ tipo: "erro", campo: "email", mensagem: "E-mail inválido ou não preenchido." });
    pontuacao -= 10;
  }

  if (!curriculo.telefone || curriculo.telefone.replace(/\D/g, "").length < 10) {
    sugestoes.push({ tipo: "aviso", campo: "telefone", mensagem: "Telefone inválido ou incompleto." });
    pontuacao -= 10;
  }

  return { pontuacao: Math.max(0, pontuacao), sugestoes };
}

export interface CurriculoComAderencia extends Curriculo {
  aderencia: number;
}

export function sugerirCurriculos(curriculos: Curriculo[], busca: string): CurriculoComAderencia[] {
  if (!busca.trim()) return [];

  const termos = busca.toLowerCase().split(/[\s,]+/).filter(Boolean);

  const resultado = curriculos.map((curriculo) => {
    const habilidades = (curriculo.habilidades || []).map((h) => h.toLowerCase());
    const cargo = (curriculo.cargo || "").toLowerCase();
    const resumo = (curriculo.resumo || "").toLowerCase();

    let matches = 0;
    for (const termo of termos) {
      if (habilidades.some((h) => h.includes(termo)) || cargo.includes(termo) || resumo.includes(termo)) {
        matches++;
      }
    }

    const aderencia = termos.length > 0 ? Math.round((matches / termos.length) * 100) : 0;
    return { ...curriculo, aderencia };
  });

  return resultado.filter((c) => c.aderencia > 0).sort((a, b) => b.aderencia - a.aderencia);
}
