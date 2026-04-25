import { useState, useEffect, useRef } from 'react';
import { MdOpenInNew } from "react-icons/md";

const LASTFM_USER = 'sophziah';
const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

const TABS = [
  { key: 'albums',  label: 'Top Albums',  method: 'user.gettopalbums'  },
  { key: 'artists', label: 'Top Artists', method: 'user.gettopartists' },
  { key: 'tracks',  label: 'Top Tracks',  method: 'user.gettoptracks'  },
];

function extractLfmImage(imageArr) {
  if (!imageArr?.length) return null;
  const preferred = ['extralarge', 'large', 'medium', 'small'];
  for (const size of preferred) {
    const found = imageArr.find(i => i.size === size)?.['#text'];
    if (found && found.trim() !== '') return found;
  }
  const any = imageArr.find(i => i['#text'] && i['#text'].trim() !== '');
  return any?.['#text'] || null;
}

function parseItems(tab, data) {
if (tab === 'artists') {
  return (data.topartists?.artist || []).map(a => ({
    name:   a.name,
    sub:    '',
    plays:  Number(a.playcount).toLocaleString(),
    image:  null,
  }));
}
  if (tab === 'albums') {
    return (data.topalbums?.album || []).map(a => ({
      name:   a.name,
      sub:    a.artist?.name || null,
      plays:  Number(a.playcount).toLocaleString(),
      image:  extractLfmImage(a.image),
    }));
  }
  if (tab === 'tracks') {
    return (data.toptracks?.track || []).map(a => ({
      name:   a.name,
      sub:    a.artist?.name || null,
      plays:  Number(a.playcount).toLocaleString(),
      image:  null,
    }));
  }
  return [];
}

function SkeletonRow({ showImage }) {
  return (
    <div className="artist-row" style={{ opacity: 0.4, display: 'flex', alignItems: 'center', gap: '8px' }}>
      {showImage && <div style={{ width: 28, height: 28, borderRadius: 4, background: 'var(--border2)', flexShrink: 0 }} />}
      <div style={{ background: 'var(--border2)', borderRadius: 3, width: 14, height: 10, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ background: 'var(--border2)', borderRadius: 3, height: 11, width: '55%' }} />
        <div style={{ background: 'var(--border2)', borderRadius: 3, height: 9,  width: '35%' }} />
      </div>
      <div style={{ background: 'var(--border2)', borderRadius: 3, width: 40, height: 10, flexShrink: 0 }} />
    </div>
  );
}

function ItemRow({ item, index, showImage }) {
  const isTopArtist = !item.sub || item.sub === ''; 
  
  return (
    <div className="artist-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="artist-rank" style={{ flexShrink: 0 }}>#{index + 1}</span>
      {showImage && (
        <div style={{
          width: 28, height: 28, borderRadius: 4,
          background: 'var(--bg3)', flexShrink: 0, overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, color: 'var(--text3)',
        }}>
          {item.image
            ? <img src={item.image} alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => { e.currentTarget.style.display = 'none'; }} />
            : '♪'}
        </div>
      )}

     

      <div className="artist-info" style={{ flex: 1, minWidth: 0 }}>
        <div className="artist-name" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.name}
        </div>

        {/* subtext for top artists*/}
        <div 
          style={{
            fontSize: 9, 
            textAlign: 'left',
            color: 'var(--text3)', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            marginTop: 1,
            minHeight: '14px', 
            borderRadius: '3px', 
            padding: '0px 0px',
           
          }}
        >
          {isTopArtist ? 'Top Artist' : item.sub || ''} 
        </div>
      </div>

      <div className="artist-plays" style={{ flexShrink: 0, marginLeft: 8, textAlign: 'right' }}>
        {item.plays} plays
      </div>
    </div>
  );
}

