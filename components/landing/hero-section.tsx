"use client";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "../ui/dialog";
import ConsultOnline from "./consult-online";

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
export default function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [city,setcity]=useState("");
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [isFocused, setIsFocused] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Filter suggestions based on user input
  const filtered = useMemo(() => {
    if (!query.trim()) return []
    return specializations.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filtered.length) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setFocusedIndex((prev) => (prev + 1) % filtered.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setFocusedIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault()
      setQuery(filtered[focusedIndex])
      setIsFocused(false)
    }
  }

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = () => {
    router.push(`/doctor?query=${encodeURIComponent(query)}&city=${encodeURIComponent(city)}`)
  }

  return (
  <section
    aria-label="Hero section"
    // className="px-[100px] mt-[50px] relative"
    className="px-5 xl:px-25 mt-12.5 relative"
  >
  <Card
    className="hero-card bg-[#F4F4F4] md:p-10 shadow-sm relative overflow-visible rounded-4xl"
    // style={{ width: '100%', height: '740px', borderRadius: '42px',  }}
  >
    
    {/* ---------- Decorative Backgrounds ---------- */}
    <div className="absolute bottom-0 left-0 w-[250px] sm:w-[300px] md:w-[380px]  pointer-events-none">
      <Image
        src="/hero-bg.png"
        alt="Decorative background bottom left"
        width={286}
        height={200}
        className="object-contain select-none"
      />
    </div>

    <div className="absolute top-0 right-0 w-[200px] sm:w-[280px] md:w-[350px]  pointer-events-none">
      <Image
        src="/hero-bg2.png"
        alt="Decorative background top right"
       width={400}
        height={100}
        className="object-contain select-none"
      />
    </div>

    {/* ---------- Main Hero Content ---------- */}
    <div className="flex flex-col lg:flex-row relative z-10 items-center md:gap-20 lg:gap-40 xl:gap-52 2xl:gap-68.5">
      
      {/* ---------- Left Content ---------- */}
      <div className="w-11/12 lg:w-7/12 space-y-6 mt-6 ">
        
        <div className="flex flex-col gap-10">
        {/* Patients Served */}

        <div className="flex items-center gap-2.5 py-1 px-3 bg-white w-fit rounded-3xl mx-auto lg:mx-0">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <p className="text-[#52525B] text-sm font-normal" style={{ fontFamily: 'var(--font-inter)' }}>50M+ patients served</p>
        </div>


        {/* Headings */}
        <div className=" text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl xl:text-5xl  font-extrabold text-[#323232] mb-0" style={{ fontFamily: 'var(--font-plusjakarta)' }}>
            Find and Book the
          </h1>
          <h1 className="text-3xl md:text-4xl xl:text-5xl  font-extrabold text-[#323232] mb-0" style={{ fontFamily: 'var(--font-plusjakarta)' }}>
            <span className="text-[#4ADE80]">
              Best Doctors
              </span> near you
          </h1>
        </div>

        {/* Search Bar */}
        <div
          className="  md:flex md:flex-row flex flex-col gap-5 md:gap-3.5 bg-white rounded-2xl md:rounded-full shadow-sm text-[#52525B] py-3 px-2 border-[1px] border-[#CACACA] items-center"
       
          ref={dropdownRef}
        >
          
          {/* Search Input */}
          <div
            className="md:w-5/12 flex items-center text-base bg-[#F4F4F4] rounded-full px-3"
            style={{
              // width: '344.3640441894531px',
              // height: '66.64610290527344px',
              borderRadius: '35.88px',
              paddingTop: '10.32px',
              paddingRight: '26.65px',
              paddingBottom: '10.32px',
              paddingLeft: '16.65px',
              // gap: '12.37px',
              background: '#F4F4F4',
              opacity: 1,
              transform: 'rotate(0deg)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#52525B]">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <Input
              type="text"
              placeholder="Search Specialist or Hospital"
               value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
              className="hero-input border-none shadow-none bg-transparent focus:ring-0 h-full w-full text-lg"
            />
             {isFocused && filtered.length > 0 && (
        <div className="absolute top-[70px] left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-lg z-10 overflow-hidden max-h-60 overflow-y-auto">
          {filtered.map((item, index) => (
            <div
              key={item}
              onMouseDown={() => {
                setQuery(item)
                setIsFocused(false)
              }}
              className={`px-4 py-2 text-sm cursor-pointer transition ${
                index === focusedIndex
                  ? "bg-[#5fe089] text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
          </div>

     

          {/* Location Input */}
          <div
            className="md:w-5/12 flex items-center text-base bg-[#F4F4F4] rounded-full px-3"
            style={{
              // width: '344.3640441894531px',
              // height: '66.64610290527344px',
              borderRadius: '35.88px',
              paddingTop: '10.32px',
              paddingRight: '26.65px',
              paddingBottom: '10.32px',
              paddingLeft: '16.65px',
              // gap: '12.37px',
              background: '#F4F4F4',
              opacity: 1,
              transform: 'rotate(0deg)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#52525B]">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <Input
              type="text"
              onChange={(e)=>setcity(e.target.value)}
              placeholder="Near you or Enter City"
              className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-w-0 rounded-md border px-3 py-1 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hero-input border-none shadow-none bg-transparent focus:ring-0 h-full w-full text-lg"
            />
          </div>

          {/* Find Button */}
      <Button
  className="text-white inline-flex items-center justify-center hover:cursor-pointer transition-all duration-300 bg-green-400 rounded-full px-8 py-7"

  onMouseEnter={(e) => (e.currentTarget.style.background = "#4ad87b")}
  onMouseLeave={(e) => (e.currentTarget.style.background = "#5FE089")}
  onClick={handleSearch}
>
  Find
</Button>

        </div>
      </div>
        </div>

      {/* ---------- Right Side (absolute) ---------- */}
      <div className="mt-5 md:mt-0 w-11/12 md:w-5/12 lg:w-5/12 "
      >
        {/* <h1>myheading</h1> */}
        <div className="flex justify-end relative">
          <Image
            src="/assets/Hero.svg"
            alt="Doctor on call"
            width={480}
            height={580}
            className="object-contain select-none"
          />
          {/* Consult Online Now card */}
            <div className="absolute bottom-20 md:bottom-25  md:-left-50 lg:-left-25 xl:-left-38 bg-white p-6 rounded-2xl z-1000 ">
              <div className="hero-consult-header z-20">
                <h3 className="hero-consult-title z-20  text-lg lg:text-2xl ">Consult Online Now</h3>
                <div className="hero-consult-icon" onClick={() => setIsConsultModalOpen(true)}>
                  <ArrowRight className="w-5 h-5 -rotate-45 text-white z-20 cursor-pointer hover:scale-110 transition-transform" />
                </div>
              </div>
              <p className="hero-consult-description z-20">
                Instantly connect with Specialists through
                <br></br>
                 Video call.
              </p>
            </div>
            <Dialog open={isConsultModalOpen} onOpenChange={setIsConsultModalOpen}>
              <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
                <ConsultOnline />
              </DialogContent>
            </Dialog>
        </div>



            {/* Floating Badge (In Clinic Appointment) */}
            <div className="flex absolute  lg:right-8 bottom-5 items-center rounded-full px-6 py-2 bg-white/90 backdrop-blur-lg shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 mr-3" />
              <span className="font-medium text-base text-[#414141]">In Clinic Appointment</span>
              <div className="ml-4 flex items-center">
                <ArrowRight className="w-4 h-4 -rotate-12 text-gray-700" />
              </div>
            </div>           
            </div>
          </div>
        {/* </div> */}
      </Card>
    </section>
  );
}