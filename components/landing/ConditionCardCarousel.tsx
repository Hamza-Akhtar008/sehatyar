'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

const conditionsData = [
  { name: 'High Blood Pressure', icon: '/doctorbycondition/highBloodPressure.png' },
  { name: 'Piles', icon: '/doctorbycondition/piles.png' },
  { name: 'Diarrhea', icon: '/doctorbycondition/diaerha.png' },
  { name: 'Acne', icon: '/doctorbycondition/Acne.png' },
  { name: 'Pregnancy', icon: '/doctorbycondition/pregnancy.png' },
  { name: 'Fever', icon: '/doctorbycondition/fever.png' },
  { name: 'Heart Attack', icon: '/doctorbycondition/heartAttack.png' },
]

// Repeat the list to create infinite scroll effect
const conditions = [...conditionsData, ...conditionsData, ...conditionsData]

export default function ConditionCardCarousel() {
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
    <section className="w-full flex justify-center items-center py-10 px-4 h-[513px]">
      <div className="bg-[#f4f4f4] rounded-[42px] px-[20px] md:px-[66px] py-[40px] max-w-[1370px] w-full flex flex-col gap-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4e148c] mb-8">
              Doctor by <span className="text-[#ff6600]">Condition</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Quickly find the right specialists for common conditions and get trusted medical care when you need it.
            </p>
          </div>
          <Button className="bg-[#4E148C] text-white rounded-full hover:bg-[#ff6600] px-8 py-6 text-lg">
            View All
          </Button>
        </div>

        {/* Icons Section */}
        <div className="relative bg-[#4E148C] rounded-[22px] px-[20px] md:px-[20px] py-[40px] w-full group/carousel">
          
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
            {conditions.map((condition, index) => (
              <div key={index} className="flex flex-col items-center gap-4 group cursor-pointer min-w-[120px] snap-start">
                <div className="relative w-24 h-24 rounded-full bg-[#3D0F6E] flex items-center justify-center transition-all duration-300 group-hover:bg-[#ff6600] z-10">
                  <Image
                    src={condition.icon}
                    alt={condition.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <span className="text-white text-sm md:text-base font-medium text-center leading-tight">
                  {condition.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
