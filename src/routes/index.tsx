import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Droplets } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import VistaB from "@/components/VistaB";
import VistaC from "@/components/VistaC";
import ReportarScreen from "@/components/ReportarScreen";
import CookieBanner from "@/components/CookieBanner";
import PrivacyPanel from "@/components/PrivacyPanel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vive Tranquilo" },
      { name: "description", content: "Sistema ciudadano de monitoreo de inundaciones para la Ciudad de México" },
      { property: "og:title", content: "Vive Tranquilo" },
      { property: "og:description", content: "Sistema ciudadano de monitoreo de inundaciones para la Ciudad de México" },
      { name: "theme-color", content: "#0A1628" },
    ],
  }),
  component: Index,
});

type View = "A" | "B" | "C";
type SubScreenA = "inicio" | "reportar" | "mapa";

function Index() {
  const [view, setView] = useState<View>("A");
  const [subScreenA, setSubScreenA] = useState<SubScreenA>("inicio");
  const [showPrivacy, setShowPrivacy] = useState(false);
  const isMobile = useIsMobile();

  const goView = (v: View) => {
    if ((v === "B" || v === "C") && isMobile) {
      toast("Abre en escritorio para ver el mapa");
      return;
    }
    setView(v);
  };

  if (view === "B") {
    return (
      <div className="animate-fade-in-view">
        <VistaB
          onInstitucional={() => goView("C")}
          onVolver={() => {
            setSubScreenA("inicio");
            setView("A");
          }}
        />
      </div>
    );
  }
  if (view === "C") {
    return (
      <div className="animate-fade-in-view">
        <VistaC
          onCiudadana={() => {
            setSubScreenA("inicio");
            setView("A");
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary flex justify-center animate-fade-in-view">
      <div className="w-full max-w-[390px] min-h-screen bg-bg-primary relative">
        <>
            {subScreenA === "inicio" && (
              <div key="inicio" className="animate-slide-up-view">
                <InicioScreen
                  onReportar={() => setSubScreenA("reportar")}
                  onMapa={() => goView("B")}
                  onPrivacidad={() => setShowPrivacy(true)}
                />
              </div>
            )}
            {subScreenA === "reportar" && (
              <div key="reportar" className="animate-slide-up-view">
                <ReportarScreen
                  onVolver={() => setSubScreenA("inicio")}
                  onEnviado={() => setSubScreenA("inicio")}
                />
              </div>
            )}
        </>
        <CookieBanner onMoreDetails={() => setShowPrivacy(true)} />
        {showPrivacy && <PrivacyPanel onClose={() => setShowPrivacy(false)} />}
      </div>
    </div>
  );
}

function InicioScreen({
  onReportar,
  onMapa,
  onPrivacidad,
}: {
  onReportar: () => void;
  onMapa: () => void;
  onPrivacidad: () => void;
}) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);
  const secs = Math.max(0, Math.floor((Date.now() - now) / 1000));
  const ago =
    secs < 60 ? `hace ${secs < 5 ? 30 : secs} seg` : `hace ${Math.floor(secs / 60)} min`;
  return (
    <div className="flex flex-col min-h-screen px-5 pt-8 pb-6">
      {/* Header */}
      <header className="flex flex-col items-center text-center mb-8">
        <div className="animate-pulse-drop mb-4">
          <Droplets className="w-14 h-14 text-cdmx-turquesa" strokeWidth={2.5} />
        </div>
        <h1 className="font-syne font-bold text-[28px] text-text-primary leading-tight tracking-tight">
          Vive Tranquilo
        </h1>
        <p className="font-dm-sans text-text-secondary mt-2 text-[15px]">
          Tu colonia, tu dato.
        </p>
      </header>

      {/* Status bar */}
      <div className="bg-bg-card rounded-xl px-4 py-3 mb-8 border border-border/40 hover-brighten">
        <p className="font-jetbrains text-[11px] text-text-secondary text-center leading-relaxed">
          📡 12 sensores activos · 47 reportes hoy · {ago}
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Main buttons */}
      <div className="flex flex-col gap-3 mb-8">
        <button
          onClick={onReportar}
          className="w-full h-16 bg-cdmx-rosa rounded-2xl font-syne font-bold text-[18px] text-text-primary shadow-[0_4px_24px_rgba(228,0,124,0.45)] hover:shadow-[0_6px_32px_rgba(228,0,124,0.6)] active:shadow-[0_2px_12px_rgba(228,0,124,0.4)] transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2"
        >
          <span>🚨</span>
          <span>Reportar inundación ahora</span>
        </button>

        <button
          onClick={onMapa}
          className="w-full h-[52px] border border-cdmx-turquesa rounded-2xl font-syne font-bold text-[16px] text-text-primary hover:bg-cdmx-turquesa/10 active:bg-cdmx-turquesa/20 transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2"
        >
          <span>🗺️</span>
          <span>Ver situación de mi zona</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="text-center">
        <p className="font-jetbrains text-[10px] text-text-secondary tracking-wide uppercase">
          Datos en tiempo real · CDMX · CONAGUA
        </p>
        <button
          onClick={onPrivacidad}
          className="mt-2 font-jetbrains text-[10px] uppercase tracking-wide text-text-secondary hover:text-cdmx-turquesa transition-colors"
        >
          🔒 Privacidad
        </button>
      </footer>
    </div>
  );
}
