import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Specialists() {
  return (
    <section
      aria-label="Specialists section"
      className="ml-[100px] mr-[100px] mt-[50px] relative"
    >
  <Card className="max-w-[1620px] bg-[#F4F4F4] md:p-10 rounded-3xl shadow-sm border-0 relative overflow-hidden">

        {/* Title + Description */}
        <div className="flex items-center justify-between mt-10 relative z-10">
          <div className="text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-[40px]">
              Doctors <span className="text-[#5FE089]">Speciality</span>
            </h2>
            <p className="text-gray-500 max-w-[600px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
            </p>
          </div>

          {/* View All button opposite the heading */}
          <div className="ml-6">
            <Button
              className="bg-[#01503F] text-white font-medium text-[14px] leading-[24px] px-4 py-2 rounded-full"
            >
              View All
            </Button>
          </div>
        </div>

        {/* Specialists image - full width & responsive height */}
        <div className="mt-10 relative z-10">
          <div className="relative w-full h-[300px] sm:h-[380px] md:h-[420px] lg:h-[480px]">
            <Image
              src="/assets/Frame.svg"
              alt="Specialists"
              fill
              style={{ objectFit: 'cover' }}
              className="select-none"
            />
          </div>
        </div>
          
      </Card>
    </section>
  );
}
