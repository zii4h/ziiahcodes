import { useMemo, useState, useEffect } from 'react'
import { useLanyard } from 'react-use-lanyard'
import discordBadge from '../assets/discord_badge.svg'


const USER_ID = import.meta.env.VITE_DISCORD_ID

const STATUS_COLORS = {
  online:  '#3ba55d',
  idle:    '#faa81a',
  dnd:     '#ed4245',
  offline: '#747f8d',
}

const StatusDot = ({ status }) => (
  <span style={{
    display: 'block',
    width: 14, height: 14,
    borderRadius: '50%',
    background: STATUS_COLORS[status] ?? STATUS_COLORS.offline,
    border: '2px solid var(--card-bg)',
    position: 'absolute',
    bottom: 1, right: 1,
  }} />
)

const formatTime = ms => {
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, '0')}`
}

const getElapsed = ts => {
  const diff = Date.now() - ts
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} elapsed`
}

const getImgUrl = (activity, key) => {
  const v = activity?.assets?.[key]
  if (!v) return ''
  if (v.startsWith('spotify:')) return `https://i.scdn.co/image/${v.replace('spotify:', '')}`
  if (v.startsWith('mp:external/')) {
    const path = v.replace('mp:external/', '').split('/').slice(1).join('/')
    try { return 'https://' + decodeURIComponent(path.replace(/^https?\//, '')) } catch { return '' }
  }
  if (v.startsWith('mp:')) return `https://media.discordapp.net/${v.replace('mp:', '')}`
  return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${v}`
}

const ActivityCard = ({ activity }) => {
  const isSpotify = activity.type === 2 && activity.name === 'Spotify'
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const elapsed = !isSpotify && activity.timestamps?.start
    ? getElapsed(activity.timestamps.start) : null

  const spotify = isSpotify && activity.timestamps?.start && activity.timestamps?.end
    ? (() => {
        const now = Date.now()
        const dur = activity.timestamps.end - activity.timestamps.start
        const el  = now - activity.timestamps.start
        const prog = Math.max(0, Math.min(1, el / dur))
        return { cur: formatTime(Math.min(el, dur)), total: formatTime(dur), prog: prog * 100 }
      })() : null

  const largeImg = getImgUrl(activity, 'large_image')
  const smallImg = getImgUrl(activity, 'small_image')

  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', width: '100%' }}>
      {largeImg && (
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img src={largeImg} alt="" width={62} height={64}
            style={{ borderRadius: 8, display: 'block', objectFit: 'cover' }} />
          {smallImg && (
            <img src={smallImg} alt="" width={18} height={18}
              style={{ position: 'absolute', bottom: -3, right: -3,
                borderRadius: '50%', border: '2px solid var(--card-bg)' }} />
          )}
        </div>
      )}

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {activity.name && (
          <div className="activity-name" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {isSpotify ? `Playing ${activity.name}` : activity.name}
          </div>
        )}
        {activity.details && (
          <div className="activity-detail" style={{ fontSize: 11, color: 'var(--text2)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {activity.details}
          </div>
        )}
        {activity.state && (
          <div className="activity-detail" style={{ fontSize: 11, color: 'var(--text3)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {activity.state}
          </div>
        )}
        {spotify && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <span className="activity-detail" style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'monospace' }}>{spotify.cur}</span>
            <div style={{ flex: 1, height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: `${spotify.prog}%`, height: '100%',
                background: 'var(--text)', borderRadius: 2,
                transition: 'width 1s linear' }} />
            </div>
            <span className="activity-detail" style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'monospace' }}>{spotify.total}</span>
          </div>
        )}
        {elapsed && (
          <div className="activity-detail" style={{ fontSize: 10, color: 'var(--text3)' }}>{elapsed}</div>
        )}
      </div>
    </div>
  )
}

export default function DiscordPresence() {
  const { data: lanyard, isLoading } = useLanyard({ userId: USER_ID })

  const activity = useMemo(() => {
    const acts = lanyard?.data?.activities ?? []
    return acts.find(a => a.type === 0 && a.assets)
      ?? acts.find(a => a.type === 2 && a.name === 'Spotify')
      ?? null
  }, [lanyard?.data?.activities])

  const status = lanyard?.data?.discord_status ?? 'offline'

  const user = lanyard?.data?.discord_user
  const avatarUrl = user?.avatar
    ? `https://cdn.discordapp.com/avatars/${USER_ID}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=128`
    : `https://cdn.discordapp.com/embed/avatars/0.png`

  const cardStyle = {
    width: 'clamp(160px, 30vw, 225px)',
    flexShrink: 0,
    border: '1px solid var(--card-border)',
    borderRadius: 14,
    background: 'var(--card-bg)',
    overflow: 'hidden',
    fontSize: 13,
  }

  if (isLoading) return (
    <div style={cardStyle}>
      <div style={{ height: 50, background: 'var(--bg3)' }} />
      <div style={{ padding: '0 12px 12px' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%',
          background: 'var(--bg3)', marginTop: -22, marginBottom: 8,
          border: '3px solid var(--card-bg)' }} />
        <div style={{ height: 10, width: '60%', background: 'var(--bg3)', borderRadius: 4, marginBottom: 6 }} />
        <div style={{ height: 8, width: '40%', background: 'var(--bg3)', borderRadius: 4 }} />
      </div>
    </div>
  )

  if (!lanyard?.data) return null

  return (
    <div style={cardStyle}>
      {/* Banner */}
      <div style={{ height: 45, background: 'var(--bg3)' }} />

      <div style={{ padding: '0 12px 12px' }}>
        {/* Avatar row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
          <div style={{ position: 'relative', marginTop: -22, marginLeft: -5 }}>
            <img
              src={avatarUrl}
              alt="avatar"
              width={55} height={55}
              style={{ borderRadius: '50%', border: '3px solid var(--card-bg)', display: 'block' }}
            />
            <StatusDot status={status} />
          </div>
          <div style={{ marginBottom: 4 }}>
            <img src={discordBadge} alt="badge" className="discord-badge" />
          </div>
        </div>

        {/* Name */}
        <div className="profile-display-name">Zii4h 🦋</div>
        <div className="profile-username">@sphy.k</div>

        {/* Activity */}
        {activity
          ? <ActivityCard activity={activity} />
          : <div style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center', padding: '8px 0' }}>
              no status - currently offline
            </div>
        }
      </div>
    </div>
  )
}