export const LIMITS = { name: 80, dose: 80, note: 160, days: 365 }
export const formatTime = time => new Date(`1970-01-01T${time}`).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })
export const isClinician = user => ['doctor', 'head'].includes(user?.role)
const clean = value => String(value ?? '').trim()
const today = () => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
const familyCan = (user, patient) => user?.role === 'family' && patient?.familyLinks?.some(link => link.userId === user.id && link.status === 'approved' && link.permissions.includes('medications'))
const access = (user, patient) => Boolean(patient && (user?.id === patient.userId || familyCan(user, patient) || (isClinician(user) && patient.doctorIds.includes(user.id))))
const normalize = (form, actorId, existing = {}) => {
  const days = clean(form.days)
  return {
    ...existing,
    name: clean(form.name),
    instruction: clean(form.instruction),
    time: clean(form.time),
    note: clean(form.note),
    scheduledBy: existing.scheduledBy || actorId,
    status: existing.status || 'unconfirmed',
    statusDate: existing.statusDate || today(),
    ...(days ? { endDate: new Date(Date.now() + (Number(days) - 1) * 86400000).toISOString().slice(0, 10) } : { endDate: undefined }),
  }
}
const validate = form => {
  const errors = {}
  if (!clean(form.name)) errors.name = 'Enter a medicine name.'
  if (!clean(form.instruction)) errors.instruction = 'Enter the dose or instruction.'
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(clean(form.time))) errors.time = 'Choose a valid time.'
  if (clean(form.days) && (!Number.isInteger(Number(form.days)) || Number(form.days) < 1 || Number(form.days) > LIMITS.days)) errors.days = `Choose 1–${LIMITS.days} days.`
  return { ok: !Object.keys(errors).length, errors }
}
export const scheduleFor = (data, patientId, date = today()) => {
  const medications = data.medications.filter(medication => medication.patientId === patientId)
  const active = medications.filter(medication => !medication.endDate || medication.endDate >= date).map(medication => ({ ...medication, today: medication.statusDate === date ? medication.status : 'unconfirmed' }))
  return { active, ended: medications.filter(medication => medication.endDate && medication.endDate < date) }
}
export const adherenceToday = medications => medications.reduce((summary, medication) => {
  const status = medication.today || 'unconfirmed'
  return { ...summary, [status]: summary[status] + 1, pending: status === 'unconfirmed' ? summary.pending + 1 : summary.pending }
}, { taken: 0, skipped: 0, unconfirmed: 0, pending: 0 })
export const scheduledByLabel = medication => medication.scheduledBy ? `Scheduled by ${medication.scheduledBy}` : 'Care team schedule'
export const canMarkDose = (user, patient) => user?.id === patient?.userId
export const canSchedule = (user, patient) => access(user, patient) && (isClinician(user) || familyCan(user, patient))
export const canModify = (user, patient, medication) => canSchedule(user, patient) && (isClinician(user) || medication.scheduledBy === user.id)
export function addMedication(data, form, patientId, actor) {
  const patient = data.patients.find(item => item.id === patientId)
  const check = validate(form)
  if (!access(actor, patient) || !canSchedule(actor, patient)) return { ok: false, message: 'You cannot schedule medicines for this patient.' }
  if (!check.ok) return check
  const medication = normalize(form, actor.id, { id: `m${Date.now().toString(36)}`, patientId })
  return { ok: true, medication, data: { ...data, medications: [...data.medications, medication] } }
}
export function updateMedication(data, medicationId, form, actor) {
  const current = data.medications.find(item => item.id === medicationId)
  const patient = data.patients.find(item => item.id === current?.patientId)
  const check = validate(form)
  if (!current || !canModify(actor, patient, current)) return { ok: false, message: 'You cannot edit this medicine.' }
  if (!check.ok) return check
  const medication = normalize(form, actor.id, current)
  return { ok: true, medication, data: { ...data, medications: data.medications.map(item => item.id === medicationId ? medication : item) } }
}
export function deleteMedication(data, medicationId, actor) {
  const current = data.medications.find(item => item.id === medicationId)
  const patient = data.patients.find(item => item.id === current?.patientId)
  if (!current || !canModify(actor, patient, current)) return { ok: false, message: 'You cannot remove this medicine.' }
  return { ok: true, data: { ...data, medications: data.medications.filter(item => item.id !== medicationId) } }
}
export function setDoseStatus(data, id, status, actor) {
  if (!['taken', 'skipped', 'unconfirmed'].includes(status)) return { ok: false, message: 'Invalid dose status.' }
  const medication = data.medications.find(item => item.id === id)
  const patient = data.patients.find(item => item.id === medication?.patientId)
  if (!medication || !canMarkDose(actor, patient)) return { ok: false, message: 'Only the patient can confirm a dose.' }
  return { ok: true, data: { ...data, medications: data.medications.map(item => item.id === id ? { ...item, status, statusDate: today() } : item) } }
}
