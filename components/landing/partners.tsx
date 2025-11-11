"use client"

import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useRef, useEffect } from "react"

export default function Partners() {
  const autoplay = useRef(
    Autoplay({ delay: 0, stopOnInteraction: false, speed: 0.5 }) // very small speed
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: true }, // skipSnaps allows smooth continuous scroll
    [autoplay.current]
  )

  useEffect(() => {
    if (emblaApi) emblaApi.reInit()
  }, [emblaApi])

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

  return (
     <section className="py-10 md:py-53 px-20 text-center">
      <h1 className="text-4xl font-semibold">
        Our <span className="text-green-500">Partners</span>
      </h1>

      <div
        className="overflow-hidden mt-10 cursor-grab active:cursor-grabbing"
        ref={emblaRef}
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="flex items-center gap-6">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex-[0_0_auto] flex items-center justify-center"
            >
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={`Partner logo ${index + 1}`}
                width={logo.width}
                height={logo.height}
                style={{ height: "68px", width: "auto" }}
                className="object-contain transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
