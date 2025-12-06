import Header from "@/components/ui/header";
import HeroSection from "@/components/landing/hero-section";
import Hospitals from "@/components/landing/hospitals";
import Doctors from "@/components/landing/doctors";
import Partners from "@/components/landing/partners";
import DoctorByCondition from "@/components/landing/doctor-by-condition";
import Carousel from "@/components/landing/Carousel";
import ConditionCardCarousel from "@/components/landing/ConditionCardCarousel";
import CustomerReview from "@/components/landing/CustomerReview";
<<<<<<< Updated upstream
import PopularHospital from "@/components/landing/PopularHospital";
=======
import PopularDoctors from "@/components/landing/PopularDoctors";
>>>>>>> Stashed changes

export default function Home() {
  return (
   <>
   <HeroSection />
   <Carousel/>
  

   {/* <Conditions /> */}
   <PopularDoctors />
   <ConditionCardCarousel/>
   <PopularHospital/>
   <Partners />
   <CustomerReview />
   <DoctorByCondition />
 
   </>
  );
}
