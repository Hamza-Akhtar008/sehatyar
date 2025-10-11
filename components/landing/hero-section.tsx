import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section aria-label="Hero section" className="bg-[#F8F8F8] py-8 md:py-12 px-4">
      <Card className="hero-card max-w-[1200px] mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-sm relative overflow-hidden">
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
          
          <div className="flex-1 relative">
            <div className="relative h-[300px] md:h-[400px]">
              <Image 
                src="/assets/Hero.svg" 
                alt="Doctor on call" 
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            
            <div className="absolute top-[15%] right-[10%] bg-white rounded-xl p-4 shadow-lg">
              <h3 className="font-medium text-gray-800">Consult Online Now</h3>
              <p className="text-sm text-gray-500 mt-1">Instantly connect with Specialists through Video call.</p>
              <Button className="mt-2 rounded-lg bg-transparent border border-gray-200 hover:bg-gray-50 text-gray-800 w-full justify-between group">
                <span>→</span>
              </Button>
            </div>
            
            <div className="absolute bottom-[10%] right-[15%] bg-white rounded-xl p-2 shadow-lg flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">In Clinic Appointment</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
