import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">Página não encontrada</h1>
        <p className="text-gray-500 text-sm mb-6">O endereço que você acessou não existe.</p>
        <Link href="/" className="btn-primary">Voltar ao início</Link>
      </div>
    </div>
  );
}
