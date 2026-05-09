"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { CurriculoDetailSkeleton } from "@/components/ui/skeleton";
import { BadgeAnalise, ListaSugestoes } from "@/components/curriculos/SugestoesCurriculo";
import { useCurriculoDetalhe, useCurriculos } from "@/hooks/useCurriculos";
import { analisarCurriculo } from "@/utils/sugestoesCurriculo";
import {
  FiArrowLeft, FiTrash2, FiEdit2,
  FiMail, FiPhone, FiMapPin, FiCalendar,
  FiGithub, FiLinkedin,
} from "react-icons/fi";

export default function DetalhePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const router = useRouter();
  const { curriculo, loading, erro } = useCurriculoDetalhe(id);
  const { deleteCurriculo } = useCurriculos();
  const [deleting, setDeleting] = useState(false);

  if (erro) {
    toast.error(erro);
    router.push("/curriculos/visualizar");
    return null;
  }

  async function handleDelete() {
    if (!curriculo) return;
    if (!confirm(`Excluir o currículo de ${curriculo.nome}?`)) return;
    setDeleting(true);
    try {
      await deleteCurriculo(curriculo.id);
      toast.success("Currículo excluído com sucesso.");
      router.push("/curriculos/visualizar");
    } catch {
      toast.error("Erro ao excluir currículo.");
      setDeleting(false);
    }
  }

  const analise = curriculo ? analisarCurriculo(curriculo) : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <Link href="/curriculos/visualizar" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6">
          <FiArrowLeft size={14} /> Voltar
        </Link>

        {loading || !curriculo ? (
          <CurriculoDetailSkeleton />
        ) : (
          <div className="space-y-4">
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                  {curriculo.foto ? (
                    <Image src={curriculo.foto} alt={curriculo.nome} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center font-bold text-blue-600 bg-blue-50 text-xl">
                      {curriculo.nome?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl font-bold text-gray-900">{curriculo.nome}</h1>
                  <p className="text-blue-600 font-medium text-sm">{curriculo.cargo}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><FiMapPin size={13} />{curriculo.cidade}, {curriculo.estado}</span>
                    <a href={`mailto:${curriculo.email}`} className="flex items-center gap-1 hover:text-blue-600"><FiMail size={13} />{curriculo.email}</a>
                    <span className="flex items-center gap-1"><FiPhone size={13} />{curriculo.telefone}</span>
                    <span className="flex items-center gap-1"><FiCalendar size={13} />{curriculo.dataNascimento}</span>
                  </div>
                  {(curriculo.linkedin || curriculo.github) && (
                    <div className="flex gap-3 mt-2">
                      {curriculo.linkedin && (
                        <a href={`https://${curriculo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
                          <FiLinkedin size={13} /> LinkedIn
                        </a>
                      )}
                      {curriculo.github && (
                        <a href={`https://${curriculo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900">
                          <FiGithub size={13} /> GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Link href={`/curriculos/editar/${curriculo.id}`} className="btn btn-outline text-xs">
                    <FiEdit2 size={13} /> Editar
                  </Link>
                  <button onClick={handleDelete} disabled={deleting} className="btn btn-danger text-xs">
                    {deleting
                      ? <span className="animate-spin inline-block h-3.5 w-3.5 border-2 border-red-300 border-t-red-600 rounded-full" />
                      : <FiTrash2 size={13} />}
                    Excluir
                  </button>
                </div>
              </div>

              {analise && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <BadgeAnalise pontuacao={analise.pontuacao} sugestoes={analise.sugestoes} />
                </div>
              )}
            </div>

            {analise && analise.sugestoes.length > 0 && (
              <div className="card">
                <p className="section-title">Sugestões de melhoria</p>
                <ListaSugestoes sugestoes={analise.sugestoes} />
              </div>
            )}

            <div className="card">
              <p className="section-title">Dados Pessoais</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Info label="CPF" value={curriculo.cpf} />
                <Info label="Data de Nascimento" value={curriculo.dataNascimento} />
                <Info label="Cidade" value={`${curriculo.cidade}, ${curriculo.estado}`} />
                <Info label="E-mail" value={curriculo.email} />
              </div>
            </div>

            <div className="card">
              <p className="section-title">Resumo Profissional</p>
              <p className="text-sm text-gray-600 leading-relaxed">{curriculo.resumo}</p>
            </div>

            <div className="card">
              <p className="section-title">Habilidades</p>
              <div className="flex flex-wrap gap-2">
                {(curriculo.habilidades || []).map((h) => (
                  <span key={h} className="badge">{h}</span>
                ))}
              </div>
            </div>

            <div className="card">
              <p className="section-title">Experiência Profissional</p>
              {curriculo.experiencias?.length > 0 ? (
                <div className="space-y-4">
                  {curriculo.experiencias.map((exp, i) => (
                    <div key={i} className="pl-4 border-l-2 border-blue-200">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{exp.cargo}</p>
                          <p className="text-blue-600 text-sm">{exp.empresa}</p>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">{exp.dataInicio} — {exp.dataFim}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{exp.descricao}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">Nenhuma experiência cadastrada.</p>
              )}
            </div>

            <div className="card">
              <p className="section-title">Formação Acadêmica</p>
              {curriculo.formacoes?.length > 0 ? (
                <div className="space-y-4">
                  {curriculo.formacoes.map((form, i) => (
                    <div key={i} className="pl-4 border-l-2 border-green-200">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{form.curso}</p>
                          <p className="text-gray-500 text-sm">{form.instituicao}</p>
                          <span className="badge-gray mt-1 inline-block">{form.nivel}</span>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">{form.dataInicio} — {form.dataFim}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">Nenhuma formação cadastrada.</p>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm text-gray-800 font-medium">{value}</p>
    </div>
  );
}
