"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, Globe, ArrowRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Header() {
  const [open, setOpen] = useState(false);

 
  const specialties = [
    {
      name: "Dermatologist",
      cities: [
        "Dermatologist in Lahore",
        "Dermatologist in Islamabad",
        "Dermatologist in Karachi",
      ],
    },
    {
      name: "Gynecologist",
      cities: [
        "Gynecologist in Lahore",
        "Gynecologist in Islamabad",
        "Gynecologist in Karachi",
      ],
    },
    {
      name: "Urologist",
      cities: [
        "Urologist in Lahore",
        "Urologist in Islamabad",
        "Urologist in Karachi",
      ],
    },
    {
      name: "Gastroenterologist",
      cities: [
        "Gastroenterologist in Lahore",
        "Gastroenterologist in Islamabad",
        "Gastroenterologist in Karachi",
      ],
    },
    {
      name: "Neurologist",
      cities: [
        "Neurologist in Lahore",
        "Neurologist in Islamabad",
        "Neurologist in Karachi",
      ],
    },
    {
      name: "ENT Specialist",
      cities: [
        "ENT Specialist in Lahore",
        "ENT Specialist in Islamabad",
        "ENT Specialist in Karachi",
      ],
    },
    {
      name: "Dentist",
      cities: [
        "Dentist in Lahore",
        "Dentist in Islamabad",
        "Dentist in Karachi",
      ],
    },
  ];


  const [expanded, setExpanded] = useState<string | null>(null);

  // Inline expand/collapse for clinics
  const clinics = [
    {
      name: "Lahore Clinics",
      hospitals: [
        "Doctors Hospital",
        "Hameed Latif Hospital",
        "Evercare Hospital",
      ],
    },
    {
      name: "Karachi Clinics",
      hospitals: [
        "Agha Khan Hospital",
        "South City Hospital",
        "Liaquat National Hospital",
      ],
    },
    {
      name: "Islamabad Clinics",
      hospitals: [
        "Shifa International",
        "PIMS Hospital",
        "Ali Medical Centre",
      ],
    },
  ];

  const [mobileDoctorsOpen, setMobileDoctorsOpen] = useState<boolean>(false);
  const [mobileClinicsOpen, setMobileClinicsOpen] = useState<boolean>(false);

  return (
    <header className="site-header">
      <div className="header-container flex items-center w-full">
      <div className="site-logo ml-0 lg:-ml-14">
  <Link href="/">
    <Image src="/assets/Test 2.png" alt="Sehatyar logo" width={156} height={41} priority />
  </Link>
</div>

  <div className="desktop-nav-group hidden md:flex items-center flex-1 min-w-0">
          <NavigationMenu>
            <NavigationMenuList className="nav-menu">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-black">Doctors</NavigationMenuTrigger>
                <NavigationMenuContent className="navigation-menu-content">
                  <div className="doctor-dropdown">
                    <div className="doctor-dropdown-title">Find doctor by Specialty</div>
                    {specialties.map((spec) => (
                      <div key={spec.name}>
                        <button
                          className={`doctor-specialty-btn${expanded === spec.name ? " expanded" : ""}`}
                          onClick={() => setExpanded(expanded === spec.name ? null : spec.name)}
                          type="button"
                        >
                          {spec.name}
                          <ChevronDownIcon size={16} style={{ marginLeft: 8, transform: expanded === spec.name ? "rotate(180deg)" : "none" }} />
                        </button>
                        {expanded === spec.name && (
                          <div className="doctor-cities-list">
                            {spec.cities.map((city) => (
                              <div key={city} className="doctor-city-item">
                                {city}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-black">Clinics</NavigationMenuTrigger>
                <NavigationMenuContent className="navigation-menu-content">
                  <div className="doctor-dropdown">
                    <div className="doctor-dropdown-title">Find clinic by City</div>
                    {clinics.map((city) => (
                      <div key={city.name}>
                        <button
                          className={`doctor-specialty-btn${expanded === city.name ? " expanded" : ""}`}
                          onClick={() => setExpanded(expanded === city.name ? null : city.name)}
                          type="button"
                        >
                          {city.name}
                          <ChevronDownIcon size={16} style={{ marginLeft: 8, transform: expanded === city.name ? "rotate(180deg)" : "none" }} />
                        </button>
                        {expanded === city.name && (
                          <div className="doctor-cities-list">
                            {city.hospitals.map((hospital) => (
                              <div key={hospital} className="doctor-city-item">
                                {hospital}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/how-it-works" className={navigationMenuTriggerStyle()}>
                      How It's Work
                    </Link>
                  </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/about" className={navigationMenuTriggerStyle()}>
                    About Us
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="header-desktop-actions ml-auto flex items-center gap-2 md:gap-3 lg:gap-[12px] ">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center  gap-1 lang-dropdown-trigger">
             <span className="font-plus-jakarta font-medium text-[14px] leading-[24px] text-black flex items-center gap-1">
             EN  </span> <ChevronDownIcon className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="lang-dropdown-content z-[9999]">
              <DropdownMenuItem className="lang-dropdown-item">English</DropdownMenuItem>
              <DropdownMenuItem className="lang-dropdown-item">اردو</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

       <Link
  href="/login"
  className="hide-on-mobile flex flex-row justify-center items-center px-4 py-2 gap-[10px] lg:px-[22px] lg:py-[12px] w-auto h-10 lg:w-[159px] lg:h-[48px] border border-black rounded-[99px] whitespace-nowrap"
>
<span className="font-jakarta font-semibold text-[14px] leading-[24px] text-black">
  Login / Sign Up
</span>
</Link>



         <Link
  href="/register"
  className="hide-on-mobile btn btn-primary font-semibold font-montserrat text-[14px] bg-[#5FE089] flex items-center  px-4 py-2 rounded-full whitespace-nowrap"
>
  Join As Doctor
  <div className="icon-container rounded-full bg-white p-[13px] gap-[10px] flex justify-center items-center">
    <ArrowRight className="w-4 h-4 rotate-[-25deg]" />
  </div>
</Link>

        </div>

        {/* Mobile navigation toggle */}
        <button className="md:hidden mobile-toggle" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Mobile menu (shown when open state is true) */}
      {open && (
        <div className="md:hidden mobile-menu bg-white p-4">
          <ul className="flex flex-col space-y-2">
            {/* Doctors collapsible */}
            <li>
              <button
                className="w-full flex items-center justify-between py-3 text-left"
                onClick={() => setMobileDoctorsOpen(!mobileDoctorsOpen)}
                aria-expanded={mobileDoctorsOpen}
                aria-controls="mobile-doctors-panel"
                type="button"
              >
                <span>Doctors</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${mobileDoctorsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileDoctorsOpen && (
                <div id="mobile-doctors-panel" className="pl-3 pb-2 space-y-1">
                  {specialties.map((spec) => (
                    <div key={spec.name}>
                      <button
                        className={`w-full flex items-center justify-between py-2 text-left text-sm text-gray-600 ${expanded === spec.name ? 'font-medium' : ''}`}
                        onClick={() => setExpanded(expanded === spec.name ? null : spec.name)}
                        type="button"
                      >
                        <span>{spec.name}</span>
                        <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${expanded === spec.name ? 'rotate-180' : ''}`} />
                      </button>
                      {expanded === spec.name && (
                        <div className="pl-3 py-1 space-y-1">
                          {spec.cities.map((city) => (
                            <Link key={city} href="#" className="block py-1 text-sm text-gray-500">
                              {city}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>

            {/* Clinics collapsible */}
            <li>
              <button
                className="w-full flex items-center justify-between py-3 text-left"
                onClick={() => setMobileClinicsOpen(!mobileClinicsOpen)}
                aria-expanded={mobileClinicsOpen}
                aria-controls="mobile-clinics-panel"
                type="button"
              >
                <span>Clinics</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${mobileClinicsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileClinicsOpen && (
                <div id="mobile-clinics-panel" className="pl-3 pb-2 space-y-1">
                  {clinics.map((city) => (
                    <div key={city.name}>
                      <button
                        className={`w-full flex items-center justify-between py-2 text-left text-sm text-gray-600 ${expanded === city.name ? 'font-medium' : ''}`}
                        onClick={() => setExpanded(expanded === city.name ? null : city.name)}
                        type="button"
                      >
                        <span>{city.name}</span>
                        <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${expanded === city.name ? 'rotate-180' : ''}`} />
                      </button>
                      {expanded === city.name && (
                        <div className="pl-3 py-1 space-y-1">
                          {city.hospitals.map((hospital) => (
                            <Link key={hospital} href="#" className="block py-1 text-sm text-gray-500">
                              {hospital}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link href="/how-it-works" className="block py-3">How It&apos;s Work</Link>
            </li>
            <li>
              <Link href="/about" className="block py-3">About Us</Link>
            </li>
            {/* Hide auth actions on tablet/laptop since they are in top header there */}
            <li className="sm:hidden">
              <Link href="/login" className="block py-3">Login / Sign Up</Link>
            </li>
            <li className="sm:hidden">
              <Link href="/register" className="block py-3">Join As Doctor</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
