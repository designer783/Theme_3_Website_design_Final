import { Reveal, Kicker, SectionHead, HBadge, Barcode, Btn, ArrowIcon, CheckIcon } from "../components/ui";
import { SAMPLE_VEHICLES } from "../data";
import { Page } from "../components/Header";
import { VinLookupBox } from "../components/VinLookupBox";
import { VehicleStorytelling } from "../components/VehicleStorytelling";
import { TESTIMONIALS } from "../data/mockData";
import { SITE } from "../config/site";

export default function VehicleHistory({
  onSearchVin,
  onNavigate,
}: {
  onSearchVin: (vin: string) => void;
  onNavigate: (p: Page) => void;
}) {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-line grid-bg relative overflow-hidden">
        <div className="glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-20 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal variant="pulse">
              <HBadge>Vehicle History Report · Ownership, Title &amp; Mileage Records</HBadge>
            </Reveal>
            <Reveal variant="feed" delay={120}>
              <h1 className="mt-7 font-display text-[32px] sm:text-5xl xl:text-[54px] leading-[1.06] font-semibold tracking-tight text-fg max-w-[20ch]">
                Know Your Vehicle's Full <span className="text-lime">Story</span> Before You Sell
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-mut">
                Before you decide what your vehicle is worth and how you want to present it, you should know as much as possible about it. A vehicle history report gathers ownership records, title status, mileage verification, and more — so you're working with the full picture, not assumptions.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-8 w-full">
                <VinLookupBox vinRedirectPath="/members/vin-check/preview" onSearchVin={onSearchVin} />
              </div>
            </Reveal>
          </div>

          <Reveal delay={250} className="relative">
            <div className="relative max-w-md mx-auto lg:ml-auto">
              <div className="border border-line-2 bg-surface shadow-panel hud-corners corners-on overflow-hidden">
                <img
                  src="/hero-image.webp"
                  alt="Vehicle History Documentation Preview"
                  className="w-full object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTERACTIVE STORYTELLING MASTER-DETAIL CONSOLE */}
      <VehicleStorytelling />

      {/* WINDOW STICKER SECTION: COMPLETE THE PICTURE */}
      <section className="py-16 sm:py-24 border-b border-line bg-surface/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Kicker>Original Factory Build Data</Kicker>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-fg leading-tight">
              Complete the Picture with a Window Sticker
            </h2>
            <p className="mt-6 text-[15px] sm:text-base leading-relaxed text-mut">
              A vehicle history report tells you what happened over time. A window sticker tells you what the vehicle was from day one — its original factory configuration, options, MSRP, EPA ratings, and warranty terms. Together, they give you a complete understanding of the vehicle you're selling. For older and enthusiast vehicles, this original build information can be especially difficult to find on your own.
            </p>
            <div className="mt-8">
              <Btn variant="lime" onClick={() => onNavigate("home")}>
                Get Your Window Sticker <ArrowIcon />
              </Btn>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="border border-line-2 bg-bg-2 p-2 hud-corners shadow-panel max-w-lg">
              <img
                src="/Classic%20Vehicle.webp"
                alt="Classic Vehicle Window Sticker"
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VERIFICATION SIGNALS */}
      <section className="border-b border-line bg-bg-2/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <Kicker>Verification Standard</Kicker>
              <Reveal variant="feed" delay={100}>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-fg">Every Report Leaves With a Signal</h2>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {["Clean Title Verified", "0 Accidents Reported", "Odometer Normal & Verified", "NMVTIS & DMV Certified"].map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-2 border border-lime/40 bg-lime/5 px-3.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-lime"
                    >
                      <CheckIcon />
                      {b}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={200} className="flex lg:flex-col items-center lg:items-end gap-6">
              <Barcode className="!text-line-2" label="NMVTIS / DMV / FACTORY DB" />
              <HBadge>Verified</HBadge>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / CUSTOMER REVIEWS */}
      <section className="border-b border-line py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <Kicker>Verified Customer Reviews</Kicker>
              <h2 className="mt-4 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-fg">
                What Our Customers Say
              </h2>
              <p className="mt-3 text-base text-mut max-w-2xl">
                Sellers, collectors, dealership managers, and individual owners who used {SITE.name} to document their vehicles and present them with confidence.
              </p>
            </div>
            <div className="border border-line bg-surface px-5 py-3 hud-corners">
              <span className="font-display text-2xl font-bold text-lime">4.8</span>
              <span className="font-mono text-xs text-mut ml-2">/ 5.0 (150+ reviews)</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="border border-line bg-surface p-5 flex flex-col justify-between hud-corners">
                <div>
                  <div className="flex text-lime text-xs mb-3">★★★★★</div>
                  <p className="text-xs sm:text-[13px] text-mut leading-relaxed italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line">
                  <h4 className="font-display text-sm font-semibold text-fg">{t.author}</h4>
                  {t.vehicleChecked && (
                    <p className="font-mono text-[10px] text-mut mt-0.5">{t.vehicleChecked}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PULL A SAMPLE REPORT CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              index="02"
              kicker="Try It Now"
              title="Pull a Sample Report"
              lede="Run any of these sample VINs through the lookup above, or open a full report directly."
            />
            <div className="flex flex-wrap gap-2.5">
              {SAMPLE_VEHICLES.map((v) => (
                <button
                  key={v.vin}
                  onClick={() => onSearchVin(v.vin)}
                  className="font-mono text-[10.5px] tracking-[0.12em] border border-line-2 px-3 py-2 text-mut hover:border-lime/70 hover:text-lime transition-colors cursor-pointer"
                >
                  {v.vin}
                </button>
              ))}
            </div>
          </div>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Btn variant="solid" onClick={() => onNavigate("sample")}>
                Browse Sample Reports <ArrowIcon />
              </Btn>
              <Btn variant="lime" onClick={() => onNavigate("pricing")}>
                See Pricing <ArrowIcon />
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
