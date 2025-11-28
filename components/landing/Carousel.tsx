'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

const specialistsData = [
  { name: 'Dermatologist', icon: '/images1/dermatologist.png' },
  { name: 'Gynecologist', icon: '/images1/gynco.png' },
  { name: 'Gastroenterologist', icon: '/images1/gestro.png' },
  { name: 'Urologist', icon: '/images1/urologist.png' },
  { name: 'Dentist', icon: '/images1/dentist.png' },
  { name: 'Obesity Specialist', icon: '/images1/obesity.png' },
  { name: 'Orthopedic Surgeon', icon: '/images1/ortheo.png' },
  { name: 'ENT Specialist', icon: '/images1/ent.png' },
]

// Repeat the list as requested
const specialists = [...specialistsData, ...specialistsData, ...specialistsData]

export default function Carousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10) 
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300 
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="w-full flex justify-center py-10 px-4">
      <div className="relative bg-[#4E148C] rounded-[22px] px-[20px] md:px-[20px] py-[40px] max-w-[1370px] w-full group/carousel">
        
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-all"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-all"
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="relative z-10 flex overflow-x-auto scrollbar-hide gap-8 snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {specialists.map((specialist, index) => (
            <div key={index} className="flex flex-col items-center gap-4 group cursor-pointer min-w-[120px] snap-start">
              <div className="relative w-24 h-24 rounded-full bg-[#3D0F6E] flex items-center justify-center transition-all duration-300 group-hover:bg-[#ff6600] z-10">
                <Image
                  src={specialist.icon}
                  alt={specialist.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span className="text-white text-sm md:text-base font-medium text-center leading-tight">
                {specialist.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}