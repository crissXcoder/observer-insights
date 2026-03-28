export interface FeedItem {
  id: number;
  title: string;
  excerpt: string;
  category: string;
}

export interface VisibilityEventDetail {
  id: number;
  isVisible: boolean;
  intersectionRatio: number;
}

export interface MutationLog {
  id: string; // Para iteración segura en React
  type: 'childList' | 'attributes' | 'characterData';
  targetNodeName: string;
  summary: string;
  timestamp: number;
}

export interface FeedMetricsEvent {
  totalItems: number;
}
