import React from 'react'

export const classNames = (...values) => values.filter(Boolean).join(' ')
export const addressName = user => {
  const parts = user?.name?.split(/\s+/).filter(Boolean) || []
  return ['Dr.', 'Dr', 'Prof.', 'Prof'].includes(parts[0]) ? parts[1] || 'there' : parts[0] || 'there'
}
export const greeting = () => {
  const hour = new Date().getHours()
  return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
}
export const fmtDate = value => value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
export const fmtTime = value => value ? new Date(`1970-01-01T${value}`).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }) : '—'

export function Avatar({ user, size = 'md' }) {
  return <span className={`avatar avatar-${size}`} aria-hidden="true">{user?.initials || user?.name?.split(' ').map(part => part[0]).join('').slice(0, 2) || '?'}</span>
}

export function Stat({ icon: Icon, label, value, detail, tone = '' }) {
  return <article className="card stat-card"><span className={`stat-icon stat-${tone}`}><Icon /></span><span><p>{label}</p><strong>{value}</strong><small>{detail}</small></span></article>
}
