# Documento de Proyecto

## 1. Nombre del Proyecto
**Observer Insights:** Plataforma de Auditoría DOM y Telemetría Rendimiento vía APIs Nativas.

## 2. Problema Planteado
Los enfoques tradicionales para medir visibilidad de elementos (tracking del scroll) y auditar cambios dinámicos en la interfaz (polling, interval-checking) generan cuellos de botella severos en el rendimiento. Estas prácticas saturan el Hilo Principal (Main Thread) de JavaScript, forzando recálculos sincrónicos de layout (Layout Thrashing) que degradan considerablemente la fluidez de las aplicaciones web a gran escala.

## 3. Contexto del Problema
En ecosistemas web modernos (Data Feeds, Dashboards dinámicos, Infinite Scrolling), cientos de nodos se montan, mutan y desmontan constántemente. Intentar atar eventos imperativos como `window.addEventListener('scroll')` o sincronizar estados complejos de mutaciones acoplando la lógica de negocio a la Interfaz de Usuario, resulta en arquitecturas frágiles, difíciles de mantener ("espagueti code") e inherentemente ineficientes a medida que el árbol DOM escala.

## 4. Solución Implementada
Se desarrolló un "Dashboard de Auditoría" estructurado bajo **Clean Code**, que delega estrictamente la responsabilidad de monitoreo espacial (layout) y estructural (análisis de árbol HTML) al propio motor C++ del navegador. Esto se logró adoptando las WebAPIs asíncronas **IntersectionObserver** y **MutationObserver**, desacoplando la recolección de métricas de los componentes visuales mediante un bus de eventos nativos (CustomEvents).

## 5. Uso de IntersectionObserver
Instrumentado para resolver la telemetría espacial del usuario mediante tres implementaciones críticas sin reflows:
*   **Lazy Loading / Scroll Infinito:** Un *sentinel node* al final del Feed detecta asíncronamente cuándo entra al viewport al 100%, detonando la descarga (simulada) del siguiente lote de datos de la API.
*   **Señalización de Huella en Pantalla:** Una métrica en tiempo real que evalúa exactamente qué tarjetas específicas rompen la franja visible del usuario.
*   **Section Tracking (ScrollSpy):** Seguimiento semántico. Una abstracción que rastrea qué módulo del Dashboard ocupa el centro de la pantalla, actualizando silenciosamente la tabla de contenidos (TOC) y el panel central de métricas.

## 6. Uso de MutationObserver
Instrumentado como motor subyacente de la Terminal de Auditoría. Este Observer vigila de forma quirúrgica un contenedor asilado en tres dimensiones (`childList`, `attributes`, `characterData`), abstraído de la renderización React:
*   **Adición/Eliminación Estructural:** Monitorea la inyección de componentes traídos del servidor o destruidos localmente.
*   **Vigilancia de Propiedades:** Capta cuándo un script u hoja de estilos añade atributos (ej. data-attributes orientados a seguridad/fijación en tarjetas).
*   **Intercepción Cruda Textual:** Observa alteraciones milimétricas sobre el `nodeValue` de nodos de texto sin depender de abstracciones del Virtual DOM.

## 7. Arquitectura General del Proyecto
La aplicación implementa una arquitectura **Desacoplada Event-Driven**. El flujo fluye de la siguiente manera:
1.  **Capa Observadora (WebAPIs):** Los observadores están envueltos en *Custom Hooks* puros (`useIntersectionObserver`, `useMutationObserver`).
2.  **Bus de Integración (DOM Events):** Los hooks transmiten telemetría subatómica emitiendo `CustomEvent` sobre el objeto `window` (ej. `visibility-change`, `dom-mutation`), rompiendo el prop-drilling clásico de React y evitando re-renders de top-level.
3.  **Capa Analítica (Global Trackers):** Suscriptores reactivos (`useVisibilityTracker`, `useMutationTracker`) absorben los eventos paralelos e inyectan los contadores limpios a la Interfaz de Métricas.
4.  **Capa de Presentación (UI):** Componentes aislados (Shadcn/Tailwind) consumen los trackeos globalizados. Un *Parser de Mutaciones* puro extraído filtra el ruido del DOM (como inyecciones residuales de Next.js) traduciendo `MutationRecords` a registros legibles por humanos.

