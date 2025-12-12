import { useState } from 'react'
import { X, Save, AlertTriangle } from 'lucide-react'
import { patientService } from '../services/patientService'
import { Patient } from '../types/patient'

interface PatientRegistrationProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (patient: Patient) => void
  editPatient?: Patient | null
}

export default function PatientRegistration({ isOpen, onClose, onSuccess, editPatient }: PatientRegistrationProps) {
  const [formData, setFormData] = useState({
    name: editPatient?.name || '',
    age: editPatient?.age?.toString() || '',
    gender: editPatient?.gender || 'Male',
    phone: editPatient?.phone || '',
    email: editPatient?.email || '',
    weight: editPatient?.weight?.toString() || '',
    height: editPatient?.height?.toString() || '',
    bloodGroup: editPatient?.bloodGroup || '',
    allergies: editPatient?.allergies?.join(', ') || '',
    chronicConditions: editPatient?.chronicConditions?.join(', ') || '',
    emergencyContact: editPatient?.emergencyContact || '',
    address: editPatient?.address || '',
  })

  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.name || !formData.age || !formData.phone) {
      setError('Please fill in all required fields (Name, Age, Phone)')
      return
    }

    try {
      setIsSaving(true)
      
      const patientData = {
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender as 'Male' | 'Female' | 'Other',
        phone: formData.phone,
        email: formData.email,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        height: formData.height ? parseFloat(formData.height) : undefined,
        bloodGroup: formData.bloodGroup,
        allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()).filter(Boolean) : [],
        chronicConditions: formData.chronicConditions ? formData.chronicConditions.split(',').map(c => c.trim()).filter(Boolean) : [],
        emergencyContact: formData.emergencyContact,
        address: formData.address,
      }

      if (editPatient) {
        await patientService.updatePatient(editPatient.id, patientData)
        const updatedPatient = await patientService.getPatientById(editPatient.id)
        if (updatedPatient) {
          onSuccess(updatedPatient)
        }
      } else {
        const patientId = await patientService.createPatient(patientData)
        const newPatient = await patientService.getPatientById(patientId)
        if (newPatient) {
          onSuccess(newPatient)
        }
      }

      onClose()
    } catch (error) {
      console.error('Error saving patient:', error)
      setError('Failed to save patient. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-medical-teal-500 to-medical-teal-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold">
            {editPatient ? 'Edit Patient' : 'New Patient Registration'}
          </h2>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-lg transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Information</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-medical-teal-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-medical-teal-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-medical-teal-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-medical-teal-500 outline-none"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-medical-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-medical-teal-500 outline-none"
              >
                <option value="">Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            {/* Physical Measurements */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Physical Measurements</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-medical-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
              <input
                type="number"
                step="0.1"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-medical-teal-500 outline-none"
              />
            </div>

            {/* Medical Information */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Medical Information</h3>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Known Allergies (comma-separated)
              </label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                placeholder="e.g., Penicillin, Peanuts, Sulfa drugs"
                className="w-full px-4 py-2 rounded-lg border-2 border-red-200 focus:border-red-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chronic Conditions (comma-separated)
              </label>
              <input
                type="text"
                value={formData.chronicConditions}
                onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
                placeholder="e.g., Diabetes, Hypertension, Asthma"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-medical-teal-500 outline-none"
              />
            </div>

            {/* Contact Information */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Information</h3>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                placeholder="Name and phone number"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-medical-teal-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-medical-teal-500 outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-medical-teal-500 text-white rounded-lg hover:bg-medical-teal-600 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{isSaving ? 'Saving...' : editPatient ? 'Update Patient' : 'Register Patient'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
