import React from 'react'
import { FileHeart } from 'lucide-react'
import { Card, PageTitle } from '../ui'

export default function PatientDashboard({ data, user, patients }) {
  const patient = patients[0]
  const records = data.records.filter(record => record.patientId === patient?.id)
  return <><PageTitle eyebrow="YOUR CARE JOURNEY" title={`Welcome back, ${user.name.split(' ')[0]}.`} text="Your appointments, medicines and care team stay connected here." /><div className="dashboard-grid"><Card><p className="eyebrow">NEXT STEP</p><h2>Stay connected to your care</h2><p className="page-subtitle">Review your latest care updates and keep your approved circle informed.</p></Card><Card><p className="eyebrow">HEALTHSTORY</p><h2>{records.length} saved records</h2><span className="round-icon"><FileHeart /></span></Card></div></>
}
