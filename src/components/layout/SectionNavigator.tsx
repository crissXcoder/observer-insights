"use client";

import { useActiveSection } from "@/hooks/useActiveSection";

const SECTIONS = [
  { id: "system-overview", title: "System Overview" },
  { id: "live-feed", title: "Live Event Feed" },
  { id: "cluster-nodes", title: "Cluster Topology" },
];

export function SectionNavigator() {
  // Solo pasamos el arreglo de IDs a nuestro potente Hook. El resto es magia del navegador.
  const activeSection = useActiveSection(SECTIONS.map(s => s.id));

  // Animación de Scroll Suave al hacer clic sin modificar la URL nativamente
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Restamos los 60px del Fixed Header
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="flex flex-col h-full rounded-xl border border-zinc-800/50 bg-zinc-900/20 py-6 px-4 transition-all hover:border-zinc-700/50">
      <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 border-b border-zinc-800/50 pb-2">
        Table of Contents
      </h3>
      <ul className="space-y-2 flex-col flex text-sm">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => handleClick(e, section.id)}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-md transition-all duration-300 font-medium text-[13px] ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500 pl-4 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 border-l-2 border-transparent hover:border-zinc-700"
                }`}
              >
                {section.title}
                <span className={`text-[10px] font-mono opacity-0 transition-opacity duration-300 ${isActive ? 'opacity-100 text-emerald-500/50' : 'group-hover:opacity-100 text-zinc-600'}`}>
                  {isActive ? "ACTIVE" : "GOTO"}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      
      {/* Footer del Navigator */}
      <div className="mt-auto border-t border-zinc-800/40 pt-4 flex flex-col gap-1 items-start">
        <span className="text-[10px] text-zinc-600 font-mono tracking-widest bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 relative shadow-[0_0_10px_rgba(0,0,0,0.5)]">
          <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500/50 -right-0.5 -top-0.5 animate-pulse" />
          Intersection Track
        </span>
        <span className="text-[10px] text-zinc-600 font-mono px-2">Watcher Active 👁</span>
      </div>
    </nav>
  );
}
