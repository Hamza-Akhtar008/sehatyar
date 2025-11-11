"use client"

import Image from "next/image"

export default function Partners() {
  const logos = [
    { src: "/partners/image 18.png", width: 140, height: 51 },
    { src: "/partners/image 19.png", width: 134, height: 51 },
    { src: "/partners/image 20.png", width: 172, height: 51 },
    { src: "/partners/image 21.png", width: 314, height: 51 },
    { src: "/partners/image 22.png", width: 182, height: 51 },
    { src: "/partners/image 23.png", width: 102, height: 51 },
    { src: "/partners/image 24.png", width: 114, height: 51 },
    { src: "/partners/image 25.png", width: 142, height: 51 },
    { src: "/partners/image 26.png", width: 179, height: 51 },
    { src: "/partners/image 27.png", width: 100, height: 51 },
    { src: "/partners/image 28.png", width: 61, height: 51 },
    { src: "/partners/image 29.png", width: 66, height: 65 },
    { src: "/partners/image 30.png", width: 68, height: 68 },
  ]

  // Duplicate logos for seamless scrolling
  const scrollingLogos = [...logos, ...logos]

  return (
    <section className="py-10 md:py-53 px-10 text-center">
      <h1 className="text-4xl font-semibold">
        Our <span className="text-green-500">Partners</span>
      </h1>

      {/* Wrapper with fade */}
      <div
        className="relative overflow-hidden mt-10"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        <div className="flex animate-marquee gap-6">
          {scrollingLogos.map((logo, index) => (
            <div key={index} className="flex-[0_0_auto] flex items-center justify-center">
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={`Partner logo ${index + 1}`}
                width={logo.width}
                height={logo.height}
                style={{ height: "68px", width: "auto" }}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 10s linear infinite; /* slow scroll */
        }
      `}</style>
    </section>
  )
}
