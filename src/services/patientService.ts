import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy,
  Timestamp
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { Patient, Prescription } from '../types/patient'

const PATIENTS_COLLECTION = 'patients'
const PRESCRIPTIONS_COLLECTION = 'prescriptions'

// Patient CRUD Operations
export const patientService = {
  // Create new patient
  async createPatient(patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, PATIENTS_COLLECTION), {
        ...patientData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      })
      return docRef.id
    } catch (error) {
      console.error('Error creating patient:', error)
      throw error
    }
  },

  // Get all patients
  async getAllPatients(): Promise<Patient[]> {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, PATIENTS_COLLECTION), orderBy('createdAt', 'desc'))
      )
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Patient[]
    } catch (error) {
      console.error('Error getting patients:', error)
      throw error
    }
  },

  // Get patient by ID
  async getPatientById(patientId: string): Promise<Patient | null> {
    try {
      const docRef = doc(db, PATIENTS_COLLECTION, patientId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate(),
          updatedAt: docSnap.data().updatedAt?.toDate()
        } as Patient
      }
      return null
    } catch (error) {
      console.error('Error getting patient:', error)
      throw error
    }
  },

  // Search patients by name or phone
  async searchPatients(searchTerm: string): Promise<Patient[]> {
    try {
      const searchLower = searchTerm.toLowerCase()
      const allPatients = await this.getAllPatients()
      
      return allPatients.filter(patient => 
        patient.name.toLowerCase().includes(searchLower) ||
        patient.phone.includes(searchTerm)
      )
    } catch (error) {
      console.error('Error searching patients:', error)
      throw error
    }
  },

  // Update patient
  async updatePatient(patientId: string, patientData: Partial<Patient>): Promise<void> {
    try {
      const docRef = doc(db, PATIENTS_COLLECTION, patientId)
      await updateDoc(docRef, {
        ...patientData,
        updatedAt: Timestamp.now()
      })
    } catch (error) {
      console.error('Error updating patient:', error)
      throw error
    }
  },

  // Delete patient
  async deletePatient(patientId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, PATIENTS_COLLECTION, patientId))
    } catch (error) {
      console.error('Error deleting patient:', error)
      throw error
    }
  }
}

// Prescription Service
export const prescriptionService = {
  // Create new prescription
  async createPrescription(prescriptionData: Omit<Prescription, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, PRESCRIPTIONS_COLLECTION), {
        ...prescriptionData,
        createdAt: Timestamp.now()
      })
      return docRef.id
    } catch (error) {
      console.error('Error creating prescription:', error)
      throw error
    }
  },

  // Get prescriptions for a patient
  async getPatientPrescriptions(patientId: string): Promise<Prescription[]> {
    try {
      const q = query(
        collection(db, PRESCRIPTIONS_COLLECTION),
        where('patientId', '==', patientId),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      })) as Prescription[]
    } catch (error) {
      console.error('Error getting prescriptions:', error)
      throw error
    }
  },

  // Get prescription by ID
  async getPrescriptionById(prescriptionId: string): Promise<Prescription | null> {
    try {
      const docRef = doc(db, PRESCRIPTIONS_COLLECTION, prescriptionId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate()
        } as Prescription
      }
      return null
    } catch (error) {
      console.error('Error getting prescription:', error)
      throw error
    }
  }
}
