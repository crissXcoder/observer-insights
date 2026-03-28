import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DemoControlsProps {
  onInject: () => void;
  onPurge: () => void;
  onScramble: () => void;
  onSyncClock: () => void;
  isScrambled: boolean;
}

export function DemoControls({
  onInject,
  onPurge,
  onScramble,
  onSyncClock,
  isScrambled,
}: DemoControlsProps) {
  return (
    <div className="flex flex-wrap gap-2 p-3 bg-zinc-950/80 rounded-lg border border-zinc-800/80 mb-2 items-center justify-between col-span-full z-20 sticky top-0 backdrop-blur-md">
      <div className="flex gap-2 items-center">
        <Badge
          variant="outline"
          className="text-zinc-500 border-zinc-800 uppercase tracking-widest text-[9px] cursor-help"
          title="Estos controles dispararán mutaciones forzadas reales capturables por el Observer"
        >
          Mutation Triggers
        </Badge>
        <span className="text-[10px] text-zinc-600 hidden sm:inline">
          (Interactive Demo Tools)
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={onInject}
          variant="outline"
          size="sm"
          className="h-7 text-[10px] border-blue-500/20 text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 uppercase tracking-wider"
          title="Desencadena una mutación tipo: childList (Added)"
        >
          Inyectar Alerta
        </Button>
        <Button
          onClick={onPurge}
          variant="outline"
          size="sm"
          className="h-7 text-[10px] border-rose-500/20 text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 uppercase tracking-wider"
          title="Desencadena una mutación tipo: childList (Removed)"
        >
          Purgar Nodos
        </Button>
        <Button
          onClick={onScramble}
          variant="outline"
          size="sm"
          className={`h-7 text-[10px] uppercase tracking-wider transition-all duration-500 border-amber-500/20 ${
            isScrambled
              ? "bg-amber-500/30 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
              : "text-amber-400 bg-amber-500/5 hover:bg-amber-500/10"
          }`}
          title="Desencadena una mutación tipo: attributes (Dataset Change)"
        >
          Alternar Atributos
        </Button>
        <Button
          onClick={onSyncClock}
          variant="outline"
          size="sm"
          className="h-7 text-[10px] border-purple-500/20 text-purple-400 bg-purple-500/5 hover:bg-purple-500/10 uppercase tracking-wider"
          title="Desencadena una mutación tipo: characterData (TextNode change bypass)"
        >
          Mutar Texto Bruto
        </Button>
      </div>
    </div>
  );
}
