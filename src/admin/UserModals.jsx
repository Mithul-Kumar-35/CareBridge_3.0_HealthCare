import React from 'react'
import { Card, Modal } from '../ui'

export function AddUserModal({ open, onClose }) {
  return <Modal open={open} onClose={onClose} eyebrow="IDENTITY" title="Add a user"><Card><p className="page-subtitle">User creation is available in the full administration workflow.</p><button className="btn btn-secondary" onClick={onClose}>Close</button></Card></Modal>
}

export function DeleteUserDialog({ target, onClose, onConfirm }) {
  return <Modal open={Boolean(target)} onClose={onClose} eyebrow="IDENTITY" title="Delete user"><p>Remove {target?.name} from this demo workspace?</p><div className="wizard-actions"><button className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-danger" onClick={onConfirm}>Delete</button></div></Modal>
}
