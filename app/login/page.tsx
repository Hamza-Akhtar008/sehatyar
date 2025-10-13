"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

const PRIMARY = "#5fe089";
const BORDER = "#BDBDBD";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [role, setRole] = useState("Patient");

	return (
		<div className="min-h-screen flex items-center justify-center overflow-hidden">
			{/* Main Container */}
			<div className="flex w-full max-w-[1200px] min-h-[700px] md:justify-center lg:justify-start">
				{/* Left Side Card */}
				<div
					className="
      flex flex-col justify-center
      w-full max-w-[500px]
      ml-4 lg:ml-16
      rounded-[24px]
      lg:px-12 py-10
    "
				>
					{/* Logo */}
					<div className="flex flex-col items-start mb-6">
						<Image
							src="/images/logo2.webp"
							alt="Sehatyar"
							width={159}
							height={42}
							className="object-contain mb-2"
							priority
						/>
					</div>
					{/* Title */}
					<h2
						className="text-[22px] font-semibold mb-8"
						style={{ color: "#000000" }}
					>
						Please Login to your{" "}
						<span style={{ color: PRIMARY }}>Account</span>
					</h2>
					{/* Login Form */}
					<form>
						<div className="mb-5">
							<label
								htmlFor="email"
								className="block text-[16px] mb-2 font-medium"
								style={{ color: "#000000" }}
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								placeholder="lendar@gmail.com"
								className="w-full max-w-[400px] lg:max-w-[480px] h-[48px] rounded-[12px] border px-4 text-[15px] font-normal outline-none"
								style={{ borderColor: BORDER, color: "#000000" }}
							/>
						</div>
						<div className="mb-5">
							<label
								htmlFor="password"
								className="block text-[16px] mb-2 font-medium"
								style={{ color: "#000000" }}
							>
								Password
							</label>
							<div className="relative max-w-[400px] lg:max-w-[480px]">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="**********"
									className="w-full h-[48px] rounded-[12px] border px-4 text-[15px] font-normal outline-none"
									style={{ borderColor: BORDER, color: "#000000" }}
								/>
								<button
									type="button"
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
									tabIndex={-1}
									onClick={() => setShowPassword((v) => !v)}
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
						</div>

						{/* Remember me & Forgot Password */}
						<div className="flex items-center justify-between mb-6 max-w-[400px]">
							<label
								className="flex items-center text-[15px]"
								style={{ color: "#000000" }}
							>
								<input type="checkbox" className="mr-2 accent-[#5fe089]" />
								Remember me
							</label>
							<a
								href="#"
								className="text-[15px] font-medium"
								style={{ color: PRIMARY }}
							>
								Forgot Password ?
							</a>
						</div>
						{/* Sign In Button */}
						<button
							type="submit"
							className="w-full max-w-[400px] h-[48px] rounded-[99px] font-semibold text-[16px] bg-[#5fe089] mb-4"
							style={{ color: "#000000" }}
						>
							Sign in
						</button>
						{/* Sign Up Link */}
						<div className="text-center mb-6 max-w-[400px]">
							<span className="text-base" style={{ color: "#000000" }}>
								Don't have an account?
							</span>
							<a
								href="/register"
								className="ml-2 text-base font-semibold"
								style={{ color: PRIMARY }}
							>
								Sign Up
							</a>
						</div>
						{/* Social Login Buttons */}
						<div className="flex gap-4 justify-center max-w-[400px]">
							<button
								type="button"
								className="flex items-center justify-center gap-[10px] w-[180px] h-[44px] rounded-[99px] border px-[12px] py-0 text-[13px] font-medium bg-white"
								style={{ color: "#000000" }}
							>
								<Image
									src="/images/google.png"
									alt="Google"
									width={20}
									height={20}
								/>
								<span
									className="whitespace-nowrap"
									style={{ color: "#000000" }}
								>
									Login With Google
								</span>
							</button>
							<button
								type="button"
								className="flex items-center justify-center gap-[10px] w-[180px] h-[44px] rounded-[99px] border px-[12px] py-0 text-[13px] font-medium bg-white"
								style={{ color: "#000000" }}
							>
								<Image
									src="/images/facebook.png"
									alt="Facebook"
									width={20}
									height={20}
								/>
								<span
									className="whitespace-nowrap"
									style={{ color: "#000000" }}
								>
									Login With Facebook
								</span>
							</button>
						</div>
					</form>
				</div>
				{/* End Left Card */}
			</div>
			{/* Right Side Card */}
			<div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 px-6">
				<div className="relative min-w-[800px] max-w-[600px] h-[720px] bg-transparent flex items-center justify-center">
					<div className="absolute inset-0 rounded-[32px] shadow-xl overflow-hidden">
						<Image
							src="/images/leftSide.webp"
							alt="Login Visual"
							fill
							className="object-cover"
							priority
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
