// Shared data + helpers for Av. Zaragoza intersection map (Vistas B & C)

export type Estado = "ok" | "precaucion" | "alerta" | "critico";

export interface Interseccion {
  id: string;
  calle: string;
  lat: number;
  lng: number;
  nivelCm: number;
  reportesCiudadanos: number;
  tweets: number;
  tieneSensor: boolean;
  prediccion30min: number; // cm proyectados
}

// Av. Zaragoza corre Este–Oeste en Iztapalapa, CDMX (~lat 19.3653)
export const ZARAGOZA_LAT = 19.3653;
export const ZARAGOZA_OESTE_LNG = -99.0760;
export const ZARAGOZA_ESTE_LNG = -99.0340;

export const INTERSECCIONES: Interseccion[] = [
  {
    id: "ZAR-001",
    calle: "Av. Telecomunicaciones",
    lat: ZARAGOZA_LAT,
    lng: -99.0700,
    nivelCm: 8,
    reportesCiudadanos: 3,
    tweets: 1,
    tieneSensor: true,
    prediccion30min: 12,
  },
  {
    id: "ZAR-002",
    calle: "Eje 5 Sur (Purísima)",
    lat: ZARAGOZA_LAT,
    lng: -99.0625,
    nivelCm: 22,
    reportesCiudadanos: 7,
    tweets: 4,
    tieneSensor: true,
    prediccion30min: 28,
  },
  {
    id: "ZAR-003",
    calle: "Av. Guelatao",
    lat: ZARAGOZA_LAT,
    lng: -99.0550,
    nivelCm: 38,
    reportesCiudadanos: 14,
    tweets: 9,
    tieneSensor: true,
    prediccion30min: 52,
  },
  {
    id: "ZAR-004",
    calle: "Av. Texcoco",
    lat: ZARAGOZA_LAT,
    lng: -99.0475,
    nivelCm: 15,
    reportesCiudadanos: 5,
    tweets: 2,
    tieneSensor: false,
    prediccion30min: 18,
  },
  {
    id: "ZAR-005",
    calle: "Periférico Oriente",
    lat: ZARAGOZA_LAT,
    lng: -99.0400,
    nivelCm: 5,
    reportesCiudadanos: 2,
    tweets: 0,
    tieneSensor: true,
    prediccion30min: 6,
  },
];

export function colorNivel(cm: number): string {
  if (cm >= 40) return "#9F2241"; // guinda CDMX — crítico
  if (cm >= 25) return "#E4007C"; // rosa mexicano — alerta
  if (cm >= 10) return "#FFD100"; // ámbar CDMX — precaución
  return "#00B2A9"; // turquesa CDMX — ok
}

export function estadoNivel(cm: number): Estado {
  if (cm >= 40) return "critico";
  if (cm >= 25) return "alerta";
  if (cm >= 10) return "precaucion";
  return "ok";
}

export function etiquetaEstado(cm: number): string {
  const e = estadoNivel(cm);
  return e === "critico"
    ? "Crítico"
    : e === "alerta"
    ? "Alerta"
    : e === "precaucion"
    ? "Precaución"
    : "Normal";
}