"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { FileTextIcon, DownloadIcon } from "lucide-react"
import { format } from "date-fns"
import RichTextEditor from "./rich-text-editor"
import { generatePrescriptionPDF } from "@/src/lib/pdf-generator"
import { useAuth } from "@/src/contexts/AuthContext"
import { patchAppointment } from "@/lib/Api/appointment"

// ---------------- Schema ----------------
const prescriptionSchema = z.object({
  prescriptionContent: z.string().min(1, "Prescription content is required"),
})

type PrescriptionFormValues = z.infer<typeof prescriptionSchema>

interface PrescriptionModalProps {
   patient: any;
  open: boolean
  onOpenChange: (open: boolean) => void
}

// ---------------- Default Template ----------------


// ---------------- Component ----------------
export function PrescriptionModal({patient, open, onOpenChange }: PrescriptionModalProps) {
  const {user}=useAuth();



  

  const defaultPrescriptionTemplate = `
Doctor Name: DR.${user?.fullName}
Email: ${user?.email}


DIAGNOSIS:
1. Primary diagnosis
2. Secondary diagnosis (optional)
3. Tertiary diagnosis (optional)


PRESCRIPTION:
• Medication 1 — 1 tablet twice a day after meals
• Medication 2 — Apply externally to affected area twice daily
• Medication 3 — Take 5ml syrup before bedtime



NOTES:
- Drink plenty of water
- Avoid heavy meals before sleep
- Follow-up after 7 days
`
  const [isGenerating, setIsGenerating] = useState(false)
  const currentDate = new Date()

  const form = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      // Convert line breaks into HTML breaks to preserve spacing
      prescriptionContent: defaultPrescriptionTemplate.trim().replace(/\n/g, "<br>"),
    },
  })

  // Reset default content on open
  useEffect(() => {
    if (open) {
      form.reset({
        prescriptionContent: defaultPrescriptionTemplate.trim().replace(/\n/g, "<br>"),
      })
    }
  }, [open, form])


 function sanitizeQuillHTML(html: string): string {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Recursive function to get lines
  const getLines = (el: HTMLElement | ChildNode): string[] => {
    const lines: string[] = [];

    if (el.nodeType === 3) {
      // Text node
      el.textContent?.split("\n").forEach(line => {
        lines.push(line.replace(/\u200B/g, "").replace(/\u00A0/g, " ").trim());
      });
    } else if (el instanceof HTMLElement) {
      const tag = el.tagName.toLowerCase();
      if (tag === "br") {
        lines.push("");
      } else if (tag === "li") {
        lines.push("• " + (el.textContent || "").trim());
      } else {
        el.childNodes.forEach(child => {
          lines.push(...getLines(child));
        });
      }
    }
    return lines;
  };

  let lines: string[] = [];
  tempDiv.childNodes.forEach(child => {
    lines.push(...getLines(child));
  });

  // Remove completely empty lines
  lines = lines.filter(line => line.trim() !== "");

  return lines.join("\n");
}


const onSubmit = async (data: PrescriptionFormValues) => {
  setIsGenerating(true);

  try {
    const cleanedContent = sanitizeQuillHTML(data.prescriptionContent);
    const appointmentId = localStorage.getItem("appointmentId") || "";

    // 1️⃣ Get Blob from PDF generator
    const pdfBlob = await generatePrescriptionPDF({
      doctorName: user?.fullName,
      email: user?.email,
      patientName: patient.fullName,
      prescriptionContent: cleanedContent,
      date: format(currentDate, "MMMM dd, yyyy"),
    });

    // 2️⃣ Convert Blob → File (IMPORTANT)
   const pdfFile = new File([pdfBlob], `prescription-${Date.now()}.pdf`, { type: "application/pdf" })

const formData = new FormData()
formData.append("prescriptionFile", pdfFile)
const file = new File([pdfBlob], "file.pdf", { type: "application/pdf" });
formData.append("medicalHistoryFiles", file);


for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
 


    // 4️⃣ Send to API
    await patchAppointment(formData, appointmentId);

    form.reset({
      prescriptionContent: defaultPrescriptionTemplate.trim().replace(/\n/g, "<br>"),
    });

    onOpenChange(false);
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    setIsGenerating(false);
  }
};




  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[70vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <FileTextIcon className="size-6" />
                Medical Prescription
              </DialogTitle>
              <p className="text-sm text-muted-foreground pt-2">
                Write  prescription details below. You can adjust diagnosis, medications, and notes.
              </p>
            </DialogHeader>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="prescriptionContent"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        className="min-h-[500px] rounded-lg leading-relaxed font-mono text-[15px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="border-t pt-4 flex-col sm:flex-row gap-4 items-end justify-between">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium">Date: {format(currentDate, "MMMM dd, yyyy")}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isGenerating}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isGenerating}>
                  {isGenerating ? (
                    <>Generating PDF...</>
                  ) : (
                    <>
                      <DownloadIcon className="size-4" />
                      Generate PDF
                    </>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
