import Link from "next/link";
import { FiFileText } from "react-icons/fi";

export function EmptyState({ filtered = false }: { filtered?: boolean }) {
  return (
    <div className="text-center py-16">
      <FiFileText size={40} className="text-gray-300 mx-auto mb-3" />
      <p className="font-medium text-gray-700 mb-1">
        {filtered ? "Nenhum resultado encontrado" : "Nenhum currículo cadastrado"}
      </p>
      <p className="text-sm text-gray-400 mb-5">
        {filtered
          ? "Tente buscar por outro nome ou cargo."
          : "Cadastre o primeiro currículo para começar."}
      </p>
      {!filtered && (
        <Link href="/curriculos/cadastrar" className="btn-primary">
          Cadastrar currículo
        </Link>
      )}
    </div>
  );
}
