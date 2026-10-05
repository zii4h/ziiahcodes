"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PageSwitcher() {
  const pathname = usePathname();
  const iconRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => () => animationRef.current?.cancel(), []);

  function rotateOnClick(event) {
    if (
      event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    ) return;

    const icon = iconRef.current;
    if (!icon) return;

    const current = getComputedStyle(icon).transform;
    const from = current === "none" ? "rotate(0deg)" : current;
    const to = `${from} rotate(180deg)`;
    animationRef.current?.cancel();
    icon.style.transform = to;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animationRef.current = icon.animate(
        [{ transform: `${from} rotate(0deg)` }, { transform: to }],
        { duration: 250, easing: "ease" },
      );
    }
  }

  const isHome = pathname === "/";
  const isMisc = pathname === "/misc" || pathname === "/misc/";

  if (!isHome && !isMisc) return null;

  const href = isHome ? "/misc" : "/";
  const label = isHome ? "Misc" : "Home";

  return (
    <Link
      href={href}
      className="page-switch"
      title={label}
      aria-label={`Go to ${label}`}
      onClick={rotateOnClick}
    >
      <svg
        ref={iconRef}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    </Link>
  );
}
