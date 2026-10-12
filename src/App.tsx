import { useState, useEffect } from "react";
import { Agentation } from "agentation";
import Header, { Page } from "./components/Header";
import Footer from "./components/Footer";
import { ReportModal, StickerModal, BuildSheetModal } from "./components/modals";
import Home from "./pages/Home";
import VehicleHistory from "./pages/VehicleHistory";
import Sample from "./pages/Sample";
import Pricing from "./pages/Pricing";
import { Contact, Login } from "./pages/Contact";
import { Terms, Privacy } from "./pages/Legal";
import StyleGuide from "./pages/StyleGuide";
import { REPORTS, FALLBACK_REPORT, Report, StickerData, BuildSheet } from "./data";
import { ROUTES, pageFromPath } from "./routes";
import { SITE } from "./config/site";
import { RevisitBanner } from "./components/RevisitBanner";
import { LiveChatWidget } from "./components/LiveChatWidget";

interface BuildSheetState {
  sheet: BuildSheet;
  stickerData?: StickerData;
}

export default function App() {
  const [page, setPage] = useState<Page>(() => pageFromPath(window.location.pathname) as Page);
  const [report, setReport] = useState<Report | null>(null);
  const [sticker, setSticker] = useState<StickerData | null>(null);
  const [buildSheet, setBuildSheet] = useState<BuildSheetState | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [revisitVin, setRevisitVin] = useState("3FA6P0RU9HR306143");
  const [isRevisitBannerVisible, setIsRevisitBannerVisible] = useState(true);

  useEffect(() => {
    if (page === "login") {
      window.location.replace(SITE.loginUrl);
      return;
    }
    const route = ROUTES[page];
    if (route) {
      document.title = route.title;
    }
  }, [page]);

  useEffect(() => {
    const onPopState = () => {
      setPage(pageFromPath(window.location.pathname) as Page);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (p: Page) => {
    if (p === "login") {
      window.location.href = SITE.loginUrl;
      return;
    }
    const route = ROUTES[p];
    if (route && window.location.pathname !== route.path) {
      window.history.pushState(null, "", route.path);
    }
    setPage(p);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const findMatch = (key: string): Report | undefined => {
    if (!key) return undefined;
    const prefix = Object.keys(REPORTS).find((k) => k.startsWith(key.slice(0, 3))) ?? "";
    return REPORTS[key] ?? (prefix ? REPORTS[prefix] : undefined);
  };

  const openReport = (vin: string) => {
    const key = vin.trim().toUpperCase();
    setReport(findMatch(key) || { ...FALLBACK_REPORT, vin: key || FALLBACK_REPORT.vin });
  };

  const openStickerByVin = (vin: string) => {
    const hit = findMatch(vin.trim().toUpperCase());
    if (hit?.windowStickerData) setSticker(hit.windowStickerData);
  };

  const openBuildSheet = (sheet: BuildSheet) => {
    const src = Object.values(REPORTS).find((r) => r.vin === sheet.vin);
    setBuildSheet({ sheet, stickerData: src?.windowStickerData });
  };

  const openLookup = () => {
    if (page !== "home") {
      navigate("home");
      setTimeout(() => {
        document.getElementById("vin-lookup-container")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 120);
    } else {
      document.getElementById("vin-lookup-container")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg text-fg font-body antialiased">
      <div className="grain-layer" aria-hidden="true" />
      <Header currentPage={page} onNavigate={navigate} onOpenLookup={openLookup} />

      <main className="flex-1">
        {page === "home" && (
          <Home
            onSearchVin={openReport}
            onOpenSticker={openStickerByVin}
            setSelectedPackage={setSelectedPackage}
            selectedPackage={selectedPackage}
            onNavigate={navigate}
          />
        )}
        {page === "vehicle-history" && <VehicleHistory onSearchVin={openReport} onNavigate={navigate} />}
        {page === "sample" && (
          <Sample onOpenReport={openReport} onOpenSticker={openStickerByVin} onOpenBuildSheet={openBuildSheet} />
        )}
        {page === "pricing" && (
          <Pricing setSelectedPackage={setSelectedPackage} selectedPackage={selectedPackage} onNavigate={navigate} />
        )}
        {page === "contact" && <Contact />}
        {page === "login" && <Login onNavigate={navigate} />}
        {page === "terms" && <Terms onNavigate={navigate} />}
        {page === "privacy" && <Privacy onNavigate={navigate} />}
        {page === "style-guide" && <StyleGuide onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} />

      {report && (
        <ReportModal
          report={report}
          onClose={() => setReport(null)}
          onOpenSticker={(s) => setSticker(s)}
          onOpenBuildSheet={(sheet) => {
            setBuildSheet({ sheet, stickerData: report.windowStickerData });
          }}
        />
      )}
      {sticker && <StickerModal sticker={sticker} onClose={() => setSticker(null)} />}
      {buildSheet && (
        <BuildSheetModal
          sheet={buildSheet.sheet}
          stickerData={buildSheet.stickerData}
          onOpenSticker={(s) => setSticker(s)}
          onClose={() => setBuildSheet(null)}
        />
      )}

      {/* Interactive Revisit Banner with Variable VIN */}
      <RevisitBanner
        vin={revisitVin}
        isOpen={isRevisitBannerVisible}
        onClose={() => setIsRevisitBannerVisible(false)}
        onAction={(vinToOpen) => {
          openReport(vinToOpen);
        }}
      />

      {/* Live Chat Widget (Bottom Right) */}
      <LiveChatWidget />

      {import.meta.env?.DEV === true || (typeof process !== "undefined" && process.env.NODE_ENV === "development") ? <Agentation /> : null}
    </div>
  );
}
