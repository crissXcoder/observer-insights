import { MutationLog } from "@/types/observer.types";

/**
 * Función utilitaria pura para abstraer la complejidad de descifrar 
 * un MutationRecord del navegador y convertirlo en un Log legible para la app.
 */
export function parseMutationRecord(mutation: MutationRecord): MutationLog | null {
  // Ignoramos re-renders irrelevantes de NextJS (nodos de texto en blanco)
  if (mutation.target.nodeName === '#text' && !mutation.oldValue && mutation.type !== 'characterData') {
      return null;
  }

  let summary = "";

  switch (mutation.type) {
    case 'childList':
      const added = mutation.addedNodes.length;
      const removed = mutation.removedNodes.length;
      if (added > 0 && removed > 0) {
        summary = `Replaced/Updated ${removed} nodes with ${added} new ones.`;
      } else if (added > 0) {
         summary = `Injected ${added} newly fetched element(s) to DOM.`;
      } else if (removed > 0) {
         summary = `Destroyed and garbage collected ${removed} element(s).`;
      }
      break;
    case 'attributes':
      // Filtramos cambios de estilo de inyección en línea o clases de interacciones CSS previas
      if (mutation.attributeName === 'class' || mutation.attributeName === 'style') {
          return null;
      }
      summary = `Node mutated: Attribute '${mutation.attributeName}' was added/modified.`;
      break;
    case 'characterData':
      summary = `DOM Text Content modified via direct data manipulation.`;
      break;
  }

  if (!summary) return null;

  return {
    id: Math.random().toString(36).substring(2, 9),
    type: mutation.type as 'childList' | 'attributes' | 'characterData',
    targetNodeName: mutation.target.nodeName.toLowerCase(),
    summary,
    timestamp: Date.now()
  };
}
