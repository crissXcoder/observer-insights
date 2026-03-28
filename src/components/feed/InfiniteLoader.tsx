"use client";

import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export function InfiniteLoader({ 
  onLoadMore, 
  hasMore, 
  isLoading 
}: { 
  onLoadMore: () => void; 
  hasMore: boolean; 
  isLoading: boolean;
}) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  
  // Custom hook: Cuando el sentinel se vea al 10%, lanza isIntersecting
  const entry = useIntersectionObserver(sentinelRef, { threshold: 0.1 });

  // Cuando se intersecta, tenemos más paginas, y no estamos ya cargando, solicitamos data
  useEffect(() => {
    if (entry?.isIntersecting && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [entry?.isIntersecting, hasMore, isLoading, onLoadMore]);

  // Si ya agotamos la BD, mostramos el Fin.
  if (!hasMore) {
    return (
      <div className="h-12 w-full flex items-center justify-center mt-4 border border-zinc-800/50 rounded-lg">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          End of Data Stream Reached.
        </span>
      </div>
    );
  }

  // Centinela Activo
  return (
    <div 
      ref={sentinelRef}
      className={`h-12 w-full flex items-center justify-center mt-4 border border-dashed rounded-lg transition-colors ${
        isLoading ? 'border-amber-500/50 bg-amber-500/5' : 'border-zinc-800/80 bg-zinc-950/50'
      }`}
    >
      <span className={`text-xs font-mono tracking-wide ${isLoading ? 'text-amber-500/80 animate-pulse' : 'text-emerald-500/50'}`}>
        {isLoading ? '[FETCHING PAYLOAD...]' : 'Sentinel Ready for Intersection...'}
      </span>
    </div>
  );
}
