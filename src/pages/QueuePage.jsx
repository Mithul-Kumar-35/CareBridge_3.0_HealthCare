import React from 'react'
import { Clock3 } from 'lucide-react'
import { Card, Empty, PageTitle } from '../ui'

export default function QueuePage({ data, user, patients, hospital }) {
  const queues = data.queues.filter(queue => queue.hospitalId === hospital?.id)
  return <><PageTitle eyebrow="QUEUECARE" title="Queue operations" text="Live tokens and wait estimates keep every care journey moving." />
    <div className="dashboard-grid"><Card><div className="card-head"><div><p className="eyebrow">LIVE QUEUES</p><h2>Today’s service desks</h2></div></div>{queues.length ? <div className="queue-snapshot">{queues.map(queue => <div key={queue.id}><span><b>{data.departments.find(dept => dept.id === queue.departmentId)?.name || 'Care desk'}</b><small>Serving token {String(queue.serving).padStart(3, '0')}</small></span><strong>{Math.max(0, queue.lastIssued - queue.serving)} waiting</strong></div>)}</div> : <Empty title="No queues available" text="There are no active queues for this hospital." />}</Card>
      <Card><p className="eyebrow">YOUR ACCESS</p><h2>Queue visibility</h2><p className="page-subtitle">{user.role === 'patient' ? 'You can follow your own token and receive progress updates.' : `Showing authorized queues for ${patients.length} linked patient${patients.length === 1 ? '' : 's'}.`}</p><span className="round-icon"><Clock3 /></span></Card></div></>
}
