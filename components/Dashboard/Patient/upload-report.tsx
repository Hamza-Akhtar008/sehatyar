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
    <div className="bg-white rounded-2xl mt-4 shadow-sm p-4 sm:p-6 md:p-8 w-full max-w-[1100px]">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-6">
        Upload New Report
      </h2>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`custom-dashed border-2 border-dashed rounded-2xl p-10 sm:p-12 text-center transition-colors cursor-pointer ${
          isDragging ? "border-green-400 bg-green-50" : "border-gray-300 bg-white"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center">
            <Upload className="w-8 h-8 text-green-600" />
          </div>

          <p className="text-gray-600 text-sm sm:text-base">
            Drag and drop your files here, or click to browse
          </p>

          <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 sm:px-8 py-2 sm:py-3">
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
          <p className="text-sm sm:text-base font-medium text-gray-800 mb-3">
            {files.length} file{files.length !== 1 ? "s" : ""} selected:
          </p>
          <ul className="space-y-2 text-sm sm:text-base text-gray-600">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
