import { useEffect, useRef } from "react";
import {
  INTERSECCIONES,
  ZARAGOZA_LAT,
  ZARAGOZA_OESTE_LNG,
  ZARAGOZA_ESTE_LNG,
  colorNivel,
  type Interseccion,
} from "@/lib/zaragoza-data";

export interface MapLayers {
  reportes?: boolean;
  sensores?: boolean;
  redes?: boolean;
  prediccion?: boolean;
}

interface Props {
  layers?: MapLayers;
  onSelect?: (i: Interseccion) => void;
  selectedId?: string | null;
}

/**
 * Mapa de Av. Zaragoza con lógica de intersecciones.
 * - Polyline horizontal base = Av. Zaragoza (gris oscuro).
 * - Cada calle transversal = polyline vertical con tramo de cruce coloreado.
 * - Cada intersección = divIcon cuadrado coloreado con nivel en cm.
 */
export default function ZaragozaMap({ layers, onSelect, selectedId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);
  // Latest props for use inside the (one-shot) init effect
  const stateRef = useRef({ layers, onSelect, selectedId });
  stateRef.current = { layers, onSelect, selectedId };

  useEffect(() => {
    let cancelled = false;
    let map: any = null;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        zoomControl: true,
        attributionControl: false,
      }).setView([ZARAGOZA_LAT, -99.055], 14);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
        { maxZoom: 20, subdomains: "abcd" }
      ).addTo(map);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png",
        { maxZoom: 20, subdomains: "abcd", pane: "overlayPane" }
      ).addTo(map);

      mapRef.current = map;
      layerGroupRef.current = L.layerGroup().addTo(map);

      renderLayers(L);
    })();

    return () => {
      cancelled = true;
      if (map) map.remove();
      mapRef.current = null;
      layerGroupRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-render overlays when layers / selection change
  useEffect(() => {
    if (!mapRef.current || !layerGroupRef.current) return;
    (async () => {
      const L = (await import("leaflet")).default;
      renderLayers(L);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layers?.reportes, layers?.sensores, layers?.redes, layers?.prediccion, selectedId]);

  function renderLayers(L: any) {
    const group = layerGroupRef.current;
    if (!group) return;
    group.clearLayers();
    const { layers: lyr, onSelect: onSel, selectedId: selId } = stateRef.current;

    // 1) Av. Zaragoza base (gris)
    L.polyline(
      [
        [ZARAGOZA_LAT, ZARAGOZA_OESTE_LNG],
        [ZARAGOZA_LAT, ZARAGOZA_ESTE_LNG],
      ],
      { color: "#253545", weight: 6, opacity: 1 }
    ).addTo(group);

    // 2) Calles transversales por intersección
    const dLat = 0.0045; // ~500m norte-sur visible
    const cruceLat = 0.00045; // ~±50m alrededor de Zaragoza
    INTERSECCIONES.forEach((it) => {
      // tramos norte y sur en gris
      L.polyline(
        [
          [it.lat + dLat, it.lng],
          [it.lat + cruceLat, it.lng],
        ],
        { color: "#1a2a3f", weight: 4 }
      ).addTo(group);
      L.polyline(
        [
          [it.lat - cruceLat, it.lng],
          [it.lat - dLat, it.lng],
        ],
        { color: "#1a2a3f", weight: 4 }
      ).addTo(group);
      // tramo de cruce coloreado
      const cruce = L.polyline(
        [
          [it.lat + cruceLat, it.lng],
          [it.lat - cruceLat, it.lng],
        ],
        { color: colorNivel(it.nivelCm), weight: 7, opacity: 0.95 }
      ).addTo(group);
      if (it.nivelCm >= 40) {
        const el = (cruce as any)._path as SVGPathElement | undefined;
        if (el) el.classList.add("animate-glow-pulse");
      }
    });

    // 3) Predicción: halo alrededor del nodo (capa inferior)
    if (lyr?.prediccion) {
      INTERSECCIONES.forEach((it) => {
        L.circle([it.lat, it.lng], {
          radius: 110,
          color: colorNivel(it.prediccion30min),
          weight: 1,
          opacity: 0.6,
          fillColor: colorNivel(it.prediccion30min),
          fillOpacity: 0.18,
          dashArray: "4 4",
        }).addTo(group);
      });
    }

    // 4) Reportes ciudadanos (círculo verde debajo)
    if (lyr?.reportes) {
      INTERSECCIONES.forEach((it) => {
        if (it.reportesCiudadanos === 0) return;
        L.circleMarker([it.lat - 0.0009, it.lng], {
          radius: 6 + Math.min(it.reportesCiudadanos, 8),
          color: "#4CAF50",
          weight: 2,
          fillColor: "#4CAF50",
          fillOpacity: 0.35,
        })
          .bindTooltip(`${it.reportesCiudadanos} reportes`, { direction: "top" })
          .addTo(group);
      });
    }

    // 5) Tweets / Redes (X)
    if (lyr?.redes) {
      INTERSECCIONES.forEach((it) => {
        if (it.tweets === 0) return;
        const icon = L.divIcon({
          className: "",
          html: `<div style="font-family:'JetBrains Mono',monospace;background:#0A1628;border:1px solid #E4007C;color:#F0F4F8;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;box-shadow:0 0 8px rgba(228,0,124,.55)">𝕏</div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });
        L.marker([it.lat + 0.0011, it.lng + 0.0008], { icon })
          .bindTooltip(`${it.tweets} menciones`, { direction: "top" })
          .addTo(group);
      });
    }

    // 6) Sensores IoT (badge azul)
    if (lyr?.sensores) {
      INTERSECCIONES.forEach((it) => {
        if (!it.tieneSensor) return;
        const icon = L.divIcon({
          className: "",
          html: `<div style="font-family:'JetBrains Mono',monospace;background:#00B2A9;color:#0A1628;border-radius:4px;padding:1px 6px;font-size:10px;font-weight:700;letter-spacing:.5px;box-shadow:0 0 6px rgba(0,178,169,.7)">IoT</div>`,
          iconSize: [34, 16],
          iconAnchor: [17, -6],
        });
        L.marker([it.lat, it.lng], { icon }).addTo(group);
      });
    }

    // 7) Marcador principal de intersección (siempre encima)
    INTERSECCIONES.forEach((it) => {
      const isSel = selId === it.id;
      const color = colorNivel(it.nivelCm);
      const size = isSel ? 44 : 36;
      const icon = L.divIcon({
        className: "",
        html: `<div style="font-family:'JetBrains Mono',monospace;width:${size}px;height:${size}px;background:${color};color:#0A1628;border:2px solid #0A1628;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;box-shadow:0 0 ${isSel ? 16 : 8}px ${color}99;transform:rotate(0deg)">${it.nivelCm}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
      const m = L.marker([it.lat, it.lng], { icon }).addTo(group);
      m.bindTooltip(`${it.id} · ${it.calle} · ${it.nivelCm} cm`, {
        direction: "top",
        offset: [0, -size / 2],
      });
      if (onSel) m.on("click", () => onSel(it));
    });
  }

  return <div ref={containerRef} className="w-full h-full zaragoza-map-tiles bg-bg-card" />;
}