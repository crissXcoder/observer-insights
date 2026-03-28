"use client";

import { useEffect, RefObject } from 'react';

/**
 * Hook reutilizable para detectar mutaciones en el DOM.
 * Este hook envuelve MutationObserver para observar limpiamente sin memory leaks.
 */
export function useMutationObserver(
  ref: RefObject<Element | null>,
  callback: MutationCallback,
  options: MutationObserverInit = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  }
) {
  useEffect(() => {
    const targetNode = ref.current;
    if (!targetNode) return;

    // Instanciamos el observer pasándole directamente el callback provisto
    const observer = new MutationObserver(callback);

    // Comenzamos la observación con las reglas deseadas
    observer.observe(targetNode, options);

    // CLEANUP importantísimo en React para no multiplicar los observers al re-renderizar
    return () => observer.disconnect();
  }, [ref, callback, options]);
}
