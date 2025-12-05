// import React from 'react'
import Image from 'next/image'

export default function DoctorByCondition() {
  return (
    <div className='w-full flex justify-center py-10 md:py-14 lg:py-20 px-4'>
        <div className='w-full max-w-[1370px]'>
            <div className='flex bg-[#4e148c] py-10 xl:py-15 md:px-22.5 px-5 rounded-4xl relative '>
                <div className='w-full md:w-6/12 lg:w-7/12 xl:w-6/12 relative z-50'>
                    <h1 className='text-white text-4xl pb-5 md:pb-10'>Download the <span className='text-white'>Sehat Yar App</span></h1>
                    <p className='text-white text-lg font-light pr-32 md:pr-0'>Book trusted doctors and manage your health with ease.
                        <br></br>
                        Because your health deserves better.
                    </p>

                    <div className='flex gap-4.5 py-8 xl:py-16 flex-col md:flex-row'>
                        <Image src="/images/store1.svg" alt="App Store 1" className='w-45' width={50} height={50}/>
                        <Image src="/images/store2.svg" alt="App Store 2" className='w-45' width={50} height={50}/>
                    </div>
                </div>

                {/* Mobile View Image */}
                <div className='md:hidden absolute -right-[-10px] -bottom-7 w-[160px] h-[200px]'>
                     <Image src="/images/mobiledevice.svg" alt="Mobile App" className='w-full h-full object-contain' width={60} height={100}/>
                </div>

                <div><Image src="/images/mobile.svg" alt="Play Store" className='hidden md:flex h-100 w-80 lg:h-120 lg:w-120  xl:h-150 xl:w-120 2xl:h-150 2xl:w-110 absolute z-10 bottom-0 right-10 xl:right-20' width={50} height={100}/></div>
            </div>
        </div>
    </div>
  )
}