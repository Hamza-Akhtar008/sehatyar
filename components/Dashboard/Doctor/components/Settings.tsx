"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import UpdatePassword from "./updatePassword"
import { toast } from "react-toastify"

interface Education {
  institute?: string
  degreeName?: string
  fieldOfStudy?: string
}

interface DoctorProfile {
  yearsOfExperience?: string
  FeesPerConsultation?: string | null
  Description?: string | null
  primarySpecialization?: string[]
  servicesTreatementOffered?: string[]
  conditionTreatments?: string[]
  education?: Education[]
}

const BORDER_COLOR = "#6fe495"
const PRIMARY_COLOR = "#6fe495"
const BG_COLOR = "#f8fffb"
const CARD_BG = "#ffffff"

export default function SettingsForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    yearsOfExperience: "",
    FeesPerConsultation: "",
    Description: "",
    primarySpecialization: "",
    profilePic: "",
    emailNotifications: true,
    smsReminders: true,
  })
  const [education, setEducation] = useState<Education[]>([])
  const [servicesTreatementOffered, setServicesTreatementOffered] = useState<string[]>([])
  const [conditionTreatments, setConditionTreatments] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [doctorId, setDoctorId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (!stored) return
    
    try {
      const parsed = JSON.parse(stored)
      const docId = parsed.doctorId
      const uId = parsed.id
      setUserId(uId?.toString())
      setDoctorId(docId?.toString())
      
      if (docId) {
        fetchProfile(docId)
      }
    } catch (err) {
      console.error("Error parsing user data:", err)
    }
  }, [])

  const fetchProfile = async (docId: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}doctor-profile/${docId}`, { 
        cache: "no-store" 
      })
      if (!res.ok) throw new Error("Failed to load profile")
      
      const data = await res.json()
      
      setFormData({
        fullName: data.user?.fullName || "",
        yearsOfExperience: data.yearsOfExperience || "",
        FeesPerConsultation: data.FeesPerConsultation || "",
        Description: data.Description || "",
        primarySpecialization: Array.isArray(data.primarySpecialization) 
          ? data.primarySpecialization.join(", ") 
          : "",
        profilePic: data.profilePic || "",
        emailNotifications: true,
        smsReminders: true,
      })
      
      setServicesTreatementOffered(data.servicesTreatementOffered || [])
      setConditionTreatments(data.conditionTreatments || [])
      setEducation(data.education || [])
    } catch (e: any) {
      setError(e.message || "Error loading profile")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    setEducation((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const addEducation = () => {
    setEducation((prev) => [...prev, { institute: "", degreeName: "", fieldOfStudy: "" }])
  }

  const removeEducation = (index: number) => {
    setEducation((prev) => prev.filter((_, i) => i !== index))
  }

  const addService = () => {
    setServicesTreatementOffered((prev) => [...prev, ""])
  }

  const removeService = (index: number) => {
    setServicesTreatementOffered((prev) => prev.filter((_, i) => i !== index))
  }

  const handleServiceChange = (index: number, value: string) => {
    setServicesTreatementOffered((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const addCondition = () => {
    setConditionTreatments((prev) => [...prev, ""])
  }

  const removeCondition = (index: number) => {
    setConditionTreatments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleConditionChange = (index: number, value: string) => {
    setConditionTreatments((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  type ToggleKeys = "emailNotifications" | "smsReminders"
  const handleCheckboxChange = (name: ToggleKeys) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  const handleEdit = () => setEditMode(true)
  const handleCancelEdit = () => {
    setEditMode(false)
    if (doctorId) {
      fetchProfile(doctorId)
    }
  }

  const handleSaveChanges = async () => {
    if (!userId || !doctorId) return
    setSaving(true)
    setError(null)
    
    try {
      // Update user profile (fullName)
      const userPayload = {
        fullName: formData.fullName,
      }
      
      const userRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      })
      
      if (!userRes.ok) throw new Error("Failed to update user profile")
      
      // Update doctor profile
      const doctorPayload = {
        yearsOfExperience: formData.yearsOfExperience,
        FeesPerConsultation: formData.FeesPerConsultation || null,
        Description: formData.Description || null,
        profilePic: formData.profilePic || "",
        primarySpecialization: formData.primarySpecialization
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        servicesTreatementOffered: servicesTreatementOffered.filter(Boolean),
        conditionTreatments: conditionTreatments.filter(Boolean),
        education: education.filter(
          (e) => e.institute || e.degreeName || e.fieldOfStudy
        ),
      }
      
      const doctorRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}doctor-profile/${doctorId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorPayload),
      })
      
      if (!doctorRes.ok) throw new Error("Failed to update doctor profile")
      
      setEditMode(false)
      toast.success(" Profile updated successfully!")
    } catch (err: any) {
      setError(err.message || "Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-green-50 to-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-green-600 font-medium">Loading profile...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor Profile Settings</h1>
          <p className="text-gray-600">Manage your professional information and preferences</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm shadow-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100">
          {/* Profile Picture Section */}
          <div className="p-8 border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group">
                <div
                  className="w-32 h-32 rounded-2xl bg-white shadow-lg overflow-hidden flex items-center justify-center border-4 border-white ring-4 ring-green-200 transition-all duration-300 group-hover:ring-green-300"
                  onClick={() => {
                    if (editMode) {
                      const input = document.createElement("input")
                      input.type = "file"
                      input.accept = "image/*"
                      input.onchange = (e: any) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setFormData((prev) => ({
                              ...prev,
                              profilePic: reader.result as string,
                            }))
                          }
                          reader.readAsDataURL(file)
                        }
                      }
                      input.click()
                    }
                  }}
                >
                  {formData.profilePic ? (
                    <img
                      src={formData.profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-green-400">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {editMode && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-medium">Change Photo</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{formData.fullName || "Doctor Name"}</h2>
                <p className="text-green-600 font-medium mb-3">Medical Professional</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {formData.yearsOfExperience || "0"} years experience
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    ${formData.FeesPerConsultation || "0"} per consultation
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Profile Information Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
                  <p className="text-gray-600 text-sm mt-1">Update your personal and professional details</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Dr. John Smith"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="bg-white rounded-xl border-gray-300 text-gray-800 placeholder:text-gray-400 h-12 transition-all focus:ring-2 focus:ring-green-200 focus:border-green-500"
                    disabled={!editMode}
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Years of Experience</label>
                  <Input
                    type="text"
                    name="yearsOfExperience"
                    placeholder="10+ years"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    className="bg-white rounded-xl border-gray-300 text-gray-800 placeholder:text-gray-400 h-12 transition-all focus:ring-2 focus:ring-green-200 focus:border-green-500"
                    disabled={!editMode}
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Fees Per Consultation</label>
                  <Input
                    type="text"
                    name="FeesPerConsultation"
                    placeholder="$150"
                    value={formData.FeesPerConsultation}
                    onChange={handleInputChange}
                    className="bg-white rounded-xl border-gray-300 text-gray-800 placeholder:text-gray-400 h-12 transition-all focus:ring-2 focus:ring-green-200 focus:border-green-500"
                    disabled={!editMode}
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Primary Specialization</label>
                  <Input
                    type="text"
                    name="primarySpecialization"
                    placeholder="Cardiology, Internal Medicine"
                    value={formData.primarySpecialization}
                    onChange={handleInputChange}
                    className="bg-white rounded-xl border-gray-300 text-gray-800 placeholder:text-gray-400 h-12 transition-all focus:ring-2 focus:ring-green-200 focus:border-green-500"
                    disabled={!editMode}
                  />
                  <span className="text-xs text-gray-500">Separate multiple specializations with commas</span>
                </div>
                
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Professional Description</label>
                  <textarea
                    name="Description"
                    placeholder="Describe your medical expertise, approach to patient care, and any notable achievements..."
                    value={formData.Description}
                    onChange={handleInputChange}
                    className="w-full bg-white rounded-xl border border-gray-300 text-gray-800 placeholder:text-gray-400 p-4 min-h-[120px] resize-none transition-all focus:ring-2 focus:ring-green-200 focus:border-green-500"
                    disabled={!editMode}
                  />
                </div>
              </div>
            </div>

            {/* Services Offered Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Services Offered</h2>
                  <p className="text-gray-600 text-sm mt-1">List the medical services and treatments you provide</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-4">
                {servicesTreatementOffered.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder="e.g., Cardiology Consultation, Health Screening"
                        value={service}
                        onChange={(e) => handleServiceChange(index, e.target.value)}
                        className="bg-white rounded-xl border-gray-300 text-gray-800 placeholder:text-gray-400 h-12 transition-all focus:ring-2 focus:ring-green-200 focus:border-green-500 pr-12"
                        disabled={!editMode}
                      />
                      {editMode && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            type="button"
                            onClick={() => removeService(index)}
                            className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm p-0"
                          >
                            ×
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {servicesTreatementOffered.length === 0 && (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <p>No services added yet</p>
                  </div>
                )}
                
                {editMode && (
                  <Button
                    type="button"
                    onClick={addService}
                    className="w-full py-3 border-2 border-dashed border-green-300 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 rounded-xl font-medium transition-all"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Service
                  </Button>
                )}
              </div>
            </div>

            {/* Condition Treatments Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Condition Treatments</h2>
                  <p className="text-gray-600 text-sm mt-1">Specify the medical conditions you treat</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-4">
                {conditionTreatments.map((condition, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder="e.g., Hypertension, Diabetes Management"
                        value={condition}
                        onChange={(e) => handleConditionChange(index, e.target.value)}
                        className="bg-white rounded-xl border-gray-300 text-gray-800 placeholder:text-gray-400 h-12 transition-all focus:ring-2 focus:ring-green-200 focus:border-green-500 pr-12"
                        disabled={!editMode}
                      />
                      {editMode && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            type="button"
                            onClick={() => removeCondition(index)}
                            className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm p-0"
                          >
                            ×
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {conditionTreatments.length === 0 && (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <p>No conditions added yet</p>
                  </div>
                )}
                
                {editMode && (
                  <Button
                    type="button"
                    onClick={addCondition}
                    className="w-full py-3 border-2 border-dashed border-green-300 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 rounded-xl font-medium transition-all"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Condition
                  </Button>
                )}
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Education & Qualifications</h2>
                  <p className="text-gray-600 text-sm mt-1">Your academic background and certifications</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Degree Name</label>
                        <Input
                          type="text"
                          placeholder="M.D., MBBS, Ph.D"
                          value={edu.degreeName || ""}
                          onChange={(e) => handleEducationChange(index, "degreeName", e.target.value)}
                          className="bg-white rounded-lg text-gray-800 border-gray-300 h-10 transition-all focus:ring-2 focus:ring-green-200 focus:border-green-500"
                          disabled={!editMode}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Field of Study</label>
                        <Input
                          type="text"
                          placeholder="Medicine, Cardiology"
                          value={edu.fieldOfStudy || ""}
                          onChange={(e) => handleEducationChange(index, "fieldOfStudy", e.target.value)}
                          className="bg-white rounded-lg text-gray-800 border-gray-300 h-10 transition-all focus:ring-2 focus:ring-green-200 focus:border-green-500"
                          disabled={!editMode}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Institute</label>
                        <Input
                          type="text"
                          placeholder="Harvard Medical School"
                          value={edu.institute || ""}
                          onChange={(e) => handleEducationChange(index, "institute", e.target.value)}
                          className="bg-white rounded-lg text-gray-800 border-gray-300 h-10 transition-all focus:ring-2 focus:ring-green-200 focus:border-green-500"
                          disabled={!editMode}
                        />
                      </div>
                    </div>
                    {editMode && (
                      <div className="flex justify-end mt-4">
                        <Button
                          type="button"
                          onClick={() => removeEducation(index)}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Remove Education
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                
                {education.length === 0 && (
                  <div className="text-center py-12 text-gray-500 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border-2 border-dashed border-green-200">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    <p className="text-lg font-medium mb-2">No education records added</p>
                    <p className="text-sm">Add your medical degrees and qualifications</p>
                  </div>
                )}
                
                {editMode && (
                  <Button
                    type="button"
                    onClick={addEducation}
                    className="w-full py-4 border-2 border-dashed border-green-300 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 rounded-xl font-medium transition-all"
                  >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Education Record
                  </Button>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-8">
              {!editMode ? (
                <div className="text-center">
                  <Button
                    onClick={handleEdit}
                    className="px-12 py-4 bg-[#75e59a] hover:bg-green-600 hover:scale-105 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={handleSaveChanges}
                    className="px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    className="px-12 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl border border-gray-300 transition-all duration-300 text-lg"
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            <UpdatePassword />
          </div>
        </div>
      </div>
    </div>
  )
}