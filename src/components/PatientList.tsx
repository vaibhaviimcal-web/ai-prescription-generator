import { useState, useEffect } from 'react'
import { Search, User, AlertTriangle, X, Eye } from 'lucide-react'
import { Patient } from '../types/patient'
import { patientService } from '../services/patientService'
import { format } from 'date-fns'

interface PatientListProps {
  onSelectPatient: (patient: Patient) => void
  onViewProfile: (patient: Patient) => void
}

export default function PatientList({ onSelectPatient, onViewProfile }: PatientListProps) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [filterType, setFilterType] = useState<'all' | 'allergies' | 'chronic'>('all')

  useEffect(() => {
    loadPatients()
  }, [])

  useEffect(() => {
    filterPatients()
  }, [searchTerm, patients, filterType])

  const loadPatients = async () => {
    try {
      setIsLoading(true)
      const data = await patientService.getAllPatients()
      setPatients(data)
    } catch (error) {
      console.error('Error loading patients:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterPatients = () => {
    let filtered = patients

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.phone.includes(searchTerm) ||
          p.email?.toLowerCase().includes(searchLower)
      )
    }

    // Type filter
    if (filterType === 'allergies') {
      filtered = filtered.filter((p) => p.allergies.length > 0)
    } else if (filterType === 'chronic') {
      filtered = filtered.filter((p) => p.chronicConditions.length > 0)
    }

    setFilteredPatients(filtered)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-gray-200 focus:border-medical-teal-500 focus:ring-4 focus:ring-medical-teal-100 outline-none transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterType === 'all'
                ? 'bg-medical-teal-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({patients.length})
          </button>
          <button
            onClick={() => setFilterType('allergies')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterType === 'allergies'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Allergies ({patients.filter((p) => p.allergies.length > 0).length})
          </button>
          <button
            onClick={() => setFilterType('chronic')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterType === 'chronic'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Chronic ({patients.filter((p) => p.chronicConditions.length > 0).length})
          </button>
        </div>
      </div>

      {/* Patient List */}
      {filteredPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white rounded-xl border-2 border-gray-200 hover:border-medical-teal-300 hover:shadow-lg transition-all p-4"
            >
              {/* Patient Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-medical-teal-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-medical-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{patient.name}</h3>
                    <p className="text-sm text-gray-600">
                      {patient.age} yrs • {patient.gender}
                    </p>
                  </div>
                </div>
              </div>

              {/* Patient Info */}
              <div className="space-y-2 mb-3">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Phone:</span> {patient.phone}
                </p>
                {patient.bloodGroup && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Blood:</span> {patient.bloodGroup}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Registered: {format(patient.createdAt, 'PP')}
                </p>
              </div>

              {/* Alerts */}
              {patient.allergies.length > 0 && (
                <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <p className="text-xs text-red-700 font-medium">
                      Allergies: {patient.allergies.slice(0, 2).join(', ')}
                      {patient.allergies.length > 2 && ` +${patient.allergies.length - 2}`}
                    </p>
                  </div>
                </div>
              )}

              {patient.chronicConditions.length > 0 && (
                <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-700 font-medium">
                    {patient.chronicConditions.slice(0, 2).join(', ')}
                    {patient.chronicConditions.length > 2 && ` +${patient.chronicConditions.length - 2}`}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onViewProfile(patient)}
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center space-x-2 text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => onSelectPatient(patient)}
                  className="flex-1 px-3 py-2 bg-medical-teal-500 text-white rounded-lg hover:bg-medical-teal-600 transition-all text-sm font-medium"
                >
                  New Rx
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No patients found</p>
          <p className="text-sm text-gray-500 mt-2">
            {searchTerm
              ? 'Try adjusting your search or filters'
              : 'Register your first patient to get started'}
          </p>
        </div>
      )}
    </div>
  )
}
