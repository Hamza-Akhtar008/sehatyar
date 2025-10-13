import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function 
HeroSection() {
  return (
<section
  aria-label="Hero section"
  className="ml-[100px] mr-[100px] mt-[50px]  relative"
>
  <Card className="hero-card max-w-[1620px] bg-[#F4F4F4]  md:p-10 rounded-3xl shadow-sm relative overflow-hidden">
    
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
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start relative z-10">
      
      {/* ---------- Left Content ---------- */}
      <div className="flex-1 space-y-6 mt-6 md:mt-10 lg:mt-20 w-full max-w-[800px]">
        
        {/* Patients Served */}
        <div className="flex items-center gap-2 p-2 bg-white w-fit rounded-3xl shadow-lg mx-auto lg:mx-0">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <p className="text-[#52525B] text-sm md:text-[14px]">50M+ patients served</p>
        </div>

        {/* Headings */}
        <div className="space-y-2 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Find and Book the
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            <span className="text-[#4ADE80]">Best Doctors</span> near you
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 w-[801px] bg-white rounded-full p-2 shadow-sm border text-[#52525B]">
          
          {/* Search Input */}
          <div className="flex-1 flex items-center px-3 py-2 bg-[#F4F4F4] rounded-full text-[16px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <Input 
              type="text" 
              placeholder="Search Specialist or Hospital" 
              className="hero-input border-none shadow-none bg-transparent focus:ring-0"
            />
          </div>

     

          {/* Location Input */}
          <div className="flex-1 flex items-center px-3 py-2 bg-[#F4F4F4] rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <Input 
              type="text" 
              placeholder="Near you or Enter City" 
              className="hero-input border-none shadow-none bg-transparent focus:ring-0"
            />
          </div>

          {/* Find Button */}
          <Button className="rounded-full bg-[#4ADE80] hover:bg-[#3cbb6c] text-white px-8 py-4 sm:w-[120px] sm:h-[66px]">
            Find
          </Button>
        </div>
      </div>

      {/* ---------- Right Image ---------- */}
      <div className="relative flex justify-center lg:justify-end flex-1 w-full">
        <div className="relative my-10 w-[300px] sm:w-[400px] md:w-[450px] lg:w-[580px] h-[400px] md:h-[520px] lg:h-[480px]">
          <Image 
            src="/assets/Hero.svg" 
            alt="Doctor on call" 
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Floating Card (Consult Online) */}
        <div className="absolute bottom-[22%] sm:bottom-[24.5%] right-[5%] sm:right-[10%] lg:right-[48%] sm:w-[380px] md:w-[420px] lg:w-[426px] bg-white rounded-3xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg md:text-[22px] text-gray-800">
              Consult Online Now
            </h3>
            <div className="flex justify-center items-center p-3 rounded-3xl bg-[#5FE089]">
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 rotate-[-25deg] text-white" />
            </div>
          </div>
          <p className="text-sm md:text-[16px] font-medium text-[#929292] mt-2">
            Instantly connect with Specialists through Video call.
          </p>
        </div>

        {/* Floating Badge (In Clinic) */}
        <div className="absolute bottom-[5%] right-[4%] flex items-center gap-3 w-[90%] sm:w-[250px] md:w-[280px] h-auto bg-[#FFFFFFCC] backdrop-blur-[42.11px] rounded-xl p-3 shadow-lg">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm md:text-base text-gray-800 font-medium">In Clinic Appointment</span>
          <div className="ml-auto flex justify-center items-center">
            <ArrowRight className="w-4 h-4 rotate-[-25deg]" />
          </div>
        </div>
      </div>
    </div>
  </Card>
</section>

  );
}