function TabBtn({ tab, active, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10, fontWeight: 700, letterSpacing: '0.8px',
        textTransform: 'uppercase',
        color: active ? 'var(--text)' : 'var(--text3)',
        padding: '5px 0 4px',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3,
        flexShrink: 0,
        transition: 'color 0.2s',
        
      }}
    >
      <span>{tab.label}</span>
      <span style={{
        display: 'block', height: 2, width: '100%', borderRadius: 2,
        background: active ? 'var(--link-lastfm)' : hovered ? 'var(--link-lastfm-hovered)' : 'var(--border2)',
        transition: 'background 0.2s',
      }} />
    </button>
  );
}

export default function LastFmCard() {
  const [activeTab, setActiveTab] = useState('albums');
  const [totalScrobbles, setTotal] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [items, setItems]         = useState([]);
  const cacheRef                  = useRef({});

  const isReal = LASTFM_API_KEY && LASTFM_API_KEY !== 'YOUR_LASTFM_API_KEY';
  const showImage = activeTab === 'albums';

  useEffect(() => {
    if (!isReal) { setTotal('24,775'); return; }
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json`)
      .then(r => r.json())
      .then(d => setTotal(Number(d.user?.playcount).toLocaleString() || '—'))
      .catch(() => setTotal('—'));
  }, []);

  useEffect(() => {
    if (cacheRef.current[activeTab]) {
      setItems(cacheRef.current[activeTab]);
      setLoading(false);
      return;
    }

    setLoading(true);

    if (!isReal) {
      const DEMO = {
        artists: [
          { name: 'Radiohead',  sub: null,          plays: '669', image: null },
          { name: 'John Mayer', sub: null,          plays: '517', image: null },
          { name: 'Enigma',     sub: null,          plays: '501', image: null },
        ],
        albums: [
          { name: 'In Rainbows', sub: 'Radiohead',  plays: '312', image: null },
          { name: 'Continuum',   sub: 'John Mayer', plays: '278', image: null },
          { name: 'MCMXC a.D.', sub: 'Enigma',     plays: '210', image: null },
        ],
        tracks: [
          { name: 'Karma Police',                   sub: 'Radiohead',  plays: '89', image: null },
          { name: 'Slow Dancing in a Burning Room', sub: 'John Mayer', plays: '74', image: null },
          { name: 'Sadeness Pt. I',                 sub: 'Enigma',     plays: '68', image: null },
        ],
      };
      setTimeout(() => {
        cacheRef.current[activeTab] = DEMO[activeTab];
        setItems(DEMO[activeTab]);
        setLoading(false);
      }, 300);
      return;
    }

    const tabCfg = TABS.find(t => t.key === activeTab);
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=${tabCfg.method}&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=3&period=3month`
    )
      .then(r => r.json())
      .then(data => {
        const parsed = parseItems(activeTab, data);
        cacheRef.current[activeTab] = parsed;
        setItems(parsed);
        setLoading(false);
      })
      .catch(() => { setItems([]); setLoading(false); });
  }, [activeTab]);

  return (
    <>
      {/* Tab nav */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 2 }}>
        {TABS.map(tab => (
          <TabBtn key={tab.key} tab={tab} active={activeTab === tab.key} onClick={() => setActiveTab(tab.key)} />
        ))}
      </div>

      {/* List */}
      <div className="artist-list">
        {loading
          ? [1, 2, 3].map(i => <SkeletonRow key={i} showImage={showImage} />)
          : items.map((item, i) => <ItemRow key={`${item.name}-${i}`} item={item} index={i} showImage={showImage} />)
        }
      </div>

      {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <a
            href={`https://www.last.fm/user/${LASTFM_USER}`}
            target="_blank" rel="noreferrer"
            className="lfm-redirect"
        >
            {LASTFM_USER} <MdOpenInNew size={10} style={{ verticalAlign: 'middle' }} />
        </a>

        {totalScrobbles && (
            <a className="lfm-total" href={`https://www.last.fm/user/${LASTFM_USER}`} target="_blank" rel="noreferrer" style={{ marginTop: 0 }}>
            total scrobbles — <span>{totalScrobbles}</span> <MdOpenInNew size={10} style={{ verticalAlign: 'middle' }} />
            </a>
        )}
        </div>
    </>
  );
}