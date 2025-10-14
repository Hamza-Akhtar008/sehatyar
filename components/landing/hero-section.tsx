import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section aria-label="Hero section" className="hero-section">
      <Card className="card">
        {/* ---------- Decorative Backgrounds ---------- */}
        <div className="hero-bg-left">
          <Image
            src="/hero-bg.png"
            alt="Decorative background bottom left"
            width={286}
            height={200}
            className="object-contain select-none"
          />
        </div>

        <div className="hero-bg-right">
          <Image
            src="/hero-bg2.png"
            alt="Decorative background top right"
            width={400}
            height={100}
            className="object-contain select-none"
          />
        </div>

        {/* ---------- Main Hero Content ---------- */}
        <div className="hero-content">
          {/* ---------- Left Content ---------- */}
          <div className="hero-left">
            {/* Patients Served */}
            <div className="hero-badge">
              <div className="hero-badge-dot"></div>
              <p className="hero-badge-text">50M+ patients served</p>
            </div>

            {/* Headings */}
            <div className="hero-headings">
              <h1 className="hero-title">
                Find and Book the
              </h1>
              <h1 className="hero-title">
                <span className="hero-title-accent">Best Doctors</span> near you
              </h1>
            </div>

            {/* Search Bar */}
            <div className="hero-search-container">
              {/* Search Input */}
              <div className="hero-search-input">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <Input
                  type="text"
                  placeholder="Search Specialist or Hospital"
                  className="hero-input"
                />
              </div>

              {/* Location Input */}
              <div className="hero-search-input">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <Input
                  type="text"
                  placeholder="Near you or Enter City"
                  className="hero-input"
                />
              </div>

              {/* Find Button */}
              <Button 
                className="hero-search-button "
                
              >
                Find
              </Button>
            </div>
          </div>

          {/* ---------- Right Side Responsive ---------- */}
          <div className="hero-right">
            {/* Responsive Image */}
            <div className="hero-image-container">
              <Image
                src="/assets/Hero.svg"
                alt="Doctor on call"
                fill
                style={{ objectFit: 'contain', objectPosition: 'right center' }}
              />
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
            <div className="hero-consult-card">
              <div className="hero-consult-header">
                <h3 className="hero-consult-title">Consult Online Now</h3>
                <div className="hero-consult-icon">
                  <ArrowRight className="w-5 h-5 -rotate-12 text-white" />
                </div>
              </div>
              <p className="hero-consult-description">
                Instantly connect with Specialists through Video call.
              </p>
            </div>
            
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