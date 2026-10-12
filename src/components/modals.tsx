import { ReactNode, useEffect } from "react";
import { cn } from "../utils/cn";
import { Report, StickerData, BuildSheet, buildSheetFrom as buildSheetFromLocal, usd, STICKER_LINKS } from "../data";
import { Barcode, CheckIcon, CloseIcon, ArrowIcon, LogoMark } from "./ui";

/* ------------------------------------------------------------------ */

function Overlay({
  onClose,
  children,
  tone = "dark",
}: {
  onClose: () => void;
  children: ReactNode;
  tone?: "dark" | "doc";
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[90] bg-black/85 backdrop-blur-[3px] overflow-y-auto p-3 sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="min-h-full flex items-start justify-center py-4 sm:py-10"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            "modal-panel relative w-full max-h-[calc(100vh-64px)] overflow-y-auto border",
            tone === "doc" ? "bg-doc text-doc-ink border-line-2" : "bg-surface text-fg border-line-2 shadow-panel"
          )}
          style={{ maxWidth: 980 }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function ModalClose({ onClose, tone = "dark" }: { onClose: () => void; tone?: "dark" | "doc" }) {
  return (
    <button
      onClick={onClose}
      aria-label="Close"
      className={cn(
        "absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center border cursor-pointer transition-colors",
        tone === "doc" ? "border-doc-ink/30 bg-doc text-doc-ink hover:bg-doc-ink hover:text-doc" : "border-line-2 bg-surface-2 text-fg hover:border-lime/60 hover:text-lime"
      )}
    >
      <CloseIcon />
    </button>
  );
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line bg-surface-2/60 px-3.5 py-2.5">
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-mut">{label}</p>
      <p className="mt-1 font-body text-[13px] font-semibold text-fg leading-snug">{value}</p>
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={cn("w-4 h-4", i <= n ? "text-doc-ink" : "text-doc-ink/20")} fill="currentColor" aria-hidden="true">
          <path d="M12 2.5 15 9l7 .7-5.3 4.6 1.6 6.9L12 17.5 5.7 21.2l1.6-6.9L2 9.7 9 9z" />
        </svg>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Vehicle History Report                                              */
/* ------------------------------------------------------------------ */

export function ReportModal({
  report,
  onClose,
  onOpenSticker,
  onOpenBuildSheet,
}: {
  report: Report;
  onClose: () => void;
  onOpenSticker: (s: StickerData) => void;
  onOpenBuildSheet: (b: BuildSheet) => void;
}) {
  const mv = report.currentMarketValue;
  const stickerLink = STICKER_LINKS[report.vin];
  return (
    <Overlay onClose={onClose}>
      <ModalClose onClose={onClose} />
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-bg-2 px-5 sm:px-8 py-4">
        <div className="flex items-center gap-4 min-w-0">
          <LogoMark size={36} invert />
          <div className="min-w-0">
            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-lime truncate">Vehicle History Report</p>
            <h2 className="font-display text-lg sm:text-2xl font-semibold tracking-tight text-fg truncate">
              {report.year} {report.make} {report.model} {report.trim}
            </h2>
          </div>
        </div>
        <div className="hidden md:block">
          <Barcode className="!text-line-2" label={report.vin} />
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <figure className="relative border border-line-2 overflow-hidden hud-corners corners-on bg-surface-2">
            <img src={report.imageUrl} alt={`${report.year} ${report.make} ${report.model}`} className="w-full h-56 sm:h-64 object-cover" loading="lazy" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg/80 to-transparent" aria-hidden="true" />
            <figcaption className="absolute bottom-0 left-0 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-fg/90 bg-bg/80 px-3 py-1.5">
              VIN {report.vin}
            </figcaption>
            <span className="absolute top-0 right-0 bg-lime text-bg font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5">
              {report.titleStatus} Title
            </span>
          </figure>

          <div>
            <div className="grid grid-cols-2 gap-2">
              <SpecCell label="Engine" value={report.engine} />
              <SpecCell label="Transmission" value={report.transmission} />
              <SpecCell label="Drivetrain" value={report.drivetrain} />
              <SpecCell label="Fuel Type" value={report.fuelType} />
              <SpecCell label="Body Style" value={report.bodyStyle} />
              <SpecCell label="Assembly" value={report.assemblyCountry} />
              <SpecCell label="Exterior" value={report.exteriorColor} />
              <SpecCell label="Interior" value={report.interiorColor} />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <SpecCell label="Mileage" value={report.mileage.toLocaleString() + " mi"} />
              <SpecCell label="Odometer Status" value={report.odometerStatus} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 border border-lime/50 bg-lime/10 text-lime px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                <CheckIcon /> {report.titleStatus} Title Verified
              </span>
              <span className="inline-flex items-center gap-1.5 border border-line-2 bg-surface-2 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-fg">
                {report.accidentsCount} Accidents Reported
              </span>
              <span className="inline-flex items-center gap-1.5 border border-line-2 bg-surface-2 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-fg">
                {report.ownersCount} Owner{report.ownersCount === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </section>

        <section className="border border-line bg-bg-2/60">
          <div className="flex items-center justify-between border-b border-line px-4 sm:px-6 py-3">
            <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-fg">Current Market Value</h3>
            <span className="font-mono text-[10px] text-mut">AVG {mv.averageDaysOnMarket} DAYS ON MARKET</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-line border-line">
            {[
              { k: "Trade-In", v: mv.tradeIn },
              { k: "Private Party", v: mv.privateParty },
              { k: "Dealer Retail", v: mv.dealerRetail },
              { k: "Original MSRP", v: report.originalMsrp, hl: true },
            ].map((m) => (
              <div key={m.k} className={cn("px-4 sm:px-5 py-4", m.hl ? "bg-lime" : "bg-surface")}>
                <p className={cn("font-mono text-[9px] uppercase tracking-[0.22em]", m.hl ? "text-bg/60" : "text-mut")}>{m.k}</p>
                <p className={cn("mt-1.5 font-display text-xl sm:text-2xl font-semibold", m.hl ? "text-bg" : "text-fg")}>{usd(m.v)}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <h3 className="flex items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.18em]">
              <span className="h-3 w-1 bg-lime" aria-hidden="true" /> Title Brand Check
            </h3>
            <ul className="mt-4 divide-y divide-line border border-line bg-bg-2/50">
              {report.titleBrands.map((t) => (
                <li key={t.name} className="flex items-start gap-3 px-4 py-3.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-lime/50 bg-lime/10 text-lime">
                    <CheckIcon />
                  </span>
                  <div>
                    <p className="font-body text-[13px] font-semibold text-fg">{t.name}</p>
                    <p className="text-[12px] text-mut leading-snug">{t.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 border border-line bg-bg-2/50 px-4 py-3 flex items-center justify-between gap-3">
              <p className="font-body text-[13px] font-semibold text-fg">Safety Recalls</p>
              {report.safetyRecalls.length === 0 ? (
                <span className="inline-flex items-center gap-1.5 border border-lime/50 bg-lime/10 text-lime px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em]">
                  <CheckIcon /> None on File
                </span>
              ) : (
                <ul className="space-y-1.5 text-right">
                  {report.safetyRecalls.map((r) => (
                    <li key={r.id} className="font-mono text-[10px] text-mut">
                      {r.id} — {r.component} ·{" "}
                      <span className={r.status === "Closed" ? "text-lime font-semibold" : "text-warn font-semibold"}>
                        {r.status.toUpperCase()}
                        {r.closedDate ? ` ${r.closedDate}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.18em]">
              <span className="h-3 w-1 bg-lime" aria-hidden="true" /> Ownership Timeline
            </h3>
            <ul className="mt-4 space-y-2.5">
              {report.ownershipTimeline.map((o) => (
                <li key={o.ownerNumber} className="border border-line bg-bg-2/50 px-4 py-3 flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-lime/50 bg-lime/10 text-lime font-display text-sm font-semibold">
                    {o.ownerNumber}
                  </span>
                  <div className="min-w-0">
                    <p className="font-body text-[13px] font-semibold text-fg">
                      {o.yearPurchased} — {o.yearEnded} <span className="text-mut font-medium">({o.duration})</span>
                    </p>
                    <p className="font-mono text-[10.5px] text-mut truncate">
                      {o.location} · {o.usageType} · ~{o.estimatedMilesPerYear.toLocaleString()} mi/yr
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="mt-7 flex items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.18em]">
              <span className="h-3 w-1 bg-lime" aria-hidden="true" /> Sales History
            </h3>
            <ul className="mt-4 divide-y divide-line border border-line bg-bg-2/50">
              {report.salesHistory.map((s, i) => (
                <li key={i} className="px-4 py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] text-mut">{s.date}</p>
                    <p className="font-body text-[13px] font-semibold text-fg">{s.sellerType}</p>
                    <p className="font-mono text-[10px] text-mut/80">
                      {s.mileage.toLocaleString()} mi · {s.condition}
                    </p>
                  </div>
                  <p className="font-display text-lg font-semibold text-cyan whitespace-nowrap">{usd(s.price)}</p>
                </li>
              ))}
            </ul>
            <h3 className="mt-7 flex items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.18em]">
              <span className="h-3 w-1 bg-lime" aria-hidden="true" /> Service Records
            </h3>
            <ul className="mt-4 space-y-2.5">
              {report.serviceRecords.map((s, i) => (
                <li key={i} className="border border-line border-l-2 border-l-cyan/70 bg-bg-2/50 px-4 py-3">
                  <p className="font-mono text-[10px] text-mut">
                    {s.date} · {s.odometer.toLocaleString()} mi · {s.source}
                  </p>
                  <p className="mt-1 text-[12.5px] text-fg/80 leading-snug">{s.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 border-t border-line pt-6">
          <button
            onClick={() => onOpenSticker(report.windowStickerData)}
            className="btn-hud flex-1 inline-flex items-center justify-center gap-2.5 border border-lime bg-lime text-bg px-6 py-3.5 font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] rounded-[4px] hover:shadow-glow cursor-pointer"
          >
            View Window Sticker <ArrowIcon />
          </button>
          <button
            onClick={() => onOpenBuildSheet(buildSheetFromLocal(report))}
            className="btn-hud flex-1 inline-flex items-center justify-center gap-2.5 border border-line-2 bg-surface-2 text-fg px-6 py-3.5 font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] rounded-[4px] hover:border-lime/60 cursor-pointer"
          >
            View Build Sheet <ArrowIcon />
          </button>
          {stickerLink && (
            <a
              href={stickerLink}
              target="_blank"
              rel="noreferrer"
              className="btn-hud inline-flex items-center justify-center gap-2.5 border border-line-2 bg-transparent text-mut px-6 py-3.5 font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] rounded-[4px] hover:border-lime/70 hover:text-lime cursor-pointer"
            >
              Open Official Sticker <ArrowIcon />
            </a>
          )}
        </div>
      </div>
    </Overlay>
  );
}

/* ------------------------------------------------------------------ */
/* Monroney Window Sticker (paper document)                            */
/* ------------------------------------------------------------------ */

export function StickerModal({ sticker, onClose }: { sticker: StickerData; onClose: () => void }) {
  const maxMpg = 40;
  return (
    <Overlay onClose={onClose} tone="doc">
      <ModalClose onClose={onClose} tone="doc" />
      <div className="bg-doc text-doc-ink grid-bg-doc">
        <div className="border-b-2 border-doc-ink bg-doc-ink text-doc px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <LogoMark size={36} invert />
            <div>
              <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-lime">Original Factory Window Sticker</p>
              <p className="font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-doc/90">Monroney Act Compliant Label</p>
            </div>
          </div>
          <span className="hidden sm:block">
            <Barcode className="!text-line-2" label="SHEET NO. 01/01" />
          </span>
        </div>

        <div className="p-5 sm:p-8">
          <section className="border-2 border-doc-ink">
            <h3 className="bg-doc-ink text-doc px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-center">
              Vehicle Description
            </h3>
            <div className="px-5 sm:px-8 py-6 grid sm:grid-cols-[1fr_auto] gap-6 items-end">
              <div>
                <p className="font-display text-3xl sm:text-5xl font-semibold tracking-tight uppercase">{sticker.make}</p>
                <p className="mt-2 font-body text-lg sm:text-xl font-semibold">
                  {sticker.year} {sticker.model} <span className="text-doc-ink/50">/ {sticker.trim}</span>
                </p>
                <p className="mt-2 font-mono text-[11px] sm:text-[12px] tracking-[0.14em]">{sticker.vin}</p>
              </div>
              <div className="flex sm:block gap-5 sm:gap-8 sm:text-right">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-doc-ink/50">Exterior</p>
                  <p className="font-body text-[13px] font-semibold max-w-[180px]">{sticker.exteriorColor}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-doc-ink/50">Interior</p>
                  <p className="font-body text-[13px] font-semibold max-w-[180px]">{sticker.interiorColor}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 border-2 border-doc-ink">
            <h3 className="bg-doc-2 px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.28em] border-b-2 border-doc-ink text-center">
              Standard Equipment Included At No Extra Charge
            </h3>
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x-2 divide-doc-ink">
              {sticker.standardFeatures.map((f) => (
                <div key={f.category} className="px-5 py-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-warn">{f.category}</p>
                  <ul className="mt-2.5 space-y-1.5">
                    {f.items.map((it, i) => (
                      <li key={i} className="flex gap-2 text-[11.5px] leading-snug text-doc-ink/85">
                        <span className="mt-[7px] h-1 w-1 shrink-0 bg-doc-ink" aria-hidden="true" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 border-2 border-doc-ink">
            <h3 className="bg-doc-2 px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.28em] border-b-2 border-doc-ink text-center">
              Warranty
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 px-5 py-4">
              {sticker.warranty.map((w, i) => (
                <li key={i} className="flex gap-2 py-1 text-[12px] text-doc-ink/85">
                  <span className="mt-[7px] h-1 w-1 shrink-0 bg-doc-ink" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6 border-2 border-doc-ink">
            <h3 className="bg-doc-ink text-doc px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-center">
              Manufacturer&rsquo;s Suggested Retail Price
            </h3>
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x-2 divide-doc-ink text-[12px]">
              <div className="px-5 py-4 space-y-1.5 max-h-56 overflow-y-auto">
                {sticker.optionalEquipment.map((o, i) => (
                  <p key={i} className="flex items-baseline justify-between gap-3">
                    <span className="text-doc-ink/85">
                      {o.name} <span className="font-mono text-[9px] text-doc-ink/40">[{o.code}]</span>
                    </span>
                    <span className={cn("font-mono whitespace-nowrap", o.standard ? "text-doc-ink/40" : "font-bold")}>
                      {o.standard ? "Standard" : usd(o.price)}
                    </span>
                  </p>
                ))}
              </div>
              <div className="px-5 py-4 flex flex-col justify-between gap-4 bg-doc-2/60">
                <div className="space-y-2 font-mono text-[12px]">
                  <p className="flex justify-between gap-3">
                    <span>Base Vehicle</span>
                    <span>{usd(sticker.basePrice)}</span>
                  </p>
                  <p className="flex justify-between gap-3">
                    <span>Options &amp; Packages</span>
                    <span>{usd(sticker.totalOptionsPrice)}</span>
                  </p>
                  <p className="flex justify-between gap-3 border-b-2 border-doc-ink pb-2">
                    <span>Original Shipping Charge</span>
                    <span>{usd(sticker.destinationCharge)} .00</span>
                  </p>
                </div>
                <div className="bg-doc-ink px-4 py-3">
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-doc/70">
                    Total Vehicle Price <span className="font-mono text-[9px] normal-case tracking-normal">(Includes Pre-Delivery Service)</span>
                  </p>
                  <p className="font-display text-3xl sm:text-4xl font-semibold text-lime">
                    {usd(sticker.totalMSRP)}
                    <span className="text-xl align-top">.00</span>
                  </p>
                </div>
              </div>
            </div>
            <p className="border-t-2 border-doc-ink px-5 py-3 font-mono text-[9.5px] leading-relaxed text-doc-ink/50">
              License and title fees, state and local taxes and dealer option and accessories are not included in the manufacturer&rsquo;s
              suggested retail price.
            </p>
          </section>

          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            <section className="border-2 border-doc-ink">
              <h3 className="bg-doc-2 px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.28em] border-b-2 border-doc-ink text-center">
                Fuel Economy and Environment
              </h3>
              <div className="px-5 py-4 bars-in">
                <div className="space-y-3">
                  {(
                    [
                      ["City", sticker.fuelEconomy.cityMpg, false],
                      ["Combined", sticker.fuelEconomy.combinedMpg, true],
                      ["Highway", sticker.fuelEconomy.highwayMpg, false],
                    ] as const
                  ).map(([k, v, hl]) => (
                    <div key={k} className="flex items-center gap-4">
                      <span className={cn("font-mono text-[9.5px] uppercase tracking-[0.2em] w-16", hl ? "font-bold" : "text-doc-ink/50")}>{k}</span>
                      <div className="flex-1 h-2.5 bg-doc-ink/10 overflow-hidden">
                        <div
                          className={cn("bar-fill h-full", hl ? "bg-doc-ink" : "bg-doc-ink/40")}
                          style={{ width: `${Math.min(100, (v / maxMpg) * 100)}%`, animationDelay: `${k === "Combined" ? 100 : 250}ms` }}
                        />
                      </div>
                      <span className={cn("font-display text-xl font-semibold w-10 text-right", hl && "text-warn")}>{v}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 font-mono text-[10.5px] text-doc-ink/75">
                  Annual fuel cost <span className="font-bold text-doc-ink">{usd(sticker.fuelEconomy.annualFuelCost)}</span> · based on 15,000 miles at
                  $4.8 per gallon
                </p>
                <p className="mt-2 text-[10.5px] leading-relaxed text-doc-ink/50">
                  Your actual mileage will vary depending on how you drive or maintain your vehicle. MPGe is miles per gasoline gallon
                  equivalent.
                </p>
              </div>
            </section>

            <section className="border-2 border-doc-ink">
              <h3 className="bg-doc-2 px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.28em] border-b-2 border-doc-ink text-center">
                Government 5-Star Safety Ratings
              </h3>
              <div className="px-5 py-4 space-y-2.5">
                {(
                  [
                    ["Overall Vehicle Score", sticker.safetyRatings.overall],
                    ["Frontal Crash", sticker.safetyRatings.frontalCrash],
                    ["Side Crash", sticker.safetyRatings.sideCrash],
                    ["Rollover", sticker.safetyRatings.rollover],
                  ] as const
                ).map(([k, v]) => (
                  <p key={k} className="flex items-center justify-between gap-3">
                    <span className="font-body text-[12.5px] font-semibold">{k}</span>
                    <Stars n={v} />
                  </p>
                ))}
                <p className="pt-1 text-[10px] leading-relaxed text-doc-ink/50">
                  Star ratings range from 1 to 5 stars, with 5 being the highest. Source: National Highway Traffic Safety Administration.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

/* ------------------------------------------------------------------ */
/* Factory Build Sheet                                                 */
/* ------------------------------------------------------------------ */

export function BuildSheetModal({
  sheet,
  onClose,
  stickerData,
  onOpenSticker,
}: {
  sheet: BuildSheet;
  onClose: () => void;
  stickerData?: StickerData;
  onOpenSticker?: (s: StickerData) => void;
}) {
  const rows: [string, string][] = [
    ["Model Year", String(sheet.year)],
    ["Make", sheet.make],
    ["Model", sheet.model],
    ["Trim", sheet.trim],
    ["Body Style", sheet.bodyStyle],
    ["Engine", sheet.engine],
    ["Transmission", sheet.transmission],
    ["Drivetrain", sheet.drivetrain],
    ["Fuel Type", sheet.fuelType],
    ["Assembly Country", sheet.assemblyCountry],
    ["Exterior Color", sheet.exteriorColor],
    ["Interior Color", sheet.interiorColor],
  ];
  return (
    <Overlay onClose={onClose}>
      <ModalClose onClose={onClose} />
      <div>
        <div className="border-b border-line bg-bg-2 px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <LogoMark size={36} invert />
            <div>
              <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-cyan">Factory Build Sheet</p>
              <h2 className="font-display text-lg sm:text-2xl font-semibold tracking-tight">
                {sheet.year} {sheet.make} {sheet.model}
              </h2>
            </div>
          </div>
          <span className="hidden sm:block">
            <Barcode className="!text-line-2" label={sheet.vin} />
          </span>
        </div>

        <div className="p-5 sm:p-8">
          <div className="grid sm:grid-cols-2 gap-x-10">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-dashed border-line-2/60 py-2.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mut">{k}</span>
                <span className="font-body text-[13px] font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>

          <h3 className="mt-8 font-display text-[11px] font-semibold uppercase tracking-[0.28em] border-b-2 border-lime/60 pb-2 text-fg">
            Build Options &amp; Package Codes
          </h3>
          <ul className="mt-3 divide-y divide-line">
            {sheet.optionalEquipment.map((o, i) => (
              <li key={i} className="flex items-center justify-between gap-4 py-2.5">
                <span className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-[10px] border border-line-2 px-1.5 py-0.5 text-cyan shrink-0">{o.code}</span>
                  <span className="font-body text-[13px] font-semibold truncate text-fg/90">{o.name}</span>
                </span>
                <span className={cn("font-mono text-[11.5px] whitespace-nowrap", o.standard ? "text-mut" : "font-bold text-fg")}>
                  {o.standard ? "Standard" : usd(o.price)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 border border-line-2 bg-bg-2 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-cyan">Documented Original MSRP</p>
              <p className="font-display text-3xl font-semibold text-fg">{usd(sheet.originalMsrp)}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onClose}
                className="btn-hud border border-line-2 bg-transparent text-mut px-5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] rounded-[4px] hover:text-fg cursor-pointer"
              >
                Close
              </button>
              {sheetStickerAction(stickerData, onOpenSticker, sheet)}
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

function sheetStickerAction(
  stickerData: StickerData | undefined,
  onOpenSticker: ((s: StickerData) => void) | undefined,
  sheet: BuildSheet
) {
  if (stickerData && onOpenSticker) {
    return (
      <button
        onClick={() => onOpenSticker(stickerData)}
        className="btn-hud border border-lime bg-lime text-bg px-5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] rounded-[4px] hover:shadow-glow cursor-pointer flex items-center gap-2"
      >
        View Window Sticker <ArrowIcon />
      </button>
    );
  }
  const ext = STICKER_LINKS[sheet.vin];
  return (
    <a
      href={ext}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "btn-hud border px-5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] rounded-[4px] flex items-center gap-2",
        ext ? "border-cyan/60 text-cyan hover:shadow-glow" : "border-line-2 text-mut/50 pointer-events-none"
      )}
    >
      Open Sticker <ArrowIcon />
    </a>
  );
}
