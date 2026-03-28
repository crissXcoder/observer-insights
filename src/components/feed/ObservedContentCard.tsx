"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { FeedItem, VisibilityEventDetail } from "@/types/observer.types";

export function ObservedContentCard({ item }: { item: FeedItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Estados para provocar mutaciones intencionales en el DOM
  const [isDeleted, setIsDeleted] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const entry = useIntersectionObserver(cardRef, {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  });

  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isDeleted) return; // Si la card muere, abortamos el dispatch

    const detail: VisibilityEventDetail = {
      id: item.id,
      isVisible,
      intersectionRatio: entry?.intersectionRatio || 0
    };
    window.dispatchEvent(new CustomEvent('visibility-change', { detail }));
    
    return () => {
      if (isVisible) {
         window.dispatchEvent(new CustomEvent('visibility-change', { detail: { ...detail, isVisible: false } }));
      }
    }
  }, [isVisible, item.id, entry?.intersectionRatio, isDeleted]);

  // Si fue eliminado, React remueve el nodo del Virtual DOM.
  // Esto desencadenará un "childList" mutation en el contenedor padre.
  if (isDeleted) return null;

  return (
    <Card 
      ref={cardRef} 
      // Si está pineado, inyectamos un atributo custom. Esto desencadenará un "attributes" mutation.
      data-pinned={isPinned ? "true" : undefined}
      className={`group relative overflow-hidden transition-all duration-700 ease-out border ${
        isPinned ? "border-amber-500 bg-zinc-900/90 shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/20" :
        isVisible 
          ? "border-emerald-500/30 hover:border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-zinc-900 translate-y-0 opacity-100" 
          : "border-zinc-800/80 bg-zinc-900/40 translate-y-4 opacity-40 scale-[0.98]"
      }`}
    >
      <div className={`absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none ${isVisible ? 'group-hover:opacity-100' : ''}`} />
      
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 pb-2 relative z-10">
        <div className="space-y-1">
          <CardTitle className="text-base text-zinc-200 group-hover:text-emerald-50 transition-colors">
            {item.title} {isPinned && <span className="text-amber-500 mb-1 ml-2 inline-block drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">📌</span>}
          </CardTitle>
          <p className="text-xs text-zinc-500 font-mono group-hover:text-zinc-400 transition-colors">#{item.id}-alpha-node</p>
        </div>
        
        {isVisible ? (
          <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 bg-emerald-500/10 transition-all">
            [On-Screen]
          </Badge>
        ) : (
          <Badge variant="secondary" className="bg-zinc-800 text-zinc-600 transition-all">
            Out of view
          </Badge>
        )}
      </CardHeader>
      
      <CardContent>
        {/* Habilitamos contentEditable para desencadenar mutaciones de "characterData" orgánicas */}
        <p 
          className={`text-sm ${isVisible ? "text-zinc-300" : "text-zinc-600"} transition-colors duration-500 rounded-md p-1 ${isEditing ? "bg-zinc-800/80 outline-none ring-1 ring-emerald-500/50" : ""}`}
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
        >
          {item.excerpt}
        </p>
        
        <div className="mt-4 flex gap-2">
           <Badge variant="outline" className="text-[10px] text-zinc-500 border-zinc-700 bg-transparent">
             {item.category}
           </Badge>
           {isEditing && (
             <Badge variant="default" className="text-[10px] bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse">
               Editing Active
             </Badge>
           )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 pt-2 border-t border-zinc-800/30">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsPinned(!isPinned)}
          className={`h-8 text-xs ${isPinned ? "text-amber-400 hover:bg-amber-400/10" : "text-zinc-400 hover:text-amber-400 hover:bg-amber-400/10"}`}
        >
          {isPinned ? "Unpin Node" : "Pin Node"}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsEditing(!isEditing)}
          className="h-8 text-xs text-zinc-400 hover:text-emerald-400 hover:bg-emerald-400/10"
        >
          {isEditing ? "Lock Data" : "Edit Text"}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsDeleted(true)}
          className="h-8 text-xs text-zinc-400 hover:text-rose-400 hover:bg-rose-400/10"
        >
          Destroy
        </Button>
      </CardFooter>
    </Card>
  );
}
