import { useConsent, setConsent } from "@/lib/privacy";

interface Props {
  onMoreDetails: () => void;
}

export default function CookieBanner({ onMoreDetails }: Props) {
  const consent = useConsent();
  if (consent.cookies !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 pointer-events-none">
      <div
        role="dialog"
        aria-label="Aviso de privacidad"
        className="pointer-events-auto w-full max-w-[390px] bg-bg-card border border-border rounded-2xl p-4 shadow-[0_-8px_32px_rgba(0,0,0,0.5)] animate-slide-up-view"
      >
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl leading-none">🍪</span>
          <p className="font-dm-sans text-[13px] text-text-primary leading-snug">
            Usamos almacenamiento local para recordar tus preferencias y enviar
            reportes anónimos. No vendemos tus datos.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setConsent({ cookies: "rejected", analytics: false, location: false })}
            className="flex-1 h-11 rounded-xl border border-border bg-transparent font-syne font-bold text-[14px] text-text-secondary hover:text-text-primary hover:border-text-secondary transition-colors active:scale-[0.97]"
          >
            Rechazar
          </button>
          <button
            onClick={() => setConsent({ cookies: "accepted" })}
            className="flex-[1.4] h-11 rounded-xl bg-cdmx-rosa font-syne font-bold text-[14px] text-text-primary shadow-[0_4px_16px_rgba(228,0,124,0.35)] hover:shadow-[0_6px_20px_rgba(228,0,124,0.5)] transition-all active:scale-[0.97]"
          >
            Aceptar
          </button>
        </div>

        <button
          onClick={onMoreDetails}
          className="mt-3 w-full text-center font-jetbrains text-[11px] uppercase tracking-wide text-cdmx-turquesa hover:text-text-primary transition-colors"
        >
          Más detalles · Configurar
        </button>
      </div>
    </div>
  );
}