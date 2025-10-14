import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Doctors() {
  return (
    <section aria-label="Doctors section" className="doctors-section">
      <Card className="card">
        {/* Decorative Backgrounds */}
        <div className="doctors-bg-decoration">
          <Image 
            src="/hero-bg.png" 
            alt="Decorative" 
            width={286} 
            height={50} 
            className="object-contain select-none" 
          />
        </div>
        
        {/* Title + Description */}
        <div className="doctors-header">
          <div className="text-left">
            <h2 className="doctors-title">
              Popular <span className="doctors-title-accent">Doctors</span>
            </h2>
            <p className="doctors-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
            </p>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="doctors-grid">
          {[1, 2, 3].map((index) => (
            <div key={index} className="doctors-card-item">
              <div className="doctors-card-inner">
                <div className="doctors-image-container">
                  <Image
                    src="/assets/doctors.svg"
                    alt="Doctor"
                    width={388}
                    height={437.78}
                    className="doctors-image"
                  />
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
              <div className="doctors-arrow-button">
                <ArrowRight className="doctors-arrow-icon" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Arrows */}
        <div className="doctors-pagination">
          <Button className="doctors-pagination-button">‹</Button>
          <Button className="doctors-pagination-button">›</Button>
        </div>
      </Card>
    </section>
  );
}