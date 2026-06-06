import { useState } from "react";
import { Droplets } from "lucide-react";
import ZaragozaMap, { type MapLayers } from "./ZaragozaMap";

export default function VistaC({ onCiudadana }: { onCiudadana: () => void }) {
  const [layers, setLayers] = useState<MapLayers>({
    reportes: true,
    sensores: true,
    redes: true,
    prediccion: false,
  });

  const toggle = (k: keyof MapLayers) =>
    setLayers((l) => ({ ...l, [k]: !l[k] }));

  return (
    <div className="min-h-screen text-text-primary" style={{ background: "#0D1B2A" }}>
      {/* Header */}
      <header className="border-b border-border/60 bg-bg-card/40 sticky top-0 z-30 backdrop-blur">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center gap-4 relative">
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-cdmx-guinda" />
          <Droplets className="w-6 h-6 text-cdmx-turquesa" />
          <h1 className="font-syne font-bold text-[18px] tracking-tight">
            Vive Tranquilo — Panel Institucional
          </h1>
          <span className="ml-4 px-3 py-1 rounded-md bg-bg-card border border-border font-dm-sans text-[12px] text-text-secondary">
            Ing. Carlos Ramírez · Operador SACMEX
          </span>
          <span className="ml-3 font-jetbrains text-[12px] text-text-secondary flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cdmx-ambar inline-block animate-pulse" />
            Sistema activo · 80 sensores
          </span>
          <div className="ml-auto">
            <button
              onClick={onCiudadana}
              className="h-10 px-4 rounded-lg border border-border bg-bg-card hover:border-cdmx-rosa hover:bg-bg-card/70 font-dm-sans text-[13px] flex items-center gap-2 transition"
            >
              📱 <span>Vista ciudadana</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 py-5">
        {/* Métricas */}
        <section className="grid grid-cols-4 gap-4">
          <MetricCard
            icon="📍"
            value="47"
            title="Reportes activos"
            sub="↑12 en última hora"
            subColor="#00B2A9"
          />
          <MetricCard
            icon="🌡️"
            value="38 cm"
            title="Nivel máximo"
            sub="Av. Zaragoza · ZAR-003"
            subColor="#9F2241"
          />
          <MetricCard
            icon="📡"
            value="78/80"
            title="Sensores online"
            sub="97.5% disponibilidad"
            subColor="#00B2A9"
          />
          <MetricCard
            icon="⚠️"
            value="3"
            title="Alertas pendientes"
            sub="Requieren revisión"
            subColor="#FFD100"
          />
        </section>

        {/* Map + panel */}
        <section className="flex gap-5 mt-5 h-[calc(100vh-260px)] min-h-[520px]">
          {/* Map 60% */}
          <div className="basis-[60%] rounded-xl overflow-hidden border border-border bg-bg-card relative">
            <ZaragozaMap layers={layers} />
            {/* Toggle buttons sobre el mapa */}
            <div className="absolute top-3 left-3 z-[400] flex flex-wrap gap-2">
              <LayerToggle
                label="📱 Reportes"
                active={!!layers.reportes}
                onClick={() => toggle("reportes")}
              />
              <LayerToggle
                label="📡 Sensores"
                active={!!layers.sensores}
                onClick={() => toggle("sensores")}
              />
              <LayerToggle
                label="𝕏 Redes"
                active={!!layers.redes}
                onClick={() => toggle("redes")}
              />
              <LayerToggle
                label="🤖 Predicción"
                active={!!layers.prediccion}
                onClick={() => toggle("prediccion")}
              />
            </div>
          </div>

          {/* Panel 40% */}
          <aside className="basis-[40%] flex flex-col gap-4 overflow-y-auto scrollbar-thin">
            <Panel title="Alertas activas">
              <ul className="flex flex-col gap-2">
                <AlertRow
                  color="#9F2241"
                  id="ZAR-003"
                  text="38 cm · Av. Guelatao × Zaragoza"
                  badge="CRÍTICO"
                />
                <AlertRow
                  color="#E4007C"
                  id="ZAR-002"
                  text="22 cm · Eje 5 Sur × Zaragoza"
                  badge="ALERTA"
                />
                <AlertRow
                  color="#FFD100"
                  id="ZAR-004"
                  text="15 cm · Av. Texcoco × Zaragoza"
                  badge="PRECAUCIÓN"
                />
              </ul>
            </Panel>

            <Panel title="Actividad reciente">
              <ul className="flex flex-col gap-2 font-jetbrains text-[11px] text-text-secondary">
                <li>· 14:32 — Reporte ciudadano en ZAR-003 (foto)</li>
                <li>· 14:30 — Sensor ZAR-002 reporta +6 cm</li>
                <li>· 14:28 — 4 menciones en 𝕏 sobre Guelatao</li>
                <li>· 14:25 — Predicción IA actualizada (30 min)</li>
                <li>· 14:21 — Reporte ciudadano en ZAR-004</li>
              </ul>
            </Panel>

            <Panel title="Acciones rápidas">
              <div className="grid grid-cols-2 gap-2">
                <ActionBtn>📢 Emitir alerta</ActionBtn>
                <ActionBtn>🚧 Cerrar vialidad</ActionBtn>
                <ActionBtn>📤 Exportar reporte</ActionBtn>
                <ActionBtn>🛰️ Despachar unidad</ActionBtn>
              </div>
            </Panel>
          </aside>
        </section>
      </main>
    </div>
  );
}

