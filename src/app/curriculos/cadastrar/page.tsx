import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { CurriculoForm } from "@/components/curriculos/CurriculoForm";

export default function CadastrarPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Cadastrar Currículo</h1>
          <p className="text-sm text-gray-500 mt-1">Preencha os dados do candidato.</p>
        </div>
        <CurriculoForm />
      </main>
      <Footer />
    </div>
  );
}
