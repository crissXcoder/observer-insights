"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useVisibilityTracker } from "@/hooks/useVisibilityTracker";
import { useMutationTracker } from "@/hooks/useMutationTracker";
import { useFeedMetricsTracker } from "@/hooks/useFeedMetricsTracker";

export function OverviewMetrics() {
  const { totalItems } = useFeedMetricsTracker();
  const { visibleCount } = useVisibilityTracker();
  const { mutationsCount, lastMutation } = useMutationTracker(1);
  const activeSection = useActiveSection(["system-overview", "live-feed", "cluster-nodes"]);

  // Formato elegante para la última mutación
  const formatTime = (ts: number | undefined) => {
    if (!ts) return "---";
    const date = new Date(ts);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Tarjeta 1: Total de Nodos en DOM */}
      <Card className="group bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-zinc-400 uppercase tracking-widest group-hover:text-zinc-300 transition-colors">
            Nodes Observed
          </CardTitle>
          <div className="w-4 h-4 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all">
             <span className="text-[10px] text-emerald-400 font-bold">#</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight text-white drop-shadow-sm font-mono group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
            {totalItems}
          </div>
          <p className="text-xs text-zinc-500 mt-1 font-mono group-hover:text-emerald-500/80 transition-colors">
            + dynamically injected
          </p>
        </CardContent>
      </Card>

      {/* Tarjeta 2: Vistos actualmente */}
      <Card className="group bg-zinc-900/50 border-zinc-800/80 hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-zinc-400 uppercase tracking-widest group-hover:text-emerald-100 transition-colors">
            Nodes In Viewport
          </CardTitle>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)] group-hover:shadow-[0_0_15px_rgba(16,185,129,1)] transition-all" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight text-emerald-400 drop-shadow-sm font-mono">
             {visibleCount}
          </div>
          <p className="text-xs text-zinc-500 mt-1 font-mono group-hover:text-zinc-400 transition-colors">
             {totalItems > 0 ? ((visibleCount / totalItems) * 100).toFixed(0) : 0}% screen footprint
          </p>
        </CardContent>
      </Card>

      {/* Tarjeta 3: Total Mutaciones */}
      <Card className="group bg-zinc-900/50 border-zinc-800/80 hover:border-amber-500/30 hover:bg-zinc-900 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-zinc-400 uppercase tracking-widest group-hover:text-amber-100 transition-colors">
            DOM Mutations
          </CardTitle>
          <div className="w-4 h-4 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_12px_rgba(245,158,11,0.3)] transition-all">
             <span className="text-[10px] text-amber-500">⚡</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight text-amber-500 drop-shadow-sm font-mono group-hover:text-amber-400 transition-colors">
            {mutationsCount}
          </div>
          <p className="text-[10px] text-zinc-500 mt-1 font-mono truncate group-hover:text-amber-500/80 transition-colors" title={lastMutation?.summary || ""}>
             Last: {lastMutation ? `[${lastMutation.type}] ${formatTime(lastMutation.timestamp)}` : "None detected"}
          </p>
        </CardContent>
      </Card>

      {/* Tarjeta 4: Sección Activa de Tracking */}
      <Card className="group bg-zinc-900/50 border-zinc-800/80 hover:border-purple-500/30 hover:bg-zinc-900 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-zinc-400 uppercase tracking-widest group-hover:text-purple-100 transition-colors">
            Tracking Ray
          </CardTitle>
          <div className="w-4 h-4 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-[0_0_8px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all">
             <span className="text-[10px] text-purple-400">📍</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold tracking-tight text-purple-400 drop-shadow-sm font-mono capitalize truncate group-hover:text-purple-300 transition-colors mt-2 pb-1">
            {activeSection.replace('-', ' ') || "Scanning..."}
          </div>
          <p className="text-[10px] text-zinc-500 mt-1 font-mono uppercase tracking-widest group-hover:text-purple-500/80 transition-colors">
             Active Segment
          </p>
        </CardContent>
      </Card>

    </div>
  );
}
