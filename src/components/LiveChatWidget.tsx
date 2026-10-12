import React, { useEffect, useState } from 'react';
import { SITE } from '../config/site';

function MessageSquareTextIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="9" x2="15" y2="9" />
      <line x1="9" y1="13" x2="13" y2="13" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function HeadphonesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  );
}

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);

  useEffect(() => {
    // Listen for custom open event triggered from buttons across the site
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-live-chat', handleOpen);
    return () => window.removeEventListener('open-live-chat', handleOpen);
  }, []);

  const handleToggleChat = () => {
    // Attempt LiveChatWidget maximize if official script is loaded
    try {
      if (typeof window !== 'undefined' && (window as any).LiveChatWidget) {
        (window as any).LiveChatWidget.call('maximize');
      }
    } catch {
      // Continue with embedded dialog
    }

    setIsOpen((prev) => !prev);
  };

  return (
    <div
      id="custom-livechat-bottom-right"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 flex flex-col items-end"
    >
      {/* Live Chat Dialogue Box */}
      {isOpen && (
        <div
          id="livechat-dialogue-box"
          role="dialog"
          aria-label="Live Chat Support"
          className="mb-3 w-[calc(100vw-32px)] sm:w-[410px] h-[580px] max-h-[calc(100vh-100px)] bg-surface text-fg rounded-none shadow-panel border border-line-2 overflow-hidden flex flex-col transition-all duration-200 hud-corners corners-on"
        >
          {/* Header */}
          <div className="bg-bg-2 text-fg px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between border-b border-line shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 border border-lime/40 bg-lime/10 text-lime font-mono text-xs">
                <HeadphonesIcon className="w-4 h-4 text-lime" />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-lime border border-bg" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-fg">
                    Live Chat Support
                  </h3>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 border border-lime/40 bg-lime/10 text-lime font-mono text-[9px] uppercase font-bold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-mut mt-0.5 font-mono">
                  Automotive specialists ready to help
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Pop out to full window */}
              <a
                href={SITE.liveChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in standalone window"
                className="p-1.5 text-mut hover:text-lime transition-colors"
              >
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
              {/* Close dialogue box */}
              <button
                id="btn-close-livechat-dialog"
                onClick={() => setIsOpen(false)}
                title="Close chat dialogue box"
                className="p-1.5 text-mut hover:text-fg transition-colors cursor-pointer"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Frame Content */}
          <div className="relative flex-1 w-full h-full bg-bg overflow-hidden">
            {isLoadingIframe && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface gap-3 text-mut z-10 font-mono text-xs">
                <LoaderIcon className="w-6 h-6 text-lime animate-spin" />
                <span>Connecting to Live Chat Agent...</span>
              </div>
            )}
            <iframe
              id="livechat-iframe"
              src={SITE.liveChatUrl}
              title="Live Chat Support Window"
              onLoad={() => setIsLoadingIframe(false)}
              className="w-full h-full border-0 bg-white"
              allow="microphone; camera; clipboard-write; autoplay"
            />
          </div>
        </div>
      )}

      {/* Floating Action Launcher Button & Tooltip */}
      <div className="flex items-center gap-3">
        {/* Tooltip / Prompt bubble when closed */}
        {!isOpen && (
          <div
            className={`hidden sm:flex items-center gap-2 bg-surface text-fg px-3.5 py-2 font-mono text-xs font-semibold shadow-panel border border-line-2 transition-all duration-300 pointer-events-none select-none hud-corners ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-90 translate-x-1'
            }`}
          >
            <span className="w-1.5 h-1.5 bg-lime animate-pulse" />
            <span className="uppercase tracking-[0.12em] text-[10.5px]">Live Support</span>
          </div>
        )}

        {/* Floating Action Button */}
        <button
          id="btn-livechat-launcher"
          onClick={handleToggleChat}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={isOpen ? "Close Live Chat" : "Open Live Chat"}
          aria-expanded={isOpen}
          className={`group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 font-mono transition-all duration-200 cursor-pointer border border-lime/80 shadow-panel hud-corners ${
            isOpen
              ? 'bg-bg-2 text-fg hover:border-lime'
              : 'bg-lime text-bg hover:bg-fg hover:text-bg hover:shadow-glow'
          }`}
        >
          {/* Pulsing online indicator when closed */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime" />
            </span>
          )}

          {/* Dynamic Icon */}
          {isOpen ? (
            <CloseIcon className="w-6 h-6 transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <MessageSquareTextIcon className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
          )}
        </button>
      </div>
    </div>
  );
};
