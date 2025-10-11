'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react'

const primaryColor = '#5FE089'
const roles = [
	{ label: 'Doctor', value: 'doctor' },
	{ label: 'Receptionist', value: 'receptionist' },
	{ label: 'Patient', value: 'patient' },
]

const page = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)
	const [form, setForm] = useState({
		name: '',
		email: '',
		phone: '',
		role: '',
		password: '',
		confirm: '',
	})
	const [confirmError, setConfirmError] = useState('')

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value })
		if (e.target.name === 'confirm') {
			setConfirmError(
				e.target.value !== form.password ? 'Passwords do not match' : ''
			)
		}
		if (e.target.name === 'password') {
			setConfirmError(
				form.confirm && form.confirm !== e.target.value
					? 'Passwords do not match'
					: ''
			)
		}
	}

	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			{/* Left Side Register Card - Scrollable */}
			<div className="w-full md:w-1/2 lg:w-1/2 flex items-center justify-center py-8 md:py-12 overflow-y-auto">
				<div className="bg-[#F4F4F4] px-6 py-8 md:px-20 rounded-2xl shadow-xl w-full max-w-[95vw] md:max-w-[600px] flex flex-col justify-between">
					{/* Logo */}
					<div>
						<div className="text-center mb-6">
							<Image
								src="/assets/Logo.png"
								alt="Logo"
								width={80}
								height={80}
								className="mx-auto mb-2 object-contain"
								priority
							/>
							<h2
								className="text-2xl font-bold"
								style={{ color: primaryColor }}
							>
								Create Account
							</h2>
							<p className="text-gray-500 mt-2 mb-0">
								Register to get started
							</p>
						</div>
						{/* Register Form */}
						<form>
							{/* Name */}
							<div className="mb-4">
								<label className="block mb-1 text-gray-800 font-medium">
									Name
								</label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
										<User size={20} />
									</span>
									<input
										type="text"
										name="name"
										value={form.name}
										onChange={handleChange}
										placeholder="Enter your name"
										className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 outline-none text-base"
									/>
								</div>
							</div>
							{/* Email */}
							<div className="mb-4">
								<label className="block mb-1 text-gray-800 font-medium">
									Email
								</label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
										<Mail size={20} />
									</span>
									<input
										type="email"
										name="email"
										value={form.email}
										onChange={handleChange}
										placeholder="Enter your email"
										className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 outline-none text-base"
									/>
								</div>
							</div>
							{/* Phone */}
							<div className="mb-4">
								<label className="block mb-1 text-gray-800 font-medium">
									Phone
								</label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
										<Phone size={20} />
									</span>
									<input
										type="tel"
										name="phone"
										value={form.phone}
										onChange={handleChange}
										placeholder="Enter your phone"
										className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 outline-none text-base"
									/>
								</div>
							</div>
							{/* Role */}
							<div className="mb-4">
								<label className="block mb-1 text-gray-800 font-medium">
									Role
								</label>
								<select
									name="role"
									value={form.role}
									onChange={handleChange}
									className="w-full px-3 py-3 rounded-lg border border-gray-300 outline-none text-base bg-white"
								>
									<option value="">Select role</option>
									{roles.map(r => (
										<option key={r.value} value={r.value}>
											{r.label}
										</option>
									))}
								</select>
							</div>
							{/* Password */}
							<div className="mb-4">
								<label className="block mb-1 text-gray-800 font-medium">
									Password
								</label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
										<Lock size={20} />
									</span>
									<input
										type={showPassword ? 'text' : 'password'}
										name="password"
										value={form.password}
										onChange={handleChange}
										placeholder="Enter your password"
										className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 outline-none text-base"
									/>
									<button
										type="button"
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
										tabIndex={-1}
										onClick={() => setShowPassword(v => !v)}
									>
										{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
									</button>
								</div>
							</div>
							{/* Confirm Password */}
							<div className="mb-6">
								<label className="block mb-1 text-gray-800 font-medium">
									Confirm Password
								</label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
										<Lock size={20} />
									</span>
									<input
										type={showConfirm ? 'text' : 'password'}
										name="confirm"
										value={form.confirm}
										onChange={handleChange}
										placeholder="Confirm your password"
										className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
											confirmError ? 'border-red-400' : 'border-gray-300'
										} outline-none text-base`}
									/>
									<button
										type="button"
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
										tabIndex={-1}
										onClick={() => setShowConfirm(v => !v)}
									>
										{showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
									</button>
								</div>
								{confirmError && (
									<p className="text-red-500 text-sm mt-2">{confirmError}</p>
								)}
							</div>
							<button
								type="submit"
								className="w-full py-3 font-semibold text-lg rounded-lg"
								style={{
									background: primaryColor,
									color: '#fff',
									boxShadow: '0 2px 8px rgba(95,224,137,0.15)',
								}}
								disabled={!!confirmError}
							>
								Register
							</button>
						</form>
					</div>
					{/* Divider */}
					<div className="my-6 flex items-center">
						<div className="flex-grow h-px bg-gray-300" />
						<span className="mx-3 text-gray-400 text-sm">or</span>
						<div className="flex-grow h-px bg-gray-300" />
					</div>
					{/* Login Section */}
					<div className="text-center">
						<span className="text-gray-600 text-base">
							Already have an account?
						</span>
						<a
							href="/login"
							className="ml-2 text-base font-semibold"
							style={{ color: primaryColor }}
						>
							Login
						</a>
					</div>
				</div>
			</div>
			{/* Right Side Image - Fixed Position */}
			<div className="relative w-full md:w-1/2 lg:w-1/2 h-[40vh] md:h-screen md:fixed md:right-0 md:top-0 hidden md:block">
				<Image
					src="/images/image.webp"
					alt="Register Visual"
					fill
					className="object-cover w-full h-full"
					priority
				/>
				<div
					className="absolute inset-0"
					
				/>
			</div>
		</div>
	)
}

export default page