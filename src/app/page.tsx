import { Header } from "@/components/layout/Header";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionNavigator } from "@/components/layout/SectionNavigator";
import { ContentFeed } from "@/components/feed/ContentFeed";
import { MetricsSidebar } from "@/components/analytics/MetricsSidebar";
import { OverviewMetrics } from "@/components/analytics/OverviewMetrics";

export default function InsightsAppDashboard() {
  return (
    <>
      <Header />
      <DashboardLayout 
        navigator={<SectionNavigator />}
        sidebar={<MetricsSidebar />}
      >
        
        {/* Sección 1: System Overview */}
        <section id="system-overview" className="scroll-mt-24">
           <div className="flex flex-col gap-2 mb-2 border-b border-zinc-800/80 pb-4">
             <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">System Overview</h2>
             <p className="text-sm text-zinc-400">Estado de la transmisión global de la red central de nodos.</p>
           </div>
           
           <OverviewMetrics />
        </section>

        {/* Sección 2: El Feed Crítico Interactivo */}
        <section id="live-feed" className="scroll-mt-24">
          <div className="flex flex-col gap-2 mb-6 border-b border-zinc-800/80 pb-4">
             <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">Live Event Feed</h2>
             <p className="text-sm text-zinc-400">Entradas del sistema rastreadas dinámicamente con IntersectionObserver.</p>
           </div>
          {/* Aquí inyectamos el feed asíncrono que ya creamos */}
          <ContentFeed />
        </section>

        {/* Sección 3: Cluster Nodes Mock */}
        <section id="cluster-nodes" className="scroll-mt-24 mb-12">
           <div className="flex flex-col gap-2 mb-6 border-b border-zinc-800/80 pb-4">
             <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">Cluster Topology</h2>
             <p className="text-sm text-zinc-400">Distribución perimetral de los servidores emulados.</p>
           </div>

           <div className="h-72 rounded-xl border border-dashed border-zinc-800/80 bg-zinc-950/50 p-6 flex flex-col items-center justify-center">
             <span className="text-zinc-500 font-mono mb-8 text-xs bg-zinc-900 px-3 py-1 rounded">Topology visualization...</span>
             <div className="flex gap-8 relative items-center">
               <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800/50 -z-10 -translate-y-1/2" />
               <div className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-emerald-500/50 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.15)] text-emerald-400 font-mono text-xl z-10 transition-transform hover:scale-110">1</div>
               <div className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-amber-500/50 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.15)] text-amber-400 font-mono text-xl z-10 transition-transform hover:scale-110">2</div>
               <div className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-rose-500/50 flex items-center justify-center shadow-[0_0_25px_rgba(244,63,94,0.15)] text-rose-400 font-mono text-xl z-10 transition-transform hover:scale-110">3</div>
             </div>
           </div>
        </section>

      </DashboardLayout>
    </>
  );
}
