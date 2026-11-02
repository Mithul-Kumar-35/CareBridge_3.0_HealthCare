import React from 'react'
import { Network } from 'lucide-react'
import { Card, PageTitle } from '../ui'

export default function OrganizationPage({ data, hospital }) {
  const departments = data.departments.filter(department => department.hospitalId === hospital?.id)
  return <><PageTitle eyebrow="ORGANIZATION" title="Care network structure" text="A clear hierarchy keeps ownership and access visible." /><Card><div className="card-head"><div><p className="eyebrow">HOSPITAL</p><h2>{hospital?.name}</h2></div><span className="round-icon"><Network /></span></div><div className="data-list">{departments.map(department => <div className="data-row" key={department.id}><span className="round-icon"><Network /></span><div><b>{department.name}</b><small>Floor {department.floor} · Room {department.room}</small></div><span>{department.staff} staff</span></div>)}</div></Card></>
}
