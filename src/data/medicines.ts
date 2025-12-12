// Indian Medicine Database
export interface Medicine {
  id: string
  brandName: string
  genericName: string
  strength: string
  form: string
  category: string
  price: number
  commonDosage: string
}

export const indianMedicines: Medicine[] = [
  // Fever & Pain
  { id: '1', brandName: 'Dolo 650', genericName: 'Paracetamol', strength: '650mg', form: 'Tablet', category: 'Antipyretic', price: 30, commonDosage: '1 tablet TDS' },
  { id: '2', brandName: 'Crocin', genericName: 'Paracetamol', strength: '500mg', form: 'Tablet', category: 'Antipyretic', price: 25, commonDosage: '1-2 tablets TDS' },
  { id: '3', brandName: 'Combiflam', genericName: 'Ibuprofen + Paracetamol', strength: '400mg+325mg', form: 'Tablet', category: 'Analgesic', price: 35, commonDosage: '1 tablet TDS' },
  
  // Antibiotics
  { id: '4', brandName: 'Augmentin', genericName: 'Amoxicillin + Clavulanic Acid', strength: '625mg', form: 'Tablet', category: 'Antibiotic', price: 180, commonDosage: '1 tablet BD' },
  { id: '5', brandName: 'Azithral', genericName: 'Azithromycin', strength: '500mg', form: 'Tablet', category: 'Antibiotic', price: 95, commonDosage: '1 tablet OD for 3 days' },
  
  // Gastric
  { id: '6', brandName: 'Pan 40', genericName: 'Pantoprazole', strength: '40mg', form: 'Tablet', category: 'PPI', price: 65, commonDosage: '1 tablet OD before breakfast' },
  { id: '7', brandName: 'Omez', genericName: 'Omeprazole', strength: '20mg', form: 'Capsule', category: 'PPI', price: 55, commonDosage: '1 capsule OD' },
  
  // Diabetes
  { id: '8', brandName: 'Glycomet', genericName: 'Metformin', strength: '500mg', form: 'Tablet', category: 'Antidiabetic', price: 45, commonDosage: '1 tablet BD after meals' },
  
  // Hypertension
  { id: '9', brandName: 'Amlodipine', genericName: 'Amlodipine', strength: '5mg', form: 'Tablet', category: 'Antihypertensive', price: 25, commonDosage: '1 tablet OD' },
  { id: '10', brandName: 'Telma', genericName: 'Telmisartan', strength: '40mg', form: 'Tablet', category: 'Antihypertensive', price: 95, commonDosage: '1 tablet OD' },
]

export const dosageFrequency = {
  OD: 'Once Daily',
  BD: 'Twice Daily',
  TDS: 'Three Times Daily',
  QID: 'Four Times Daily',
}

export interface DiagnosisTemplate {
  id: string
  name: string
  medicines: string[]
  advice: string[]
}

export const diagnosisTemplates: DiagnosisTemplate[] = [
  {
    id: '1',
    name: 'Viral Fever',
    medicines: ['Dolo 650'],
    advice: ['Rest for 3-4 days', 'Drink plenty of fluids'],
  },
  {
    id: '2',
    name: 'URTI',
    medicines: ['Azithral', 'Combiflam'],
    advice: ['Complete antibiotic course', 'Steam inhalation'],
  },
  {
    id: '3',
    name: 'Gastritis',
    medicines: ['Pan 40'],
    advice: ['Avoid spicy food', 'Eat small frequent meals'],
  },
  {
    id: '4',
    name: 'Diabetes',
    medicines: ['Glycomet'],
    advice: ['Regular exercise', 'Low sugar diet'],
  },
  {
    id: '5',
    name: 'Hypertension',
    medicines: ['Amlodipine'],
    advice: ['Low salt diet', 'Monitor BP daily'],
  },
]
