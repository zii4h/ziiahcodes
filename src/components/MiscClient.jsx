"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import NavigationDock from "./NavigationDock";
import LastFmCard from "./LastFmCard";
import useReveal from "@/hooks/useReveal";

const gmailComposeUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=ziiah.codes%40gmail.com";
const emailAccountChooserUrl = `https://accounts.google.com/AccountChooser?service=mail&continue=${encodeURIComponent(gmailComposeUrl)}`;

function openEmailAccountChooser(event) {
  event.preventDefault();
  window.open(emailAccountChooserUrl, "_blank", "noopener,noreferrer");
}

const PHOTOS = [
  "/photos/photo1.webp",
  "/photos/photo2.webp",
  "/photos/photo3.webp",
  "/photos/photo4.webp",
  "/photos/photo5.webp",
];

const FALLBACK_COLORS = ["#2a2a2a", "#3a3a3a", "#222222", "#333333", "#2f2f2f"];

function CardArrow({ className = "bento-arrow" }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17 17 7M7 7h10v10" />
      </svg>
    </span>
  );
}

function DraggablePhotoStack() {
  const stackRef = useRef(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const cards = [...stack.children];
    let animating = false;
    let animationTimeout;
    const events = new AbortController();
    const swipeDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300;

    function restack(resetCard) {
      cards.forEach((c, i) => {
        const isTop = i === cards.length - 1;
        const offset = cards.length - 1 - i;
        const rot = (i % 2 === 0 ? 1 : -1) * (offset * 2.5);
        const tx = offset * 3;
        const ty = offset * 4;
        c.style.zIndex = i + 1;
        c.disabled = !isTop;
        c.style.transition = swipeDuration === 0 || c === resetCard ? "none" : "transform .25s ease";
        c.style.transform = isTop
          ? "rotate(0deg) translate(0,0)"
          : `rotate(${rot}deg) translate(${tx}px,${ty}px)`;
      });
    }

    function swipeTopCard(el, x = 0, y = 0) {
      if (animating || el !== cards[cards.length - 1]) return;
      animating = true;
      const restoreFocus = document.activeElement === el;
      const dir = x < 0 ? -1 : 1;
      el.style.transition = `transform ${swipeDuration}ms ease, opacity ${swipeDuration}ms ease`;
      el.style.transform = `translate(${dir * 500}px,${y - 40}px) rotate(${dir * 20}deg)`;
      el.style.opacity = "0";
      animationTimeout = setTimeout(() => {
        const removed = cards.pop();
        cards.unshift(removed);
        stack.insertBefore(removed, stack.firstChild);
        removed.style.transition = "none";
        removed.style.opacity = "1";
        restack(removed);
        animating = false;
        if (restoreFocus) cards[cards.length - 1].focus({ preventScroll: true });
      }, swipeDuration);
    }

    function addDrag(el) {
      let sx = 0, sy = 0, cx = 0, cy = 0, pointerId, dragging = false, moved = false;
      el.addEventListener("pointerdown", start, { signal: events.signal });
      el.addEventListener("click", (e) => {
        if (moved && e.detail !== 0) return;
        swipeTopCard(el);
      }, { signal: events.signal });

      function start(e) {
        if (animating || el !== cards[cards.length - 1] || e.button !== 0) return;
        dragging = true;
        moved = false;
        pointerId = e.pointerId;
        cx = 0;
        cy = 0;
        sx = e.clientX;
        sy = e.clientY;
        el.style.transition = "none";
        document.addEventListener("pointermove", move, { signal: events.signal });
        document.addEventListener("pointerup", end, { signal: events.signal });
        document.addEventListener("pointercancel", end, { signal: events.signal });
      }

      function move(e) {
        if (!dragging || e.pointerId !== pointerId) return;
        cx = e.clientX - sx;
        cy = e.clientY - sy;
        if (Math.hypot(cx, cy) > 6) {
          moved = true;
          el.classList.add("dragging");
        }
        el.style.transform = `translate(${cx}px,${cy}px) rotate(${cx * 0.08}deg)`;
      }

      function end(e) {
        if (!dragging || e.pointerId !== pointerId) return;
        dragging = false;
        el.classList.remove("dragging");
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", end);
        document.removeEventListener("pointercancel", end);

        if (e.type !== "pointercancel" && (Math.abs(cx) > 60 || Math.abs(cy) > 60)) {
          swipeTopCard(el, cx, cy);
        } else {
          restack();
        }
        cx = 0;
        cy = 0;
      }
    }

    cards.forEach(addDrag);
    restack();

    return () => {
      events.abort();
      clearTimeout(animationTimeout);
    };
  }, []);

  return (
    <div className="photo-stack-wrap">
      <div className="photo-stack-inner" ref={stackRef}>
        {PHOTOS.map((src, i) => {
          const offset = PHOTOS.length - 1 - i;
          const rotation = (i % 2 === 0 ? 1 : -1) * offset * 2.5;
          return (
            <button type="button" className="stack-card" aria-label="Show next photo" disabled={offset !== 0} key={src}
              style={{ zIndex: i + 1, transform: `rotate(${rotation}deg) translate(${offset * 3}px,${offset * 4}px)`, background: FALLBACK_COLORS[i] }}>
              <img src={src} alt={`Photo ${i + 1} from Ziah's collection`} width="480" height="480" loading={offset === 0 ? "eager" : "lazy"} fetchPriority={offset === 0 ? "high" : "auto"} decoding="async" draggable={false} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function MiscClient() {
  useReveal();
  return (
    <>
      <div className="top-bar" />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/" className="breadcrumb-home" aria-label="Home">
          <svg viewBox="0 0 24 24" className="breadcrumb-icon">
            <path d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
          </svg>
        </Link>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">
          <svg viewBox="0 0 24 24" className="breadcrumb-page-icon">
  <path d="M4 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM4 15a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
</svg>
          Misc
        </span>
      </div>

      <div className="misc-shell">
        <main className="misc-inner page" id="main-content">
          <div className="section reveal" style={{ marginBottom: "12px", flexShrink: 0 }}>
            <h1 className="section-label">Miscellaneous Stuff</h1>
            <p className="about-text">A place for things that don't have a place.</p>
          </div>

          {/* bento grid */}
          <div className="bento-grid reveal">
            {/* Last.fm */}
            <div className="bento-card bento-col-2 card-lastfm">
              <LastFmCard />
            </div>

            {/* photo stack */}
            <div
              className="bento-card card-photos"
              style={{
                padding: 0,
                overflow: "hidden",
                width: "100%",
                background: "transparent",
                border: "none",
              }}
            >
              <DraggablePhotoStack />
            </div>

            {/* based in */}
            <div className="bento-card card-location">
              <div className="bento-card-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className="bento-card-bottom">
                <div>
                  <div className="bento-title" style={{ fontSize: "11px" }}>
                    Pampanga, 🇵🇭
                  </div>
                  <div className="bento-desc" style={{ fontSize: "10px" }}>
                    Holy Angel University
                  </div>
                </div>
              </div>
            </div>

            {/* free time */}
            <div className="bento-card bento-col-2 card-freetime">
              <svg className="thought-outline" aria-hidden="true">
                <rect x="0.75" y="0.75" rx="5.25" />
              </svg>
              <p className="info-text">
                in my free time i like to read on <strong>reddit</strong>, <strong>threads</strong>{" "}
                and on <strong>daily.dev</strong>! it's also how i stay updated with the latest
                tech-related news and trends. plus music, obviously :D
              </p>
            </div>

            {/* MY PERSONAL GEAR */}
            <div className="bento-card bento-col-2 card-enjoy">
              <div className="bento-label">my personal gear</div>
              <div className="gear-grid">
                {[
                  { name: "Spotify", sub: "Go to music app", icon: "spotify" },
                  { name: "Aquile Reader", sub: "Favorite book reader", icon: "aquile" },
                  { name: "Notion", sub: "Everyday to-do list", icon: "notion" },
                  { name: "Claude", sub: "Thinking things through", icon: "claude" },
                  { name: "VSCode", sub: "Where I build things", icon: "vscode" },
                  { name: "Canva", sub: "Quick visuals and layouts", icon: "canva" },
                  { name: "Catppuccin", sub: "Dark theme for VSCode", icon: "catppuccin" },
                  { name: "Wise", sub: "Personal finance app", icon: "wise" },
                ].map(({ name, sub, icon }) => (
                  <div key={name} className="gear-item">
                    <div className="gear-icon">
                      <img
                        src={`/gear/${icon}.webp`}
                        loading="lazy"
                        decoding="async"
                        alt={name}
                        width="16"
                        height="16"
                      />
                    </div>
                    <div className="gear-text">
                      <span className="gear-name">{name}</span>
                      <span className="gear-sub">{sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* I LIKE */}
            <div className="bento-card card-stack">
              <div className="bento-label">i like</div>
              <div className="tag-cloud">
                {[
                  "Sci-Fi Movies",
                  "Passion Projects",
                  "Weekends",
                  "Dark mode",
                  "Discord Moderation",
                  "One Piece",
                  "Music",
                ].map((t) => (
                  <span key={t} className="bento-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/sophiakeziahpineda"
              target="_blank"
              rel="noreferrer"
              className="bento-card card-linkedin"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <div className="bento-card-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className="bento-card-bottom">
                <div>
                  <div className="bento-title" style={{ fontSize: "11px" }}>LinkedIn</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                    <div className="bento-desc" style={{ fontSize: "10px", margin: 0 }}>view here</div>
                    <CardArrow />
                  </div>
                </div>
              </div>
            </a>

            {/* Threads */}
            <a
              href="https://threads.net/@sphy.keziah"
              target="_blank"
              rel="noreferrer"
              className="bento-card card-threads"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <div className="bento-card-icon" style={{ fontSize: "13px", fontWeight: 500, lineHeight: 1, verticalAlign: "middle" }}>
                @
              </div>
              <div className="bento-card-bottom">
                <div>
                  <div className="bento-title" style={{ fontSize: "11px" }}>Threads</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                    <div className="bento-desc" style={{ fontSize: "10px", margin: 0 }}>@sphy.keziah</div>
                    <CardArrow />
                  </div>
                </div>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/zii4h"
              target="_blank"
              rel="noreferrer"
              className="bento-card card-github"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <div className="bento-card-icon">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" stroke="none">
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-2.1c-3.19.69-3.86-1.54-3.86-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17A10.9 10.9 0 0112 6.84c.97.005 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.13v3.16c0 .3.2.66.79.55C20.71 21.38 24 17.08 24 12 24 5.73 18.27.5 12 .5z" />
                </svg>
              </div>
              <div className="bento-card-bottom">
                <div>
                  <div className="bento-title" style={{ fontSize: "11px" }}>GitHub</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                    <div className="bento-desc" style={{ fontSize: "10px", margin: 0 }}>@zii4h</div>
                    <CardArrow />
                  </div>
                </div>
              </div>
            </a>

            {/* Get in touch bar */}
            <a
              href={emailAccountChooserUrl}
              onClick={openEmailAccountChooser}
              className="git-bar bento-col-3"
              aria-label="Email"
            >
              <div className="git-bar-left">
                <div className="git-bar-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="git-bar-title">Get in Touch</div>
                  <div className="git-bar-sub">Say Hi!</div>
                </div>
              </div>
              <CardArrow className="git-bar-arrow" />
            </a>
          </div>
        </main>
      </div>

      <NavigationDock activePage="misc" />
    </>
  );
}
