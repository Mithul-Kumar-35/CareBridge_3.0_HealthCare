import React from 'react'
import { CalendarDays } from 'lucide-react'
import { Card, Empty, PageTitle } from '../ui'
import { appointmentsFor } from '../appointmentOps'

export default function AppointmentsPage({ data, user, patients }) {
  const appointments = appointmentsFor(data, user, patients)
  return <><PageTitle eyebrow="APPOINTMENTS" title="Appointments" text="Keep consultations, follow-ups and check-ins in one shared timeline." /><Card><div className="data-list">{appointments.length ? appointments.map(appointment => <div className="data-row" key={appointment.id}><span className="round-icon"><CalendarDays /></span><div><b>{data.users.find(item => item.id === patients.find(patient => patient.id === appointment.patientId)?.userId)?.name || 'Patient'}</b><small>{appointment.date} · {appointment.time}</small></div><span>{appointment.status}</span></div>) : <Empty title="No appointments" text="No appointments are scheduled for this view." />}</div></Card></>
}
