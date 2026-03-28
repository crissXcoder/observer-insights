import { FeedItem } from "../types/observer.types";

export const MOCK_FEED_DATA: FeedItem[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `System Pipeline Node #${i + 1000}`,
  excerpt: `Component initialization logs and operational payload verified for chunk ${i + 1}. No critical failures detected.`,
  category: i % 3 === 0 ? "Critical" : "Standard",
}));
