import { useState, useEffect } from "react";
import { FeedMetricsEvent } from "@/types/observer.types";

export function useFeedMetricsTracker() {
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const handleFeedMetrics = (e: Event) => {
      const customEvent = e as CustomEvent<FeedMetricsEvent>;
      setTotalItems(customEvent.detail.totalItems);
    };

    window.addEventListener('feed-metrics', handleFeedMetrics);
    return () => window.removeEventListener('feed-metrics', handleFeedMetrics);
  }, []);

  return { totalItems };
}
