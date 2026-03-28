import { useState, useEffect } from "react";
import { VisibilityEventDetail } from "@/types/observer.types";

export function useVisibilityTracker() {
  const [visibleItems, setVisibleItems] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    const handleVisibility = (e: Event) => {
      const customEvent = e as CustomEvent<VisibilityEventDetail>;
      const { id, isVisible, intersectionRatio } = customEvent.detail;
      
      setVisibleItems(prev => {
        const next = new Map(prev);
        if (isVisible) {
          next.set(id, intersectionRatio);
        } else {
          next.delete(id);
        }
        return next;
      });
    };

    window.addEventListener('visibility-change', handleVisibility);
    return () => window.removeEventListener('visibility-change', handleVisibility);
  }, []);

  return {
    visibleItems,
    visibleCount: visibleItems.size,
    visibleArray: Array.from(visibleItems.entries())
  };
}
