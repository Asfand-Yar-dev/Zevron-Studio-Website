"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

const clearHash = () => window.history.replaceState(null, "", window.location.pathname + window.location.search);

// Keeps section navigation from leaving "#section" in the address bar, so reopening or
// refreshing the site starts at the top instead of jumping to the last visited section.
export function ScrollManager() {
  const pathname = usePathname();

  // Arriving with a hash (shared link, or a section link from another page):
  // go to that section once, then clean the URL. The router may re-apply its own URL
  // while the page is still starting up, so wait for load and re-check once.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    let timer = 0;
    const jump = () => document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
    // Web fonts can shift section positions, so jump once they're ready, then re-align once.
    const settle = () =>
      void document.fonts.ready.then(() =>
        requestAnimationFrame(() => {
          jump();
          clearHash();
          timer = window.setTimeout(() => {
            jump();
            if (window.location.hash) clearHash();
          }, 400);
        }),
      );
    if (document.readyState === "complete") settle();
    else window.addEventListener("load", settle, { once: true });
    return () => {
      window.removeEventListener("load", settle);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  // Same-page section links scroll without touching the URL.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;
      const url = new URL(anchor.href, window.location.href);
      if (!url.hash || url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      // Let any open menu close first (it locks page scroll while open).
      requestAnimationFrame(() => target.scrollIntoView({ behavior: scrollBehavior() }));
      if (window.location.hash) clearHash();
    };
    // A hash typed into the address bar of an already-open page.
    const onHashChange = () => {
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      target?.scrollIntoView({ behavior: scrollBehavior() });
      clearHash();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
