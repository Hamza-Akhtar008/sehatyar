'use client'
import React, { useState } from 'react'
import Image from 'next/image'

const PRIMARY = '#5fe089'
const GENDER_BG = '#01503f'
const GENDER_ACTIVE = '#003227'
const BORDER = '#BDBDBD'

const RegisterPage = () => {
	const [gender, setGender] = useState<'male' | 'female'>('male')

	return (
		<div className="min-h-screen flex flex-col items-center justify-start bg-white">
			<div className="w-full max-w-[672px] px-4 md:px-0 pt-14 pb-10">
				{/* Header */}
				<div className="mx-auto flex flex-col items-center gap-[30px] w-full max-w-[560px]">
					<Image
						src="/images/logo2.webp"
						alt="Sehatyar"
						width={159}
						height={42}
						className="object-contain"
						priority
					/>
					<h1 className="text-[28px] font-semibold leading-none tracking-tight text-[#343434]">
						Registration <span style={{ color: PRIMARY }}>Form</span>
					</h1>
				</div>

				{/* Full Name */}
				<div className="mt-6">
					<label className="block text-[12px] font-medium text-[#343434] mb-2">
						Full Name <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						placeholder="Full name"
						className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
						style={{ borderColor: BORDER }}
					/>
				</div>

				{/* Gender */}
				<div className="mt-4">
					<div
						className="inline-flex items-center p-1 rounded-full"
						style={{ background: GENDER_BG }}
					>
						<button
							type="button"
							onClick={() => setGender('male')}
							className={`px-5 h-[35px] rounded-full text-white font-semibold transition-colors ${
								gender === 'male' ? 'bg-[#003227]' : ''
							}`}
						>
							Male
						</button>
						<button
							type="button"
							onClick={() => setGender('female')}
							className={`px-5 h-[35px] rounded-full text-white font-semibold transition-colors ${
								gender === 'female' ? 'bg-[#003227]' : ''
							}`}
						>
							Female
						</button>
					</div>
				</div>

				{/* Country / City */}
				<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-[12px] font-medium text-[#343434] mb-2">
							Country <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							placeholder="Pakistan"
							className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
							style={{ borderColor: BORDER }}
						/>
					</div>
					<div>
						<label className="block text-[12px] font-medium text-[#343434] mb-2">
							City <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							placeholder="Abbottabad"
							className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
							style={{ borderColor: BORDER }}
						/>
					</div>

					{/* Email / Phone */}
					<div>
						<label className="block text-[12px] font-medium text-[#343434] mb-2">
							Email <span className="text-red-500">*</span>
						</label>
						<input
							type="email"
							placeholder="lendar@gmail.com"
							className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
							style={{ borderColor: BORDER }}
						/>
					</div>
					<div>
						<label className="block text-[12px] font-medium text-[#343434] mb-2">
							Phone Number <span className="text-red-500">*</span>
						</label>
						<input
							type="tel"
							placeholder="03100057572"
							className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
							style={{ borderColor: BORDER }}
						/>
					</div>

					{/* Password / Confirm Password */}
					<div>
						<label className="block text-[12px] font-medium text-[#343434] mb-2">
							Password <span className="text-red-500">*</span>
						</label>
						<input
							type="password"
							placeholder="Enter the password"
							className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
							style={{ borderColor: BORDER }}
						/>
					</div>
					<div>
						<label className="block text-[12px] font-medium text-[#343434] mb-2">
							Confirm Password <span className="text-red-500">*</span>
						</label>
						<input
							type="password"
							placeholder="Confirm password"
							className="w-full h-[63px] rounded-[12px] border px-4 text-sm outline-none"
							style={{ borderColor: BORDER }}
						/>
					</div>
				</div>

				{/* Next Button */}
				<button
					type="button"
					className="w-full mt-6 h-[48px] md:h-[54px] rounded-full text-[#0b3b22] font-semibold"
					style={{ background: PRIMARY }}
				>
					Next
				</button>
			</div>
		</div>
	)
}

export default RegisterPage