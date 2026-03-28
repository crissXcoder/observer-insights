import React from "react";

export function DashboardLayout({ 
  children, 
  sidebar, 
  navigator 
}: { 
  children: React.ReactNode, 
  sidebar: React.ReactNode,
  navigator?: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-zinc-950 font-sans antialiased text-zinc-100 selection:bg-emerald-500/30">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 py-6">
        {/* Usamos un grid robusto. 1 columna en movil, 2 en grandes, 3 en extras-grandes */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_350px] xl:grid-cols-[250px_1fr_350px]">
          
          {/* Navigator Lateral Izquierdo (TOC) - Solo apilable en pantallas extra anchas */}
          {navigator && (
            <aside className="hidden xl:block relative">
              <div className="sticky top-[5.5rem] h-[calc(100vh-8rem)]">
                {navigator}
              </div>
            </aside>
          )}

          {/* Módulo Central: The Sections & Feed */}
          <main className="flex flex-col gap-12 w-full max-w-full overflow-hidden">
            {children}
          </main>
          
          {/* Módulo Lateral Derecho Fijo: Analytics & Logs */}
          <aside className="hidden lg:block relative">
            <div className="sticky top-[5.5rem] h-[calc(100vh-8rem)]">
              {sidebar}
            </div>
          </aside>
          
        </div>
      </div>
    </div>
  );
}
