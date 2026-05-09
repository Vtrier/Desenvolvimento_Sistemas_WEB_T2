"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const links = [
  { href: "/", label: "Início" },
  { href: "/curriculos/visualizar", label: "Currículos" },
  { href: "/curriculos/sugestoes", label: "Sugestões" },
  { href: "/curriculos/cadastrar", label: "Cadastrar" },
];

export function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-blue-600 text-lg">CurriculoSenai</Link>

        <nav className="hidden sm:flex items-center gap-1">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button className="sm:hidden p-1.5 text-gray-500" onClick={() => setAberto(!aberto)}>
          {aberto ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {aberto && (
        <div className="sm:hidden border-t border-gray-100 px-4 py-2 bg-white">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setAberto(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium mb-1 ${
                  active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
