import { useState } from "react";
import { cn } from "../utils/cn";
import { SITE } from "../config/site";
import { CloseIcon, ArrowIcon, CheckIcon, Barcode } from "./ui";

export interface CheckoutModalProps {
  pkgName: string;
  pkgPrice: number | string;
  pkgCode?: string;
  checkoutType?: "sticker" | "vhr";
  onClose: () => void;
  onSuccess?: (vin: string) => void;
}

export function CheckoutModal({
  pkgName,
  pkgPrice,
  pkgCode,
  checkoutType = "sticker",
  onClose,
  onSuccess,
}: CheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [vin, setVin] = useState("");
  const [phone, setPhone] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = /^\S+@\S+\.\S+$/.test(email.trim());

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail) {
      setError("Please enter a valid email address for delivery.");
      return;
    }

    setIsRedirecting(true);
    setError("");

    // Build payload matching ZIP's checkout flow
    const planCode = pkgCode || (pkgName.toLowerCase().includes("unlimited") ? "BUILDSHEETSTICKERSTUN" : "BUILDSHEETSTICKERST1");
    const fields = [
      { name: "email", value: email.trim() },
      { name: "cart_plan", value: planCode },
      { name: "vin", value: vin.trim() || "CREDIT" },
      { name: "phone", value: phone.trim() },
      { name: "user_type", value: "user" },
      { name: "payment_gateway", value: "default" },
    ];

    try {
      const bytes = new TextEncoder().encode(JSON.stringify(fields));
      const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
      const newData = btoa(binString);
      const wpPage = window.location.pathname.replace(/^\/+|\/+$/g, "").replace(/\.html$/, "") || "pricing";
      const params = new URLSearchParams({
        "new-data": newData,
        wpPage,
        type: checkoutType,
      });

      // Redirect to actual checkout
      window.location.href = `${SITE.url}/members/checkout?${params.toString()}`;
    } catch {
      // Fallback
      if (onSuccess) {
        onSuccess(vin || "WDDGF5EB3BR183192");
      }
      setIsRedirecting(false);
    }
  };

  const formattedPrice = typeof pkgPrice === "number" ? `$${pkgPrice.toFixed(2)}` : pkgPrice;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[95] bg-black/85 backdrop-blur-[4px] overflow-y-auto p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="modal-panel relative w-full max-w-lg border border-line-2 bg-surface text-fg shadow-panel hud-corners corners-on overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line bg-bg-2 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-lime/60 bg-lime/10 text-lime font-mono text-xs font-bold">
              SSL
            </span>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-lime">256-Bit Encrypted Checkout</p>
              <h3 className="font-display text-base font-semibold text-fg">{pkgName}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center border border-line-2 bg-surface-2 text-mut hover:text-lime hover:border-lime/60 transition-colors cursor-pointer"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border border-line-2 bg-bg-2/70 p-4">
            <div>
              <p className="font-display text-[15px] font-semibold text-fg">{pkgName}</p>
              <p className="font-mono text-[11px] text-mut mt-0.5">Includes instant delivery &amp; lifetime access</p>
            </div>
            <div className="text-right">
              <span className="font-display text-2xl font-bold text-lime">{formattedPrice}</span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-mut">Package Total</span>
            </div>
          </div>

          {error && (
            <div className="border border-warn/50 bg-warn/10 p-3 font-mono text-[11px] text-warn">
              {error}
            </div>
          )}

          <form onSubmit={handleProceed} className="space-y-4">
            <div>
              <label htmlFor="chk-email" className="block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-mut mb-1.5">
                Delivery Email Address <span className="text-lime">*</span>
              </label>
              <input
                id="chk-email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="name@example.com"
                className="w-full bg-surface-2 border border-line-2 px-4 py-3 text-[14px] font-body text-fg placeholder:text-mut/50 outline-none focus:border-lime/70 transition-colors"
              />
              <span className="block mt-1 font-mono text-[9.5px] text-mut/70">
                Your report login link and certified records will be delivered here.
              </span>
            </div>

            <div>
              <label htmlFor="chk-vin" className="block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-mut mb-1.5">
                Vehicle VIN <span className="text-mut/60">(Optional — or redeem later)</span>
              </label>
              <input
                id="chk-vin"
                type="text"
                maxLength={17}
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
                placeholder="17-CHARACTER VIN"
                className="w-full bg-surface-2 border border-line-2 px-4 py-3 text-[14px] font-mono uppercase tracking-[0.14em] text-fg placeholder:text-mut/50 outline-none focus:border-lime/70 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="chk-phone" className="block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-mut mb-1.5">
                Phone Number <span className="text-mut/60">(Optional)</span>
              </label>
              <input
                id="chk-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-surface-2 border border-line-2 px-4 py-3 text-[14px] font-body text-fg placeholder:text-mut/50 outline-none focus:border-lime/70 transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isRedirecting || !isValidEmail}
                className={cn(
                  "btn-hud w-full inline-flex items-center justify-center gap-2.5 border border-lime bg-lime text-bg px-6 py-4 font-display text-[12.5px] font-semibold uppercase tracking-[0.16em] rounded-[4px] cursor-pointer hover:shadow-glow transition-all",
                  (!isValidEmail || isRedirecting) && "opacity-60 cursor-not-allowed"
                )}
              >
                {isRedirecting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg border-t-transparent" />
                    <span>Redirecting to Secure Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Checkout ({formattedPrice})</span>
                    <ArrowIcon />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="border-t border-line pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-mut">
              <CheckIcon className="text-lime w-3 h-3" /> NMVTIS &amp; DMV Certified
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mut">
              Credits Never Expire
            </span>
          </div>

          <p className="text-[11px] leading-relaxed text-mut/80 text-center">
            By proceeding, you agree to the{" "}
            <a href="/terms" className="text-lime underline hover:text-fg">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-lime underline hover:text-fg">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
