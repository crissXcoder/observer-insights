import { NextResponse } from 'next/server';
import { FeedItem } from '@/types/observer.types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '4', 10);

  // Artificial delay de 800ms para simular la latencia real de red y poder apreciar los Skeletons
  await new Promise((resolve) => setTimeout(resolve, 800));

  const items: FeedItem[] = Array.from({ length: limit }, (_, i) => {
    const absoluteIndex = (page - 1) * limit + i;
    return {
      id: absoluteIndex + 1,
      title: `System Pipeline Node #${absoluteIndex + 1000}`,
      excerpt: `System metric batch ${absoluteIndex + 1} processed successfully. No critical failures detected during pipeline inspection.`,
      category: absoluteIndex % 3 === 0 ? "Critical" : "Standard",
    };
  });

  // Limitamos a 5 páginas (20 items) para que el demo tenga un fin natural
  const hasMore = page < 5; 

  return NextResponse.json({ items, hasMore });
}
