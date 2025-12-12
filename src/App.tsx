import { useState } from 'react'
import { FileText, User, Pill, Calendar, Download, Send, Plus, X, AlertTriangle, Search } from 'lucide-react'
import { indianMedicines, diagnosisTemplates, dosageFrequency } from './data/medicines'

interface PatientInfo {
  name: string
  age: string
  gender: string
  weight: string
  allergies: string
  phone: string
}

interface MedicineEntry {
  id: string
  medicine: string
  dosage: string
  frequency: string
  duration: string
  timing: string
}

function App() {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: '',
    age: '',
    gender: 'Male',
    weight: '',
    allergies: '',
    phone: '',
  })
  
  const [diagnosis, setDiagnosis] = useState('')
  const [medicines, setMedicines] = useState<MedicineEntry[]>([])
  const [advice, setAdvice] = useState('')
  const [followUpDays, setFollowUpDays] = useState('7')
  const [searchQuery, setSearchQuery] = useState('')
  const [showMedicineSearch, setShowMedicineSearch] = useState(false)
  
  const filteredMedicines = indianMedicines.filter(med =>
    med.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.genericName.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const addMedicine = (medicineName: string) => {
    const newMedicine: MedicineEntry = {
      id: Date.now().toString(),
      medicine: medicineName,
      dosage: '',
      frequency: 'BD',
      duration: '5',
      timing: 'After Food',
    }
    setMedicines([...medicines, newMedicine])
    setShowMedicineSearch(false)
    setSearchQuery('')
  }
  
  const removeMedicine = (id: string) => {
    setMedicines(medicines.filter(m => m.id !== id))
  }
  
  const updateMedicine = (id: string, field: keyof MedicineEntry, value: string) => {
    setMedicines(medicines.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ))
  }
  
  const loadTemplate = (templateId: string) => {
    const template = diagnosisTemplates.find(t => t.id === templateId)
    if (template) {
      setDiagnosis(template.name)
      setAdvice(template.advice.join('\\n'))
      template.medicines.forEach(medName => {
        const med = indianMedicines.find(m => m.brandName === medName)
        if (med) addMedicine(med.brandName)
      })
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-medical-dark-500 to-medical-dark-400 text-white flex flex-col shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">Medfo</h1>
          <p className="text-sm text-gray-300 mt-1">AI Prescription</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-medical-teal-500 text-white shadow-lg">
            <FileText className="w-5 h-5" />
            <span className="font-medium">New Prescription</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all">
            <User className="w-5 h-5" />
            <span className="font-medium">Patients</span>
          </button>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">AI Prescription Generator</h1>
              <p className="text-gray-600 mt-1">Create smart, compliant prescriptions in seconds</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-6 py-3 bg-medical-navy-500 text-white rounded-xl hover:bg-medical-navy-600 transition-all flex items-center space-x-2 shadow-md">
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
              <button className="px-6 py-3 bg-medical-teal-500 text-white rounded-xl hover:bg-medical-teal-600 transition-all flex items-center space-x-2 shadow-md">
                <Send className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Form Content */}
        <div className="p-8 max-w-7xl mx-auto">
          {/* Quick Templates */}
          <div className="mb-8 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Templates</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {diagnosisTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => loadTemplate(template.id)}
                  className="px-4 py-3 bg-gradient-to-r from-medical-teal-50 to-medical-teal-100 text-medical-teal-700 rounded-xl hover:shadow-md transition-all text-sm font-semibold border border-medical-teal-200"
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Patient Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-medical-teal-500" />
                  Patient Information
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Patient Name *"
                    value={patientInfo.name}
                    onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-medical-teal-500 focus:ring-4 focus:ring-medical-teal-100 outline-none transition-all"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Age *"
                      value={patientInfo.age}
                      onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-medical-teal-500 focus:ring-4 focus:ring-medical-teal-100 outline-none transition-all"
                    />
                    <select
                      value={patientInfo.gender}
                      onChange={(e) => setPatientInfo({...patientInfo, gender: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-medical-teal-500 focus:ring-4 focus:ring-medical-teal-100 outline-none transition-all"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={patientInfo.weight}
                    onChange={(e) => setPatientInfo({...patientInfo, weight: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-medical-teal-500 focus:ring-4 focus:ring-medical-teal-100 outline-none transition-all"
                  />
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Known Allergies"
                      value={patientInfo.allergies}
                      onChange={(e) => setPatientInfo({...patientInfo, allergies: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all"
                    />
                    {patientInfo.allergies && (
                      <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Diagnosis</h2>
                <textarea
                  placeholder="Enter diagnosis..."
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-medical-teal-500 focus:ring-4 focus:ring-medical-teal-100 outline-none transition-all resize-none"
                ></textarea>
              </div>
            </div>
            
            {/* Right Column - Medicines & Advice */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center">
                    <Pill className="w-5 h-5 mr-2 text-medical-teal-500" />
                    Medicines
                  </h2>
                  <button
                    onClick={() => setShowMedicineSearch(!showMedicineSearch)}
                    className="px-4 py-2 bg-medical-teal-500 text-white rounded-lg hover:bg-medical-teal-600 transition-all flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Medicine</span>
                  </button>
                </div>
                
                {showMedicineSearch && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search medicines..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-medical-teal-500 focus:ring-2 focus:ring-medical-teal-100 outline-none"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {filteredMedicines.slice(0, 10).map(med => (
                        <button
                          key={med.id}
                          onClick={() => addMedicine(med.brandName)}
                          className="w-full text-left px-3 py-2 hover:bg-white rounded-lg transition-all"
                        >
                          <p className="font-semibold text-sm text-gray-800">{med.brandName}</p>
                          <p className="text-xs text-gray-600">{med.genericName} - {med.strength}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  {medicines.map((med, index) => (
                    <div key={med.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <p className="font-semibold text-gray-800">{index + 1}. {med.medicine}</p>
                        <button
                          onClick={() => removeMedicine(med.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Dosage"
                          value={med.dosage}
                          onChange={(e) => updateMedicine(med.id, 'dosage', e.target.value)}
                          className="px-3 py-2 rounded-lg border border-gray-300 focus:border-medical-teal-500 outline-none text-sm"
                        />
                        <select
                          value={med.frequency}
                          onChange={(e) => updateMedicine(med.id, 'frequency', e.target.value)}
                          className="px-3 py-2 rounded-lg border border-gray-300 focus:border-medical-teal-500 outline-none text-sm"
                        >
                          {Object.entries(dosageFrequency).map(([key, value]) => (
                            <option key={key} value={key}>{key} - {value}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          placeholder="Duration (days)"
                          value={med.duration}
                          onChange={(e) => updateMedicine(med.id, 'duration', e.target.value)}
                          className="px-3 py-2 rounded-lg border border-gray-300 focus:border-medical-teal-500 outline-none text-sm"
                        />
                        <select
                          value={med.timing}
                          onChange={(e) => updateMedicine(med.id, 'timing', e.target.value)}
                          className="px-3 py-2 rounded-lg border border-gray-300 focus:border-medical-teal-500 outline-none text-sm"
                        >
                          <option>Before Food</option>
                          <option>After Food</option>
                          <option>Empty Stomach</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  
                  {medicines.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <Pill className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No medicines added yet</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Advice & Follow-up</h2>
                <textarea
                  placeholder="Dietary advice, lifestyle modifications..."
                  value={advice}
                  onChange={(e) => setAdvice(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-medical-teal-500 focus:ring-4 focus:ring-medical-teal-100 outline-none transition-all resize-none mb-4"
                ></textarea>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Follow-up after:</span>
                  <input
                    type="number"
                    value={followUpDays}
                    onChange={(e) => setFollowUpDays(e.target.value)}
                    className="w-20 px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-medical-teal-500 outline-none"
                  />
                  <span className="text-gray-700">days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
