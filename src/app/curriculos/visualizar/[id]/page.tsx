"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { CurriculoDetailSkeleton } from "@/components/ui/skeleton";
import { useCurriculos } from "@/hooks/useCurriculos";
import { Curriculo } from "@/data/curriculos";
import {
  FiArrowLeft, FiTrash2, FiMail, FiPhone, FiMapPin,
  FiCalendar, FiGithub, FiLinkedin,
} from "react-icons/fi";

export default function DetalhePage() {
  const params = useParams();
  const router = useRouter();
  const { getCurriculo, deleteCurriculo, loading } = useCurriculos();
  const [curriculo, setCurriculo] = useState<Curriculo | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!loading) {
      const found = getCurriculo(params.id as string);
      if (found) setCurriculo(found);
      else {
        toast.error("Currículo não encontrado");
        router.push("/curriculos/visualizar");
      }
    }
  }, [loading, params.id]);

  const handleDelete = async () => {
    if (!curriculo) return;
    if (!confirm(`Excluir o currículo de ${curriculo.nome}?`)) return;
    setDeleting(true);
    await new Promise((r) => setTimeout(r, 500));
    deleteCurriculo(curriculo.id);
    toast.success("Currículo excluído com sucesso.");
    router.push("/curriculos/visualizar");
  };

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
                      {curriculo.nome.charAt(0)}
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
                <button onClick={handleDelete} disabled={deleting} className="btn-danger text-xs flex-shrink-0">
                  {deleting
                    ? <span className="animate-spin inline-block h-3.5 w-3.5 border-2 border-red-300 border-t-red-600 rounded-full" />
                    : <FiTrash2 size={14} />}
                  Excluir
                </button>
              </div>
            </div>

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
                {curriculo.habilidades.map((h) => (
                  <span key={h} className="badge">{h}</span>
                ))}
              </div>
            </div>

            <div className="card">
              <p className="section-title">Experiência Profissional</p>
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
            </div>

            <div className="card">
              <p className="section-title">Formação Acadêmica</p>
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
