import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useConsent, setConsent, resetConsent } from "@/lib/privacy";

interface Props {
  onClose: () => void;
}

export default function PrivacyPanel({ onClose }: Props) {
  const consent = useConsent();
  const [showPolicy, setShowPolicy] = useState(false);

  const cookiesOn = consent.cookies === "accepted";

  const toggleCookies = () => {
    if (cookiesOn) {
      setConsent({ cookies: "rejected", analytics: false, location: false });
      toast("Almacenamiento local desactivado");
    } else {
      setConsent({ cookies: "accepted" });
      toast.success("Almacenamiento local activado");
    }
  };

  const forget = () => {
    resetConsent();
    toast.success("Preferencias borradas");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 bg-bg-primary flex justify-center animate-fade-in-view overflow-y-auto">
      <div className="w-full max-w-[390px] min-h-screen flex flex-col px-5 pt-5 pb-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-jetbrains text-[11px] uppercase tracking-wide text-text-secondary">
            Privacidad
          </span>
          <span className="w-10" />
        </div>

        <h1 className="font-syne font-bold text-[24px] text-text-primary leading-tight mb-2">
          Tus datos, tu control
        </h1>
        <p className="font-dm-sans text-[13px] text-text-secondary leading-relaxed mb-6">
          Activa o desactiva cada permiso cuando quieras. Los cambios se aplican
          al instante.
        </p>

        {/* Toggles */}
        <div className="flex flex-col gap-3 mb-6">
          <ToggleRow
            icon="🍪"
            title="Almacenamiento local"
            desc="Recordar tus preferencias en este dispositivo."
            checked={cookiesOn}
            onChange={toggleCookies}
          />
          <ToggleRow
            icon="📊"
            title="Analítica anónima"
            desc="Ayúdanos a mejorar la app sin identificarte."
            checked={consent.analytics}
            disabled={!cookiesOn}
            onChange={() => setConsent({ analytics: !consent.analytics })}
          />
          <ToggleRow
            icon="📍"
            title="Ubicación al reportar"
            desc="Solo se usa al enviar un reporte. Nunca en segundo plano."
            checked={consent.location}
            disabled={!cookiesOn}
            onChange={() => setConsent({ location: !consent.location })}
          />
        </div>

        {/* Política expandible */}
        <button
          onClick={() => setShowPolicy((v) => !v)}
          className="w-full flex items-center justify-between bg-bg-card border border-border rounded-xl px-4 py-3 mb-3 hover:border-cdmx-turquesa transition-colors"
        >
          <span className="font-syne font-bold text-[14px] text-text-primary">
            Política de privacidad
          </span>
          <ChevronDown
            className={`w-4 h-4 text-text-secondary transition-transform ${showPolicy ? "rotate-180" : ""}`}
          />
        </button>

        {showPolicy && (
          <div className="bg-bg-card/60 border border-border/60 rounded-xl p-4 mb-6 space-y-3 animate-slide-up-view">
            <p className="font-dm-sans text-[12px] text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Qué guardamos.</strong> Tus
              preferencias se almacenan en tu dispositivo. Los reportes que envías
              son anónimos y agregados por colonia.
            </p>
            <p className="font-dm-sans text-[12px] text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Dónde.</strong> Sin servidores
              de terceros. Sin venta de datos. Sin rastreo entre sitios.
            </p>
            <p className="font-dm-sans text-[12px] text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Derechos ARCO.</strong> Puedes
              acceder, rectificar, cancelar u oponerte al tratamiento de tus
              datos en cualquier momento conforme a la Ley de Protección de Datos
              Personales de la CDMX.
            </p>
          </div>
        )}

        <div className="flex-1" />

        {/* Forget */}
        <button
          onClick={forget}
          className="w-full h-12 rounded-xl border border-cdmx-guinda bg-transparent font-syne font-bold text-[14px] text-cdmx-guinda hover:bg-cdmx-guinda/10 transition-colors active:scale-[0.97]"
        >
          Olvidar mis preferencias
        </button>
      </div>
    </div>
  );
}

function ToggleRow({
  icon,
  title,
  desc,
  checked,
  onChange,
  disabled,
}: {
  icon: string;
  title: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 bg-bg-card border border-border rounded-2xl p-4 ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <span className="text-2xl leading-none mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="font-syne font-bold text-[15px] text-text-primary leading-tight">
          {title}
        </p>
        <p className="font-dm-sans text-[12px] text-text-secondary mt-1 leading-snug">
          {desc}
        </p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-1 ${
          checked ? "bg-cdmx-turquesa" : "bg-border"
        } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-text-primary shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}