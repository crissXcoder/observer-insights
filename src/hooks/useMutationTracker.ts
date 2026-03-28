import { useState, useEffect } from "react";
import { MutationLog } from "@/types/observer.types";

export function useMutationTracker(maxLogs: number = 30) {
  const [mutationLogs, setMutationLogs] = useState<MutationLog[]>([]);
  const [mutationsCount, setMutationsCount] = useState(0);

  useEffect(() => {
    const handleMutation = (e: Event) => {
      const customEvent = e as CustomEvent<MutationLog>;
      setMutationsCount(prev => prev + 1);
      setMutationLogs(prev => [customEvent.detail, ...prev].slice(0, maxLogs));
    };

    window.addEventListener('dom-mutation', handleMutation);
    return () => window.removeEventListener('dom-mutation', handleMutation);
  }, [maxLogs]);

  return {
    mutationLogs,
    mutationsCount,
    lastMutation: mutationLogs.length > 0 ? mutationLogs[0] : null
  };
}
