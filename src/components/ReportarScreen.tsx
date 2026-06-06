import { useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { useConsent, setConsent } from "@/lib/privacy";

type Modo = "pie" | "auto" | "transporte" | "camion";
type GeoStatus = "pending" | "ok" | "denied";

interface Props {
  onVolver: () => void;
  onEnviado: () => void;
}

const MODOS: { id: Modo; icon: string; label: string }[] = [
  { id: "pie", icon: "🚶", label: "A pie" },
  { id: "auto", icon: "🚗", label: "Auto" },
  { id: "transporte", icon: "🚌", label: "Transporte" },
  { id: "camion", icon: "🚛", label: "Camión" },
];

const NIVELES_PIE = [
  { id: "tobillo", icon: "👟", label: "Tobillo", cm: 10 },
  { id: "rodilla", icon: "🦵", label: "Rodilla", cm: 45 },
  { id: "cintura", icon: "👕", label: "Cintura", cm: 90 },
  { id: "mas-alto", icon: "⚠️", label: "Más alto", cm: 120 },
];

const NIVELES_VEH = [
  { id: "llanta", icon: "🛞", label: "Llanta", cm: 20 },
  { id: "puerta", icon: "🚪", label: "Puerta", cm: 50 },
  { id: "motor", icon: "🔧", label: "Motor", cm: 80 },
  { id: "ventana", icon: "⚠️", label: "Ventana", cm: 120 },
];

function vibrate() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate?.(10);
  }
}

export default function ReportarScreen({ onVolver, onEnviado }: Props) {
  const consent = useConsent();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [modo, setModo] = useState<Modo | null>(null);
  const [nivelLabel, setNivelLabel] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("pending");
  const [enviando, setEnviando] = useState(false);

  // Pre-warm geolocation only if the user has opted in
  useEffect(() => {
    if (!consent.location) {
      setGeoStatus("denied");
      setCoords(null);
      return;
    }
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoStatus("denied");
      return;
    }
    setGeoStatus("pending");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoStatus("ok");
      },
      () => setGeoStatus("denied"),
      { enableHighAccuracy: false, timeout: 6000, maximumAge: 60000 }
    );
  }, [consent.location]);

  const activarUbicacion = () => {
    vibrate();
    // Activating location implies accepting local storage to remember the choice
    if (consent.cookies !== "accepted") {
      setConsent({ cookies: "accepted" });
    }
    setConsent({ location: true });
  };

  const esVehiculo = modo === "auto" || modo === "transporte" || modo === "camion";
  const niveles = esVehiculo ? NIVELES_VEH : NIVELES_PIE;
  const modoMeta = MODOS.find((m) => m.id === modo);

  const seleccionarModo = (m: Modo) => {
    vibrate();
    setModo(m);
    setTimeout(() => setStep(2), 200);
  };

  const seleccionarNivel = (label: string) => {
    vibrate();
    setNivelLabel(label);
    setTimeout(() => setStep(3), 200);
  };

  const atras = () => {
    if (step === 1) {
      onVolver();
      return;
    }
    if (step === 2) {
      setModo(null);
      setStep(1);
      return;
    }
    setNivelLabel(null);
    setStep(2);
  };

  const enviar = () => {
    if (enviando) return;
    vibrate();
    setEnviando(true);
    setTimeout(() => {
      toast.success("✓ Reporte enviado", {
        description: "Gracias por contribuir con tu colonia.",
      });
      onEnviado();
    }, 700);
  };

  return (
    <div className="flex flex-col min-h-screen px-5 pt-5 pb-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={atras}
          aria-label="Atrás"
          className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                step >= n ? "w-6 bg-cdmx-rosa" : "w-3 bg-border"
              }`}
            />
          ))}
        </div>
        <span className="w-10" />
      </div>

      {step === 1 && (
        <StepWrap title="¿Cómo vas?">
          <Grid>
            {MODOS.map((m) => (
              <OptionCard
                key={m.id}
                icon={m.icon}
                label={m.label}
                active={modo === m.id}
                onClick={() => seleccionarModo(m.id)}
              />
            ))}
          </Grid>
        </StepWrap>
      )}

      {step === 2 && (
        <StepWrap title="¿Hasta dónde llega el agua?">
          <Grid>
            {niveles.map((n) => (
              <OptionCard
                key={n.id}
                icon={n.icon}
                label={n.label}
                active={nivelLabel === n.label}
                onClick={() => seleccionarNivel(n.label)}
              />
            ))}
          </Grid>
        </StepWrap>
      )}

      {step === 3 && (
        <StepWrap title="Confirmar reporte">
          <div className="bg-bg-card border border-border rounded-2xl p-5 mb-6">
            <p className="font-dm-sans text-text-primary text-[16px] leading-relaxed">
              <span className="text-2xl mr-2">{modoMeta?.icon}</span>
              {modoMeta?.label} · agua hasta {nivelLabel?.toLowerCase()}
            </p>
            <div className="mt-3">
              {consent.location ? (
                <p className="font-jetbrains text-[12px] text-text-secondary flex items-center gap-2">
                  {geoStatus === "ok" && (
                    <>
                      <span className="w-2 h-2 rounded-full bg-cdmx-turquesa" />
                      📍 Ubicación lista ({coords?.lat.toFixed(4)},{" "}
                      {coords?.lng.toFixed(4)})
                    </>
                  )}
                  {geoStatus === "pending" && (
                    <>
                      <span className="w-2 h-2 rounded-full bg-cdmx-ambar animate-pulse" />
                      Obteniendo ubicación…
                    </>
                  )}
                  {geoStatus === "denied" && (
                    <>
                      <span className="w-2 h-2 rounded-full bg-text-secondary" />
                      📍 Sin ubicación (puedes enviar igual)
                    </>
                  )}
                </p>
              ) : (
                <button
                  onClick={activarUbicacion}
                  className="w-full flex items-center justify-between gap-3 border border-dashed border-cdmx-turquesa/60 rounded-xl px-3 py-2 hover:bg-cdmx-turquesa/10 transition-colors"
                >
                  <span className="font-dm-sans text-[12px] text-text-primary text-left">
                    📍 Compartir ubicación al enviar
                  </span>
                  <span className="font-jetbrains text-[10px] uppercase tracking-wide text-cdmx-turquesa">
                    Activar
                  </span>
                </button>
              )}
            </div>
          </div>

          <button
            onClick={enviar}
            disabled={enviando}
            className="w-full h-16 bg-cdmx-rosa rounded-2xl font-syne font-bold text-[18px] text-text-primary shadow-[0_4px_24px_rgba(228,0,124,0.45)] hover:shadow-[0_6px_32px_rgba(228,0,124,0.6)] active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-90"
          >
            {enviando ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-draw-check"
                />
              </svg>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Enviar reporte
              </>
            )}
          </button>

          <button
            onClick={onVolver}
            disabled={enviando}
            className="mt-4 mx-auto block font-dm-sans text-[13px] text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancelar
          </button>
        </StepWrap>
      )}
    </div>
  );
}

function StepWrap({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div key={title} className="flex flex-col flex-1 animate-slide-up-view">
      <h2 className="font-syne font-bold text-[22px] text-text-primary leading-tight mb-5">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

function OptionCard({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-[140px] rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-150 active:scale-95 ${
        active
          ? "border-cdmx-rosa bg-cdmx-rosa/10"
          : "border-border bg-bg-card hover:border-cdmx-turquesa"
      }`}
    >
      <span className="text-[40px] leading-none">{icon}</span>
      <span className="font-syne font-bold text-[16px] text-text-primary">{label}</span>
    </button>
  );
}