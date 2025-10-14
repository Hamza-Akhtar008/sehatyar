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
    className="px-[100px] mt-[50px] relative"
  >
  <Card
    className="hero-card bg-[#F4F4F4] md:p-10 shadow-sm relative overflow-visible mx-auto"
    style={{ width: '100%', maxWidth: '1520px', height: '740px', borderRadius: '42px', marginLeft: 'auto', marginRight: 'auto' }}
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
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start relative z-10">
      
      {/* ---------- Left Content ---------- */}
      <div className="flex-1 space-y-6 mt-6 md:mt-10 lg:mt-50 w-full max-w-[800px]">
        
        {/* Patients Served */}
        <div className="flex items-center gap-2 p-2 bg-white w-fit rounded-3xl shadow-lg mx-auto lg:mx-0">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <p className="text-[#52525B] text-[14px] leading-[14px] font-normal" style={{ fontFamily: 'var(--font-inter)' }}>50M+ patients served</p>
        </div>


        {/* Headings */}
        <div className="space-y-2 text-center lg:text-left">
          <h1 className="text-[62px] leading-[66px] font-extrabold text-[#323232]" style={{ fontFamily: 'var(--font-plusjakarta)' }}>
            Find and Book the
          </h1>
          <h1 className="text-[62px] leading-[66px] font-extrabold text-[#323232]" style={{ fontFamily: 'var(--font-plusjakarta)' }}>
            <span className="text-[#4ADE80]" style={{ fontFamily: 'var(--font-plusjakarta)', fontWeight: 800, fontSize: '62px', lineHeight: '66px' }}>Best Doctors</span> near you
          </h1>
        </div>

        {/* Search Bar */}
        <div
          className="flex flex-col sm:flex-row gap-[15px] mt-6 bg-white rounded-[94.75px] shadow-sm text-[#52525B]"
          style={{
            width: '801.0261840820312px',
            height: '91.73924255371094px',
            paddingTop: '9.99px',
            paddingRight: '9.57px',
            paddingBottom: '9.99px',
            paddingLeft: '9.57px',
            border: '1px solid #CACACA',
            background: '#FFFFFF',
            opacity: 1,
            transform: 'rotate(0deg)'
          }}
        >
          
          {/* Search Input */}
          <div
            className="flex items-center text-[16px]"
            style={{
              width: '344.3640441894531px',
              height: '66.64610290527344px',
              borderRadius: '35.88px',
              paddingTop: '18.32px',
              paddingRight: '26.65px',
              paddingBottom: '18.32px',
              paddingLeft: '26.65px',
              gap: '12.37px',
              background: '#F4F4F4',
              opacity: 1,
              transform: 'rotate(0deg)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <Input
              type="text"
              placeholder="Search Specialist or Hospital"
              className="hero-input border-none shadow-none bg-transparent focus:ring-0 h-full w-full"
            />
          </div>

     

          {/* Location Input */}
          <div
            className="flex items-center"
            style={{
              width: '344.3640441894531px',
              height: '66.64610290527344px',
              borderRadius: '35.88px',
              paddingTop: '18.32px',
              paddingRight: '26.65px',
              paddingBottom: '18.32px',
              paddingLeft: '26.65px',
              gap: '12.37px',
              background: '#F4F4F4',
              opacity: 1,
              transform: 'rotate(0deg)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <Input
              type="text"
              placeholder="Near you or Enter City"
              className="hero-input border-none shadow-none bg-transparent focus:ring-0 h-full w-full"
            />
          </div>

          {/* Find Button */}
          <Button
            className="text-white inline-flex items-center justify-center"
            style={{
              width: '119.17292785644531px',
              height: '71.7504653930664px',
              borderRadius: '122.47px',
              paddingTop: '12.37px',
              paddingRight: '39.59px',
              paddingBottom: '12.37px',
              paddingLeft: '39.59px',
              gap: '12.37px',
              background: '#5FE089',
              opacity: 1,
              transform: 'rotate(0deg)',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 600,
              fontSize: '17.32px',
              lineHeight: '29.69px',
              verticalAlign: 'middle',
              color: '#FFFFFF',
            }}
          >
            Find
          </Button>
        </div>
      </div>

      {/* ---------- Right Side (absolute) ---------- */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          right: '40px',
          width: '657.89453125px',
          height: '580px',
          opacity: 1,
          zIndex: 10
        }}
      >
        {/* Image filling the right container */}
      <div className="absolute  right-[-40px]" style={{ width: '480px', height: '580px' }}>
        <div className="relative w-full h-full">
          <Image
            src="/assets/Hero.svg"
            alt="Doctor on call"
            fill
            style={{ objectFit: 'contain', objectPosition: 'right center' }}
          />
        </div>
      </div>


        {/* Floating Badge (In Clinic Appointment) */}
        <div
          style={{
            position: 'absolute',
            right: '-40px',
            bottom: '10px',
            width: '294.3435974121094px',
            height: '46.89992141723633px',
            borderRadius: '134.69px',
            paddingTop: '4.21px',
            paddingRight: '23.16px',
            paddingBottom: '4.21px',
            paddingLeft: '23.16px',
            gap: '13.61px',
            background: '#FFFFFFCC',
            backdropFilter: 'blur(42.10526657104492px)',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 8px 20px rgba(0,0,0,0.06)'
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: '#00c97a', marginRight: 12 }} />
          <span
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 500,
              fontSize: '16.33px',
              lineHeight: '38.09px',
              color: '#414141'
            }}
          >
            In Clinic Appointment
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <ArrowRight className="w-4 h-4 rotate-[-25deg] text-gray-700" />
          </div>
        </div>


        {/* Consult Online Now card positioned inside the right container */}
        <div
          style={{
            position: 'absolute',
            top: '304.21px', /* 384.21 - container top (80px) */
            left: '70px',
            width: '426.3157958984375px',
            height: '165.87281799316406px',
            borderRadius: '33.68px',
            padding: '23.16px',
            gap: '8.42px',
            background: '#FFFFFFCC',
            backdropFilter: 'blur(42.10526657104492px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        
        >
          <div className="flex items-center justify-between" style={{ gap: '8.42px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-plusjakarta)',
                fontWeight: 600,
                fontSize: '23.16px',
                lineHeight: '29.47px',
                color: '#363636',
                margin: 0
              }}
            >
              Consult Online Now
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px', borderRadius: '20px', background: '#5FE089' }}>
              <ArrowRight className="w-5 h-5 rotate-[-25deg] text-white" />
            </div>
          </div>
          <p
            style={{
              marginTop: '8px',
              fontFamily: 'var(--font-plusjakarta)',
              fontWeight: 500,
              fontSize: '18.95px',
              lineHeight: '100%',
              color: '#929292'
            }}
          >
            Instantly connect with Specialists through Video call.
          </p>
        </div>
      </div>
    </div>
  </Card>
</section>

  );
}

