export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between text-xs text-gray-400">
        <span>© {new Date().getFullYear()} CurrículoSENAI</span>
        <span>Sistema de Gestão de Currículos</span>
      </div>
    </footer>
  );
}