## 8. Decisiones Técnicas Tomadas
*   **TypeScript Estricto:** Diseño "Zero Warnings, Zero Errors". Modelos estrictos (`FeedMetricsEvent`, `VisibilityEventDetail`) para garantizar contratos implacables de tipos entre el Bus de Eventos y React.
*   **Rechazo de Abstracciones de Terceros:** Se programaron los hooks orgánicamente desde cero (`useIntersectionObserver` usando `refs`), descartando usar librerías puente (como *react-intersection-observer*) para mantener el rigor académico del ecosistema estándar.
*   **Separación de Responsabilidades (SRP):** El módulo de Sidebar se atomizó en sub-módulos paralelos (`ViewportTab` y `MutationAuditTab`) evitando la centralización monopólica en archivos monolíticos.

## 9. Tecnologías Utilizadas
*   **Framework Core:** Next.js (App Router) + React 18+.
*   **Infraestructura UI:** Tailwind CSS v4 para diseño atómico y componentes de sistema Shadcn (modificados nativamente).
*   **Core Standards:** Vanilla JavaScript API (CustomEvents, MutationObserver, IntersectionObserver).
*   **Análisis Cíclico:** TypeScript y ESLint (bajo configuraciones de `exhaustive-deps`).

## 10. Cómo se Relaciona con Desarrollo Web Moderno
El Front-End moderno busca obsesivamente dos cosas: Tiempos de Bloqueo Cero (TBT 0) e interfaces reactivas resilientes. En arquitecturas como SPAs complejas de Big Data, delegar la heurística perimetral y el DOM polling a los subprocesos del microprocesador en lugar del flujo general en JavaScript es indispensable. Dominar el asincronismo de las APIs nativas no es decoración, es un requerimiento innegociable de optimización en grado empresarial dictado por Google Core Web Vitals.

## 11. Conclusiones
*Observer Insights* demuestra en la práctica cómo la conjunción entre la solidez de componentes React modernos y la potencia asíncrona estándar de HTML5 (DOM API) puede dar origen a interfaces ultra-fluidas. Se ha logrado orquestar una compleja auditoría sin inflar el estado de las aplicaciones, comprobando enfáticamente que las arquitecturas limpias y el profundo conocimiento de WebAPIs sustituyen a la ineficiencia de scripts heredados atados estrictamente al hilo visual.

---

## Estructura Sugerida de Archivos Entregables (ZIP / GitHub)

Entregar al jurado la siguiente estructura desprovista de `.git` y `node_modules` para facilitar la revisión:

```text
/proyecto-observers/
 ├─ DOCUMENTACION.md          <-- [Este archivo oficial con contexto académico]
 ├─ package.json              <-- [Dependencias estrictamente necesarias listadas]
 ├─ /public/                  <-- [Recursos estáticos vacíos/assets por defecto]
 ├─ /src/
 │  ├─ /app/                  <-- [Next.js App Router principal]
 │  │   ├─ globals.css        <-- [Capa de Tailwind Base]
 │  │   ├─ layout.tsx         <-- [Root Layout y configuraciones META]
 │  │   └─ page.tsx           <-- [Entrypoint y Composición del Dashboard]
 │  ├─ /components/           <-- [Componentes UI]
 │  │   ├─ /analytics/        <-- [Componentes Consumidores - Métrica Activa]
 │  │   ├─ /feed/             <-- [Componentes Emisores - Tarjetas Modificables]
 │  │   ├─ /layout/           <-- [Sistema de Cuadros y Headers Puros]
 │  │   └─ /ui/               <-- [Core Shadch Atómico: Badge, Button, Card]
 │  ├─ /hooks/                <-- [Lógica de Negocio Reutilizable WebAPIs]
 │  │   ├─ useIntersectionObserver.ts <-- (Core API)
 │  │   ├─ useMutationObserver.ts     <-- (Core API)
 │  │   └─ use[...]Tracker.ts         <-- (Trackers Consumidores Globales)
 │  ├─ /lib/                  <-- [Utilidades puras (Ej. mutation-parser.ts, utils.ts)]
 │  └─ /types/                <-- [Contratos y Tipos en TypeScript (observer.types.ts)]
 └─ tailwind.config.ts        <-- [Base de estilo estricto]
```
