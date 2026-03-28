"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useVisibilityTracker } from "@/hooks/useVisibilityTracker";

export function ViewportTab() {
  const { visibleCount, visibleArray } = useVisibilityTracker();

  return (
    <Card className="h-full border-zinc-800 bg-zinc-900/50 shadow-none overflow-hidden flex flex-col">
          <div className="p-3 border-b border-zinc-800/30 flex justify-between items-center text-xs bg-zinc-950/50">
             <span className="text-zinc-500 font-mono uppercase tracking-wider">Nodes On-Screen</span>
             <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
               {visibleCount}
             </span>
          </div>
          <ScrollArea className="flex-1 p-4 h-[445px]">
            {visibleCount === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-zinc-500">
                <div className="text-4xl mb-2 opacity-50 transition-opacity">👁</div>
                <p className="text-sm font-medium text-emerald-500/50">No targets are intersecting</p>
                <p className="text-xs mt-1 text-center font-mono opacity-80">Scroll down to observe nodes...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {visibleArray.map(([id, ratio]) => (
                  <div key={id} className="flex items-center justify-between p-2 rounded-md bg-zinc-950 border border-zinc-800/70 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                    <span className="text-zinc-300 text-sm font-mono flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Node #{id}
                    </span>
                    <span className="text-emerald-400 text-[10px] font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded-sm border border-emerald-500/20">
                      {(ratio * 100).toFixed(0)}% visible
                    </span>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </Card>
  );
}
