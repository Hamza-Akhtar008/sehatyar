// import React from 'react'
import Image from 'next/image'

export default function doctorByCondition() {
  return (
    <div className='px-5 md:px-25 rounded-4xl relative'>
        <div className='flex bg-[#003F31] py-10 xl:py-15 md:px-22.5 px-5 rounded-4xl'>
   <div className='w-full md:w-6/12 lg:w-7/12 xl:w-6/12'>
            <h1 className='text-white text-4xl pb-5 md:pb-10'>Doctor by <span className='text-[#5FE089]'>condition</span></h1>
        <p className='text-white text-lg font-light'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            <br></br>
            Vehicula massa in enim luctus. Rutrum arcu.</p>

            <div className='flex gap-4.5 py-8 xl:py-16'>
                <Image src="/images/AppStore1.png" alt="App Store 1" className='w-45' width={50} height={50}/>
                <Image src="/images/AppStore2.png" alt="App Store 2" className='w-45' width={50} height={50}/>
            </div>

            {/* Mobile View Start*/}
 <div><Image src="/images/mobileView.svg" alt="Play Store" className='flex md:hidden w-100 h-100 -mb-10 ' width={50} height={50}/></div>
  {/* Mobile View End*/}
        </div>
        <div><Image src="/images/mobileView.svg" alt="Play Store" className='hidden md:flex h-100 w-80 lg:h-120 lg:w-120  xl:h-150 xl:w-120 2xl:h-150 2xl:w-110 absolute bottom-0 right-40 xl:right-80' width={50} height={50}/></div>
       
        </div>
     
    </div>
  )
}
