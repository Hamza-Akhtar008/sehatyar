import React from 'react'
import Image from 'next/image'
// import {tickIcon} from '../../public/helperFile'

export default function footer() {
  return (
    <div className=' p-25'>
        {/* <div className='flex gap-32.5'> */}
        <div className=' gap-32.5'>
            <div className='w-3/12'>
            <Image src="/images/logo2.webp" width={130} height={40} alt="sehatyar-logo"/>
           <p className='mt-8'>Book appointments with the best Doctors and Specialists such as Gynecologists, Skin Specialists, Child Specialists, Surgeons, etc. Avail test services such as MRI, CT scan, Ultrasound, X-Ray, etc. and Online Doctor Video Consultations all across Pakistan conveniently.</p>
            </div>
            <div className='w-2/12'>
                <ul className='flex flex-col gap-5'>
                    <li className='uppercase  font-bold text-[#01503F]'>Company</li>
                    <li>Doctors</li>
                    <li>Clinics</li>
                    <li>How It’s Works</li>
                    <li>About Us</li>
                </ul>
            </div>
            <div className='w-2/12'>
                 <ul className='flex flex-col gap-5'>
                    <li className='font-bold uppercase text-[#01503F]'>More</li>
                    <li>Health Blog</li>
                    <li>Forum</li>
                    <li>For Doctors</li>
                    <li>Pharmacy</li>
                    <li>Labs</li>
                    <li>Lab Tests</li>
                </ul>
            </div>
            <div className='flex flex-col gap-3 w-4/12'>
                <div className='flex py-4.5 px-5.5 items-center bg-[#F5F5F5] rounded-full gap-3'>
                    <div className=''>
<Image src="/images/tick.png" width={47} height={47} alt="tick-icon"/>
                    </div>
<div className='flex flex-col'>
    <h1 className='text-sm text-[#01503F] font-semibold tracking-wide mb-3'>PMDC Verified Doctors</h1>
    <p>Authentic & updates information</p>
</div>
                </div>

<div className='flex py-4.5 px-5.5 items-center bg-[#F5F5F5] rounded-full gap-3'>
                    <div className=''>
                        {/* {tickIcon} */}
                        <Image src="/images/headphones.png" width={47} height={47} alt="tick-icon"/>
                    </div>
<div className='flex flex-col'>
    <h1 className='text-sm text-[#01503F] font-semibold tracking-wide'>Reliable Customer Support</h1>
    <p>7 days a week</p>
</div>
                </div>

                <div className='flex py-4.5 px-5.5 items-center bg-[#F5F5F5] rounded-full gap-3'>
                    <div className=''>
                        {/* {tickIcon} */}
                        <Image src="/images/tickshield.png" width={43} height={43} alt="tick-icon"/>
                    </div>
<div className='flex flex-col'>
    <h1 className='text-sm text-[#01503F] font-semibold tracking-wide'>Secure Online Payment</h1>
    <p>Secure checkout using SSL Certificate</p>
</div>
                </div>

            </div>
            <div className='flex flex-col gap-4 text-black'>
                <Image src="/images/AppStore1.png" width={202} height={65} alt="footer-image"/>
                <Image src="/images/AppStore2.png" width={202} height={65} alt="footer-image"/>
            </div>
        </div>
        <div className='mt-12.5 py-5.5 px-15.5 border-[1px] rounded-full border-[#CDCDCD]'>
            {/* <div className='flex justify-between'> */}
            <div className=' justify-between'>
                <div className='flex items-center gap-3 text-sm font-light text-black'>
                 Copyright @ 2015 - 2025 MediConnect Services, a subsidiary of MyDoctor Inc - All Rights Reserved <br></br>
                                    Reproduction of material from any oladoc.com pages without permission is strictly prohibited.   
                </div>
                <div className='flex items-center gap-3 '>
                    <span className='text-black font-light text-sm'>Contact with us</span>
                    <div className=''>

                    </div>
                    <Image src="/images/twitterIcon.png" width={24} height={24} alt="tick-icon"/>
                    <Image src="/images/fbIcon.png" width={24} height={24} alt="tick-icon"/>
                    <Image src="/images/instaIcon.png" width={24} height={24} alt="tick-icon"/>
                    <Image src="/images/githubIcon.png" width={24} height={24} alt="tick-icon"/>
                    {/* <span className='text-sm text-[#01503F] font-semibold'>100% Satisfaction Guarantee</span> */}
                </div>
            </div>
        </div>
    </div>
  )
}
