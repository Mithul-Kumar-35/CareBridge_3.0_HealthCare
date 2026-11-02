export const LIMITS = { name: 80, dose: 80, note: 160, days: 365 }
export const formatTime = time => time
export const isClinician = user => ['doctor', 'head', 'dean'].includes(user.role)
export const scheduleFor = (data, patientId) => ({ active: data.medications.filter(medication => medication.patientId === patientId), ended: [] })
export const adherenceToday = medications => medications.reduce((summary, medication) => ({ ...summary, [medication.today || medication.status]: summary[medication.today || medication.status] + 1 }), { taken: 0, skipped: 0, unconfirmed: 0, pending: 0 })
export const scheduledByLabel = medication => medication.scheduledBy ? `Scheduled by ${medication.scheduledBy}` : 'Care team schedule'
export const canMarkDose = (user, patient) => user.id === patient.userId
export const canSchedule = user => isClinician(user) || user.role === 'family'
export const canModify = () => false
export const addMedication = () => ({ ok: false, message: 'Medication scheduling is unavailable in this lightweight workspace.' })
export const updateMedication = () => ({ ok: false, message: 'Medication editing is unavailable in this lightweight workspace.' })
export const deleteMedication = () => ({ ok: false, message: 'Medication removal is unavailable in this lightweight workspace.' })
export const setDoseStatus = (data, id, status) => ({ ok: true, data: { ...data, medications: data.medications.map(medication => medication.id === id ? { ...medication, today: status } : medication) } })
