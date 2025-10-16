import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Conditions() {
  return (
    <section aria-label="Conditions section" className="conditions-section">
      <Card className="card py-25 px-20">
        {/* Title + Description + Button */}
        <div className="conditions-header">
          <div className="conditions-title-container">
            <h2 className="conditions-title">
              Doctor by <span className="conditions-title-accent">condition</span>
            </h2>
            <p className="conditions-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br></br>
               Vehicula massa in enim luctus. Rutrum arcu.
            </p>
          </div>

          {/* View All button opposite the heading */}
          <div className="conditions-button-container">
            <Button className="view-all-button">
              View All
            </Button>
          </div>
        </div>

        {/* Specialists image - full width & responsive height */}
        <div className="conditions-image-container">
          <div className="conditions-image-wrapper rounded-4xl">
            <Image
              src="/assets/Frame1.svg"
              alt="Specialists"
              fill
              className="conditions-image"
            />
          </div>
        </div>
      </Card>
    </section>
  );
}