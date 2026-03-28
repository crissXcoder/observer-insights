"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ObservedContentCard } from "./ObservedContentCard";
import { FeedSkeleton } from "./FeedSkeleton";
import { InfiniteLoader } from "./InfiniteLoader";
import { DemoControls } from "./DemoControls";
import { FeedItem } from "@/types/observer.types";
import { useMutationObserver } from "@/hooks/useMutationObserver";
import { parseMutationRecord } from "@/lib/mutation-parser";

export function ContentFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrambled, setIsScrambled] = useState(false);
  
  const feedContainerRef = useRef<HTMLDivElement>(null);
  const syncClockRef = useRef<HTMLSpanElement>(null);

  // Instanciamos el MutationObserver sobre todo el contenedor de la lista.
  // Observará inserciones (infinite scroll), borrados, ediciones de texto y cambios de estado.
  useMutationObserver(
    feedContainerRef,
    (mutations) => {
      mutations.forEach((mutation) => {
        const parsedLog = parseMutationRecord(mutation);

        if (parsedLog) {
           window.dispatchEvent(new CustomEvent('dom-mutation', {
             detail: parsedLog
           }));
        }
      });
    },
    { childList: true, subtree: true, attributes: true, characterData: true, attributeOldValue: true }
  );

  const handleInjectAlert = useCallback(() => {
    setItems(prev => [
      {
         id: 880000 + Math.floor(Math.random() * 999),
         title: "🚨 SYSTEM ALERT: Socket Push",
         excerpt: "Injected payload from simulated WebSocket. This triggered a `childList` addition.",
         category: "RT_EVENT"
      },
      ...prev
    ]);
  }, []);

  const handlePurgeStale = useCallback(() => {
    setItems(prev => {
      if (prev.length <= 2) return [];
      return prev.slice(0, prev.length - 2); 
    });
  }, []);

  const handleScrambleAttributes = useCallback(() => {
    setIsScrambled(prev => !prev);
  }, []);

  const handleSyncClock = useCallback(() => {
    if (syncClockRef.current && syncClockRef.current.firstChild) {
      // Modificación BRUTA directa al nodo de texto para evadir el VDOM y obligar
      // al navegador a emitir un 'characterData' puro en Mutations.
      syncClockRef.current.firstChild.nodeValue = `${Date.now()}ms`;
    }
  }, []);

  const loadContent = useCallback(async (pageNumber: number) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/feed?page=${pageNumber}&limit=3`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      setItems((prev) => {
        const existingIds = new Set(prev.map(i => i.id));
        const newItems = data.items.filter((item: FeedItem) => !existingIds.has(item.id));
        return [...prev, ...newItems];
      });
      
      setHasMore(data.hasMore);
      setPage(pageNumber + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      loadContent(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // Emitir métricas de total de elementos cargados dinámicamente al System Overview
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('feed-metrics', { detail: { totalItems: items.length } }));
  }, [items.length]);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/20 p-4 relative overflow-hidden shadow-lg">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/50 relative z-10">
        <h2 className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
          Data Stream <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </h2>
        <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded tracking-widest flex items-center gap-1 border border-amber-500/20">
          MUTATION OBSERVER: ACTIVE
        </span>
      </div>
      
      <DemoControls 
        onInject={handleInjectAlert}
        onPurge={handlePurgeStale}
        onScramble={handleScrambleAttributes}
        onSyncClock={handleSyncClock}
        isScrambled={isScrambled}
      />
      
      {/* Contenedor central. Este ref activa the Mutation Observer general */}
      <div 
        ref={feedContainerRef} 
        data-encryption-scrambled={isScrambled ? "true" : undefined}
        className={`flex flex-col gap-4 min-h-[300px] transition-all duration-500 ease-in-out ${isScrambled ? "scale-[0.99] opacity-80" : ""}`}
      >
        <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono bg-zinc-950/30 p-2 rounded-md border border-zinc-800/30">
          <span>Root Container (Observed)</span>
          <span className="flex items-center gap-2">
            Pulsing Sync: 
            <span ref={syncClockRef} className="text-purple-400 font-bold bg-purple-500/10 px-1 rounded">1000ms</span>
          </span>
        </div>

        {items.map((item) => (
          <ObservedContentCard key={item.id} item={item} />
        ))}
        
        {isLoading && items.length > 0 && (
          <>
            <FeedSkeleton id={9901} />
            <FeedSkeleton id={9902} />
          </>
        )}
      </div>
      
      <InfiniteLoader 
        hasMore={hasMore} 
        isLoading={isLoading} 
        onLoadMore={() => loadContent(page)} 
      />
    </div>
  );
}
