import React, { useState } from "react";
import { cn } from "../utils/cn";
import { Reveal, Kicker, ArrowIcon, CheckIcon } from "./ui";

interface StoryItem {
  id: string;
  label: string;
  shortTag: string;
  categoryTag: string;
  title: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  imageAlt: string;
}

const STORIES: StoryItem[] = [
  {
    id: "auction",
    label: "Auction Records",
    shortTag: "10 Photos",
    categoryTag: "Auction Documentation",
    title: "Auction Records with Photos",
    description: "If your vehicle has been through an auction at any point, this section documents that history. Knowing this upfront helps you understand how the vehicle was previously valued and what condition it was in at that time.",
    highlights: [
      "Auction condition grade and final bid amounts",
      "Key availability and engine start status at time of auction",
      "Title type and any noted damage at time of sale",
      "Auction location and seller classification (insurance, dealer, or private)",
      "Up to 10 vehicle photos from the auction, when available",
    ],
    imageSrc: "/Auction Records.webp",
    imageAlt: "Historical Auction Sales Photos and Listing Preview",
  },
  {
    id: "sales",
    label: "Sales Listing",
    shortTag: "Sale History",
    categoryTag: "Listing History",
    title: "Previous Sales Listings",
    description: "See where and when the vehicle was previously listed for sale. Understanding how your vehicle has been priced and positioned in the past helps you make a more informed decision about your own asking price.",
    highlights: [
      "Dates and locations of previous sale listings",
      "Listed price at each point of sale",
      "Mileage documented at each listing",
      "Seller type: private, dealership, auction, or classified",
    ],
    imageSrc: "/Sales Listing.webp",
    imageAlt: "Sales Listing with Photos Preview",
  },
  {
    id: "usage",
    label: "Vehicle Usage",
    shortTag: "Usage Type",
    categoryTag: "Usage Documentation",
    title: "Vehicle Usage Type",
    description: "Knowing whether your vehicle was used as a personal car, rental, fleet vehicle, or in a commercial capacity is important context. This section documents the available usage classification so you have a clear picture of how the vehicle has been used.",
    highlights: [
      "Personal or family use",
      "Rental or fleet vehicle history",
      "Taxi, ride-share, or police use",
      "Government or commercial use",
    ],
    imageSrc: "/Vehicle Usage.webp",
    imageAlt: "Vehicle Usage Records Preview",
  },
  {
    id: "ownership",
    label: "Ownership History",
    shortTag: "Tenure & State",
    categoryTag: "Ownership Records",
    title: "Ownership Timeline",
    description: "Understanding the ownership timeline of your vehicle helps you see the bigger picture — how long each owner held it, where it was registered, and how many hands it has passed through. This context matters when positioning your vehicle for sale.",
    highlights: [
      "Total number of previous owners",
      "Approximate purchase dates for each owner",
      "State or region where the vehicle was registered",
      "Duration of each ownership period",
    ],
    imageSrc: "/Ownership History.webp",
    imageAlt: "Ownership History Record Preview",
  },
  {
    id: "title",
    label: "Title Status",
    shortTag: "60+ Checks",
    categoryTag: "Title Verification",
    title: "Title Brand Check",
    description: "Before you sell, you should know exactly where your vehicle's title stands. Our report verifies it against 60+ title brand categories across all 50 states, so you understand its status before entering any negotiation.",
    highlights: [
      "Salvage, rebuilt, or total loss title brands",
      "Theft and recovery records",
      "Flood and water damage designations",
      "Structural damage, hail, fire damage, and more",
      "Duplicate title flags",
    ],
    imageSrc: "/Title Brand.webp",
    imageAlt: "Title Brand Verification Preview",
  },
  {
    id: "accidents",
    label: "Accident Records",
    shortTag: "Date & Place",
    categoryTag: "Collision Records",
    title: "Accident Documentation",
    description: "Understanding whether any incidents are on record helps you know exactly what information is out there about your vehicle. A clean record is a strong point in your favor. If there is history, it's better to know it yourself before the conversation starts.",
    highlights: [
      "Date and location of any reported incidents",
      "Severity assessment and structural damage notes",
      "Airbag deployment and police report records",
    ],
    imageSrc: "/Accident History.webp",
    imageAlt: "Accident History Records Preview",
  },
  {
    id: "stolen",
    label: "Theft Records",
    shortTag: "Theft Check",
    categoryTag: "Theft Verification",
    title: "Theft Record Check",
    description: "Confirming that your vehicle has no active theft records gives you certainty about the title's legitimacy. This check runs against national theft databases so you can be sure of the vehicle's standing before listing it.",
    highlights: [
      "Active theft records verified against law enforcement and insurance data",
      "Theft recovery status and title legitimacy confirmation",
      "Confirms the vehicle is clear for title transfer",
    ],
    imageSrc: "/Stolen Vehicle.webp",
    imageAlt: "Stolen Vehicle Database Cross-Check Preview",
  },
  {
    id: "odometer",
    label: "Odometer Verification",
    shortTag: "Mileage Check",
    categoryTag: "Mileage Verification",
    title: "Odometer Verification",
    description: "Knowing that your vehicle's mileage is consistent and verifiable is essential when pricing it. Our report tracks odometer readings across inspections, service visits, and DMV records to confirm the mileage progression adds up.",
    highlights: [
      "Sequential mileage tracking across multiple data points",
      "Rollback and discrepancy detection",
      "Cross-referenced DMV, inspection, and service records",
    ],
    imageSrc: "/Odometer Rollback.webp",
    imageAlt: "Odometer Rollback Verification Preview",
  },
  {
    id: "lien",
    label: "Loan & Lien",
    shortTag: "Lender Check",
    categoryTag: "Financial Status",
    title: "Loan & Lien Status",
    description: "Before listing your vehicle, you should confirm whether any active loans or financial encumbrances are associated with it. This section documents the lien status so you can address any outstanding obligations before the sale.",
    highlights: [
      "Active loan and lien status from financial institutions",
      "Confirmation that the title is clear for transfer",
      "Helps you prepare for a smooth, straightforward title transfer",
    ],
    imageSrc: "/Loan and Lien.webp",
    imageAlt: "Loan and Lien Check Preview",
  },
];

