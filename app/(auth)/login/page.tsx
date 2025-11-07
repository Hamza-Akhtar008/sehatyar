"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "@/src/contexts/AuthContext";

const PRIMARY = "#5fe089";
const BORDER = "#BDBDBD";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on role
      if (user.role === "patient") {
        router.push("/patient-dashboard");
      } else if (user.role === "doctor") {
        router.push("/doctor-dashboard");
      } else if (user.role === "admin") {
        router.push("/admin-dashboard");
      } else if (user.role === "receptionist") {
        router.push("/receptionist-dashboard");
      } else {
        router.push("/"); 
      }
    }
  }, [isAuthenticated, user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setLoginError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await login(email, password);
      console.log("LOGIN RESPONSE:", response);
      return response;
      // The login function from AuthContext will handle redirects based on user role
    } catch (error: any) {
      // Handle 401 Invalid credentials
      if (
        error?.response?.status === 401 ||
        error?.response?.data?.statusCode === 401
      ) {
        setLoginError("Invalid credentials. Please check your email or password.");
      } else if (
        error?.response?.status === 404 ||
        error?.response?.data?.statusCode === 404
      ) {
        setLoginError("Login failed. Please check your credentials and try again.");
      } else if (
        error?.response?.data?.message
      ) {
        setLoginError(error.response.data.message);
      } else if (error?.message && error.message.includes("404")) {
        setLoginError("Login failed. Please check your credentials and try again.");
      } else if (error?.message) {
        setLoginError(error.message);
      } else {
        setLoginError("Login failed. Please check your credentials and try again.");
      }
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* <Toaster position="top-right" /> */}
      {/* Main Container */}
      <div className="flex w-full max-w-[1200px] min-h-[700px] md:justify-center lg:justify-start">
        {/* Left Side Card */}
        <div
          className="
					flex flex-col justify-center
					w-full max-w-[500px]
					ml-0 sm:ml-4 lg:ml-16
					rounded-[24px]
					px-4 sm:px-6 lg:px-12 py-10
					"
        >
          {/* Logo */}
          <div className="flex flex-col items-start mb-6">
            <Image
              src="/images/logo2.webp"
              alt="Sehatyar"
              width={159}
              height={42}
              className="object-contain mb-2 w-[120px] sm:w-[159px]"
              priority
            />
          </div>
          {/* Title */}
          <h2
            className="text-[18px] sm:text-[22px] font-semibold mb-8"
            style={{ color: "#000000" }}
          >
            Please Login to your <span style={{ color: PRIMARY }}>Account</span>
          </h2>
          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-[14px] sm:text-[16px] mb-2 font-medium"
                style={{ color: "#000000" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="lendar@gmail.com"
                className="w-full max-w-[400px] lg:max-w-[480px] h-[48px] rounded-[12px] border px-4 text-[14px] sm:text-[15px] font-normal outline-none"
                style={{ borderColor: BORDER, color: "#000000" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-[14px] sm:text-[16px] mb-2 font-medium"
                style={{ color: "#000000" }}
              >
                Password
              </label>
              <div className="relative max-w-[400px] lg:max-w-[480px]">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="**********"
                  className="w-full h-[48px] rounded-[12px] border px-4 text-[14px] sm:text-[15px] font-normal outline-none"
                  style={{ borderColor: BORDER, color: "#000000" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between mb-6 max-w-[400px] flex-wrap gap-2">
              <label
                className="flex items-center text-[13px] sm:text-[15px]"
                style={{ color: "#000000" }}
              >
                <input
                  type="checkbox"
                  className="mr-2 accent-[#5fe089]"
                  disabled={isLoading}
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-[13px] sm:text-[15px] font-medium"
                style={{ color: PRIMARY }}
              >
                Forgot Password ?
              </a>
            </div>
            {/* Error message above Sign In button */}
            {loginError && (
              <div className="w-full max-w-[400px] mb-2 text-red-600 text-center text-sm font-medium">
                {loginError}
              </div>
            )}
            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full max-w-[400px] h-[48px] rounded-[99px] font-semibold text-[15px] sm:text-[16px] bg-[#5fe089] mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ color: "#000000" }}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
            {/* Sign Up Link */}
            <div className="text-center mb-6 max-w-[400px]">
              <span
                className="text-[14px] sm:text-base"
                style={{ color: "#000000" }}
              >
                Don't have an account?
              </span>
              <a
                href="/register"
                className="ml-2 text-[14px] sm:text-base font-semibold"
                style={{ color: PRIMARY }}
              >
                Sign Up
              </a>
            </div>
            {/* Social Login Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-[400px]">
							<button
								type="button"
								className="flex items-center justify-center gap-[10px] w-full sm:w-[180px] h-[44px] rounded-[99px] border px-[12px] py-0 text-[12px] sm:text-[13px] font-medium bg-white disabled:opacity-50"
								style={{ color: "#000000" }}
								disabled={isLoading}
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
								className="flex items-center justify-center gap-[10px] w-full sm:w-[180px] h-[44px] rounded-[99px] border px-[12px] py-0 text-[12px] sm:text-[13px] font-medium bg-white disabled:opacity-50"
								style={{ color: "#000000" }}
								disabled={isLoading}
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
						</div> */}
          </form>
        </div>
        {/* End Left Card */}
      </div>
      {/* Right Side Card */}
      <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 px-4 lg:px-4 xl:px-6">
        <div
          className="
					relative
					lg:min-w-[440px] lg:max-w-[480px] lg:h-[560px]
					xl:min-w-[720px] xl:max-w-[600px] xl:h-[720px]
					bg-transparent flex items-center justify-center
					"
        >
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
