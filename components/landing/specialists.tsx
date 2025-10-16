import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Specialists() {
  return (
    <section aria-label="Specialists section" className="specialists-section">
      <Card className="card py-25 px-20 my-25">
        {/* Title + Description */}
        <div className="specialists-header">
          <div className="specialists-title-container">
            <h2 className="specialists-title">
              Doctors <span className="specialists-title-accent">Speciality</span>
            </h2>
            <p className="specialists-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br></br>
               Vehicula massa in enim luctus. Rutrum arcu.
            </p>
          </div>

          {/* View All button opposite the heading */}
          <div className="specialists-button-container">
            <Button className="view-all-button">
              View All
            </Button>
          </div>
        </div>

        {/* Specialists image - full width & responsive height */}
        <div className="specialists-image-container ">
          <div className="specialists-image-wrapper rounded-4xl">
            <Image
              src="/assets/Frame.svg"
              alt="Specialists"
              fill
              className="specialists-image"
            />
          </div>
        </div>
      </Card>
    </section>
  );
}