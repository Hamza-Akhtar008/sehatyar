import React from 'react'
import Image from 'next/image'
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function CustomerReview() {
  const reviews = [
    {
      id: 1,
      name: 'Muhammad Farhan',
      role: 'Administrator',
      image: '/images/recentdoctor.png',
      rating: 5,
      text: 'As a clinic admin, Sehatyar has reduced our workload a lot. Patients can book easily, and we manage queues without chaos.',
      active: false
    },
    {
      id: 2,
      name: 'Asfand Yar',
      role: 'Freelancer',
      image: '/images/recentdoctor2.png',
      rating: 4,
      text: 'The video consultation feature saved me a trip to the hospital. The doctor understood my issue clearly, and the experience felt professional and easy.',
      active: true
    },
    {
      id: 3,
      name: 'Dr. Hamza Rehman',
      role: 'General Physician',
      image: '/images/recentdoctor3.png',
      rating: 4,
      text: 'Managing my clinic has become much easier with Sehatyar. Appointment scheduling, records, billing—everything is organized in one place.',
      active: false
    }
  ]

  return (
    <div className='w-full flex justify-center py-10 md:py-14 lg:py-20 px-4'>
        <div className='w-full max-w-[1370px] bg-[#F3F3F3] rounded-[40px] p-6 md:p-12'>
            {/* Header */}
            <div className='flex justify-between items-center mb-8 md:mb-12'>
                <h2 className='text-3xl md:text-5xl font-bold'>
                    <span className='text-[#421B75]'>Testimonials</span> <span className='text-[#FF7A00]'>Users</span>
                </h2>
                <div className='flex gap-3'>
                    <button className='w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#421B75] text-white flex items-center justify-center hover:bg-[#FF7A00] transition-colors'>
                        <FaChevronLeft size={16} />
                    </button>
                    <button className='w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#421B75] text-white flex items-center justify-center hover:bg-[#FF7A00] transition-colors'>
                        <FaChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {reviews.map((review) => (
                    <div 
                        key={review.id} 
                        className={`p-6 md:p-8 rounded-3xl transition-all duration-300 ${
                            review.active 
                            ? 'bg-white border border-[#421B75] shadow-sm' 
                            : 'bg-transparent border border-transparent'
                        }`}
                    >
                        {/* Stars */}
                        <div className='flex gap-1 mb-4'>
                            {[...Array(5)].map((_, i) => (
                                <FaStar 
                                    key={i} 
                                    size={20} 
                                    className={i < review.rating ? 'text-[#FF7A00]' : 'text-gray-300'} 
                                />
                            ))}
                        </div>

                        {/* Text */}
                        <p className='text-gray-500 text-[15px] leading-relaxed mb-8 min-h-[80px]'>
                            {review.text}
                        </p>

                        {/* User Info */}
                        <div className='flex items-center gap-4'>
                            <div className='relative w-14 h-14 rounded-full overflow-hidden'>
                                <Image 
                                    src={review.image} 
                                    alt={review.name} 
                                    fill
                                    className='object-cover'
                                />
                            </div>
                            <div>
                                <h4 className='text-[#421B75] font-bold text-[16px]'>{review.name}</h4>
                                <p className='text-gray-500 text-[13px]'>{review.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
