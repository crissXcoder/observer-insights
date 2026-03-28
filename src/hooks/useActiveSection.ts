"use client";

import { useState, useEffect } from 'react';

/**
 * Hook reutilizable para detectar qué sección está actualmente activa en pantalla.
 * Ideal para Table of Contents, ScrollSpy, o Navbar Highlighting.
 */
export function useActiveSection(sectionIds: string[], rootMargin: string = "-15% 0px -80% 0px") {
  // Inicializamos temporalmente con el primer id, o vacío.
  const [activeId, setActiveId] = useState<string>('');
  
  // Extraído para cumplir con React exhaustive-deps y evitar comparaciones inestables de arrays
  const idsString = sectionIds.join(',');

  useEffect(() => {
    // Optimization: Crear la lógica del observer delegada al rootMargin
    // rootMargin de "-15% 0px -80% 0px" crea una pequeña 'banda sensora' horizontal
    // casi arriba de la pantalla. Solo intersecta la capa que atraviesa esa banda.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
             setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin, threshold: 0 }
    );

    // Conectamos todas las secciones HTML basadas en los IDs estables
    idsString.split(',').forEach((id) => {
      if (!id) return;
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [idsString, rootMargin]);

  return activeId;
}
