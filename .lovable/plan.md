## Objetivo
Añadir controles de privacidad sin backend: banner de cookies, consentimiento explícito de ubicación, y un panel "Privacidad" donde el usuario pueda revocar permisos (opt-out) en cualquier momento.

## Componentes nuevos

### 1. `src/lib/privacy.ts`
Capa única de estado de consentimiento persistido en `localStorage` bajo `vt:privacy:v1`:

```ts
type Consent = {
  cookies: "accepted" | "rejected" | null;
  analytics: boolean;       // opt-in, default false
  location: boolean;        // opt-in, default false
  decidedAt: string | null;
};
```

Exporta:
- `getConsent()`, `setConsent(partial)`
- `useConsent()` — hook con `useSyncExternalStore` para que cambios en un componente se reflejen en todos (banner + panel + ReportarScreen).
- `resetConsent()` — para el botón "Olvidar mis preferencias".

### 2. `src/components/CookieBanner.tsx`
Banner inferior fijo (bottom sheet 390px) que aparece solo si `cookies === null`.
- Texto corto: "Usamos almacenamiento local para recordar tus preferencias y enviar reportes anónimos. No vendemos datos."
- Botones: **Rechazar** (gris, secundario) · **Aceptar** (rosa CDMX).
- Link "Más detalles" → abre `PrivacyPanel`.
- Animación `animate-slide-up-view`.

### 3. `src/components/PrivacyPanel.tsx`
Modal/overlay full-screen (mobile-first 390px) con toggles:
- 🍪 Cookies / almacenamiento local — switch (refleja consent.cookies)
- 📊 Analítica anónima — switch (analytics)
- 📍 Ubicación al reportar — switch (location)
- Botón "Olvidar mis preferencias" (rojo guinda CDMX) → `resetConsent()` + recarga banner.
- Link "Política de privacidad" → expandible inline con texto institucional corto (3 párrafos: qué guardamos, dónde, derechos ARCO CDMX).
- Cerrar con flecha atrás (igual estilo que `ReportarScreen`).

### 4. Integración

**`src/routes/index.tsx`**
- Renderizar `<CookieBanner />` siempre en el contenedor principal (se auto-oculta si ya decidió).
- Añadir botón discreto "🔒 Privacidad" en el footer del `InicioScreen` → abre `<PrivacyPanel />` vía nuevo state `showPrivacy`.

**`src/components/ReportarScreen.tsx`**
- Reemplazar el `useEffect` que dispara `getCurrentPosition` por:
  1. Leer `consent.location` con `useConsent()`.
  2. Si `true` → pedir ubicación como hoy.
  3. Si `false/null` → mostrar en el resumen (paso 3) chip "📍 Compartir ubicación" con switch inline. Al activarlo, persiste `setConsent({ location: true })` y dispara `getCurrentPosition`. Si el usuario lo deja apagado, el reporte se envía sin coords ("Sin ubicación").
- Quitar el caso "denied" silencioso: ahora el usuario controla explícitamente.

## Comportamiento clave (opt-in real)

| Acción | Default | Cómo se activa | Cómo se revoca |
|---|---|---|---|
| Cookies/localStorage | Pregunta al primer uso | Botón "Aceptar" en banner | Toggle en panel o "Olvidar" |
| Analítica | OFF | Toggle en panel | Toggle en panel |
| Ubicación | OFF | Toggle al reportar o en panel | Toggle en panel |

Si el usuario rechaza cookies, **no** se persiste nada salvo `cookies: "rejected"` (sessionStorage como fallback) y la app sigue funcionando sin recordar preferencias.

## Estilo
Reutiliza tokens existentes: `cdmx-rosa`, `cdmx-turquesa`, `cdmx-guinda`, `bg-card`, `border`, `animate-slide-up-view`. Switch custom con `bg-cdmx-turquesa` activo / `bg-border` apagado, sin librería extra.

## Lo que NO cambia
- Sin backend, sin nuevas dependencias.
- Sin tracking real (analítica = stub que solo respeta el toggle).
- Paleta y tipografías intactas.
- Lógica del mapa intacta.

## Archivos
- **Nuevo**: `src/lib/privacy.ts`
- **Nuevo**: `src/components/CookieBanner.tsx`
- **Nuevo**: `src/components/PrivacyPanel.tsx`
- **Editado**: `src/routes/index.tsx` (banner + botón footer + state `showPrivacy`)
- **Editado**: `src/components/ReportarScreen.tsx` (consent-aware geolocation + toggle inline en paso 3)
