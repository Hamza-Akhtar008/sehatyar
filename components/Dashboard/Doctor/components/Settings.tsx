"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function SettingsForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    specialty: "",
    emailNotifications: true,
    smsReminders: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

 type ToggleKeys = "emailNotifications" | "smsReminders";

const handleCheckboxChange = (name: ToggleKeys) => {
  setFormData((prev) => ({
    ...prev,
    [name]: !prev[name],
  }));
};

  const handleSaveChanges = () => {
    console.log("Settings saved:", formData)
  }

  return (
    <div className="w-full bg-background">
      <div className=" mx-auto p-8">
        <h1
            className="mb-8"
            style={{
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 600,
                fontSize: "22px",
                lineHeight: "24px",
                letterSpacing: "0px",
                color: "#52525B",
            }}
            >
            Settings
        </h1>


        {/* Profile Information Section */}
        <div className="mb-8">
          <h2 
            className="font-semibold "
          style={{
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0px",
                color: "#52525B",
            }}
            >
                Profile Information
            </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2  text-[#52525B]">Full Name</label>
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="bg-background rounded-[99px] border-input text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2  text-[#52525B]">Specialty</label>
              <Input
                type="text"
                name="specialty"
                placeholder="Cardiologist"
                value={formData.specialty}
                onChange={handleInputChange}
                className="bg-background rounded-[99px] border-input text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>

        {/* Notification Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-6  text-[#52525B]">Notification</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="emailNotifications"
                checked={formData.emailNotifications}
                onCheckedChange={() => handleCheckboxChange("emailNotifications")}
                className="border-input"
              />
              <label htmlFor="emailNotifications" className="text-sm font-medium  text-[#52525B] cursor-pointer ">
                Email notifications for now appointments
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="smsReminders"
                checked={formData.smsReminders}
                onCheckedChange={() => handleCheckboxChange("smsReminders")}
                className="border-input"
              />
              <label htmlFor="smsReminders" className="text-sm font-medium text-[#52525B] cursor-pointer">
                SMS reminders for upcoming appointment
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSaveChanges}
          className="bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-2 rounded-full"
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}
