"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViewportTab } from "./tabs/ViewportTab";
import { MutationAuditTab } from "./tabs/MutationAuditTab";

export function MetricsSidebar() {
  return (
    <Tabs defaultValue="mutation" className="w-full h-full flex flex-col">
      <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border-zinc-800">
        <TabsTrigger value="intersection" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-400 transition-colors">
          📍 Viewport
        </TabsTrigger>
        <TabsTrigger value="mutation" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-400 transition-colors">
          ⚡ DOM Audit
        </TabsTrigger>
      </TabsList>
      
      {/* Tab: Intersection Observer Panel */}
      <TabsContent value="intersection" className="flex-1 mt-2 focus-visible:outline-none">
        <ViewportTab />
      </TabsContent>

      {/* Tab: Mutation Observer Console */}
      <TabsContent value="mutation" className="flex-1 mt-2 focus-visible:outline-none">
        <MutationAuditTab />
      </TabsContent>
    </Tabs>
  );
}
