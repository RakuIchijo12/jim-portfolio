"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { contactEmail, navLinks, projects, resumeHref, socialLinks } from "@/app/lib/data";
import { createStore } from "@/app/lib/store";
import { toggleTheme } from "@/app/lib/theme";
import { usePageTransition } from "@/app/components/motion/page-transition";
import { scrollToTarget, useLenis } from "@/app/components/motion/smooth-scroll";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CopyIcon,
  DocumentIcon,
  HashIcon,
  MoonIcon,
  SearchIcon,
  TerminalIcon,
} from "@/app/components/ui/icons";

const paletteStore = createStore(false);

export const openPalette = () => paletteStore.set(true);

/** "Ctrl K" everywhere except Apple keyboards, which get "⌘K". */
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const noopSubscribe = () => () => {};
const clientLabel = () => (isMac() ? "⌘K" : "Ctrl K");
const serverLabel = () => "Ctrl K";

export function useShortcutLabel() {
  return useSyncExternalStore(noopSubscribe, clientLabel, serverLabel);
}

type Command = {
  id: string;
  group: "Navigate" | "Projects" | "Actions" | "Links";
  label: string;
  hint?: string;
  keywords?: string;
  icon: React.ReactNode;
  run: () => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Ctrl+K (or /) opens a command palette, the way a code editor does: jump
 * to a section, open a case study, copy the email, switch the theme. It is
 * only rendered while open, so it costs nothing the rest of the time.
 */
export default function CommandPalette() {
  const open = useSyncExternalStore(paletteStore.subscribe, paletteStore.get, () => false);
  const close = useCallback(() => paletteStore.set(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        !!target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
      if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        paletteStore.set(!paletteStore.get());
      } else if (event.key === "/" && !typing && !paletteStore.get()) {
        event.preventDefault();
        paletteStore.set(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return <AnimatePresence>{open && <Palette onClose={close} />}</AnimatePresence>;
}

function Palette({ onClose }: { onClose: () => void }) {
  const navigate = usePageTransition();
  const pathname = usePathname();
  const lenis = useLenis();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const goSection = (href: string) => () => {
      onClose();
      if (pathname === "/") window.setTimeout(() => scrollToTarget(href), 60);
      else navigate(`/${href}`, href.slice(1));
    };
    const openUrl = (url: string) => () => {
      onClose();
      window.open(url, "_blank", "noopener,noreferrer");
    };

    return [
      ...navLinks.map<Command>((link) => ({
        id: `nav-${link.href}`,
        group: "Navigate",
        label: `Go to ${link.label}`,
        hint: link.href,
        icon: <HashIcon className="h-4 w-4" />,
        run: goSection(link.href),
      })),
      ...projects.map<Command>((project) => ({
        id: `project-${project.id}`,
        group: "Projects",
        label: project.name,
        hint: project.category,
        keywords: project.technologies.join(" "),
        icon: <TerminalIcon className="h-4 w-4" />,
        run: () => {
          onClose();
          navigate(`/projects/${project.id}`, project.name);
        },
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: contactEmail,
        keywords: "mail contact",
        icon: <CopyIcon className="h-4 w-4" />,
        run: () => {
          navigator.clipboard?.writeText(contactEmail).then(
            () => setToast("Email copied to clipboard"),
            () => setToast(contactEmail),
          );
        },
      },
      {
        id: "theme",
        group: "Actions",
        label: "Toggle light / dark theme",
        keywords: "appearance mode",
        icon: <MoonIcon className="h-4 w-4" />,
        run: () => {
          onClose();
          window.setTimeout(() => toggleTheme(), 80);
        },
      },
      {
        id: "resume",
        group: "Actions",
        label: "Open résumé (PDF)",
        keywords: "cv resume download",
        icon: <DocumentIcon className="h-4 w-4" />,
        run: openUrl(resumeHref),
      },
      ...socialLinks
        .filter((link) => link.icon !== "mail")
        .map<Command>((link) => ({
          id: `link-${link.label}`,
          group: "Links",
          label: `Open ${link.label}`,
          hint: link.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
          icon: <ArrowUpRightIcon className="h-4 w-4" />,
          run: openUrl(link.href),
        })),
    ];
  }, [navigate, onClose, pathname]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint ?? ""} ${c.keywords ?? ""} ${c.group}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  const current = Math.min(active, Math.max(results.length - 1, 0));

  // Hold the page still and return focus where it was when the palette closes.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    lenis?.stop();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      lenis?.start();
      document.body.style.overflow = overflow;
      previous?.focus?.({ preventScroll: true });
    };
  }, [lenis]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(id);
  }, [toast]);

  // Keep the highlighted row in view.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${current}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [current]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      results[current]?.run();
    } else if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "Tab") {
      // Focus stays in the field; the list is driven by the arrows.
      event.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <m.div
      className="palette"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onKeyDown={onKeyDown}
    >
      <div aria-hidden="true" className="palette__scrim" onClick={onClose} />
      <m.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="palette__box"
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.22, ease }}
      >
        <div className="palette__search">
          <SearchIcon className="h-4 w-4 shrink-0 text-subtle" />
          <input
            ref={inputRef}
            className="palette__input"
            placeholder="Type a command or search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[current] ? `cmd-${results[current].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="kbd">Esc</kbd>
        </div>

        <ul ref={listRef} id="palette-list" role="listbox" className="palette__list" data-lenis-prevent>
          {results.length === 0 && <li className="palette__empty">No matching commands.</li>}
          {results.map((cmd, i) => {
            const heading = cmd.group !== lastGroup ? cmd.group : null;
            lastGroup = cmd.group;
            return (
              <li key={cmd.id} role="presentation">
                {heading && <p className="palette__group">{heading}</p>}
                <button
                  type="button"
                  id={`cmd-${cmd.id}`}
                  role="option"
                  aria-selected={i === current}
                  data-index={i}
                  className="palette__item"
                  tabIndex={-1}
                  onMouseMove={() => i !== current && setActive(i)}
                  onClick={() => cmd.run()}
                >
                  <span className="palette__icon">{cmd.icon}</span>
                  <span className="palette__label">{cmd.label}</span>
                  {cmd.hint && <span className="palette__hint">{cmd.hint}</span>}
                  <ArrowRightIcon className="palette__go h-3.5 w-3.5" />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="palette__foot">
          <span>
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd> to move
          </span>
          <span>
            <kbd className="kbd">↵</kbd> to run
          </span>
          <span aria-live="polite" className="palette__toast">
            {toast}
          </span>
        </div>
      </m.div>
    </m.div>
  );
}
