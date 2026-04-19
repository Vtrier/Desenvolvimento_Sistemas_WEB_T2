import Link from "next/link";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { FiFileText, FiSearch, FiUserPlus, FiList } from "react-icons/fi";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="bg-white border-b border-gray-200 py-14">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Sistema de Gestão de Currículos
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto mb-8">
              Cadastre, visualize e gerencie currículos de candidatos de forma simples e organizada.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/curriculos/visualizar" className="btn-primary">
                Ver currículos
              </Link>
              <Link href="/curriculos/cadastrar" className="btn-outline">
                Cadastrar novo
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">
            O que você pode fazer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: FiUserPlus,
                title: "Cadastrar",
                desc: "Adicione candidatos com dados completos, experiências e formação.",
              },
              {
                icon: FiList,
                title: "Listar",
                desc: "Veja todos os currículos cadastrados em cards organizados.",
              },
              {
                icon: FiSearch,
                title: "Buscar",
                desc: "Filtre por nome ou cargo em tempo real.",
              },
              {
                icon: FiFileText,
                title: "Detalhes",
                desc: "Acesse o perfil completo de cada candidato.",
              },
            ].map((f) => (
              <div key={f.title} className="card text-center">
                <div className="flex justify-center mb-3">
                  <f.icon size={24} className="text-blue-600" />
                </div>
                <p className="font-semibold text-gray-800 mb-1">{f.title}</p>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 pb-12">
          <div className="rounded-lg bg-blue-600 text-white p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Comece agora</h2>
            <p className="text-blue-100 text-sm mb-5">
              Cadastre o primeiro currículo e organize seus candidatos.
            </p>
            <Link
              href="/curriculos/cadastrar"
              className="inline-flex items-center gap-2 rounded-md bg-white text-blue-600 px-5 py-2.5 text-sm font-semibold hover:bg-blue-50 transition-colors"
            >
              <FiUserPlus size={16} />
              Cadastrar currículo
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
