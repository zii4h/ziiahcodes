"use client";

import { useState, useEffect, useRef } from "react";

const LASTFM_USER = "sophziah";
const LASTFM_API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;

const TABS = [
  { key: "albums", label: "Albums", method: "user.gettopalbums" },
  { key: "artists", label: "Artists", method: "user.gettopartists" },
  { key: "tracks", label: "Tracks", method: "user.gettoptracks" },
];

function extractLfmImage(imageArr) {
  if (!imageArr?.length) return null;
  const preferred = ["extralarge", "large", "medium", "small"];
  for (const size of preferred) {
    const found = imageArr.find((i) => i.size === size)?.["#text"];
    if (found && found.trim() !== "") return found;
  }
  const any = imageArr.find((i) => i["#text"] && i["#text"].trim() !== "");
  return any?.["#text"] || null;
}

function parseItems(tab, data) {
  if (tab === "artists") {
    return (data.topartists?.artist || []).map((a) => ({
      name: a.name,
      sub: "",
      plays: Number(a.playcount).toLocaleString(),
      image: null,
    }));
  }
  if (tab === "albums") {
    return (data.topalbums?.album || []).map((a) => ({
      name: a.name,
      sub: a.artist?.name || null,
      plays: Number(a.playcount).toLocaleString(),
      image: extractLfmImage(a.image),
    }));
  }
  if (tab === "tracks") {
    return (data.toptracks?.track || []).map((a) => ({
      name: a.name,
      sub: a.artist?.name || null,
      plays: Number(a.playcount).toLocaleString(),
      image: null,
    }));
  }
  return [];
}

function SkeletonRow({ showImage }) {
  return (
    <li className="artist-row lfm-skeleton" aria-hidden="true">
      <span className="artist-rank lfm-placeholder" />
      {showImage && <span className="lfm-cover lfm-placeholder" />}
      <div className="artist-info">
        <span className="lfm-placeholder lfm-placeholder-name" />
        <span className="lfm-placeholder lfm-placeholder-sub" />
      </div>
      <span className="lfm-placeholder lfm-placeholder-plays" />
    </li>
  );
}

function ItemRow({ item, index, showImage }) {
  return (
    <li className="artist-row">
      <span className="artist-rank">{String(index + 1).padStart(2, "0")}</span>
      {showImage && (
        <div className="lfm-cover" aria-hidden="true">
          {item.image ? (
            <img
              src={item.image}
              alt=""
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            "♪"
          )}
        </div>
      )}
      <div className="artist-info">
        <div className="artist-name" title={item.name}>{item.name}</div>
        {item.sub && <div className="artist-sub">{item.sub}</div>}
      </div>
      <span className="artist-plays">{item.plays} plays</span>
    </li>
  );
}

function TabBtn({ tab, active, onClick }) {
  return (
    <button
      type="button"
      className="lfm-tab"
      aria-pressed={active}
      onClick={onClick}
    >
      {tab.label}
    </button>
  );
}

export default function LastFmCard() {
  const [activeTab, setActiveTab] = useState("albums");
  const [totalScrobbles, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const cacheRef = useRef({});

  const isReal = LASTFM_API_KEY && LASTFM_API_KEY !== "YOUR_LASTFM_API_KEY";
  const showImage = activeTab === "albums";

  useEffect(() => {
    if (!isReal) {
      setTotal("24,775");
      return;
    }
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json`
    )
      .then((r) => r.json())
      .then((d) => setTotal(Number(d.user?.playcount).toLocaleString() || "—"))
      .catch(() => setTotal("—"));
  }, []);

  useEffect(() => {
    if (cacheRef.current[activeTab]) {
      setItems(cacheRef.current[activeTab]);
      setLoading(false);
      return;
    }

    setLoading(true);

    /* TEST */
    if (!isReal) {
      const DEMO = {
        artists: [
          { name: "Radiohead", sub: null, plays: "669", image: null },
          { name: "John Mayer", sub: null, plays: "517", image: null },
          { name: "Enigma", sub: null, plays: "501", image: null },
        ],
        albums: [
          { name: "In Rainbows", sub: "Radiohead", plays: "312", image: null },
          { name: "Continuum", sub: "John Mayer", plays: "278", image: null },
          { name: "MCMXC a.D.", sub: "Enigma", plays: "210", image: null },
        ],
        tracks: [
          { name: "Karma Police", sub: "Radiohead", plays: "89", image: null },
          { name: "Slow Dancing in a Burning Room", sub: "John Mayer", plays: "74", image: null },
          { name: "Sadeness Pt. I", sub: "Enigma", plays: "68", image: null },
        ],
      };
      setTimeout(() => {
        cacheRef.current[activeTab] = DEMO[activeTab];
        setItems(DEMO[activeTab]);
        setLoading(false);
      }, 300);
      return;
    }

    const tabCfg = TABS.find((t) => t.key === activeTab);
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=${tabCfg.method}&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=3&period=3month`
    )
      .then((r) => r.json())
      .then((data) => {
        const parsed = parseItems(activeTab, data);
        cacheRef.current[activeTab] = parsed;
        setItems(parsed);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setLoading(false);
      });
  }, [activeTab]);

  return (
    <>
      <div className="lfm-tabs" role="group" aria-label="Top music rankings">
        {TABS.map((tab) => (
          <TabBtn
            key={tab.key}
            tab={tab}
            active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          />
        ))}
      </div>

      <ol className="artist-list" aria-label={`Top ${activeTab}`} aria-busy={loading}>
        {loading
          ? [1, 2, 3].map((i) => <SkeletonRow key={i} showImage={showImage} />)
          : items.map((item, i) => (
              <ItemRow key={`${item.name}-${i}`} item={item} index={i} showImage={showImage} />
            ))}
      </ol>

      <div className="lfm-footer">
        <a
          href={`https://www.last.fm/user/${LASTFM_USER}`}
          target="_blank"
          rel="noreferrer"
          className="lfm-redirect"
        >
          recent activity
          <svg
            viewBox="0 0 24 24"
            width="10"
            height="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>

        {totalScrobbles && (
          <a
            className="lfm-total"
            href={`https://www.last.fm/user/${LASTFM_USER}`}
            target="_blank"
            rel="noreferrer"
          >
            <span>{totalScrobbles}</span> scrobbles
          </a>
        )}
      </div>
    </>
  );
}
