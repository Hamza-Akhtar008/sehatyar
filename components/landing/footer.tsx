import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <div className='w-full flex justify-center py-10 md:py-14 lg:py-20 px-4'>
        <div className='w-full max-w-[1370px] flex flex-col gap-8'>
            {/* Logo and Description */}
            <div className='md:hidden'>
                <Image src="/images/logo.png" width={130} height={40} alt="sehatyar-logo"/>
                <p className='mt-6 text-[15px] leading-relaxed text-gray-700'>
                    Sehatyar is a complete hospital and clinic management system offering smart appointment scheduling, online consultations, seamless billing, and comprehensive healthcare management across Abbottabad, Mansehra, Haripur, and Battagram.
                </p>
            </div>

            {/* Desktop Layout */}
            <div className='hidden md:flex md:gap-6 lg:gap-10 xl:gap-16'>
                {/* Logo and Description - Desktop */}
                <div className='md:w-[35%] lg:w-[30%]'>
                    <Image src="/images/logo.png" width={130} height={40} alt="sehatyar-logo"/>
                    <p className='mt-6 text-[15px] leading-relaxed text-gray-700'>
                        Book appointments with the best doctors and specialists - including Gynecologists, Skin Specialists, Child Specialists, Surgeons, and more.
                    </p>
                    <p className='mt-3 text-[15px] leading-relaxed text-gray-700'>
                        Sehatyar is a complete hospital and clinic management system offering smart appointment scheduling, online consultations, seamless billing, and comprehensive healthcare management across Abbottabad, Mansehra, Haripur, and Battagram.
                    </p>
                </div>

                {/* Company Links - Desktop */}
                <div className='md:w-[15%]'>
                    <ul className='flex flex-col gap-4'>
                        <li className='uppercase font-bold text-[#FF6B35] text-sm mb-1'>COMPANY</li>
                        <li className='text-[15px] text-gray-700 hover:text-[#FF6B35] cursor-pointer transition-colors'>Doctors</li>
                        <li className='text-[15px] text-gray-700 hover:text-[#FF6B35] cursor-pointer transition-colors'>Clinics</li>
                        <li className='text-[15px] text-gray-700 hover:text-[#FF6B35] cursor-pointer transition-colors'>How It's Works</li>
                        <li className='text-[15px] text-gray-700 hover:text-[#FF6B35] cursor-pointer transition-colors'>About Us</li>
                    </ul>
                </div>

                {/* More Links - Desktop */}
                <div className='md:w-[15%]'>
                    <ul className='flex flex-col gap-4'>
                        <li className='font-bold uppercase text-[#FF6B35] text-sm mb-1'>MORE</li>
                        <li className='text-[15px] text-gray-700 hover:text-[#FF6B35] cursor-pointer transition-colors'>Health Blog</li>
                        <li className='text-[15px] text-gray-700 hover:text-[#FF6B35] cursor-pointer transition-colors'>Forum</li>
                        <li className='text-[15px] text-gray-700 hover:text-[#FF6B35] cursor-pointer transition-colors'>For Doctors</li>
                        <li className='text-[15px] text-gray-700 hover:text-[#FF6B35] cursor-pointer transition-colors'>Pharmacy</li>
                        <li className='text-[15px] text-gray-700 hover:text-[#FF6B35] cursor-pointer transition-colors'>Labs</li>
                        <li className='text-[15px] text-gray-700 hover:text-[#FF6B35] cursor-pointer transition-colors'>Lab Tests</li>
                    </ul>
                </div>

                {/* Feature Cards - Desktop */}
                <div className='flex flex-col gap-4 md:w-[35%] lg:w-[30%]'>
                    {/* PMDC Verified Doctors */}
                    <div className='flex items-center bg-[#F5F5F5] rounded-full p-4 gap-4'>
                        <div className='flex-shrink-0'>
                            <Image src="/images/one.png" width={45} height={45} alt="tick-icon"/>
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='text-[15px] text-[#FF6B35] font-semibold mb-1'>PMDC Verified Doctors</h3>
                            <p className='text-[13px] text-gray-600'>Authentic & updates information</p>
                        </div>
                    </div>

                    {/* Reliable Customer Support */}
                    <div className='flex items-center bg-[#F5F5F5] rounded-full p-4 gap-4'>
                        <div className='flex-shrink-0'>
                            <Image src="/images/two.png" width={45} height={45} alt="support-icon"/>
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='text-[15px] text-[#FF6B35] font-semibold mb-1'>Reliable Customer Support</h3>
                            <p className='text-[13px] text-gray-600'>7 days a week</p>
                        </div>
                    </div>

                    {/* Secure Online Payment */}
                    <div className='flex items-center bg-[#F5F5F5] rounded-full p-4 gap-4'>
                        <div className='flex-shrink-0'>
                            <Image src="/images/three.png" width={45} height={45} alt="security-icon"/>
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='text-[15px] text-[#FF6B35] font-semibold mb-1'>Secure Online Payment</h3>
                            <p className='text-[13px] text-gray-600'>Secure checkout using SSL Certificate</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Links - Two Column Grid */}
            <div className='md:hidden grid grid-cols-2 gap-8'>
                {/* Company Links - Mobile */}
                <div>
                    <ul className='flex flex-col gap-3'>
                        <li className='uppercase font-bold text-[#FF6B35] text-sm mb-1'>COMPANY</li>
                        <li className='text-[14px] text-gray-700'>Doctors</li>
                        <li className='text-[14px] text-gray-700'>Clinics</li>
                        <li className='text-[14px] text-gray-700'>How It's Works</li>
                        <li className='text-[14px] text-gray-700'>About Us</li>
                    </ul>
                </div>

                {/* More Links - Mobile */}
                <div>
                    <ul className='flex flex-col gap-3'>
                        <li className='font-bold uppercase text-[#FF6B35] text-sm mb-1'>MORE</li>
                        <li className='text-[14px] text-gray-700'>FAQs</li>
                        <li className='text-[14px] text-gray-700'>Forum</li>
                        <li className='text-[14px] text-gray-700'>Privacy Policy</li>
                        <li className='text-[14px] text-gray-700'>Payment Policy</li>
                        <li className='text-[14px] text-gray-700'>Contact Us</li>
                    </ul>
                </div>
            </div>

            {/* Feature Cards - Mobile */}
            <div className='md:hidden flex flex-col gap-4'>
                {/* PMDC Verified Doctors */}
                <div className='flex items-center bg-[#F5F5F5] rounded-full p-4 gap-4'>
                    <div className='flex-shrink-0'>
                        <Image src="/images/one.png" width={40} height={40} alt="tick-icon"/>
                    </div>
                    <div className='flex flex-col'>
                        <h3 className='text-[14px] text-[#FF6B35] font-semibold mb-1'>PMDC Verified Doctors</h3>
                        <p className='text-[12px] text-gray-600'>Authentic & updates information</p>
                    </div>
                </div>

                {/* Reliable Customer Support */}
                <div className='flex items-center bg-[#F5F5F5] rounded-full p-4 gap-4'>
                    <div className='flex-shrink-0'>
                        <Image src="/images/two.png" width={40} height={40} alt="support-icon"/>
                    </div>
                    <div className='flex flex-col'>
                        <h3 className='text-[14px] text-[#FF6B35] font-semibold mb-1'>Reliable Customer Support</h3>
                        <p className='text-[12px] text-gray-600'>7 days a week</p>
                    </div>
                </div>

                {/* Secure Online Payment */}
                <div className='flex items-center bg-[#F5F5F5] rounded-full p-4 gap-4'>
                    <div className='flex-shrink-0'>
                        <Image src="/images/three.png" width={40} height={40} alt="security-icon"/>
                    </div>
                    <div className='flex flex-col'>
                        <h3 className='text-[14px] text-[#FF6B35] font-semibold mb-1'>Secure Online Payment</h3>
                        <p className='text-[12px] text-gray-600'>Secure checkout using SSL Certificate</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}