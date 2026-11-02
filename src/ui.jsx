import React from 'react'
import { X } from 'lucide-react'

export function Badge({ children, tone = 'neutral' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

export function Card({ children, className = '' }) {
  return <section className={`card ${className}`}>{children}</section>
}

export function Empty({ title, text, children }) {
  return <div className="empty-state"><h2>{title}</h2><p>{text}</p>{children}</div>
}

export function PageTitle({ eyebrow, title, text, actions }) {
  return <div className="page-title"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{text && <p className="page-subtitle">{text}</p>}</div>{actions && <div className="title-actions">{actions}</div>}</div>
}

export function Modal({ open, onClose, eyebrow, title, children }) {
  if (!open) return null
  return <div className="modal-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <header className="modal-head"><div><p className="eyebrow">{eyebrow}</p><h2 id="modal-title">{title}</h2></div><button className="icon-btn" onClick={onClose} aria-label="Close"><X /></button></header>
      <div className="modal-body">{children}</div>
    </section>
  </div>
}
