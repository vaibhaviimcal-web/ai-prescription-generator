import { useState } from 'react'
import { Sparkles, Loader2, AlertCircle } from 'lucide-react'
import { Patient } from '../types/patient'
import { aiService } from '../services/aiService'
import { prescriptionService } from '../services/patientService'

interface AIPrescriptionGeneratorProps {
  patient: Patient | null
  onPrescriptionGenerated: (prescription: any) => void
}

export default function AIPrescriptionGenerator({ patient, onPrescriptionGenerated }: AIPrescriptionGeneratorProps) {
  const [symptoms, setSymptoms] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')

  const handleGeneratePrescription = async () => {
    if (!patient) {
      setError('Please select a patient first')
      return
    }

    if (!symptoms.trim()) {
      setError('Please enter symptoms')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      // Fetch previous prescriptions to learn patterns
      const previousPrescriptions = await prescriptionService.getPatientPrescriptions(patient.id)

      // Generate AI prescription
      const aiPrescription = await aiService.generatePrescription({
        symptoms,
        diagnosis: diagnosis || undefined,
        patient,
        previousPrescriptions: previousPrescriptions.slice(0, 5) // Last 5 prescriptions
      })

      // Pass generated prescription to parent
      onPrescriptionGenerated(aiPrescription)

      // Clear form
      setSymptoms('')
      setDiagnosis('')
    } catch (err) {
      console.error('AI generation error:', err)
      setError('Failed to generate prescription. Please try again or create manually.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className=\"bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-6 shadow-lg\">
      <div className=\"flex items-center space-x-3 mb-4\">
        <div className=\"p-2 bg-purple-500 rounded-lg\">
          <Sparkles className=\"w-6 h-6 text-white\" />
        </div>
        <div>
          <h3 className=\"text-xl font-bold text-gray-800\">AI-Powered Prescription</h3>
          <p className=\"text-sm text-gray-600\">Generate smart prescriptions in seconds</p>
        </div>
      </div>

      {!patient && (
        <div className=\"bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 flex items-start space-x-3\">
          <AlertCircle className=\"w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5\" />
          <p className=\"text-sm text-yellow-800\">Please select a patient to use AI prescription generation</p>
        </div>
      )}

      <div className=\"space-y-4\">
        {/* Symptoms Input */}
        <div>
          <label className=\"block text-sm font-semibold text-gray-700 mb-2\">
            Patient Symptoms *
          </label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder=\"Describe patient's symptoms in detail...&#10;Example: Fever since 3 days, body ache, headache, mild cough\"
            className=\"w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none\"
            rows={4}
            disabled={!patient || isGenerating}
          />
        </div>

        {/* Optional Diagnosis */}
        <div>
          <label className=\"block text-sm font-semibold text-gray-700 mb-2\">
            Diagnosis (Optional)
          </label>
          <input
            type=\"text\"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder=\"e.g., Viral Fever, URTI, Gastritis\"
            className=\"w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent\"
            disabled={!patient || isGenerating}
          />
          <p className=\"text-xs text-gray-500 mt-1\">Leave blank to let AI suggest diagnosis</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className=\"bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2\">
            <AlertCircle className=\"w-5 h-5 text-red-600 flex-shrink-0 mt-0.5\" />
            <p className=\"text-sm text-red-800\">{error}</p>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGeneratePrescription}
          disabled={!patient || !symptoms.trim() || isGenerating}
          className=\"w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold\"
        >
          {isGenerating ? (
            <>
              <Loader2 className=\"w-5 h-5 animate-spin\" />
              <span>Generating AI Prescription...</span>
            </>
          ) : (
            <>
              <Sparkles className=\"w-5 h-5\" />
              <span>Generate AI Prescription</span>
            </>
          )}
        </button>

        {/* AI Features Info */}
        <div className=\"bg-white/50 rounded-lg p-4 space-y-2\">
          <p className=\"text-xs font-semibold text-gray-700 mb-2\">AI Features:</p>
          <ul className=\"text-xs text-gray-600 space-y-1\">
            <li className=\"flex items-start space-x-2\">
              <span className=\"text-purple-500 font-bold\">✓</span>
              <span>Context-aware recommendations based on patient age, weight, allergies</span>
            </li>
            <li className=\"flex items-start space-x-2\">
              <span className=\"text-purple-500 font-bold\">✓</span>
              <span>Learns from your previous prescriptions and prescribing patterns</span>
            </li>
            <li className=\"flex items-start space-x-2\">
              <span className=\"text-purple-500 font-bold\">✓</span>
              <span>Automatic allergy checking and drug interaction warnings</span>
            </li>
            <li className=\"flex items-start space-x-2\">
              <span className=\"text-purple-500 font-bold\">✓</span>
              <span>Smart dosage and duration recommendations</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
