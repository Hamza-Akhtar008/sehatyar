import jsPDF from "jspdf"

interface PrescriptionData {
  prescriptionContent: string
  date: string
  doctorName?: string
  email?: string
  hospitalName?: string
  patientName?: string
  age?: string
  address?: string
}

export async function generatePrescriptionPDF(data: PrescriptionData) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 12
  const contentWidth = pageWidth - 2 * margin
  let yPosition = margin

const primaryColor: [number, number, number] = [44, 138, 148]
const accentColor: [number, number, number] = [52, 211, 153]
const textColor: [number, number, number] = [33, 33, 33]

  // ---------------- Header ----------------
  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, pageWidth, 45, "F")

  // Top decorative bar
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, pageWidth, 8, "F")

  // Polygon helper
  function drawPolygon(points: [number, number][], fillColor?: [number, number, number]) {
    if (fillColor) doc.setFillColor(...fillColor)
    doc.setLineWidth(0)
    doc.lines(
      points.map(([x, y], i) => (i === 0 ? [0, 0] : [x - points[0][0], y - points[0][1]])),
      points[0][0],
      points[0][1],
      [1, 1],
      "F"
    )
  }

  // Left and right header diagonals
  const diagonalHeight = 15
  const leftPoints: [number, number][] = [
    [margin + 25, 8],
    [margin + 65, 8 + diagonalHeight],
    [margin + 55, 8 + diagonalHeight],
    [margin + 15, 8],
  ]
  const rightPoints: [number, number][] = [
    [pageWidth - margin - 65, 8],
    [pageWidth - margin - 25, 8 + diagonalHeight],
    [pageWidth - margin - 15, 8 + diagonalHeight],
    [pageWidth - margin - 55, 8],
  ]
  drawPolygon(leftPoints, primaryColor)
  drawPolygon(rightPoints, primaryColor)

  // ---------------- Doctor Info (Static) ----------------
  doc.setFontSize(13)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(...primaryColor)
  doc.text(data.doctorName || "Dr. Doctor Name", margin, 20)
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(120, 120, 120)
  doc.text(data.email || "QUALIFICATION", margin, 24)

  // ---------------- Title ----------------
  doc.setFontSize(22)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(...primaryColor)
  doc.text("MEDICAL", margin, 35)
  doc.setTextColor(...textColor)
  doc.text("PRESCRIPTION", margin + 38, 35)

  // ---------------- Patient Info Table ----------------
  yPosition = 50
  doc.setFontSize(9)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(...textColor)
  doc.setDrawColor(...primaryColor)
  doc.setLineWidth(0.5)

  const tableY = yPosition
  const colWidth = contentWidth / 4
  const tableHeaders = ["Date", "Patient Name", "Age", "Address"]
  const tableValues = [data.date, data.patientName || "", data.age || "", data.address || ""]

  tableHeaders.forEach((header, idx) => {
    doc.text(header, margin + idx * colWidth + 2, tableY + 5)
    doc.line(margin + idx * colWidth, tableY + 7, margin + (idx + 1) * colWidth, tableY + 7)
  })

  doc.setFont("helvetica", "normal")
  tableValues.forEach((value, idx) => {
    doc.text(value, margin + idx * colWidth + 2, tableY + 13)
  })
  doc.line(margin, tableY + 15, pageWidth - margin, tableY + 15)
  yPosition = tableY + 22

  // ---------------- Prescription Content ----------------
  function sanitizeText(text: string): string {
    return text
      .replace(/[%]{2,}/g, "")
      .replace(/[%]/g, "")
      .replace(/\u200B/g, "")
      .replace(/\u00A0/g, " ")
      .replace(/\u200C/g, "")
      .replace(/\u200D/g, "")
      .replace(/[\r\n]{2,}/g, "\n")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/[\u2028\u2029]/g, "\n")
      .trim()
  }

  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = data.prescriptionContent

  function getTextLines(el: HTMLElement | ChildNode): string[] {
    const lines: string[] = []
    if (el.nodeType === 3) {
      const textContent = el.textContent?.split("\n") || []
      textContent.forEach((line) => {
        const sanitized = sanitizeText(line)
        if (sanitized) lines.push(sanitized)
      })
    } else if (el instanceof HTMLElement) {
      const tag = el.tagName.toLowerCase()
      if (tag === "br") lines.push("")
      else if (tag === "li") {
        const text = sanitizeText((el.textContent || "").trim())
        if (text) lines.push("• " + text)
      } else if (tag === "p") {
        const text = sanitizeText((el.textContent || "").trim())
        if (text) lines.push(text)
      } else {
        el.childNodes.forEach((child) => {
          lines.push(...getTextLines(child))
        })
      }
    }
    return lines
  }

  let lines: string[] = []
  tempDiv.childNodes.forEach((child) => {
    lines.push(...getTextLines(child))
  })
  lines = lines.filter((line) => line.trim())

  // Remove any lines that are the Doctor info (already shown statically)
  const doctorInfo = [
    data.doctorName?.trim() || "",
    data.email?.trim() || "",
    "Doctor", // optional keyword to exclude
    "Email",
    "@"
  ].filter(Boolean)
  lines = lines.filter(line => !doctorInfo.some(info => line.includes(info)))

  const sectionTitles = ["DIAGNOSIS", "PRESCRIPTION", "NOTES", "PATIENT", "INSTRUCTIONS"]

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.setTextColor(...textColor)

  for (const line of lines) {
    if (!line.trim()) {
      yPosition += 3
      continue
    }

    const isSectionHeader = sectionTitles.some((title) =>
      line.toUpperCase().includes(title.toUpperCase())
    )
    if (isSectionHeader) {
      yPosition += 2
      doc.setFont("helvetica", "bold")
      doc.setFontSize(11)
      doc.setTextColor(...primaryColor)
      doc.text(line.toUpperCase(), margin, yPosition)
      yPosition += 7
      doc.setDrawColor(...accentColor)

      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.setTextColor(...textColor)
      yPosition += 2
    } else {
      const wrapped = doc.splitTextToSize(line, contentWidth)
      doc.text(wrapped, margin, yPosition)
      yPosition += wrapped.length * 5 + 1
    }

    if (yPosition > pageHeight - 40) {
      doc.addPage()
      yPosition = margin
    }
  }

  // ---------------- Footer ----------------
  const footerStartY = pageHeight - 22
  doc.setFillColor(...primaryColor)
  doc.rect(0, pageHeight - 18, pageWidth, 18, "F")

 const footerDiagonal: [number, number][] = [
  [margin + 20, pageHeight - 18],
  [margin + 40, pageHeight],
  [margin + 25, pageHeight],
  [margin, pageHeight - 18],
]

const footerDiagonal2: [number, number][] = [
  [pageWidth - margin - 40, pageHeight - 18],
  [pageWidth - margin - 20, pageHeight],
  [pageWidth - margin, pageHeight],
  [pageWidth - margin - 25, pageHeight - 18],
]
  drawPolygon(footerDiagonal, [255, 255, 255])
  drawPolygon(footerDiagonal2, [255, 255, 255])

  // Footer icons / placeholders
  doc.setFontSize(8)
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "normal")
  doc.text("", margin + 8, pageHeight - 12)
  doc.text("", pageWidth / 2 - 2, pageHeight - 12)
  doc.text("", pageWidth - margin - 8, pageHeight - 12)

  // Page number
  doc.text(`${doc.internal.pages.length - 1}`, pageWidth / 2, pageHeight - 8, { align: "center" })

  doc.save(`prescription-${Date.now()}.pdf`)
  const pdfBlob = doc.output("blob")
  return pdfBlob
}