function MetricCard({
  icon,
  value,
  title,
  sub,
  subColor,
}: {
  icon: string;
  value: string;
  title: string;
  sub: string;
  subColor: string;
}) {
  return (
    <div
      className="rounded-lg p-4 border hover-brighten"
      style={{ background: "#132033", borderColor: "#1E3A5F" }}
    >
      <div className="flex items-baseline gap-2">
        <span className="text-[22px]">{icon}</span>
        <span className="font-syne font-bold text-[30px] leading-none">
          {value}
        </span>
      </div>
      <p className="font-dm-sans text-[13px] text-text-primary mt-2">{title}</p>
      <p
        className="font-jetbrains text-[11px] mt-1"
        style={{ color: subColor }}
      >
        {sub}
      </p>
    </div>
  );
}

function LayerToggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-9 px-3 rounded-lg font-dm-sans text-[12px] flex items-center gap-1.5 border transition backdrop-blur ${
        active
          ? "bg-cdmx-turquesa text-text-primary border-cdmx-turquesa shadow-[0_0_12px_rgba(0,178,169,.55)]"
          : "bg-bg-card/90 text-text-secondary border-border hover:text-text-primary"
      }`}
    >
      <span>{label}</span>
      <span className="font-jetbrains text-[10px] opacity-80">
        {active ? "✓" : ""}
      </span>
    </button>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-4 border"
      style={{ background: "#132033", borderColor: "#1E3A5F" }}
    >
      <p className="font-jetbrains text-[10px] uppercase tracking-wider text-text-secondary mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}

function AlertRow({
  color,
  id,
  text,
  badge,
}: {
  color: string;
  id: string;
  text: string;
  badge: string;
}) {
  return (
    <li
      className="flex items-center gap-3 p-2.5 rounded-lg border animate-slide-in-right hover-brighten"
      style={{ borderColor: `${color}55`, background: `${color}0F` }}
    >
      <span
        className="w-2.5 h-8 rounded-sm"
        style={{ background: color }}
      />
      <div className="flex-1 min-w-0">
        <p className="font-jetbrains text-[11px] text-text-secondary">{id}</p>
        <p className="font-dm-sans text-[13px] truncate">{text}</p>
      </div>
      <span
        className="font-jetbrains text-[9px] font-bold px-2 py-1 rounded"
        style={{ background: color, color: "#0A1628" }}
      >
        {badge}
      </span>
    </li>
  );
}

function ActionBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="h-10 rounded-lg border border-border bg-bg-primary/40 hover:border-cdmx-rosa hover:bg-bg-primary/80 font-dm-sans text-[12px] transition">
      {children}
    </button>
  );
}