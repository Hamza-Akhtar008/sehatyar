import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hospitals() {
  return (
    <section aria-label="Hospitals section" className="hospitals-section">
      <Card className="card p-25 px-20">

        {/* Decorative Backgrounds */}
        <div className="hospitals-bg-decoration">
          <Image src="/hero-bg.png" alt="Decorative" width={286} height={50} className="object-contain select-none" />
        </div>
        

        {/* Title + Description */}
        <div className="hospitals-header">
          <div className="text-left">
            <h2 className="hospitals-title">
              Popular <span className="hospitals-title-accent">Hospitals</span>
            </h2>
            <p className="hospitals-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br></br>
               Vehicula massa in enim luctus. Rutrum arcu.
            </p>
          </div>
        </div>

        {/* Hospitals Grid */}
        <div className="hospitals-grid">
          {[1, 2, 3].map((index) => (
            <div key={index} className="doctors-card-item">
              <div className="">
                <div className="doctors-image-container items-start inline-flex">
                  <Image
                    src="/assets/hospital.svg"
                    alt="Hospital"
                    width={388}
                    height={437.78}
                    className="hospitals-image items-start inline-flex"
                  />
                   <span className="w-15 h-15 -ml-17 mt-2 bg-[#4ADE80] hover:bg-[#3cbb6c] p-4.5  rounded-full cursor-pointer transition text-white rotate-320">
                      {/* <span className=""> */}

                      <ArrowRight className="doctors-image-arrow" />
                      {/* </span> */}
                    </span>
                </div>
                <div className="hospitals-info-card">
                  <h3 className="hospitals-name">Shifa International Hospital</h3>
                  <p className="hospitals-specialization">Multispeciality | Islamabad</p>
                </div>
              </div>
              {/* Arrow Button */}
              {/* <div className="hospitals-arrow-button">
                <ArrowRight className="hospitals-arrow-icon" />
              </div> */}
            </div>
          ))}
        </div>

        {/* Pagination Arrows */}
        <div className="hospitals-pagination">
          <Button className="hospitals-pagination-button">‹</Button>
          <Button className="hospitals-pagination-button">›</Button>
        </div>
      </Card>
    </section>
  );
}
