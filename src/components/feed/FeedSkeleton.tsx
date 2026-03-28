import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function FeedSkeleton({ id }: { id: number }) {
  return (
    <Card className="bg-zinc-900/10 border-zinc-800/50 border-dashed transition-all duration-300 pointer-events-none opacity-50">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base text-zinc-500">
            Objeto Post_ID: {id}
          </CardTitle>
          <p className="text-xs text-zinc-600 font-mono">#{id}-alpha-node</p>
        </div>
        <Badge variant="secondary" className="bg-zinc-800/50 text-zinc-600">
          En espera...
        </Badge>
      </CardHeader>
      <CardContent>
        {/* Placeholder vacío */}
        <Skeleton className="h-[80px] w-full rounded-md bg-zinc-800/50" />
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" size="sm" className="h-8 text-xs text-zinc-400 hover:text-amber-400 hover:bg-amber-400/10">
          Pinear
        </Button>
        <Button variant="ghost" size="sm" className="h-8 text-xs text-zinc-400 hover:text-rose-400 hover:bg-rose-400/10">
          Eliminar Nodo
        </Button>
      </CardFooter>
    </Card>
  );
}
