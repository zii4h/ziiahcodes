import Link from "next/link";

export default function NavigationDock({ activePage, onHomeClick }) {
  const homeContent = (
    <>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
      </svg>
      <span>Home</span>
    </>
  );

  return (
    <nav className="dock" aria-label="Main navigation">
      {onHomeClick ? (
        <button
          type="button"
          className="dock-item"
          onClick={onHomeClick}
          aria-label="Home, back to top"
          aria-current={activePage === "home" ? "page" : undefined}
        >
          {homeContent}
        </button>
      ) : (
        <Link
          href="/"
          className="dock-item"
          aria-current={activePage === "home" ? "page" : undefined}
        >
          {homeContent}
        </Link>
      )}
      <Link
        href="/misc"
        className="dock-item"
        aria-current={activePage === "misc" ? "page" : undefined}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
        <span>Misc</span>
      </Link>
    </nav>
  );
}
