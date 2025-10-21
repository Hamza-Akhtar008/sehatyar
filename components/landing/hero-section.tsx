"use client";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect,useState,useRef,useMemo } from "react";
import { useRouter } from "next/navigation";

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
    className="px-25 mt-12.5 relative"
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
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 relative z-10 items-center">
      
      {/* ---------- Left Content ---------- */}
      <div className="w-7/12 space-y-6 mt-6 ">
        
        <div className="flex flex-col gap-10">
        {/* Patients Served */}

        <div className="flex items-center gap-2.5 py-1 px-3 bg-white w-fit rounded-3xl mx-auto lg:mx-0">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <p className="text-[#52525B] text-[14px] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>50M+ patients served</p>
        </div>


        {/* Headings */}
        <div className=" text-center lg:text-left">
          <h1 className="text-[3.875rem] font-extrabold text-[#323232] mb-0" style={{ fontFamily: 'var(--font-plusjakarta)' }}>
            Find and Book the
          </h1>
          <h1 className="text-[3.875rem] font-extrabold text-[#323232] mb-0" style={{ fontFamily: 'var(--font-plusjakarta)' }}>
            <span className="text-[#4ADE80]" style={{ fontFamily: 'var(--font-plusjakarta)', fontWeight: 800, fontSize: '62px', lineHeight: '66px' }}>Best Doctors</span> near you
          </h1>
        </div>

        {/* Search Bar */}
        <div
          className="w-11/12 flex flex-row gap-3.5 bg-white rounded-full shadow-sm text-[#52525B] py-3 px-2 border-[1px] border-[#CACACA]"
          style={{
            // width: '801.0261840820312px',
            // height: '91.73924255371094px',
            // paddingTop: '9.99px',
            // paddingRight: '9.57px',
            // paddingBottom: '9.99px',
            // paddingLeft: '9.57px',
            // border: '1px solid #CACACA',
            // background: '#FFFFFF',
            // opacity: 1,
            // transform: 'rotate(0deg)'
          }}
          ref={dropdownRef}
        >
          
          {/* Search Input */}
          <div
            className="w-5/12 flex items-center text-[16px] bg-[#F4F4F4] rounded-full px-6"
            style={{
              // width: '344.3640441894531px',
              // height: '66.64610290527344px',
              // borderRadius: '35.88px',
              // paddingTop: '18.32px',
              // paddingRight: '26.65px',
              // paddingBottom: '18.32px',
              // paddingLeft: '26.65px',
              // gap: '12.37px',
              // background: '#F4F4F4',
              // opacity: 1,
              // transform: 'rotate(0deg)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#52525B]">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <Input
              type="text"
              placeholder="Search Specialist or Hospital"
               value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
              className="hero-input border-none shadow-none bg-transparent focus:ring-0 h-full w-full"
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
            className="w-5/12 flex items-center text-[16px] bg-[#F4F4F4] rounded-full px-6"
            style={{
              // width: '344.3640441894531px',
              // height: '66.64610290527344px',
              // borderRadius: '35.88px',
              // paddingTop: '18.32px',
              // paddingRight: '26.65px',
              // paddingBottom: '18.32px',
              // paddingLeft: '26.65px',
              // gap: '12.37px',
              // background: '#F4F4F4',
              // opacity: 1,
              // transform: 'rotate(0deg)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#52525B]">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <Input
              type="text"
              onChange={(e)=>setcity(e.target.value)}
              placeholder="Near you or Enter City"
              className="hero-input border-none shadow-none bg-transparent focus:ring-0 h-full w-full placeholder:text-[#52525B] placeholder:text-lg"
            />
          </div>

          {/* Find Button */}
      <Button
  className="text-white inline-flex items-center justify-center hover:cursor-pointer transition-all duration-300"
  style={{
    width: "119.17px",
    height: "71.75px",
    borderRadius: "122.47px",
    paddingTop: "12.37px",
    paddingRight: "39.59px",
    paddingBottom: "12.37px",
    paddingLeft: "39.59px",
    gap: "12.37px",
    background: "#5FE089",
    opacity: 1,
    transform: "rotate(0deg)",
    fontFamily: "var(--font-montserrat)",
    fontWeight: 600,
    fontSize: "17.32px",
    lineHeight: "29.69px",
    verticalAlign: "middle",
    color: "#FFFFFF",
  }}
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
      <div className="w-5/12"
        // style={{
        //   position: 'absolute',
        //   top: '80px',
        //   right: '40px',
        //   width: '657.89453125px',
        //   height: '580px',
        //   opacity: 1,
        //   zIndex: 10
        // }}
      >
        {/* <h1>myheading</h1> */}
        <div className="flex justify-end">
          <Image
            src="/assets/Hero.svg"
            alt="Doctor on call"
            width={480}
            height={580}
            className=" object-contain select-none"
          />
        </div>

  {/* Consult Online Now card */}
            <div className="absolute bottom-25 w-3/12 bg-white p-6 rounded-2xl z-1000 ">
              <div className="hero-consult-header z-20">
                <h3 className="hero-consult-title z-20">Consult Online Now</h3>
                <div className="hero-consult-icon">
                  <ArrowRight className="w-5 h-5 -rotate-45 text-white z-20" />
                </div>
              </div>
              <p className="hero-consult-description z-20">
                Instantly connect with Specialists through Video call.
              </p>
            </div>

        
        {/* Image filling the right container */}
      <div className="" 
      // style={{ width: '480px', height: '580px' }}
      >
        {/* <div className="w-3/12 z-10">
          <Image
            src="/assets/Hero.svg"
            alt="Doctor on call"
            fill
            style={{ objectFit: 'contain'}}
          />
        </div> */}
      </div>


            {/* Floating Badge (In Clinic Appointment) */}
            <div className="hero-floating-badge">
              <div className="hero-floating-badge-dot" />
              <span className="hero-floating-badge-text">In Clinic Appointment</span>
              <div className="ml-4 flex items-center">
                <ArrowRight className="w-4 h-4 -rotate-12 text-gray-700" />
              </div>
            </div>
            
            {/* Stacked badge for small screens */}
            <div className="hero-floating-badge-mobile">
              <div className="hero-floating-badge-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="font-medium text-sm text-[#414141]">In Clinic Appointment</span>
              </div>
            </div>

            {/* Consult Online Now card */}
            {/* <div className="hero-consult-card">
              <div className="hero-consult-header">
                <h3 className="hero-consult-title">Consult Online Now</h3>
                <div className="hero-consult-icon">
                  <ArrowRight className="w-5 h-5 -rotate-12 text-white" />
                </div>
              </div>
              <p className="hero-consult-description">
                Instantly connect with Specialists through Video call.
              </p>
            </div> */}
            
            <div className="hero-consult-card-mobile">
              <div className="hero-consult-card-inner">
                <div className="hero-consult-header">
                  <h3 className="hero-consult-title-mobile">Consult Online Now</h3>
                  <div className="hero-consult-icon-mobile">
                    <ArrowRight className="w-4 h-4 -rotate-12 text-white" />
                  </div>
                </div>
                <p className="hero-consult-description-mobile">
                  Instantly connect with Specialists through Video call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}