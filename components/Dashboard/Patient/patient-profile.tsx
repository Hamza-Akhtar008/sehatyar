"use client"

import type React from "react"

import { getPatientProfile } from "@/lib/Api/Patient/patient_api"
import { useAuth } from "@/src/contexts/AuthContext"
import { useState, useEffect, type KeyboardEvent } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  HiUser,
  HiCake,
  HiHeart,
  HiOutlineUserGroup,
  HiPhone,
  HiClipboardList,
  HiPaperClip,
  HiPlus,
  HiX,
} from "react-icons/hi"

interface PatientProfileData {
  id: number
  profilePic?: string | null
  dateOfBirth?: string | null
  age?: string | null
  bloodGroup?: string | null
  height?: string | null
  weight?: string | null
  allergies?: string[]
  emergencyContact?: string | null
  previousReportsFiles?: string[]
  userId: number
}

export function PatientProfile() {
  const [profile, setProfile] = useState<PatientProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const { user } = useAuth()
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [allergyInput, setAllergyInput] = useState("")

  useEffect(() => {
    setLoading(true)
    getPatientProfile(user?.id || "0", user?.token)
      .then((data: PatientProfileData) => setProfile(data))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!profile) return
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setNewFiles([...newFiles, ...Array.from(e.target.files)])
  }

  const addAllergy = (value: string) => {
    if (!value.trim() || !profile) return
    const allergyList = profile.allergies ? [...profile.allergies] : []
    allergyList.push(value.trim())
    setProfile({ ...profile, allergies: allergyList })
  }

  const handleAllergyKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      if (allergyInput.trim()) {
        addAllergy(allergyInput)
        setAllergyInput("")
      }
    }
  }

  const removeAllergy = (index: number) => {
    if (!profile?.allergies) return
    const updated = profile.allergies.filter((_, i) => i !== index)
    setProfile({ ...profile, allergies: updated })
  }

  const handleUpdate = async () => {
    if (!profile) return
    setUpdating(true)
    try {
      // TODO: API call to update profile & upload newFiles
      toast.success("Profile updated successfully")
      setNewFiles([])
    } catch (err) {
      toast.error("Failed to update profile")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!profile) return <p className="text-center text-muted-foreground py-8">No profile found</p>

  const inputClass =
    "w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
  const fieldWrapper =
    "flex items-center gap-3 bg-card p-4 rounded-xl border border-border transition-all hover:shadow-sm"

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Patient Profile</h2>
        <p className="text-muted-foreground">Manage and update your health information</p>
      </div>

      <div className="flex flex-col items-center mb-12">
        <div className="relative mb-4">
          <img
            src={profile.profilePic || "/images/recentdoctor.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
          />
          <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full shadow-md hover:bg-primary/90 transition-colors">
            <HiPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Health Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <HiHeart className="text-primary w-5 h-5" />
            Health Information
          </h3>
          <div className="space-y-3">
            {/* Date of Birth */}
            <div className={fieldWrapper}>
              <HiCake className="text-primary w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                name="dateOfBirth"
                placeholder="Date of Birth (YYYY-MM-DD)"
                value={profile.dateOfBirth?.split("T")[0] || ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Age and Blood Group Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className={fieldWrapper}>
                <HiUser className="text-primary w-5 h-5 flex-shrink-0" />
                <input
                  type="text"
                  name="age"
                  placeholder="Age"
                  value={profile.age || ""}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={fieldWrapper}>
                <HiHeart className="text-primary w-5 h-5 flex-shrink-0" />
                <input
                  type="text"
                  name="bloodGroup"
                  placeholder="Blood Group"
                  value={profile.bloodGroup || ""}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Height and Weight Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className={fieldWrapper}>
                <HiUser className="text-primary w-5 h-5 flex-shrink-0" />
                <input
                  type="text"
                  name="height"
                  placeholder="Height (cm)"
                  value={profile.height || ""}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className={fieldWrapper}>
                <HiOutlineUserGroup className="text-primary w-5 h-5 flex-shrink-0" />
                <input
                  type="text"
                  name="weight"
                  placeholder="Weight (kg)"
                  value={profile.weight || ""}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Allergies Section */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <HiClipboardList className="text-primary w-5 h-5" />
            Allergies
          </h3>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {profile.allergies?.map((allergy, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {allergy}
                  <button
                    type="button"
                    onClick={() => removeAllergy(idx)}
                    className="hover:text-primary/70 transition-colors"
                    aria-label={`Remove ${allergy}`}
                  >
                    <HiX className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type allergy and press Enter or comma"
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
              onKeyDown={handleAllergyKeyDown}
              className={inputClass}
            />
          </div>
        </div>

        {/* Contact Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <HiPhone className="text-primary w-5 h-5" />
            Contact Information
          </h3>
          <div className={fieldWrapper}>
            <HiPhone className="text-primary w-5 h-5 flex-shrink-0" />
            <input
              type="text"
              name="emergencyContact"
              placeholder="Emergency Contact Phone Number"
              value={profile.emergencyContact || ""}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Previous Reports Section */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <HiClipboardList className="text-primary w-5 h-5" />
            Medical Documents
          </h3>

          {/* Existing Files */}
          {profile.previousReportsFiles && profile.previousReportsFiles.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Your files</p>
              <ul className="space-y-2">
                {profile.previousReportsFiles.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:bg-background transition-colors"
                  >
                    <HiPaperClip className="text-primary w-5 h-5 flex-shrink-0" />
                    <a
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate text-sm font-medium"
                    >
                      {file.split("/").pop()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* File Upload */}
          <div className="mb-4">
            <label className="block">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full border-2 border-dashed border-border rounded-lg px-4 py-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
              />
              <p className="text-sm text-muted-foreground mt-2">Click or drag files to upload</p>
            </label>
          </div>

          {/* New Files Preview */}
          {newFiles.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Files to upload</p>
              <ul className="space-y-2">
                {newFiles.map((file, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20"
                  >
                    <HiPaperClip className="text-primary w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground truncate">{file.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleUpdate}
        disabled={updating}
        className="w-full mt-10 bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-base shadow-md hover:shadow-lg"
      >
        {updating ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            Updating Profile...
          </span>
        ) : (
          "Update Profile"
        )}
      </button>
    </main>
  )
}
