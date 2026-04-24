import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import '../styles/misc.css';
import { MdOpenInNew } from "react-icons/md";

const LASTFM_USER = 'sophziah';
const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

const PHOTOS = [
  '/photos/photo1.jpg',
  '/photos/photo2.jpg',
  '/photos/photo3.jpg',
  '/photos/photo4.jpg',
  '/photos/photo5.jpg',
];

const FALLBACK_COLORS = ['#2d3561', '#a53860', '#1b4332', '#7b2d8b', '#b5451b']; /* photocards */ 

function DraggablePhotoStack() {
  const stackRef = useRef(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    let cards = [];

    function buildCards() {
      stack.innerHTML = '';
      cards = [];

      PHOTOS.forEach((src, i) => {
        const el = document.createElement('div');
        el.className = 'stack-card';

        const offset = PHOTOS.length - 1 - i;
        const rot = (i % 2 === 0 ? 1 : -1) * (offset * 2.5);
        const tx = offset * 3;
        const ty = offset * 4;

        el.style.zIndex = i + 1;
        el.style.transform = `rotate(${rot}deg) translate(${tx}px,${ty}px)`;
        el.style.background = FALLBACK_COLORS[i % FALLBACK_COLORS.length];

        const img = document.createElement('img');
        img.src = src;
        img.alt = `photo ${i + 1}`;
        img.onerror = () => { img.style.display = 'none'; };

        el.appendChild(img);
        addDrag(el);
        stack.appendChild(el);
        cards.push(el);
      });
    }

    function restack() {
      cards.forEach((c, i) => {
        const isTop = i === cards.length - 1;
        const offset = cards.length - 1 - i;
        const rot = (i % 2 === 0 ? 1 : -1) * (offset * 2.5);
        const tx = offset * 3;
        const ty = offset * 4;
        c.style.zIndex = i + 1;
        c.style.transition = 'transform .25s ease';
        c.style.transform = isTop
          ? 'rotate(0deg) translate(0,0)'
          : `rotate(${rot}deg) translate(${tx}px,${ty}px)`;
      });
    }

    function addDrag(el) {
      let sx = 0, sy = 0, cx = 0, cy = 0, dragging = false;
      const gx = e => e.touches ? e.touches[0].clientX : e.clientX;
      const gy = e => e.touches ? e.touches[0].clientY : e.clientY;

      el.addEventListener('mousedown', start);
      el.addEventListener('touchstart', start, { passive: true });

      function start(e) {
        if (el !== cards[cards.length - 1]) return;
        dragging = true; cx = 0; cy = 0;
        el.classList.add('dragging');
        sx = gx(e); sy = gy(e);
        el.style.transition = 'none';
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', end);
        document.addEventListener('touchmove', move, { passive: false });
        document.addEventListener('touchend', end);
      }

      function move(e) {
        if (!dragging) return;
        if (e.cancelable) e.preventDefault();
        cx = gx(e) - sx;
        cy = gy(e) - sy;
        el.style.transform = `translate(${cx}px,${cy}px) rotate(${cx * 0.08}deg)`;
      }

      function end() {
        if (!dragging) return;
        dragging = false;
        el.classList.remove('dragging');
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', end);
        document.removeEventListener('touchmove', move);
        document.removeEventListener('touchend', end);

        if (Math.abs(cx) > 60 || Math.abs(cy) > 60) {
          const dir = cx > 0 ? 1 : -1;
          el.style.transition = 'transform .35s ease, opacity .35s';
          el.style.transform = `translate(${dir * 500}px,${cy - 80}px) rotate(${dir * 30}deg)`;
          el.style.opacity = '0';
          setTimeout(() => {
            const removed = cards.pop();
            cards.unshift(removed);
            stack.insertBefore(removed, stack.firstChild);
            removed.style.transition = 'none';
            removed.style.opacity = '1';
            restack();
          }, 350);
        } else {
          restack();
        }
        cx = 0; cy = 0;
      }
    }

    buildCards();

    return () => { stack.innerHTML = ''; };
  }, []);

  return (
    <>
      <div className="photo-stack-wrap">
        <div className="photo-stack-inner" ref={stackRef} />
      </div>
    </>
  );
}


const sleep = ms => new Promise(res => setTimeout(res, ms));

const fetchArtistImage = async (artistName) => {
  try {
    await sleep(200);

    const searchRes = await fetch(
      `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(artistName)}&limit=1&fmt=json`,
      { headers: { 'User-Agent': 'sophziah-portfolio/1.0 (sophiakeziahpineda@gmail.com)' } }
    );
    const searchData = await searchRes.json();
    const mbid = searchData.artists?.[0]?.id;
    if (!mbid) return null;

    await sleep(200);

    const rgRes = await fetch(
      `https://musicbrainz.org/ws/2/release-group?artist=${mbid}&type=album&limit=1&fmt=json`,
      { headers: { 'User-Agent': 'sophziah-portfolio/1.0 (sophiakeziahpineda@gmail.com)' } }
    );
    const rgData = await rgRes.json();
    const rgMbid = rgData['release-groups']?.[0]?.id;
    if (!rgMbid) return null;

    await sleep(200);

    const caRes = await fetch(
      `https://coverartarchive.org/release-group/${rgMbid}`,
      { headers: { 'User-Agent': 'sophziah-portfolio/1.0 (sophiakeziahpineda@gmail.com)' } }
    );
    if (!caRes.ok) return null;

    const caData = await caRes.json();
    const front = caData.images?.find(img => img.front) || caData.images?.[0];

    return front?.thumbnails?.small || front?.thumbnails?.['250'] || front?.image || null;

  } catch {
    return null;
  }
};

