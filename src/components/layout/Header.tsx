import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl supports-backdrop-filter:bg-zinc-950/50 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <div className="container flex h-16 max-w-7xl mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-0.5 group">
          <h1 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-zinc-100 to-zinc-500 group-hover:from-white group-hover:to-zinc-300 transition-all duration-500">
            Observer Insights
          </h1>
          <p className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 hidden sm:block">
            Pipeline Analytics & DOM Moderation Console
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="border-emerald-500/20 text-emerald-400 bg-emerald-500/5 shadow-[0_0_10px_rgba(16,185,129,0.1)] px-3 py-1 font-mono hover:bg-emerald-500/10 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-2 filter drop-shadow-[0_0_2px_rgba(16,185,129,0.8)]" />
            System Active
          </Badge>
        </div>
      </div>
    </header>
  );
}
