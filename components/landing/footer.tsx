import React from 'react'
import Image from 'next/image'
// import {tickIcon} from '../../public/helperFile'

export default function Footer() {
  return (
    <div className='p-10 md:p-14 lg:p-25'>
        {/* <div className='flex gap-32.5'> */}
        <div className='md:flex lg:gap-5 xl:gap-15 2xl:gap-22 gap-4'>
            <div className='md:w-3/12'>
            <Image src="/images/logo2.webp" width={130} height={40} alt="sehatyar-logo"/>
           <p className='mt-8 text-base'>Book appointments with the best Doctors and Specialists such as Gynecologists, Skin Specialists, Child Specialists, Surgeons, etc. Avail test services such as MRI, CT scan, Ultrasound, X-Ray, etc. and Online Doctor Video Consultations all across Pakistan conveniently.</p>
            </div>
            <div className='hidden md:flex md:w-2/12'>
                <ul className='md:flex flex-col gap-5'>
                    <li className='uppercase  font-bold text-[#01503F] text-lg'>Company</li>
                    <li className='text-base'>Doctors</li>
                    <li className='text-base'>Clinics</li>
                    <li className='text-base'>How It’s Works</li>
                    <li className='text-base'>About Us</li>
                </ul>
            </div>
            <div className='hidden md:flex md:w-2/12'>
                 <ul className='md:flex flex-col gap-5'>
                    <li className='font-bold uppercase text-[#01503F] text-lg'>More</li>
                    <li className='text-base'>Health Blog</li>
                    <li className='text-base'>Forum</li>
                    <li className='text-base'>For Doctors</li>
                    <li className='text-base'>Pharmacy</li>
                    <li className='text-base'>Labs</li>
                    <li className='text-base'>Lab Tests</li>
                </ul>
            </div>



{/* Mobile View start */}
<div className='flex md:hidden py-8'>

  <div className='w-6/12 md:w-2/12'>
                <ul className='md:flex flex-col gap-5'>
                    <li className='uppercase  font-bold text-[#01503F] text-lg'>Company</li>
                    <li className='text-base'>Doctors</li>
                    <li className='text-base'>Clinics</li>
                    <li className='text-base'>How It’s Works</li>
                    <li className='text-base'>About Us</li>
                </ul>
            </div>
            <div className='w-6/12 md:w-2/12'>
                 <ul className='md:flex flex-col gap-5'>
                    <li className='font-bold uppercase text-[#01503F] text-lg'>More</li>
                    <li className='text-base'>Health Blog</li>
                    <li className='text-base'>Forum</li>
                    <li className='text-base'>For Doctors</li>
                    <li className='text-base'>Pharmacy</li>
                    <li className='text-base'>Labs</li>
                    <li className='text-base'>Lab Tests</li>
                </ul>
            </div>

</div>
{/* Mobile View end */}






            <div className='flex flex-col gap-3 md:w-5/12 lg:w-4/12'>
                <div className='flex py-4.5 px-5.5 items-center bg-[#F5F5F5] rounded-full gap-3'>
                    <div className=''>
<Image src="/images/tick.png" width={47} height={47} alt="tick-icon"/>
                    </div>
<div className='flex flex-col'>
    <h1 className='text-sm text-[#01503F] font-semibold tracking-wide mb-3'>PMDC Verified Doctors</h1>
    <p className='text-base'>Authentic & updates information</p>
</div>
                </div>

<div className='flex py-4.5 px-5.5 items-center bg-[#F5F5F5] rounded-full gap-3'>
                    <div className=''>
                        {/* {tickIcon} */}
                        <Image src="/images/headphones.png" width={47} height={47} alt="tick-icon"/>
                    </div>
<div className='flex flex-col'>
    <h1 className='text-sm text-[#01503F] font-semibold tracking-wide'>Reliable Customer Support</h1>
    <p className='text-base'>7 days a week</p>
</div>
                </div>

                <div className='flex py-4.5 px-5.5 items-center bg-[#F5F5F5] rounded-full gap-3'>
                    <div className=''>
                        {/* {tickIcon} */}
                        <Image src="/images/tickshield.png" width={43} height={43} alt="tick-icon"/>
                    </div>
<div className='flex flex-col'>
    <h1 className='text-sm text-[#01503F] font-semibold tracking-wide'>Secure Online Payment</h1>
    <p className='text-base'>Secure checkout using SSL Certificate</p>
</div>
                </div>

            </div>
            <div className='lg:flex flex-col hidden gap-4 text-black'>
                <Image src="/images/AppStore1.png" width={202} height={65} alt="footer-image"/>
                <Image src="/images/AppStore2.png" width={202} height={65} alt="footer-image"/>
            </div>

{/* Mobile View start */}
<div className='md:hidden flex gap-4 text-black py-8'>
                <Image src="/images/AppStore1.png" width={180} height={65} alt="footer-image"/>
                <Image src="/images/AppStore2.png" width={180} height={65} alt="footer-image"/>
            </div>


        </div>
    </div>
  )
}