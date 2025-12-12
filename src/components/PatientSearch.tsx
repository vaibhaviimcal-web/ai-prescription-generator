import { useState, useEffect } from 'react'
import { Search, UserPlus, X } from 'lucide-react'
import { patientService } from '../services/patientService'
import { Patient } from '../types/patient'

interface PatientSearchProps {
  onSelectPatient: (patient: Patient) => void
  onNewPatient: () => void
}

export default function PatientSearch({ onSelectPatient, onNewPatient }: PatientSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [patients, setPatients] = useState<Patient[]>([])
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    loadPatients()
  }, [])

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = patients.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone.includes(searchTerm)
      )
      setFilteredPatients(filtered)
      setShowResults(true)
    } else {
      setFilteredPatients([])
      setShowResults(false)
    }
  }, [searchTerm, patients])

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

  const handleSelectPatient = (patient: Patient) => {
    onSelectPatient(patient)
    setSearchTerm('')
    setShowResults(false)
  }

  return (
    <div className="relative">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patient by name or phone..."
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
        <button
          onClick={onNewPatient}
          className="px-6 py-3 bg-medical-teal-500 text-white rounded-xl hover:bg-medical-teal-600 transition-all flex items-center space-x-2 shadow-md"
        >
          <UserPlus className="w-5 h-5" />
          <span>New Patient</span>
        </button>
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
          {filteredPatients.length > 0 ? (
            <div className="p-2">
              {filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => handleSelectPatient(patient)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{patient.name}</p>
                      <p className="text-sm text-gray-600">
                        {patient.age} yrs • {patient.gender} • {patient.phone}
                      </p>
                      {patient.allergies.length > 0 && (
                        <p className="text-xs text-red-600 mt-1">
                          ⚠️ Allergies: {patient.allergies.join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {patient.chronicConditions.length > 0 && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          {patient.chronicConditions.length} conditions
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No patients found</p>
              <button
                onClick={onNewPatient}
                className="mt-3 text-medical-teal-600 hover:text-medical-teal-700 font-medium"
              >
                + Add new patient
              </button>
            </div>
          )}
        </div>
      )}

      {/* Patient Count */}
      <div className="mt-2 text-sm text-gray-600">
        {isLoading ? 'Loading...' : `${patients.length} patients registered`}
      </div>
    </div>
  )
}
