"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useMutationTracker } from "@/hooks/useMutationTracker";

export function MutationAuditTab() {
  const { mutationLogs } = useMutationTracker(40);

  return (
        <Card className="h-full border-zinc-800 bg-zinc-950 font-mono text-xs shadow-none flex flex-col overflow-hidden">
             <div className="p-3 border-b border-zinc-800/30 text-zinc-500 uppercase tracking-wider bg-zinc-900/40 flex justify-between items-center z-10">
               <span>Watcher Terminal</span>
               {mutationLogs.length > 0 && (
                 <Badge variant="outline" className="text-[9px] bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse">Recording ({mutationLogs.length})</Badge>
               )}
             </div>
             <ScrollArea className="flex-1 p-4 h-[445px]">
                 <div className="flex flex-col gap-4">
                     <div className="flex gap-2 text-zinc-500">
                       <span className="text-amber-500 bg-amber-500/10 px-1 rounded border border-amber-500/20">[READY]</span>
                       <span className="text-zinc-400">Listening strictly to mutations...</span>
                     </div>
                     
                     <div className="flex flex-col-reverse gap-3 mt-4">
                       {mutationLogs.map((log) => {
                         const date = new Date(log.timestamp);
                         const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
                         
                         let badgeColor = "bg-zinc-800/80 text-zinc-400";
                         if (log.type === 'childList') badgeColor = "bg-rose-500/10 text-rose-400 border border-rose-500/20";
                         else if (log.type === 'attributes') badgeColor = "bg-blue-500/10 text-blue-400 border border-blue-500/20";
                         else if (log.type === 'characterData') badgeColor = "bg-purple-500/10 text-purple-400 border border-purple-500/20";

                         return (
                           <div key={log.id} className="flex flex-col gap-1 p-2 rounded border border-zinc-800/40 bg-zinc-900/30 hover:bg-zinc-800/40 transition-colors animate-in fade-in slide-in-from-left-2 duration-300">
                             <div className="flex justify-between items-center text-[10px] text-zinc-600">
                               <span className="text-emerald-500/80 drop-shadow-[0_0_2px_rgba(16,185,129,0.3)]">{timeStr}</span>
                               <span className="font-semibold">{"<" + log.targetNodeName + ">"}</span>
                             </div>
                             <div className="flex gap-2 items-start mt-1 cursor-default hover:text-white transition-colors">
                               <span className={`px-1.5 rounded uppercase text-[9px] font-bold tracking-widest mt-0.5 ${badgeColor}`}>
                                 {log.type}
                               </span>
                               <span className="text-zinc-300 flex-1 wrap-break-word leading-relaxed">{log.summary}</span>
                             </div>
                           </div>
                         );
                       })}
                     </div>
                 </div>
             </ScrollArea>
        </Card>
  );
}
