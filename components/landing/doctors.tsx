import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Doctors() {
  return (
    <section
      aria-label="Doctors section"
      className="ml-[100px] mr-[100px] mt-[50px] relative"
    >
      <Card className="max-w-[1620px] bg-[#F4F4F4] md:p-10 border-0 rounded-3xl shadow-sm relative overflow-hidden">

        {/* Decorative Backgrounds */}
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[300px] md:w-[380px] pointer-events-none">
          <Image src="/hero-bg.png" alt="Decorative" width={286} height={50} className="object-contain select-none" />
        </div>
        

        {/* Title + Description */}
        <div className="text-left space-y-3 mt-10 relative z-10">
          <div className="text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-[40px]">
            Popular <span className="text-[#5FE089]">Doctors</span>
          </h2>
          <p className="text-gray-500 max-w-[600px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
          </p>
          </div>
        </div>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 relative z-10">
          {[1, 2, 3].map((index) => (
            <div key={index} className="relative">
              <div className="rounded-[30px] overflow-hidden shadow-md bg-white">
                <Image
                  src="/assets/doctors.svg"
                  alt="Doctor"
                  width={500}
                  height={400}
                  className="object-cover"
                />

                <div className="absolute bottom-5 left-5 right-5 bg-[#1A1A1ACC] rounded-2xl p-4">
                    <h3
                      className="text-white font-[600] font-[Plus_Jakarta_Sans] text-[15.32px] leading-[23.82px] tracking-[-0.1px]"
                    >
                      Dr. Michael Sterling
                    </h3>
                    <p
                      className="text-white font-[500] font-[Plus_Jakarta_Sans] text-[11.91px] leading-[100%] tracking-[-0.1px] mt-1"
                    >
                      Gynecologist, Obstetrician
                      <br />
                      MBBS, FCPS (Gynecology and Obstetrics)
                    </p>
                  </div>

              </div>

              {/* Arrow Button */}
              <div className="absolute top-5 right-5 bg-[#4ADE80] hover:bg-[#3cbb6c] p-3 rounded-full cursor-pointer transition">
                <ArrowRight className="text-white w-5 h-5 rotate-[-25deg]" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Arrows */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <Button className="rounded-full bg-[#4ADE80] hover:bg-[#3cbb6c] text-white w-10 h-10 text-lg">‹</Button>
          <Button className="rounded-full bg-[#4ADE80] hover:bg-[#3cbb6c] text-white w-10 h-10 text-lg">›</Button>
        </div>
      </Card>
    </section>
  );
}
