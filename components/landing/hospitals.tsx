import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hospitals() {
  return (
    <section aria-label="Hospitals section" className="hospitals-section">
      <Card className="card">

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
            </p>
          </div>
        </div>

        {/* Hospitals Grid */}
        <div className="hospitals-grid">
          {[1, 2, 3].map((index) => (
            <div key={index} className="hospitals-card-item">
              <div className="hospitals-card-inner">
                <div className="hospitals-image-container">
                  <Image
                    src="/assets/hospital.svg"
                    alt="Hospital"
                    width={388}
                    height={437.78}
                    className="hospitals-image"
                  />
                </div>
                <div className="hospitals-info-card">
                  <h3 className="hospitals-name">Shifa International Hospital</h3>
                  <p className="hospitals-specialization">Multispeciality | Islamabad</p>
                </div>
              </div>
              {/* Arrow Button */}
              <div className="hospitals-arrow-button">
                <ArrowRight className="hospitals-arrow-icon" />
              </div>
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