export const VehicleStorytelling: React.FC = () => {
  const [activeStoryId, setActiveStoryId] = useState<string>("auction");

  const currentIndex = STORIES.findIndex((s) => s.id === activeStoryId);
  const currentStory = STORIES[currentIndex] || STORIES[0];

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % STORIES.length;
    setActiveStoryId(STORIES[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + STORIES.length) % STORIES.length;
    setActiveStoryId(STORIES[prevIndex].id);
  };

  return (
    <section className="py-14 sm:py-20 border-b border-line bg-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-line">
          <div>
            <Kicker>Vehicle History Documentation</Kicker>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-fg">
              What Can You Learn About Your Vehicle?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-mut leading-relaxed max-w-2xl">
              A vehicle history report pulls together ownership records, title status, mileage verification, and more. This is the information you should review before deciding how to position and price your vehicle.
            </p>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <span className="font-mono text-xs text-mut font-semibold uppercase tracking-[0.14em]">
              <strong className="text-lime">{currentIndex + 1}</strong> / {STORIES.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Category"
                className="w-9 h-9 border border-line-2 bg-bg-2 hover:border-lime/60 text-fg flex items-center justify-center transition-colors cursor-pointer"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Category"
                className="w-9 h-9 border border-line-2 bg-bg-2 hover:border-lime/60 text-fg flex items-center justify-center transition-colors cursor-pointer"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Category Buttons */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-5">
          {STORIES.map((s) => {
            const isActive = activeStoryId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStoryId(s.id)}
                className={cn(
                  "px-3.5 py-2 font-display text-[11px] font-bold uppercase tracking-[0.14em] shrink-0 transition-all border cursor-pointer",
                  isActive
                    ? "bg-lime text-bg border-lime shadow-glow"
                    : "bg-surface border-line text-mut hover:text-fg"
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Master-Detail Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Category Navigation Dock (lg:col-span-5) */}
          <div className="hidden lg:flex flex-col space-y-1.5 lg:col-span-5">
            {STORIES.map((s) => {
              const isActive = activeStoryId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStoryId(s.id)}
                  className={cn(
                    "w-full px-4 py-3.5 border text-left transition-all cursor-pointer flex items-center justify-between group hud-corners",
                    isActive
                      ? "bg-surface-2 border-lime/80 shadow-glow text-fg"
                      : "bg-surface border-line text-mut hover:border-line-2 hover:text-fg"
                  )}
                >
                  <div className="min-w-0 pr-3">
                    <p className={cn("font-display text-[14px] font-semibold truncate", isActive ? "text-lime" : "text-fg")}>
                      {s.label}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mut truncate mt-0.5">
                      {s.categoryTag}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "font-mono text-[9.5px] uppercase tracking-[0.18em] px-2 py-1 shrink-0 border",
                      isActive
                        ? "border-lime/50 text-lime bg-lime/10"
                        : "border-line text-mut/70"
                    )}
                  >
                    {s.shortTag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Inspector Card (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="bg-surface border border-line-2 shadow-panel hud-corners corners-on overflow-hidden">
              {/* Header Bar */}
              <div className="p-5 sm:p-6 border-b border-line">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-lime font-bold block mb-2">
                  {currentStory.categoryTag}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-fg tracking-tight">
                  {currentStory.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-mut leading-relaxed">
                  {currentStory.description}
                </p>
              </div>

              {/* Image Preview Container */}
              <div className="relative w-full overflow-hidden bg-bg-2" style={{ minHeight: "360px" }}>
                <img
                  src={currentStory.imageSrc}
                  alt={currentStory.imageAlt}
                  className="w-full h-full object-contain mx-auto"
                  style={{ maxHeight: "480px" }}
                />
              </div>

              {/* Highlights List Strip */}
              <div className="p-4 sm:p-5 bg-bg-2 border-t border-line space-y-2">
                {currentStory.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 bg-surface border border-line text-xs sm:text-[13px] text-fg/90"
                  >
                    <CheckIcon className="text-lime shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
