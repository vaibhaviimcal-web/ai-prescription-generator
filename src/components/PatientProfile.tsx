import { useState, useEffect } from 'react'
import { X, Edit, Trash2, Activity, FileText, AlertTriangle, User, Phone, Mail, Calendar, Weight, Ruler, Droplet } from 'lucide-react'
import { Patient, Prescription } from '../types/patient'
import { prescriptionService } from '../services/patientService'
import { format } from 'date-fns'

interface PatientProfileProps {
  patient: Patient
  onClose: () => void
  onEdit: (patient: Patient) => void
  onDelete: (patientId: string) => void
}

export default function PatientProfile({ patient, onClose, onEdit, onDelete }: PatientProfileProps) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile')

  useEffect(() => {
    loadPrescriptions()
  }, [patient.id])

  const loadPrescriptions = async () => {
    try {
      setIsLoading(true)
      const data = await prescriptionService.getPatientPrescriptions(patient.id)
      setPrescriptions(data)
    } catch (error) {
      console.error('Error loading prescriptions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${patient.name}? This action cannot be undone.`)) {
      onDelete(patient.id)
      onClose()
    }
  }

  const calculateBMI = () => {
    if (patient.weight && patient.height) {
      const heightInMeters = patient.height / 100
      const bmi = patient.weight / (heightInMeters * heightInMeters)
      return bmi.toFixed(1)
    }
    return null
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Underweight', color: 'text-blue-600' }
    if (bmi < 25) return { text: 'Normal', color: 'text-green-600' }
    if (bmi < 30) return { text: 'Overweight', color: 'text-yellow-600' }
    return { text: 'Obese', color: 'text-red-600' }
  }

  const bmi = calculateBMI()
  const bmiCategory = bmi ? getBMICategory(parseFloat(bmi)) : null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-medical-teal-500 to-medical-teal-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <p className="text-sm text-white/80">
                {patient.age} years • {patient.gender} • {patient.bloodGroup || 'Blood group not specified'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(patient)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
              title="Edit Patient"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
              title="Delete Patient"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-2 border-b-2 font-medium transition-all ${
                activeTab === 'profile'
                  ? 'border-medical-teal-500 text-medical-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Patient Profile</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-2 border-b-2 font-medium transition-all ${
                activeTab === 'history'
                  ? 'border-medical-teal-500 text-medical-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Prescription History ({prescriptions.length})</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'profile' ? (
            <div className="space-y-6">
              {/* Alerts */}
              {patient.allergies.length > 0 && (
                <div className="p-4 bg-red-50 border-2 border-red-300 rounded-xl flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-red-800">Allergy Alert</p>
                    <p className="text-red-700">{patient.allergies.join(', ')}</p>
                  </div>
                </div>
              )}

              {patient.chronicConditions.length > 0 && (
                <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
                  <p className="font-bold text-yellow-800 mb-2">Chronic Conditions</p>
                  <div className="flex flex-wrap gap-2">
                    {patient.chronicConditions.map((condition, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-800">{patient.phone}</p>
                    </div>
                  </div>
                  {patient.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold text-gray-800">{patient.email}</p>
                      </div>
                    </div>
                  )}
                  {patient.emergencyContact && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-sm text-gray-600">Emergency Contact</p>
                        <p className="font-semibold text-gray-800">{patient.emergencyContact}</p>
                      </div>
                    </div>
                  )}
                  {patient.address && (
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-semibold text-gray-800">{patient.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Physical Measurements & Vitals */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Physical Measurements</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {patient.weight && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Weight className="w-5 h-5 text-medical-teal-600" />
                        <p className="text-sm text-gray-600">Weight</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{patient.weight} kg</p>
                    </div>
                  )}
                  {patient.height && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Ruler className="w-5 h-5 text-medical-teal-600" />
                        <p className="text-sm text-gray-600">Height</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{patient.height} cm</p>
                    </div>
                  )}
                  {bmi && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Activity className="w-5 h-5 text-medical-teal-600" />
                        <p className="text-sm text-gray-600">BMI</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{bmi}</p>
                      {bmiCategory && (
                        <p className={`text-xs font-semibold ${bmiCategory.color}`}>{bmiCategory.text}</p>
                      )}
                    </div>
                  )}
                  {patient.bloodGroup && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Droplet className="w-5 h-5 text-red-600" />
                        <p className="text-sm text-gray-600">Blood Group</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{patient.bloodGroup}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Registration Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Registration Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Registered On</p>
                      <p className="font-semibold text-gray-800">
                        {format(patient.createdAt, 'PPP')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Last Updated</p>
                      <p className="font-semibold text-gray-800">
                        {format(patient.updatedAt, 'PPP')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-teal-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading prescription history...</p>
                </div>
              ) : prescriptions.length > 0 ? (
                prescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">{prescription.diagnosis}</h4>
                        <p className="text-sm text-gray-600">
                          {format(prescription.createdAt, 'PPP p')}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-medical-teal-100 text-medical-teal-700 rounded-full text-sm font-medium">
                        {prescription.medicines.length} medicines
                      </span>
                    </div>

                    {/* Medicines */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Medicines:</p>
                      <div className="space-y-2">
                        {prescription.medicines.map((med, index) => (
                          <div key={med.id} className="flex items-start space-x-2 text-sm">
                            <span className="text-gray-600">{index + 1}.</span>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">{med.medicine}</p>
                              <p className="text-gray-600">
                                {med.dosage} • {med.frequency} • {med.duration} days • {med.timing}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Advice */}
                    {prescription.advice && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Advice:</p>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{prescription.advice}</p>
                      </div>
                    )}

                    {/* Follow-up */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Follow-up after {prescription.followUpDays} days</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No prescription history yet</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Prescriptions will appear here once you create them
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
