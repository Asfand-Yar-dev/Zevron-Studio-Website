"use client";

import { useEffect, useState } from "react";

// The URL that wasn't found. The 404 page is prerendered without a URL, so read it only
// after mount — rendering it during hydration would mismatch the static HTML.
export function RequestedPath() {
  const [path, setPath] = useState("");
  useEffect(() => setPath(window.location.pathname), []);
  return <>{path || "…"}</>;
}
