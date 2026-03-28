"use client";

import { useEffect, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  }: UseIntersectionObserverOptions
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  
  // Guardamos un estado para mantener la congelacion sin re-renderizar todo repetitivamente
  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const node = elementRef?.current; 
    
    // Si ya se congeló o el nodo no existe en el DOM, abortamos (Optimización)
    if (!node || frozen) return; 

    // Instanciamos el observador nativo
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Solo actualizamos el estado interno cuando hay un cruce de nuestro umbral (Ej: 0.5)
        setEntry(entry);
      },
      { threshold, root, rootMargin }
    );

    // Comenzar la observación del div
    observer.observe(node);

    // CLEANUP correcto: Se desconecta el observador cuando el componente se desmonta 
    // o cuando cambia la dependencia, evitando fugas de memoria gigantescas.
    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
}
