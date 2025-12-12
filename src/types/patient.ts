export interface Patient {
  id: string
  name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  phone: string
  email?: string
  weight?: number
  height?: number
  bloodGroup?: string
  allergies: string[]
  chronicConditions: string[]
  emergencyContact?: string
  address?: string
  createdAt: Date
  updatedAt: Date
}

export interface Prescription {
  id: string
  patientId: string
  patientName: string
  diagnosis: string
  medicines: Medicine[]
  advice: string
  followUpDays: number
  createdAt: Date
  doctorName?: string
}

export interface Medicine {
  id: string
  medicine: string
  dosage: string
  frequency: string
  duration: string
  timing: string
}

export interface Visit {
  id: string
  patientId: string
  visitDate: Date
  chiefComplaint: string
  prescriptionId: string
  vitals?: {
    bloodPressure?: string
    temperature?: number
    pulse?: number
    weight?: number
  }
}
