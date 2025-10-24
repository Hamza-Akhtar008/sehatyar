"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UploadReport() {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(droppedFiles)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(selectedFiles)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
   <div className="bg-white rounded-2xl mt-2 -ml-4 shadow-sm p-6  w-[1064px]">
      <h2 className="text-lg font-semibold text-foreground mb-6">Upload New Report</h2>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`custom-dashed border-2 border-[#D2D2D2] border-dashed rounded-2xl p-12 text-center transition-colors ${
          isDragging ? "border-green-400 bg-green-50" : "border-gray-300 bg-white"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center">
            <Upload className="w-8 h-8 text-green-600" />
          </div>

          <p className="text-gray-600 text-sm">Drag and drop your files here, or click to browse</p>

          <Button onClick={handleClick} className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-2">
            Upload File
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-medium text-foreground mb-3">
            {files.length} file{files.length !== 1 ? "s" : ""} selected:
          </p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="text-sm text-gray-600">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
