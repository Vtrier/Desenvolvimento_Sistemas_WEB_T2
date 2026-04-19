import Link from "next/link";
import Image from "next/image";
import { Curriculo } from "@/data/curriculos";
import { FiMapPin, FiMail, FiPhone, FiArrowRight } from "react-icons/fi";

export function CurriculoCard({ curriculo }: { curriculo: Curriculo }) {
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative h-11 w-11 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
          {curriculo.foto ? (
            <Image src={curriculo.foto} alt={curriculo.nome} fill className="object-cover" unoptimized />
          ) : (
            <div className="h-full w-full flex items-center justify-center font-bold text-blue-600 bg-blue-50">
              {curriculo.nome.charAt(0)}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 truncate">{curriculo.nome}</p>
          <p className="text-sm text-blue-600 truncate">{curriculo.cargo}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-3">
        <span className="flex items-center gap-1"><FiMapPin size={11} />{curriculo.cidade}, {curriculo.estado}</span>
        <span className="flex items-center gap-1"><FiMail size={11} />{curriculo.email}</span>
        <span className="flex items-center gap-1"><FiPhone size={11} />{curriculo.telefone}</span>
      </div>

      <p className="text-xs text-gray-500 line-clamp-2 mb-3">{curriculo.resumo}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {curriculo.habilidades.slice(0, 4).map((h) => (
          <span key={h} className="badge">{h}</span>
        ))}
        {curriculo.habilidades.length > 4 && (
          <span className="badge-gray">+{curriculo.habilidades.length - 4}</span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">{curriculo.experiencias.length} experiência(s)</span>
        <Link href={`/curriculos/visualizar/${curriculo.id}`} className="btn-primary text-xs py-1.5 px-3">
          Ver perfil
        </Link>
      </div>
    </div>
  );
}