function LastFmCard() {
  const [artists, setArtists] = useState(null);
  const [totalScrobbles, setTotalScrobbles] = useState(null);
  const [loading, setLoading] = useState(true);

  const FALLBACK_ARTISTS = [
    { name: 'Artist One', plays: '1,234', image: null },
    { name: 'Artist Two', plays: '987', image: null },
    { name: 'Artist Three', plays: '654', image: null },
  ];

  useEffect(() => {
    const isReal = LASTFM_API_KEY && LASTFM_API_KEY !== 'YOUR_LASTFM_API_KEY';
    if (!isReal) {
      setArtists(FALLBACK_ARTISTS);
      setTotalScrobbles('4,103');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [topRes, infoRes] = await Promise.all([
          fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=3`),
          fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json`),
        ]);
        const topData = await topRes.json();
        const infoData = await infoRes.json();

const rawArtists = topData.topartists?.artist || [];

const mapped = rawArtists.map(a => ({
  name: a.name,
  plays: Number(a.playcount).toLocaleString(),
  image: null,
}));

setArtists(mapped); 

rawArtists.forEach(async (a, index) => {
  const image = await fetchArtistImage(a.name);

  setArtists(prev => {
    const updated = [...prev];
    updated[index] = {
      ...updated[index],
      image,
    };
    return updated;
  });
});

        setArtists(mapped.length ? mapped : FALLBACK_ARTISTS);
        setTotalScrobbles(Number(infoData.user?.playcount).toLocaleString() || '—');
      } catch {
        setArtists(FALLBACK_ARTISTS);
        setTotalScrobbles('—');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div className="bento-label" style={{ marginBottom: 0 }}>
          my top played artists <span className="heart">&lt;3</span>
        </div>
        <a
          href={`https://www.last.fm/user/${LASTFM_USER}`}
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: '10px',
            color: 'var(--text3)',
            textDecoration: 'none',
            opacity: 0.9,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
        >
          {LASTFM_USER} <MdOpenInNew size={10} />
        </a>
      </div>

      {/* Artist rows */}
      <div className="artist-list">
        {loading
          ? [1, 2, 3].map(i => (
              <div key={i} className="artist-row" style={{ opacity: 0.4, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: 'var(--border2)', flexShrink: 0 }} />
                <div className="artist-rank">{i}</div>
                <div className="artist-info" style={{ flex: 1 }}>
                  <div className="artist-name" style={{ background: 'var(--border2)', borderRadius: 4, height: 11, width: '55%' }} />
                </div>
                <div style={{ background: 'var(--border2)', borderRadius: 4, height: 10, width: '30px', flexShrink: 0 }} />
              </div>
            ))
          : (artists || FALLBACK_ARTISTS).map((a, i) => (
              <div key={a.name} className="artist-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Artist image */}
                <div style={{
                  width: '28px', height: '28px', borderRadius: '4px',
                  background: 'var(--bg3)', flexShrink: 0, overflow: 'hidden',
                }}>
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '10px', color: 'var(--text3)',
                    }}>♪</div>
                  )}
                </div>

                <span className="artist-rank" style={{ flexShrink: 0 }}>#{i + 1}</span>

                {/* Name fills remaining space */}
                <div className="artist-info" style={{ flex: 1, minWidth: 0 }}>
                  <div className="artist-name" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {a.name}
                  </div>
                </div>

                {/* Plays pushed far right */}
                <div className="artist-plays" style={{ flexShrink: 0, marginLeft: '8px', textAlign: 'right' }}>
                  {a.plays} plays
                </div>
              </div>
            ))
        }
      </div>

      {totalScrobbles && (
        <a
        className="lfm-total"
        href={`https://www.last.fm/user/${LASTFM_USER}`}
        target="_blank"
        rel="noreferrer"
      >
        total scrobbles — <span>{totalScrobbles}</span>
      </a>
      )}
    </>
  );
}

