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

  return (
    <header className="site-header">
      <div className="header-container flex items-center w-full">
      <div className="site-logo -ml-14">
  <Link href="/">
    <Image src="/assets/Test 2.png" alt="Sehatyar logo" width={156} height={41} priority />
  </Link>
</div>

  <div className="desktop-nav-group flex items-center w-[428px] h-[20px]  flex-none  grow-0">
          <NavigationMenu className="hidden md:flex">
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
                      How It&apos;s Work
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
        <div className="header-desktop-actions ml-auto -mr-[60px] flex items-center gap-[12px] ">
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
  className="flex flex-row justify-center items-center px-[22px] py-[12px] gap-[10px] w-[159px] h-[48px] border border-black rounded-[99px]"
>
<span className="font-jakarta font-semibold text-[14px] leading-[24px] text-black">
  Login / Sign Up
</span>
</Link>



         <Link
  href="/register"
  className="btn btn-primary font-semibold font-montserrat text-[14px] bg-[#5FE089] flex items-center  px-4 py-2 rounded-full"
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
          <ul className="flex flex-col space-y-4">
            <li>
              <Link href="/doctors" className="block py-2">Doctors</Link>
            </li>
            <li>
              <Link href="/clinics" className="block py-2">Clinics</Link>
            </li>
            <li>
              <Link href="/how-it-works" className="block py-2">How It&apos;s Work</Link>
            </li>
            <li>
              <Link href="/about" className="block py-2">About Us</Link>
            </li>
            <li>
              <Link href="/login" className="block py-2">Login / Sign Up</Link>
            </li>
            <li>
              <Link href="/join-doctor" className="block py-2">Join As Doctor</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
