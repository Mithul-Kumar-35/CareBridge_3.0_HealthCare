import React from 'react'
import { Card, Empty, PageTitle } from '../ui'

export function CareTeamPage({ data, patients }) {
  const doctors = [...new Set(patients.flatMap(patient => patient.doctorIds || []))].map(id => data.users.find(user => user.id === id)).filter(Boolean)
  return <><PageTitle eyebrow="CARE TEAM" title="Your care team" text="People assigned to your care, shown with the access they need." /><Card>{doctors.length ? <div className="data-list">{doctors.map(doctor => <div className="data-row" key={doctor.id}><div><b>{doctor.name}</b><small>{doctor.title}</small></div><span>Assigned</span></div>)}</div> : <Empty title="No care team yet" text="Your care team will appear here once a clinician is assigned." />}</Card></>
}

export function CareCirclePage() {
  return <><PageTitle eyebrow="CARECIRCLE" title="Trusted support" text="Consent-aware family coordination for the moments that matter." /><Card><h2>Your circle is private by default</h2><p className="page-subtitle">Add trusted people and choose exactly what they can see.</p></Card></>
}