export default function Misc() {
  
  return (
    <>
      <div className="misc-shell">

        {/* BREADCRUMB */}
        <div className="breadcrumb" style={{ flexShrink: 0 }}>
          <Link to="/" className="breadcrumb-home">
            <svg viewBox="0 0 24 24" className="breadcrumb-icon">
              <path d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
            </svg>
          </Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">
            <svg viewBox="0 0 24 24" className="breadcrumb-page-icon">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Misc
          </span>
        </div>

        <div className="misc-inner page">

          <div className="section reveal" style={{ marginBottom: '12px', flexShrink: 0 }}>
            <p className="section-label">MISC</p>
            <p className="about-text">a little corner of randomness. things i like, things i think about, things that make me, me.</p>
          </div>

          {/* bento grid */}
          <div className="bento-grid reveal">

            {/* Last.fm */}
            <div className="bento-card bento-col-2 accent-blue card-lastfm">
              <LastFmCard />
            </div>

            {/* my photo stack */}
            <div className="bento-card card-photos" style={{ padding: 0, overflow: 'hidden', minHeight: '180px', background: 'transparent', border: 'none' }}>
              <DraggablePhotoStack />
            </div>

            {/* based in (loc)*/}
            <div className="bento-card card-location">
              <div className="bento-label" style={{ marginTop: '4px' }}>based in</div>
              <div className="bento-title" style={{ fontSize: '14px' }}>Pampanga, 🇵🇭</div>
              <div className="bento-desc">Holy Angel University</div>
            </div>

            {/* info dump: free time */}
            <div className="bento-card bento-col-2 card-freetime" style={{ borderStyle: 'dashed' }}>
              <div className="bento-label">free time</div>
              <p className="info-text">
                in my free time i like to read on <strong>reddit</strong>, <strong>threads</strong> and on <strong>daily.dev</strong>! it's also how i stay updated with the latest tech-related news and trends. plus music, obviously :D
              </p>
            </div>

            {/* things I enjoy */}
            <div className="bento-card bento-col-2 card-enjoy">
              <div className="bento-label">things i actually like / love</div>
              <div className="tag-cloud">
                {['Sci-Fi Movies', 'Iced Tea', 'Discord', 'Late night coding', 'Cats', 'One Piece', 'Dark mode', 'Discovering Music', 'Reading Psychology'].map(t => (
                  <span key={t} className="bento-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* my stack (w level bar) */}
            <div className="bento-card card-stack">
              <div className="bento-label">my stack</div>
              <div className="stack-list">
                {[
                  { name: 'MySQL', level: 85 },
                  { name: 'React', level: 65 },
                  { name: 'PostgreSQL', level: 70 },
                ].map(({ name, level }) => (
                  <div key={name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text2)' }}>{name}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text3)' }}>{level}%</span>
                    </div>
                    <div style={{ height: '3px', borderRadius: '2px', background: 'var(--bg3)', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${level}%`,
                        background: 'var(--link)', borderRadius: '2px',
                        transition: 'width 0.6s ease'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* socials */}
            <a href="https://linkedin.com/in/sophiakeziahpineda" target="_blank" rel="noreferrer"
              className="bento-card card-linkedin" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div className="bento-link-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="bento-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" style={{ fill: 'none', stroke: 'var(--text)', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2" fill="var(--text)" stroke="none"/>
                    </svg>
                  </div>
                  <div>
                    <div className="bento-title" style={{ fontSize: '12px' }}>LinkedIn</div>
                    <div className="bento-desc" style={{ fontSize: '10px' }}>sophiakeziahpineda</div>
                  </div>
                </div>
                <span className="bento-arrow"><MdOpenInNew /></span>
              </div>
            </a>

            <a href="https://threads.net/@sphy.keziah" target="_blank" rel="noreferrer"
              className="bento-card card-threads" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div className="bento-link-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="bento-icon" style={{ fontSize: '16px' }}>@</div>
                  <div>
                    <div className="bento-title" style={{ fontSize: '12px' }}>Threads</div>
                    <div className="bento-desc" style={{ fontSize: '10px' }}>@sphy.keziah</div>
                  </div>
                </div>
                <span className="bento-arrow"><MdOpenInNew /></span>
              </div>
            </a>

            <a href="https://github.com/zii4h" target="_blank" rel="noreferrer"
              className="bento-card card-github" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div className="bento-link-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="bento-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" style={{ fill: 'var(--text)', stroke: 'none' }}>
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-2.1c-3.19.69-3.86-1.54-3.86-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17A10.9 10.9 0 0112 6.84c.97.005 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.13v3.16c0 .3.2.66.79.55C20.71 21.38 24 17.08 24 12 24 5.73 18.27.5 12 .5z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="bento-title" style={{ fontSize: '12px' }}>GitHub</div>
                    <div className="bento-desc" style={{ fontSize: '10px' }}>@zii4h</div>
                  </div>
                </div>
                <span className="bento-arrow"><MdOpenInNew /></span>
              </div>
            </a>

            {/* get in touch bar */}
            <a href="mailto:sophiakeziahpineda@gmail.com" className="git-bar bento-col-3">
              <div className="git-bar-left">
                <div className="git-bar-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div className="git-bar-title">Get in Touch</div>
                  <div className="git-bar-sub">Let's chat</div>
                </div>
              </div>
              <span className="git-bar-arrow"><MdOpenInNew /></span>
            </a>

            </div> {/* end bento grid */}
        </div> {/* end misc-inner */}
      </div> {/* end misc-shell */}
    </>
  );
}