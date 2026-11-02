import React from 'react'
import { Modal } from '../ui'

export function AddPatientModal({ open, onClose }) {
  return <Modal open={open} onClose={onClose} eyebrow="PATIENTS" title="Add patient"><p className="page-subtitle">Patient registration is scoped to the current care team.</p><button className="btn btn-secondary" onClick={onClose}>Close</button></Modal>
}
