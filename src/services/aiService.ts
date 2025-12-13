import { Patient } from '../types/patient'

interface AIGeneratePrescriptionParams {
  symptoms: string
  diagnosis?: string
  patient: Patient
  previousPrescriptions?: any[]
}

interface AIPrescriptionResponse {
  diagnosis: string
  medicines: Array<{
    medicine: string
    dosage: string
    frequency: string
    duration: string
    timing: string
  }>
  advice: string
  followUpDays: number
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent'

export const aiService = {
  /**
   * Generate AI-powered prescription based on symptoms and patient context
   */
  async generatePrescription(params: AIGeneratePrescriptionParams): Promise<AIPrescriptionResponse> {
    const { symptoms, diagnosis, patient, previousPrescriptions = [] } = params

    // Build context-aware prompt
    const prompt = this.buildPrescriptionPrompt(symptoms, diagnosis, patient, previousPrescriptions)

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`)
      }

      const data = await response.json()
      const aiResponse = data.candidates[0].content.parts[0].text

      // Parse AI response into structured prescription
      return this.parseAIResponse(aiResponse)
    } catch (error) {
      console.error('Error generating AI prescription:', error)
      throw error
    }
  },

  /**
   * Build context-aware prompt for AI prescription generation
   */
  buildPrescriptionPrompt(
    symptoms: string,
    diagnosis: string | undefined,
    patient: Patient,
    previousPrescriptions: any[]
  ): string {
    let prompt = `You are an experienced medical doctor. Generate a detailed prescription based on the following information:

**PATIENT INFORMATION:**
- Name: ${patient.name}
- Age: ${patient.age} years
- Gender: ${patient.gender}
- Blood Group: ${patient.bloodGroup || 'Not specified'}
${patient.weight ? `- Weight: ${patient.weight} kg` : ''}
${patient.height ? `- Height: ${patient.height} cm` : ''}

**MEDICAL HISTORY:**
${patient.allergies.length > 0 ? `- Allergies: ${patient.allergies.join(', ')} ⚠️ AVOID THESE` : '- No known allergies'}
${patient.chronicConditions.length > 0 ? `- Chronic Conditions: ${patient.chronicConditions.join(', ')}` : '- No chronic conditions'}

**CURRENT SYMPTOMS:**
${symptoms}

${diagnosis ? `**DIAGNOSIS:** ${diagnosis}` : ''}

${previousPrescriptions.length > 0 ? `
**PREVIOUS PRESCRIPTIONS (Learn from doctor's patterns):**
${previousPrescriptions.slice(0, 3).map((p, i) => `
${i + 1}. Diagnosis: ${p.diagnosis}
   Medicines: ${p.medicines.map((m: any) => `${m.medicine} ${m.dosage} ${m.frequency}`).join(', ')}
`).join('\n')}
` : ''}

**INSTRUCTIONS:**
1. Provide a clear diagnosis if not already specified
2. Recommend appropriate medicines with:
   - Medicine name (prefer Indian brands like Dolo, Crocin, Azithral, etc.)
   - Dosage (e.g., 650mg, 500mg)
   - Frequency (OD/BD/TDS/QID)
   - Duration (in days)
   - Timing (Before Food/After Food/With Food)
3. Consider patient's age, weight, allergies, and chronic conditions
4. Provide lifestyle advice and precautions
5. Suggest follow-up duration in days

**IMPORTANT SAFETY RULES:**
- NEVER prescribe medicines the patient is allergic to
- Adjust dosages for age and weight
- Consider drug interactions with chronic conditions
- Follow Indian medical guidelines

**OUTPUT FORMAT (JSON):**
{
  "diagnosis": "Clear diagnosis here",
  "medicines": [
    {
      "medicine": "Medicine Brand Name",
      "dosage": "650mg",
      "frequency": "BD",
      "duration": "5",
      "timing": "After Food"
    }
  ],
  "advice": "Detailed advice including diet, rest, precautions, warning signs",
  "followUpDays": 7
}

Provide ONLY the JSON output, no additional text.`

    return prompt
  },

  /**
   * Parse AI response into structured prescription data
   */
  parseAIResponse(aiResponse: string): AIPrescriptionResponse {
    try {
      // Extract JSON from response (handle markdown code blocks)
      let jsonStr = aiResponse.trim()
      
      // Remove markdown code blocks if present
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '')
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```\n?/g, '')
      }

      const parsed = JSON.parse(jsonStr)

      // Validate and return
      return {
        diagnosis: parsed.diagnosis || '',
        medicines: parsed.medicines || [],
        advice: parsed.advice || '',
        followUpDays: parsed.followUpDays || 7
      }
    } catch (error) {
      console.error('Error parsing AI response:', error)
      console.log('Raw AI response:', aiResponse)
      
      // Fallback: return empty prescription
      return {
        diagnosis: '',
        medicines: [],
        advice: 'AI prescription generation failed. Please create prescription manually.',
        followUpDays: 7
      }
    }
  },

  /**
   * Get medicine suggestions based on symptoms
   */
  async suggestMedicines(symptoms: string): Promise<string[]> {
    const prompt = `Based on these symptoms: "${symptoms}", suggest 5 commonly prescribed Indian medicines (brand names only). Return as JSON array of strings.`

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 256,
          }
        })
      })

      const data = await response.json()
      const aiResponse = data.candidates[0].content.parts[0].text
      
      // Parse JSON array
      let jsonStr = aiResponse.trim()
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '')
      }
      
      return JSON.parse(jsonStr)
    } catch (error) {
      console.error('Error getting medicine suggestions:', error)
      return []
    }
  }
}
