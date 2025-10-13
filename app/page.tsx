
import Header from "@/components/ui/header";
import HeroSection from "@/components/landing/hero-section";
import Hospitals from "@/components/landing/hospitals";
import Doctors from "@/components/landing/doctors";
import Specialists from "@/components/landing/specialists";
import { Conditions } from "@/components/landing";

export default function Home() {
  return (
   <>
   <Header />
   <HeroSection />
   <Doctors />
   <Hospitals />
   <Specialists />
   <Conditions />
   </>
  );
}
