import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Doctors() {
  return (
    <section className="p-25 px-20">
      <div className="relative">
       <div className="absolute bottom-0 left-0 w pointer-events-none">
          <Image 
            src="/hero-bg.png" 
            alt="Decorative" 
            width={286} 
            height={50} 
            className="object-contain select-none" 
          />
        </div>
      <div className="bg-card py-20 px-25 rounded-4xl">
      {/* <Card className=""> */}
        {/* Decorative Backgrounds */}
        {/* <div className="doctors-bg-decoration">
          <Image 
            src="/hero-bg.png" 
            alt="Decorative" 
            width={286} 
            height={50} 
            className="object-contain select-none" 
          />
        </div> */}
      
        
        {/* Title + Description */}
        <div className="">
          <div className="">
            <h2 className="doctors-title">
              Popular <span className="doctors-title-accent">Doctors</span>
            </h2>
            <p className="doctors-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br></br>
               Vehicula massa in enim luctus. Rutrum arcu.
            </p>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="doctors-grid">
          {[1, 2, 3].map((index) => (
            <div key={index} className="doctors-card-item">
              {/* <div className="doctors-card-inner"> */}
              <div className="">
                <div className="doctors-image-container items-start inline-flex">
                  <Image
                    src="/assets/doctors.svg"
                    alt="Doctor"
                    width={388}
                    height={437.78}
                    className="doctors-image"
                    />
                    <span className="w-15 h-15 -ml-17 mt-2 bg-[#4ADE80] hover:bg-[#3cbb6c] p-4.5  rounded-full cursor-pointer transition text-white rotate-320">
                      {/* <span className=""> */}

                      <ArrowRight className="doctors-image-arrow" />
                      {/* </span> */}
                    </span>
                </div>
                <div className="doctors-info-card">
                  <h3 className="doctors-name">
                    Dr. Michael Sterling
                  </h3>
                  <p className="doctors-specialization">
                    Gynecologist, Obstetrician
                    <br />
                    MBBS, FCPS (Gynecology and Obstetrics)
                  </p>
                </div>
              </div>
              {/* Arrow Button */}
              {/* <div className="doctors-arrow-button">
                <ArrowRight className="doctors-arrow-icon" />
              </div> */}
            </div>
          ))}
        </div>

        {/* Pagination Arrows */}
        <div className="doctors-pagination">
          <Button className="doctors-pagination-button">‹</Button>
          <Button className="doctors-pagination-button">›</Button>
        </div>
        </div>
        </div>
      {/* </Card> */}
    </section>
  );
}