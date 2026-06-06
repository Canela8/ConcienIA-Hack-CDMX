import { useState } from "react";
import { Droplets } from "lucide-react";
import ZaragozaMap from "./ZaragozaMap";
import {
  INTERSECCIONES,
  colorNivel,
  etiquetaEstado,
  type Interseccion,
} from "@/lib/zaragoza-data";

const TABS = [
  { id: "aeropuerto", label: "✈️ Aeropuerto" },
  { id: "metro", label: "🚇 Metro" },
  { id: "hospitales", label: "🏥 Hospitales" },
  { id: "puntos", label: "⭐ Puntos" },
] as const;

export default function VistaB({
  onInstitucional,
  onVolver,
}: {
  onInstitucional: () => void;
  onVolver: () => void;
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("aeropuerto");
  const [selected, setSelected] = useState<Interseccion | null>(INTERSECCIONES[2]);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
      {/* Header */}
      <header className="border-b border-border/60 bg-bg-card/40">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center gap-8">
          <button
            onClick={onVolver}
            className="flex items-center gap-2 group"
            title="Volver"
          >
            <Droplets className="w-6 h-6 text-cdmx-turquesa group-hover:scale-110 transition" />
            <span className="font-syne font-bold text-[20px] tracking-tight">
              Vive Tranquilo
            </span>
          </button>

          <nav className="flex items-center gap-1 ml-4">
            {TABS.map((t) => {
              const active = t.id === tab;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative px-4 h-16 font-dm-sans text-[14px] transition ${
                    active
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {t.label}
                  {active && (
                    <span className="absolute left-3 right-3 bottom-0 h-[3px] rounded-t bg-cdmx-rosa" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="ml-auto">
            <button
              onClick={onInstitucional}
              className="h-10 px-4 rounded-lg border border-border bg-bg-card hover:border-cdmx-rosa hover:bg-bg-card/70 font-dm-sans text-[13px] flex items-center gap-2 transition"
            >
              🏛️ <span>Vista institucional</span>
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-5">
        <div className="flex gap-5 h-[calc(100vh-104px)]">
          {/* Map 65% */}
          <div className="basis-[65%] rounded-xl overflow-hidden border border-border bg-bg-card relative">
            <ZaragozaMap
              layers={{ reportes: true, sensores: true }}
              onSelect={setSelected}
              selectedId={selected?.id ?? null}
            />
            <MapLegend />
          </div>

          {/* Panel 35% */}
          <aside className="basis-[35%] flex flex-col gap-4 overflow-hidden">
            <div className="bg-bg-card border border-border rounded-xl p-5">
              <p className="font-jetbrains text-[11px] text-text-secondary uppercase tracking-wider">
                Zona monitoreada
              </p>
              <h2 className="font-syne font-bold text-[22px] mt-1">
                Av. Calz. Ignacio Zaragoza
              </h2>
              <p className="font-dm-sans text-[13px] text-text-secondary mt-1">
                Iztapalapa · CDMX · 5 intersecciones monitoreadas
              </p>
            </div>

            {selected && <DetalleInterseccion it={selected} />}

            <div className="bg-bg-card border border-border rounded-xl p-4 flex-1 overflow-y-auto scrollbar-thin">
              <p className="font-jetbrains text-[11px] text-text-secondary uppercase tracking-wider mb-3">
                Intersecciones
              </p>
              <ul className="flex flex-col gap-2">
                {INTERSECCIONES.map((it) => {
                  const active = selected?.id === it.id;
                  return (
                    <li key={it.id}>
                      <button
                        onClick={() => setSelected(it)}
                        className={`w-full text-left flex items-center gap-3 p-3 rounded-lg border transition hover-brighten ${
                          active
                            ? "border-cdmx-rosa bg-cdmx-rosa/10"
                            : "border-border/60 hover:border-border hover:bg-bg-primary/40"
                        }`}
                      >
                        <span
                          className="w-9 h-9 rounded-md flex items-center justify-center font-jetbrains font-bold text-[12px] text-[#0A1628] shrink-0"
                          style={{ background: colorNivel(it.nivelCm) }}
                        >
                          {it.nivelCm}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block font-dm-sans text-[13px] truncate">
                            {it.calle}
                          </span>
                          <span className="block font-jetbrains text-[10px] text-text-secondary">
                            {it.id} · {etiquetaEstado(it.nivelCm)}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function DetalleInterseccion({ it }: { it: Interseccion }) {
  return (
    <div
      className="rounded-xl p-5 border"
      style={{
        background: "var(--bg-card)",
        borderColor: colorNivel(it.nivelCm),
        boxShadow: `0 0 24px ${colorNivel(it.nivelCm)}33`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-jetbrains text-[10px] text-text-secondary uppercase">
            {it.id}
          </p>
          <h3 className="font-syne font-bold text-[18px] mt-0.5 truncate">
            {it.calle} × Zaragoza
          </h3>
        </div>
        <span
          className="px-2 py-1 rounded-md font-jetbrains text-[10px] font-bold uppercase"
          style={{ background: colorNivel(it.nivelCm), color: "#0A1628" }}
        >
          {etiquetaEstado(it.nivelCm)}
        </span>
      </div>
      <div className="mt-4 flex items-end gap-2">
        <span
          className="font-syne font-bold text-[42px] leading-none"
          style={{ color: colorNivel(it.nivelCm) }}
        >
          {it.nivelCm}
        </span>
        <span className="font-jetbrains text-[14px] text-text-secondary pb-1">
          cm de agua
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Stat label="Reportes" value={it.reportesCiudadanos} />
        <Stat label="𝕏 menciones" value={it.tweets} />
        <Stat label="Sensor IoT" value={it.tieneSensor ? "Sí" : "No"} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg bg-bg-primary/60 border border-border/60 py-2">
      <p className="font-jetbrains font-bold text-[16px]">{value}</p>
      <p className="font-jetbrains text-[9px] text-text-secondary uppercase tracking-wider mt-0.5">
        {label}
      </p>
    </div>
  );
}

function MapLegend() {
  const items = [
    { c: "#00B2A9", l: "0–10 cm" },
    { c: "#FFD100", l: "10–25 cm" },
    { c: "#E4007C", l: "25–40 cm" },
    { c: "#9F2241", l: "40+ cm" },
  ];
  return (
    <div className="absolute bottom-3 left-3 z-[400] bg-bg-card/95 border border-border rounded-lg px-3 py-2 backdrop-blur">
      <p className="font-jetbrains text-[9px] uppercase tracking-wider text-text-secondary mb-1">
        Nivel de agua
      </p>
      <div className="flex items-center gap-3">
        {items.map((i) => (
          <div key={i.l} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ background: i.c }}
            />
            <span className="font-jetbrains text-[10px]">{i.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}