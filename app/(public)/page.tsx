
import Header from "@/components/ui/header";
import HeroSection from "@/components/landing/hero-section";
import Hospitals from "@/components/landing/hospitals";
import Doctors from "@/components/landing/doctors";
import Specialists from "@/components/landing/specialists";
import { Conditions } from "@/components/landing";
import Partners from "@/components/landing/partners";
import DoctorByCondition from "@/components/landing/doctor-by-condition";
import Carousel from "@/components/landing/Carousel";
import ConditionCardCarousel from "@/components/landing/ConditionCardCarousel";

export default function Home() {
  return (
   <>
   <HeroSection />
   <Carousel/>
   <Doctors />
   <Hospitals />
   <Specialists />
   {/* <Conditions /> */}
   <ConditionCardCarousel/>
   <Partners />
   <DoctorByCondition />
 
   </>
  );
}
