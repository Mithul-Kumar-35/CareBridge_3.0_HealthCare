import React from 'react'
import { Building2 } from 'lucide-react'
import { Card, PageTitle } from '../ui'

export default function HospitalsPage({ data }) {
  return <><PageTitle eyebrow="NETWORK" title="Hospitals" text="A connected view of every fictional CareBridge site." /><div className="hospital-list card">{data.hospitals.map(hospital => <article key={hospital.id}><span className="hospital-monogram" style={{ background: hospital.color }}>{hospital.code}</span><span><b>{hospital.name}</b><small>{hospital.city} · {hospital.type}</small></span><span>{hospital.beds} beds</span><Building2 /></article>)}</div></>
}
