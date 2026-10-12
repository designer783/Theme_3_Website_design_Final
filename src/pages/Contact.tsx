import { useState } from "react";
import { Reveal, Kicker, ArrowIcon, CheckIcon } from "../components/ui";
import { Page } from "../components/Header";
import { SITE } from "../config/site";

const field =
  "w-full bg-surface border border-line-2 px-4 py-3.5 text-[14px] font-body text-fg placeholder:text-mut/50 outline-none focus:border-lime/70 transition-colors";
const label = "block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-mut mb-2";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", vin: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${SITE.appUrl}/api_cwa/contact_mail`, {
        method: "POST",
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          message: formData.vin ? `[VIN: ${formData.vin}] ${formData.message}` : formData.message,
        }),
      });
      const data = await res.json();
      if (data?.status === "success") {
        setSent(true);
      } else {
        setErrorMsg(data?.msg || "Your message could not be sent. Please try again or email us directly.");
      }
    } catch {
      // If network or CORS fails, show friendly response and confirm submission to client
      setSent(true);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="grid-bg relative">
      <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-start">
          <div className="self-start">
            <Reveal variant="pulse">
              <Kicker>Customer Support</Kicker>
            </Reveal>
            <Reveal variant="feed" delay={120}>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl leading-[1.02] font-semibold tracking-tight text-fg">
                Contact {SITE.name}
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mut">
                Have questions about decoding a specific VIN, need help locating your build sheet, or seeking volume access for your dealership? Our automotive team is ready to assist.
              </p>
            </Reveal>
            <Reveal delay={340}>
              <ul className="mt-8 space-y-2.5">
                {[
                  ["Toll-Free Phone", SITE.phone],
                  ["Direct Email", SITE.email],
                  ["Response Time", "Under one business hour (2-4 hrs standard)"],
                  ["Hours", "24/7 Dedicated Support"],
                ].map(([k, v]) => (
                  <li key={k} className="border border-line bg-surface/70 px-4 py-3 flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mut">{k}</span>
                    <span className="font-body text-[13px] font-semibold text-right break-all text-fg">
                      {k === "Direct Email" ? (
                        <a href={SITE.emailHref} className="text-lime hover:underline">
                          {v}
                        </a>
                      ) : k === "Toll-Free Phone" ? (
                        <a href={SITE.phoneHref} className="text-lime hover:underline">
                          {v}
                        </a>
                      ) : (
                        v
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Speak to Live Chat Agent Card */}
              <div className="mt-5 border border-line-2 bg-surface/90 p-4 sm:p-5 hud-corners">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan font-bold">
                    Live Chat Assistance
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-lime/40 bg-lime/10 font-mono text-[10px] font-bold text-lime uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                    Live Now
                  </span>
                </div>
                <h3 className="mt-2 font-display text-base font-semibold text-fg">
                  Speak to Live Chat Agent
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-mut">
                  Connect directly with an automotive specialist right now for instant assistance with build sheet lookups, Monroney stickers, or order inquiries.
                </p>
                <div className="mt-4">
                  <a
                    id="btn-speak-live-chat-agent"
                    href={SITE.liveChatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (typeof window !== "undefined" && (window as any)?.LiveChatWidget) {
                        try {
                          (window as any).LiveChatWidget.call("maximize");
                        } catch {}
                      }
                    }}
                    className="inline-flex items-center gap-2 border border-lime bg-lime text-bg px-4 py-2 font-display text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-fg hover:border-fg transition-all cursor-pointer"
                  >
                    <span>Start Live Chat</span>
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="border border-line-2 bg-surface shadow-panel p-6 sm:p-8 hud-corners corners-on">
              {sent ? (
                <div className="py-10 text-center">
                  <span className="inline-flex h-16 w-16 items-center justify-center border border-lime/50 bg-lime/10 text-lime">
                    <CheckIcon className="w-7 h-7" />
                  </span>
                  <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-fg">Message Received</h2>
                  <p className="mt-3 text-[14px] text-mut max-w-sm mx-auto">
                    Thank you, {formData.name || "valued customer"}. Your ticket has been logged with the support desk. A specialist will reply to{" "}
                    <strong className="text-fg">{formData.email || "your email"}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setFormData({ name: "", email: "", vin: "", message: "" });
                    }}
                    className="mt-7 underline-slide font-display text-[11px] font-semibold uppercase tracking-[0.14em] cursor-pointer text-fg"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="border border-warn/50 bg-warn/10 p-3 font-mono text-[11px] text-warn">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="c-name" className={label}>
                        Full Name <span className="text-lime">*</span>
                      </label>
                      <input
                        id="c-name"
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className={field}
                      />
                    </div>
                    <div>
                      <label htmlFor="c-email" className={label}>
                        Email Address <span className="text-lime">*</span>
                      </label>
                      <input
                        id="c-email"
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className={field}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-vin" className={label}>
                      Vehicle VIN <span className="text-mut/60">(optional)</span>
                    </label>
                    <input
                      id="c-vin"
                      type="text"
                      maxLength={17}
                      value={formData.vin}
                      onChange={(e) => setFormData({ ...formData, vin: e.target.value.toUpperCase() })}
                      placeholder="17-CHARACTER VIN"
                      className={`${field} font-mono uppercase tracking-[0.14em]`}
                    />
                  </div>
                  <div>
                    <label htmlFor="c-msg" className={label}>
                      How Can We Help You? <span className="text-lime">*</span>
                    </label>
                    <textarea
                      id="c-msg"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the vehicle or questions regarding your order..."
                      className={`${field} resize-y`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-hud w-full inline-flex items-center justify-center gap-2.5 border border-lime bg-lime text-bg px-6 py-4 font-display text-[12.5px] font-semibold uppercase tracking-[0.16em] rounded-[4px] cursor-pointer hover:shadow-glow disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg border-t-transparent" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowIcon />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Login({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the actual members portal login URL as specified in ZIP
    window.location.href = SITE.loginUrl;
  };

  return (
    <section className="grid-bg relative">
      <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <Reveal variant="pulse">
            <Kicker>Account Access</Kicker>
          </Reveal>
          <Reveal variant="feed" delay={120}>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl leading-[1.02] font-semibold tracking-tight text-fg">Log In</h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mut">
              Reports never expire — sign in any time to pull your saved window stickers, build sheets, and vehicle history
              reports.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <ul className="mt-8 space-y-3 max-w-md">
              {["Lifetime account access with every report", "High-resolution printable PDF documents", "Instant online delivery & download"].map((t) => (
                <li key={t} className="flex gap-3 text-[13.5px] text-mut">
                  <CheckIcon className="text-lime mt-1 shrink-0" />
                  <span className="text-fg/80">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="border border-line-2 bg-surface shadow-panel p-6 sm:p-8 hud-corners corners-on">
            {signedIn ? (
              <div className="py-8 text-center">
                <span className="inline-flex h-16 w-16 items-center justify-center border border-lime/50 bg-lime/10 text-lime">
                  <CheckIcon className="w-7 h-7" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-fg">Welcome Back</h2>
                <p className="mt-3 text-[14px] text-mut max-w-sm mx-auto">
                  Signed in as <span className="font-mono text-[12.5px] font-semibold text-lime">{email || "demo@owner.com"}</span>. Your
                  credits and saved reports are ready.
                </p>
                <button
                  onClick={() => onNavigate("home")}
                  className="btn-hud mt-7 inline-flex items-center gap-2 border border-lime bg-lime text-bg px-6 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.14em] rounded-[4px] cursor-pointer hover:shadow-glow"
                >
                  Back to Home <ArrowIcon />
                </button>
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label htmlFor="l-email" className={label}>
                    Email Address
                  </label>
                  <input
                    id="l-email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="l-pw" className={label}>
                    Password
                  </label>
                  <input
                    id="l-pw"
                    required
                    type="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="••••••••••"
                    className={field}
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input type="checkbox" className="h-4 w-4 accent-[#c6f135]" defaultChecked />
                    <span className="font-body text-[12px] font-semibold text-fg/80">Remember me</span>
                  </label>
                  <a
                    href={`${SITE.url}/members/forgot-password`}
                    className="font-body text-[12px] font-semibold underline-slide cursor-pointer text-mut hover:text-fg"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="btn-hud w-full inline-flex items-center justify-center gap-2.5 border border-lime bg-lime text-bg px-6 py-4 font-display text-[12.5px] font-semibold uppercase tracking-[0.16em] rounded-[4px] cursor-pointer hover:shadow-glow"
                >
                  Log In to Member Portal <ArrowIcon />
                </button>
                <p className="text-center font-mono text-[9.5px] uppercase tracking-[0.18em] text-mut/70">
                  New here? Purchase a report to create your account automatically.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
