"use client";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "../ui/dialog";
import ConsultOnline from "./consult-online";
import InClinicAppointment from "./in-clinic-appointment";

const specializations = [
  "Allergy and Immunology",
  "Anesthesiology",
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "General Surgery",
  "Hematology",
  "Infectious Disease",
  "Internal Medicine",
  "Nephrology",
  "Neurology",
  "Obstetrics & Gynecology",
  "Oncology",
  "Ophthalmology",
  "Orthopedic Surgery",
  "Otolaryngology (ENT)",
  "Pediatrics",
  "Plastic Surgery",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Rheumatology",
  "Urology",
];

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isInClinicModalOpen, setIsInClinicModalOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on user input
  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    return specializations.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filtered.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      setQuery(filtered[focusedIndex]);
      setIsFocused(false);
    }
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    router.push(
      `/doctor?query=${encodeURIComponent(query)}&city=${encodeURIComponent(
        city
      )}`
    );
  };

  return (
    <section aria-label="Hero section" className="max-w-[1370px] mx-auto mt-10 px-4 md:px-0 relative">
      {/* Main Hero Container */}
      <div className="relative bg-[#F4F4F4] rounded-[32px] md:rounded-[42px] overflow-hidden min-h-[350px] md:min-h-[380px] lg:min-h-[407px] flex items-center">
        {/* Mobile Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-mobile.svg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover md:hidden"
        />
        {/* Desktop Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-backgound.svg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
        />
        <div className="relative z-10 w-full">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Content */}
            <div className="w-full md:w-1/2 md:ml-6 lg:ml-10 md:mt-2 lg:mt-3 px-6 py-8 md:py-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white border-none px-3 py-1.5 mb-5 rounded-full shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6600]"></div>
                <span className="text-gray-600 text-sm font-medium">
                  50M+ patients served
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-1 md:text-left mb-6 md:mb-0">
                <h1 className="text-4xl sm:text-3xl md:text-3xl lg:text-5xl font-bold text-[#4E148C] leading-tight">
                  Find and Book the
                </h1>
                <h1 className="text-4xl sm:text-3xl md:text-3xl lg:text-5xl font-bold leading-tight">
                  <span className="text-[#FF6600]">Best Doctors</span>{" "}
                  <span className="text-[#4E148C]">near you</span>
                </h1>
              </div>

              {/* Mobile Location Dropdown */}
              <div className="md:hidden w-full max-w-md  mb-2">
                <div className="flex items-center gap-2 text-gray-700">
               <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.16947 15.246C7.03442 15.343 6.87234 15.3952 6.70607 15.3952C6.5398 15.3952 6.37772 15.343 6.24267 15.246C2.24667 12.3978 -1.99427 6.5391 2.29301 2.30561C3.47 1.14781 5.05507 0.499275 6.70607 0.500001C8.36107 0.500001 9.94904 1.14959 11.1191 2.30478C15.4064 6.53827 11.1655 12.3961 7.16947 15.246Z" stroke="#52525B" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.70676 7.9477C7.14569 7.9477 7.56665 7.77333 7.87702 7.46296C8.18739 7.15258 8.36176 6.73163 8.36176 6.2927C8.36176 5.85376 8.18739 5.43281 7.87702 5.12243C7.56665 4.81206 7.14569 4.6377 6.70676 4.6377C6.26782 4.6377 5.84687 4.81206 5.5365 5.12243C5.22612 5.43281 5.05176 5.85376 5.05176 6.2927C5.05176 6.73163 5.22612 7.15258 5.5365 7.46296C5.84687 7.77333 6.26782 7.9477 6.70676 7.9477Z" stroke="#52525B" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-transparent border-none outline-none text-gray-700 text-base font-medium cursor-pointer"
                  >
                    <option value="">Select City</option>
                    <option value="Abbottabad">Abbottabad</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                  </select>
               
                </div>
              </div>

              {/* Mobile Search Bar */}
              <div className="md:hidden w-full max-w-md">
                <div className="bg-white p-4 rounded-[22px] shadow-lg border border-gray-200 flex items-center gap-2">
                  <div className="flex-1 bg-[#F5F5F5] rounded-[22px] px-4 py-4  flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Doctors, Hospital, Specialties"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="border-none bg-transparent p-0 h-auto focus-visible:ring-0 placeholder:text-gray-400 text-gray-700 text-sm w-full"
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    className="bg-[#4E148C] hover:bg-[#ff781e] text-white rounded-[22px] px-5 py-4 h-auto text-sm font-medium transition-colors"
                  >
                    Search
                  </Button>
                </div>
              </div>

              {/* Desktop Search Bar */}
              <div
                className="hidden md:flex bg-white p-2 shadow-lg max-w-[1000px] border rounded-full border-gray-100 flex-row gap-2"
                ref={dropdownRef}
              >
                <div className="flex-1 relative bg-[#F4F4F4] rounded-full px-6 py-2 flex items-center gap-3">
                  <Search className="w-5 h-5 text-gray-400" />
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="Specialist or Hospital"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onKeyDown={handleKeyDown}
                      className="border-none bg-transparent p-0 h-auto focus-visible:ring-0 placeholder:text-gray-400 text-gray-700 text-base w-full"
                    />
                    {isFocused && filtered.length > 0 && (
                      <div className="absolute top-full left-0 mt-4 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                        {filtered.map((item, index) => (
                          <div
                            key={item}
                            onMouseDown={() => {
                              setQuery(item);
                              setIsFocused(false);
                            }}
                            className={`px-4 py-3 text-sm cursor-pointer transition-colors ${
                              index === focusedIndex
                                ? "bg-[#4E148C] text-white"
                                : "hover:bg-gray-50 text-gray-700"
                            }`}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 bg-[#F4F4F4] rounded-full px-6 py-2 flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                    </div>
                  </div>
                  <Input
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Near you or Enter City"
                    className="border-none bg-transparent p-0 h-auto focus-visible:ring-0 placeholder:text-gray-400 text-gray-700 text-base w-full"
                  />
                </div>

                <Button
                  onClick={handleSearch}
                  className="bg-[#4E148C] hover:bg-[#ff781e] text-white rounded-full px-6 py-4 h-auto text-base font-medium transition-colors"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Desktop Right Content - Images (inside gray container) */}
            <div className="hidden md:block md:w-1/2 lg:w-1/2 mt-0">
              <div className="flex justify-end gap-2 lg:gap-3 items-start md:ml-4 lg:ml-10">
                {/* Card 1 - Consult Online */}
                <div className="flex flex-col gap-2 lg:gap-3 w-[180px] lg:w-[260px]">
                  <div className="relative bg-transparent overflow-hidden h-[130px] lg:h-[200px]">
                    <Image
                      src="/hero-section1.svg"
                      alt="Consult Online"
                      width={290}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                  <div className="bg-white rounded-[14px] lg:rounded-[20px] p-2.5 lg:p-4 flex flex-col gap-1 lg:gap-2">
                    <div className="flex items-center justify-between gap-2 lg:gap-3">
                      <h3 className="font-bold text-[#333333] text-xs lg:text-base leading-tight">
                        Consult Online Now
                      </h3>
                      <button
                        onClick={() => setIsConsultModalOpen(true)}
                        className="w-6 h-6 lg:w-9 lg:h-9 bg-[#4E148C] rounded-[10px] lg:rounded-[16.43px] flex items-center justify-center flex-shrink-0 hover:bg-[#ff781e] transition-colors"
                      >
                        <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 text-white -rotate-45" />
                      </button>
                    </div>
                    <p className="text-[9px] lg:text-[11px] text-gray-500 leading-relaxed hidden lg:block">
                      Instantly connect with Specialists through Video call.
                    </p>
                  </div>
                </div>

                {/* Card 2 - In Clinic */}
                <div className="w-[140px] lg:w-[250px] mr-1 lg:mr-2 relative">
                  <div className="relative rounded-[14px] lg:rounded-[20px] overflow-hidden h-[200px] lg:h-[300px] shadow-lg">
                    <Image
                      src="/hero-section2.svg"
                      alt="In Clinic Appointment"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 lg:bottom-3 left-2 lg:left-3 right-2 lg:right-3">
                      <button 

                       onClick={() => setIsInClinicModalOpen(true)}
                        className="w-full bg-[#4E148C] text-white py-1.5 lg:py-2.5 px-2 lg:px-3 rounded-full flex items-center justify-between text-[9px] lg:text-xs font-medium hover:bg-[#ff781e] transition-colors shadow-lg"
                      >
                        <div className="flex items-center gap-1 lg:gap-2">
                          <div
                           
                            className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-white" />
                          In Clinic Appointment
                        </div>
                        <ArrowRight className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 -rotate-45" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Image Cards - OUTSIDE gray container */}
      <div className="md:hidden mt-6 px-2">
        <div className="flex justify-center gap-3 items-start">
          {/* Card 1 - Consult Online */}
          <div className="flex flex-col gap-2 flex-1 max-w-[180px]">
            <div className="relative rounded-[16px] overflow-hidden h-[200px] shadow-md">
              <Image
                src="/hero-section1.svg"
                alt="Consult Online"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between gap-2 py-2">
              <h3 className="font-bold text-[#333333] text-sm leading-tight">
                Consult Online Now
              </h3>
              <button
                onClick={() => setIsConsultModalOpen(true)}
                className="w-8 h-8 bg-[#4E148C] rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-[#ff781e] transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5 text-white -rotate-45" />
              </button>
            </div>
          </div>

          {/* Card 2 - In Clinic */}
          <div className="flex-1 max-w-[180px]">
            <div className="relative rounded-[16px] overflow-hidden h-[260px] shadow-md">
              <Image
                src="/hero-section2.svg"
                alt="In Clinic Appointment"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-2 right-2">
                <button 
                  onClick={() => setIsInClinicModalOpen(true)}
                  className="w-full bg-[#4E148C] text-white py-2 px-2 rounded-full flex items-center justify-between text-[10px] font-medium hover:bg-[#ff781e] transition-colors shadow-lg"
                >
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    In Clinic Appointment
                  </div>
                  <ArrowRight className="w-3 h-3 -rotate-45" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isConsultModalOpen} onOpenChange={setIsConsultModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-[32px] border-none  shadow-lg">
          <ConsultOnline />
        </DialogContent>
      </Dialog>

      <Dialog open={isInClinicModalOpen} onOpenChange={setIsInClinicModalOpen}>
        <DialogContent showCloseButton={false} className="bg-transparent border-none shadow-none max-w-[95vw] sm:max-w-[90vw] md:max-w-3xl lg:max-w-4xl p-0 outline-none">
          <div className="bg-white rounded-[32px] p-6 w-full max-h-[85vh] overflow-y-auto">
            <InClinicAppointment />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}