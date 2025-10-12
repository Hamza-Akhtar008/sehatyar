import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function 
HeroSection() {
  return (
    <section aria-label="Hero section" className="p-10">
      <Card className="hero-card max-w-[1620px] height-[740px] mx-auto bg-[#F4F4F4] p-8 md:p-10 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <p className="text-gray-700 text-sm">50M+ patients served</p>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Find and Book the{" "}
                <span className="text-[#4ADE80]">Best Doctors</span>{" "}
                near you
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-6 w-full max-w-[600px] bg-white rounded-full p-1 shadow-sm border">
                <div className="flex-1 flex items-center px-3 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                  <Input 
                    type="text" 
                    placeholder="Search Specialist or Hospital" 
                    className="hero-input no-focus-ring border-none shadow-none px-0"
                  />
                </div>
                <div className="w-px h-8 bg-gray-200 hidden sm:block self-center"></div>
                <div className="flex-1 flex items-center px-3 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <Input 
                    type="text" 
                    placeholder="Near you or Enter City" 
                    className="hero-input no-focus-ring border-none shadow-none px-0"
                  />
                </div>
                <Button className="rounded-full bg-[#4ADE80] hover:bg-[#3cbb6c] text-white px-8">
                  Find
                </Button>
              </div>
            </div>
          </div>
          
          <div className="relative flex">
            <div className="relative h-[560px] w-[480px]">
              <Image 
                src="/assets/Hero.svg" 
                alt="Doctor on call" 
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            
            
          </div>
            <div className="absolute top-[50%] right-[15%] w-[426px] h-[145px] bg-white rounded-3xl p-3 shadow-lg">
  <div className="flex items-center justify-between p-1">
    <h3 className="font-semibold text-[23px] text-gray-800">
      Consult Online Now
    </h3>

    <div className="icon-container flex justify-center items-center gap-[10px] p-[20px] rounded-3xl bg-[#5FE089]">
      <ArrowRight className="w-6 h-6 rotate-[-25deg] text-white" />
    </div>
  </div>

  <p className="text-[16px] font-medium text-[#929292] -p-2 text-gray-500">
    Instantly connect with Specialists through Video call.
  </p>
</div>
            <div className="absolute flex flex-justify bottom-[9%] right-[4%] w-[286px] h-[46.9px] bg-[#FFFFFFCC] backdrop-blur-[42.11px] rounded-xl p-2 shadow-lg flex items-center gap-[13.61px]">
  <div className="w-3 h-3 rounded-full bg-green-500"></div>
  <span className="text-sm text-gray-800 font-medium">In Clinic Appointment</span>
   <div className="icon-container rounded-full ml-5  p-[13px] gap-[10px] flex justify-center items-center">
    <ArrowRight className="w-4 h-4 rotate-[-25deg]" />
  </div>
</div>


        </div>
      </Card>
    </section>
  );
}
