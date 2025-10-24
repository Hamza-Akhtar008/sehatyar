// import React from 'react'
import Image from 'next/image'

export default function DoctorByCondition() {
  return (
    <div className='px-25 rounded-4xl relative'>
        <div className='flex bg-[#003F31] py-15 px-22.5 rounded-4xl'>
   <div>
            <h1 className='text-white text-[42px] pb-10'>Doctor by <span className='text-[#5FE089]'>condition</span></h1>
        <p className='text-white text-[18px] font-light'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            <br></br>
            Vehicula massa in enim luctus. Rutrum arcu.</p>

            <div className='flex gap-4.5 py-16'>
                <Image src="/images/AppStore1.png" alt="App Store 1" className='w-45' width={50} height={50}/>
                <Image src="/images/AppStore2.png" alt="App Store 2" className='w-45' width={50} height={50}/>
            </div>
        </div>
        <div><Image src="/images/mobileView.svg" alt="Play Store" className='w-[362px] h-[537px] absolute -top-17 right-80' width={50} height={50}/></div>
        </div>
     
    </div>
  )
}
