"use client"
import { useState, useRef, useEffect, useMemo } from "react"
import Image from "next/image"

const PRIMARY = "#5fe089"
const GENDER_BG = "#01503f"
const GENDER_ACTIVE = "#003227"
const BORDER = "#BDBDBD"

const RegisterPage = () => {
  const [step, setStep] = useState(1)
  const [gender, setGender] = useState<"male" | "female">("male")

  const [specializationInput, setSpecializationInput] = useState("")
  const [treatmentInput, setTreatmentInput] = useState("")
  const [conditionInput, setConditionInput] = useState("")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    yearsOfExperience: "",
    primarySpecializations: [] as string[],
    servicesTreatment: [] as string[],
    conditionsTreatment: [] as string[],
    education: "",
  })

  const specializations = [
  "Allergy and Immunology",
  "Anesthesiology",
  "Cardiology",
  "Cardiothoracic Surgery",
  "Cardiovascular Surgery",
  "Clinical Neurophysiology",
  "Clinical Pharmacology",
  "Colon and Rectal Surgery",
  "Community Medicine",
  "Critical Care Medicine",
  "Dental Surgery",
  "Dermatology",
  "Diagnostic Radiology",
  "Emergency Medicine",
  "Endocrinology, Diabetes & Metabolism",
  "Family Medicine",
  "Gastroenterology",
  "General Practice",
  "General Surgery",
  "Genetics and Genomics",
  "Geriatric Medicine",
  "Gynecologic Oncology",
  "Hand Surgery",
  "Head and Neck Surgery",
  "Hematology",
  "Hepatology",
  "Hospital Medicine",
  "Infectious Disease",
  "Internal Medicine",
  "Interventional Cardiology",
  "Interventional Radiology",
  "Legal Medicine",
  "Maternal and Fetal Medicine",
  "Medical Oncology",
  "Medical Toxicology",
  "Neonatal-Perinatal Medicine",
  "Nephrology",
  "Neurocritical Care",
  "Neurodevelopmental Disabilities",
  "Neurology",
  "Neuromuscular Medicine",
  "Neuroradiology",
  "Neurosurgery",
  "Nuclear Medicine",
  "Obstetrics & Gynecology",
  "Occupational Medicine",
  "Oncology",
  "Ophthalmology",
  "Optometry",
  "Oral and Maxillofacial Surgery",
  "Orthopedic Surgery",
  "Otolaryngology (ENT)",
  "Pain Medicine",
  "Palliative Care",
  "Pathology",
  "Pediatric Allergy & Immunology",
  "Pediatric Anesthesiology",
  "Pediatric Cardiology",
  "Pediatric Critical Care Medicine",
  "Pediatric Dermatology",
  "Pediatric Emergency Medicine",
  "Pediatric Endocrinology",
  "Pediatric Gastroenterology",
  "Pediatric Hematology & Oncology",
  "Pediatric Infectious Diseases",
  "Pediatric Nephrology",
  "Pediatric Neurology",
  "Pediatric Neurosurgery",
  "Pediatric Oncology",
  "Pediatric Ophthalmology",
  "Pediatric Orthopedics",
  "Pediatric Otolaryngology",
  "Pediatric Pathology",
  "Pediatric Pulmonology",
  "Pediatric Radiology",
  "Pediatric Rheumatology",
  "Pediatric Surgery",
  "Pediatric Urology",
  "Pediatrics",
  "Physical Medicine & Rehabilitation",
  "Plastic Surgery",
  "Preventive Medicine",
  "Psychiatry",
  "Psychosomatic Medicine",
  "Public Health",
  "Pulmonary Disease",
  "Radiation Oncology",
  "Radiology",
  "Reproductive Endocrinology and Infertility",
  "Rheumatology",
  "Sleep Medicine",
  "Spinal Cord Injury Medicine",
  "Sports Medicine",
  "Surgical Critical Care",
  "Thoracic Surgery",
  "Transplant Surgery",
  "Trauma Surgery",
  "Urology",
  "Vascular Neurology",
  "Vascular Surgery",
  "Adolescent Medicine",
  "Aerospace Medicine",
  "Biochemical Genetics",
  "Chemical Pathology",
  "Clinical Biochemistry",
  "Clinical Cytogenetics",
  "Clinical Immunology",
  "Clinical Microbiology",
  "Clinical Pathology",
  "Clinical Psychology",
  "Community Health",
  "Dental Public Health",
  "Developmental Pediatrics",
  "Endodontics",
  "Epidemiology",
  "Forensic Medicine",
  "Forensic Pathology",
  "Gastrointestinal Surgery",
  "General Internal Medicine",
  "Geriatric Psychiatry",
  "Health Informatics",
  "Hematopathology",
  "Hospice and Palliative Medicine",
  "Immunopathology",
  "Interventional Neuroradiology",
  "Laboratory Medicine",
  "Laparoscopic Surgery",
  "Lifestyle Medicine",
  "Maxillofacial Surgery",
  "Medical Biochemistry",
  "Medical Genetics",
  "Medical Microbiology",
  "Military Medicine",
  "Molecular Pathology",
  "Musculoskeletal Radiology",
  "Neonatology",
  "Neuroendocrinology",
  "Neuroimaging",
  "Neurointerventional Surgery",
  "Neuropathology",
  "Neuropsychiatry",
  "Nuclear Cardiology",
  "Occupational Health",
  "Oncologic Surgery",
  "Oral Medicine",
  "Oral Pathology",
  "Orthodontics",
  "Orthopedic Oncology",
  "Pain Rehabilitation",
  "Pediatric Dentistry",
  "Pediatric Emergency Care",
  "Pediatric Gastrohepatic Surgery",
  "Pediatric Infectious Medicine",
  "Pediatric Intensive Care",
  "Pediatric Neuroradiology",
  "Pediatric Pathology",
  "Pediatric Plastic Surgery",
  "Pediatric Rehabilitation",
  "Pediatric Thoracic Surgery",
  "Perinatal Medicine",
  "Phlebology",
  "Physician Executive",
  "Plastic and Reconstructive Surgery",
  "Primary Care",
  "Proctology",
  "Pulmonology (Respiratory Medicine)",
  "Radiologic Physics",
  "Rehabilitation Psychology",
  "Reproductive Medicine",
  "Rural Medicine",
  "Sleep Disorders Medicine",
  "Spine Surgery",
  "Surgical Oncology",
  "Tropical Medicine",
  "Undersea and Hyperbaric Medicine",
  "Urgent Care Medicine",
  "Urogynecology",
  "Vascular and Interventional Radiology",
  "Virology",
  "Women's Health",
  "Wound Care Medicine"
]
  const treatments = [
    "Cupping Therapy",
    "Acupuncture",
    "Massage Therapy",
    "Herbal Treatment",
    "Physical Therapy",
    "Homeopathy",
  ]
  const conditions = [
    "Cupping Therapy",
    "Acupuncture",
    "Massage Therapy",
    "Herbal Treatment",
    "Physiotherapy",
    "Chiropractic",
  ]

  const addItem = (field: "primarySpecializations" | "servicesTreatment" | "conditionsTreatment", value: string) => {
    if (value.trim() && !formData[field].includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value],
      }))
      // Clear input and close dropdown
      if (field === "primarySpecializations") setSpecializationInput("")
      if (field === "servicesTreatment") setTreatmentInput("")
      if (field === "conditionsTreatment") setConditionInput("")
      setOpenDropdown(null)
    }
  }

  const removeItem = (field: "primarySpecializations" | "servicesTreatment" | "conditionsTreatment", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }))
  }

  const getFilteredOptions = (input: string, allOptions: string[], selectedItems: string[]) => {
    return allOptions.filter(
      (option) => option.toLowerCase().includes(input.toLowerCase()) && !selectedItems.includes(option),
    )
  }

  const AutocompleteField = ({
    label,
    placeholder,
    inputValue,
    setInputValue,
    selectedItems,
    allOptions,
    fieldName,
    dropdownOpen,
    setDropdownOpen,
  }: {
    label: string
    placeholder: string
    inputValue: string
    setInputValue: (value: string) => void
    selectedItems: string[]
    allOptions: string[]
    fieldName: "primarySpecializations" | "servicesTreatment" | "conditionsTreatment"
    dropdownOpen: boolean
    setDropdownOpen: (open: boolean) => void
  }) => {
    // Normalized matching and keyboard navigation with debounce and focus retention
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)

    // debounce the input to improve performance on large lists
    const normalizedInput = inputValue.trim()
    const [debouncedInput, setDebouncedInput] = useState(normalizedInput)
    useEffect(() => {
      const t = setTimeout(() => setDebouncedInput(normalizedInput.toLowerCase()), 150)
      return () => clearTimeout(t)
    }, [normalizedInput])

    // dedupe options to avoid duplicate keys
    const uniqueOptions = useMemo(() => Array.from(new Set(allOptions)), [allOptions])
    const loweredUniqueOptions = useMemo(() => uniqueOptions.map((o) => o.toLowerCase()), [uniqueOptions])

    const filteredOptions = useMemo(() => {
      if (!debouncedInput) return uniqueOptions.filter((o) => !selectedItems.includes(o)).slice(0, 8)
      return uniqueOptions.filter((option, i) => !selectedItems.includes(option) && loweredUniqueOptions[i].includes(debouncedInput))
    }, [debouncedInput, uniqueOptions, loweredUniqueOptions, selectedItems])

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1))
        setDropdownOpen(true)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlightedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          addItem(fieldName, filteredOptions[highlightedIndex])
          // re-focus the input after selecting
          setTimeout(() => inputRef.current?.focus(), 0)
        } else {
          const value = inputValue.trim()
          if (value) {
            addItem(fieldName, value)
            setTimeout(() => inputRef.current?.focus(), 0)
          }
        }
      } else if (e.key === "Escape") {
        setDropdownOpen(false)
      }
    }

    return (
      <div>
        <label className="block text-[12px] font-medium text-[#343434] mb-3">{label}</label>
        <div className="relative">
          <div
            className="border rounded-[12px] p-4 min-h-[120px] flex flex-wrap gap-3 items-start content-start"
            style={{ borderColor: BORDER }}
          >
            {selectedItems.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between gap-2 px-4 py-2 rounded-full bg-[#f0f0f0] text-[#343434] text-sm"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeItem(fieldName, item)}
                  className="flex items-center justify-center w-5 h-5 rounded-full bg-[#343434] text-white hover:bg-[#1a1a1a] transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Input field inside container */}
            <input
              type="text"
              placeholder={selectedItems.length === 0 ? placeholder : "Add more..."}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                setDropdownOpen(true)
                setHighlightedIndex(-1)
              }}
              ref={inputRef}
              onFocus={() => {
                setDropdownOpen(true)
                setHighlightedIndex(-1)
              }}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
              onKeyDown={onKeyDown}
              className="flex-1 min-w-[150px] outline-none bg-transparent text-sm text-[#343434]"
              style={{ minHeight: selectedItems.length === 0 ? "60px" : "auto" }}
            />
          </div>

          {/* Dropdown suggestions */}
          {dropdownOpen && filteredOptions.length > 0 && (
            <div
              className="absolute top-full left-0 right-0 mt-1 border rounded-[12px] bg-white shadow-lg z-10 max-h-52 overflow-auto"
              style={{ borderColor: BORDER }}
            >
              {filteredOptions.map((option, idx) => (
                <button
                  key={option}
                  type="button"
                  onMouseDown={() => {
                    addItem(fieldName, option)
                    // keep typing: focus input after selection
                    setTimeout(() => inputRef.current?.focus(), 0)
                  }}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`w-full text-left px-4 py-3 transition-colors text-sm text-[#343434] border-b last:border-b-0 ${
                    idx === highlightedIndex ? "bg-[#f0f0f0]" : "hover:bg-[#f9f9f9]"
                  }`}
                  style={{ borderColor: BORDER }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Add custom item button */}
          {inputValue && !allOptions.map((o) => o.toLowerCase()).includes(inputValue.trim().toLowerCase()) && (
            <button
              type="button"
              onMouseDown={() => {
                addItem(fieldName, inputValue)
                setTimeout(() => inputRef.current?.focus(), 0)
              }}
              className="absolute right-4 top-4 px-3 py-1 rounded-full text-xs font-medium text-white transition-colors"
              style={{ background: PRIMARY }}
            >
              Add
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white">
      <div className="w-full max-w-[672px] px-4 md:px-0 pt-14 pb-10">
        {/* Header */}
        <div className="mx-auto flex flex-col items-center gap-[30px] w-full max-w-[560px]">
          <Image src="/images/logo2.webp" alt="Sehatyar" width={159} height={42} className="object-contain" priority />
          <h1 className="text-[28px] font-semibold leading-none tracking-tight text-[#343434]">
            Registration <span style={{ color: PRIMARY }}>Form</span>
          </h1>
        </div>

        {step === 1 && (
          <>
            {/* Full Name */}
            <div className="mt-6">
              <label className="block text-[12px] font-medium text-[#343434] mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Full name"
                className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
                style={{ borderColor: BORDER }}
              />
            </div>

            {/* Gender */}
            <div className="mt-4">
              <div className="inline-flex items-center p-1 rounded-full" style={{ background: GENDER_BG }}>
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`px-5 h-[35px] rounded-full text-white font-semibold transition-colors ${
                    gender === "male" ? "bg-[#003227]" : ""
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`px-5 h-[35px] rounded-full text-white font-semibold transition-colors ${
                    gender === "female" ? "bg-[#003227]" : ""
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Country / City */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-[#343434] mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Pakistan"
                  className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
                  style={{ borderColor: BORDER }}
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#343434] mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Abbottabad"
                  className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
                  style={{ borderColor: BORDER }}
                />
              </div>

              {/* Email / Phone */}
              <div>
                <label className="block text-[12px] font-medium text-[#343434] mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="lendar@gmail.com"
                  className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
                  style={{ borderColor: BORDER }}
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#343434] mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="03100057572"
                  className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
                  style={{ borderColor: BORDER }}
                />
              </div>

              {/* Password / Confirm Password */}
              <div>
                <label className="block text-[12px] font-medium text-[#343434] mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter the password"
                  className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
                  style={{ borderColor: BORDER }}
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#343434] mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
                  style={{ borderColor: BORDER }}
                />
              </div>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full mt-6 h-[48px] md:h-[54px] rounded-full text-[#0b3b22] font-semibold"
              style={{ background: PRIMARY }}
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            {/* Upload Icon */}
            <div className="mt-8 flex justify-center">
              <div
                className="w-[100px] h-[100px] rounded-full border-2 border-dashed flex items-center justify-center"
                style={{ borderColor: BORDER }}
              >
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6"
                  />
                </svg>
              </div>
            </div>

            {/* Title / Years of Experience */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-[#343434] mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Dr."
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
                  style={{ borderColor: BORDER }}
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#343434] mb-2">Year of Experience</label>
                <input
                  type="number"
                  placeholder="15"
                  value={formData.yearsOfExperience}
                  onChange={(e) => setFormData((prev) => ({ ...prev, yearsOfExperience: e.target.value }))}
                  className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
                  style={{ borderColor: BORDER }}
                />
              </div>
            </div>

            {/* Specialization and Treatment Sections */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Specialization */}
              <AutocompleteField
                label="Primary Specialization"
                placeholder="Search or type specialization..."
                inputValue={specializationInput}
                setInputValue={setSpecializationInput}
                selectedItems={formData.primarySpecializations}
                allOptions={specializations}
                fieldName="primarySpecializations"
                dropdownOpen={openDropdown === "specialization"}
                setDropdownOpen={(open) => setOpenDropdown(open ? "specialization" : null)}
              />

              {/* Services Treatment Offer */}
              <AutocompleteField
                label="Services Treatment Offer"
                placeholder="Search or type treatment..."
                inputValue={treatmentInput}
                setInputValue={setTreatmentInput}
                selectedItems={formData.servicesTreatment}
                allOptions={treatments}
                fieldName="servicesTreatment"
                dropdownOpen={openDropdown === "treatment"}
                setDropdownOpen={(open) => setOpenDropdown(open ? "treatment" : null)}
              />
            </div>

            {/* Conditions and Education Sections */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Conditions Treatment */}
              <AutocompleteField
                label="Conditions Treatment"
                placeholder="Search or type condition..."
                inputValue={conditionInput}
                setInputValue={setConditionInput}
                selectedItems={formData.conditionsTreatment}
                allOptions={conditions}
                fieldName="conditionsTreatment"
                dropdownOpen={openDropdown === "condition"}
                setDropdownOpen={(open) => setOpenDropdown(open ? "condition" : null)}
              />

              {/* Education */}
              <div>
                <label className="block text-[12px] font-medium text-[#343434] mb-3">Education</label>
                <div
                  className="border rounded-[12px] p-4 min-h-[120px] flex items-center"
                  style={{ borderColor: BORDER }}
                >
                  <input
                    type="text"
                    placeholder="B.E.M.S. Ayub Medical College, Pakistan, 12"
                    value={formData.education}
                    onChange={(e) => setFormData((prev) => ({ ...prev, education: e.target.value }))}
                    className="w-full outline-none bg-transparent text-sm text-[#343434]"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 h-[48px] md:h-[54px] rounded-full text-[#0b3b22] font-semibold border"
                style={{ borderColor: PRIMARY, color: PRIMARY }}
              >
                Back
              </button>
              <button
                type="button"
                className="flex-1 h-[48px] md:h-[54px] rounded-full text-[#0b3b22] font-semibold"
                style={{ background: PRIMARY }}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RegisterPage
