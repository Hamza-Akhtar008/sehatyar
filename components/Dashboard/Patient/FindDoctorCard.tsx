"use client";
import { Button } from "../../ui/button";
import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import { Star, User } from "lucide-react";
import { useRouter } from "next/navigation";

// Base URL usable in client (NEXT_PUBLIC_). Falls back to Heroku if not set.
const BASE =
	(process.env.NEXT_PUBLIC_BASE_URL ||
		process.env.NEXT_BASE_URL || // kept as no-op fallback if you set it at build time
		"https://sehatyarr-c23468ec8014.herokuapp.com"
	).replace(/\/$/, "");

// helper formatters
const capitalizeWords = (s: string) => s.replace(/\b\w/g, c => c.toUpperCase());
const formatSpecializations = (spec?: string | string[]) => {
	if (!spec) return "";
	const arr = Array.isArray(spec) ? spec : spec.split(",").map(s => s.trim());
	return arr.filter(Boolean).map(capitalizeWords).join(", ");
};
type Education = { institute: string; degreeName: string; fieldOfStudy?: string };
const formatEducation = (education?: Education[]) => {
	if (!education?.length) return "";
	return education
		.map(e => `${e.degreeName}${e.fieldOfStudy ? ` (${e.fieldOfStudy})` : ""}`)
		.join(", ");
};
const computeAvgRating = (reviews?: { rating?: number }[]) => {
	if (!reviews?.length) return undefined;
	const vals = reviews.map(r => Number(r?.rating)).filter(v => Number.isFinite(v) && v > 0);
	if (!vals.length) return undefined;
	return Number((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1));
};

// API Doctor type (aligned with your response)
interface Doctor {
	id: number;
	userId?: number;
	firstName?: string;
	lastName?: string;
	specialization?: string;
	primarySpecialization?: string[];
	experienceYears?: number;
	yearsOfExperience?: string | number;
	consultationFee?: number;
	FeesPerConsultation?: string | number | null;
	profilePicture?: string;
	profilePic?: string;
	qualifications?: string;
	education?: Education[];
	availableForVideoConsultation?: boolean;
	availableToday?: boolean;
	user?: { fullName?: string };
	rating?: number;
	reviewCount?: number;
	reviews?: { rating?: number }[];
	// extras we don't mutate
	servicesTreatementOffered?: string[];
	conditionTreatments?: string[];
}

const specializations = [
	"Allergy and Immunology",
	"Anesthesiology",
	"Cardiology",
	"Cardiothoracic Surgery",
	"Cardiovascular Surgery",
	"Clinical Neurophysiology",
	"Clinical Pharmacology",
	"Colon and Rectal Surgery",
	"Community Medicine",
	"Critical Care Medicine",
	"Dental Surgery",
	"Dermatology",
	"Diagnostic Radiology",
	"Emergency Medicine",
	"Endocrinology, Diabetes & Metabolism",
	"Family Medicine",
	"Gastroenterology",
	"General Practice",
	"General Surgery",
	"Genetics and Genomics",
	"Geriatric Medicine",
	"Gynecologic Oncology",
	"Hand Surgery",
	"Head and Neck Surgery",
	"Hematology",
	"Hepatology",
	"Hospital Medicine",
	"Infectious Disease",
	"Internal Medicine",
	"Interventional Cardiology",
	"Interventional Radiology",
	"Legal Medicine",
	"Maternal and Fetal Medicine",
	"Medical Oncology",
	"Medical Toxicology",
	"Neonatal-Perinatal Medicine",
	"Nephrology",
	"Neurocritical Care",
	"Neurodevelopmental Disabilities",
	"Neurology",
	"Neuromuscular Medicine",
	"Neuroradiology",
	"Neurosurgery",
	"Nuclear Medicine",
	"Obstetrics & Gynecology",
	"Occupational Medicine",
	"Oncology",
	"Ophthalmology",
	"Optometry",
	"Oral and Maxillofacial Surgery",
	"Orthopedic Surgery",
	"Otolaryngology (ENT)",
	"Pain Medicine",
	"Palliative Care",
	"Pathology",
	"Pediatric Allergy & Immunology",
	"Pediatric Anesthesiology",
	"Pediatric Cardiology",
	"Pediatric Critical Care Medicine",
	"Pediatric Dermatology",
	"Pediatric Emergency Medicine",
	"Pediatric Endocrinology",
	"Pediatric Gastroenterology",
	"Pediatric Hematology & Oncology",
	"Pediatric Infectious Diseases",
	"Pediatric Nephrology",
	"Pediatric Neurology",
	"Pediatric Neurosurgery",
	"Pediatric Oncology",
	"Pediatric Ophthalmology",
	"Pediatric Orthopedics",
	"Pediatric Otolaryngology",
	"Pediatric Pathology",
	"Pediatric Pulmonology",
	"Pediatric Radiology",
	"Pediatric Rheumatology",
	"Pediatric Surgery",
	"Pediatric Urology",
	"Pediatrics",
	"Physical Medicine & Rehabilitation",
	"Plastic Surgery",
	"Preventive Medicine",
	"Psychiatry",
	"Psychosomatic Medicine",
	"Public Health",
	"Pulmonary Disease",
	"Radiation Oncology",
	"Radiology",
	"Reproductive Endocrinology and Infertility",
	"Rheumatology",
	"Sleep Medicine",
	"Spinal Cord Injury Medicine",
	"Sports Medicine",
	"Surgical Critical Care",
	"Thoracic Surgery",
	"Transplant Surgery",
	"Trauma Surgery",
	"Urology",
	"Vascular Neurology",
	"Vascular Surgery",
	"Adolescent Medicine",
	"Aerospace Medicine",
	"Biochemical Genetics",
	"Chemical Pathology",
	"Clinical Biochemistry",
	"Clinical Cytogenetics",
	"Clinical Immunology",
	"Clinical Microbiology",
	"Clinical Pathology",
	"Clinical Psychology",
	"Community Health",
	"Dental Public Health",
	"Developmental Pediatrics",
	"Endodontics",
	"Epidemiology",
	"Forensic Medicine",
	"Forensic Pathology",
	"Gastrointestinal Surgery",
	"General Internal Medicine",
	"Geriatric Psychiatry",
	"Health Informatics",
	"Hematopathology",
	"Hospice and Palliative Medicine",
	"Immunopathology",
	"Interventional Neuroradiology",
	"Laboratory Medicine",
	"Laparoscopic Surgery",
	"Lifestyle Medicine",
	"Maxillofacial Surgery",
	"Medical Biochemistry",
	"Medical Genetics",
	"Medical Microbiology",
	"Military Medicine",
	"Molecular Pathology",
	"Musculoskeletal Radiology",
	"Neonatology",
	"Neuroendocrinology",
	"Neuroimaging",
	"Neurointerventional Surgery",
	"Neuropathology",
	"Neuropsychiatry",
	"Nuclear Cardiology",
	"Occupational Health",
	"Oncologic Surgery",
	"Oral Medicine",
	"Oral Pathology",
	"Orthodontics",
	"Orthopedic Oncology",
	"Pain Rehabilitation",
	"Pediatric Dentistry",
	"Pediatric Emergency Care",
	"Pediatric Gastrohepatic Surgery",
	"Pediatric Infectious Medicine",
	"Pediatric Intensive Care",
	"Pediatric Neuroradiology",
	"Pediatric Plastic Surgery",
	"Pediatric Rehabilitation",
	"Pediatric Thoracic Surgery",
	"Perinatal Medicine",
	"Phlebology",
	"Physician Executive",
	"Plastic and Reconstructive Surgery",
	"Primary Care",
	"Proctology",
	"Pulmonology (Respiratory Medicine)",
	"Radiologic Physics",
	"Rehabilitation Psychology",
	"Reproductive Medicine",
	"Rural Medicine",
	"Sleep Disorders Medicine",
	"Spine Surgery",
	"Surgical Oncology",
	"Tropical Medicine",
	"Undersea and Hyperbaric Medicine",
	"Urgent Care Medicine",
	"Urogynecology",
	"Vascular and Interventional Radiology",
	"Virology",
	"Women's Health",
	"Wound Care Medicine",
];
export default function FindDoctorCard() {
	const [query, setQuery] = useState("");
	const [city, setcity] = useState("");
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const [isFocused, setIsFocused] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	// NEW: results state
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [doctors, setDoctors] = useState<Doctor[]>([]);

	// Filter suggestions based on user input
	const filtered = useMemo(() => {
		if (!query.trim()) return [];
		return specializations.filter((item) =>
			item.toLowerCase().includes(query.toLowerCase())
		);
	}, [query]);

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!filtered.length) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			setFocusedIndex((prev) => (prev + 1) % filtered.length);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setFocusedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
		} else if (e.key === "Enter" && focusedIndex >= 0) {
			e.preventDefault();
			setQuery(filtered[focusedIndex]);
			setIsFocused(false);
		}
	};

	// Hide dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsFocused(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Replace navigate with fetch + render
	const handleSearch = async () => {
		const specialization = query || "Cardiology";
		const cityParam = city || "abbottobad";
		const url = `${BASE}/doctor-profile/specialization?specialization=${encodeURIComponent(
			specialization
		)}&city=${encodeURIComponent(cityParam)}`;

		setLoading(true);
		setError(null);
		try {
			const res = await fetch(url, { cache: "no-store" });
			if (!res.ok) throw new Error("Failed to fetch doctors");
			const data: unknown = await res.json();
			setDoctors(Array.isArray(data) ? (data as Doctor[]) : []);
		} catch (e: any) {
			setError(e?.message || "Failed to load doctors");
			setDoctors([]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-2xl mt-2 -ml-4 shadow-sm p-6  w-[1064px]">
			<h2 className="text-lg font-semibold text-gray-800 mb-3">
				Find a Doctor
			</h2>

			<div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm">
				<div
					className="w-1/2 flex flex-row gap-3.5 bg-white rounded-full shadow-sm  py-3 px-2 border-[1px] border-[#CACACA]"
					style={{
						width: "900px",
						height: "91.73924255371094px",
						paddingTop: "9.99px",
						paddingRight: "9.57px",
						paddingBottom: "9.99px",
						paddingLeft: "9.57px",
						border: "1px solid #CACACA",
						background: "#FFFFFF",
						opacity: 1,
						transform: "rotate(0deg)",
					}}
					ref={dropdownRef}
				>
					{/* Search Input */}
					<div
						className="w-5/16 flex items-center text-[16px] bg-[#F4F4F4] rounded-full px-6"
						style={{
							width: "344.3640441894531px",
							height: "66.64610290527344px",
							borderRadius: "35.88px",
							paddingTop: "18.32px",
							paddingRight: "26.65px",
							paddingBottom: "18.32px",
							paddingLeft: "26.65px",
							gap: "12.37px",
							background: "#F4F4F4",
							opacity: 1,
							transform: "rotate(0deg)",
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-[#52525B]"
						>
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.3-4.3"></path>
						</svg>
						<input
							type="text"
							placeholder="Search Specialist or Hospital"
							value={query}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setQuery(e.target.value)
							}
							onFocus={() => setIsFocused(true)}
							className="hero-input border-none shadow-none bg-transparent focus:ring-0 h-full w-full"
						/>
						{isFocused && filtered.length > 0 && (
							<div className="absolute top-[70px] left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-lg z-10 overflow-hidden max-h-60 overflow-y-auto">
								{filtered.map((item, index) => (
									<div
										key={item}
										onMouseDown={() => {
											setQuery(item);
											setIsFocused(false);
										}}
										className={`px-4 py-2 text-sm cursor-pointer transition ${
											index === focusedIndex
												? "bg-[#5fe089] text-white"
												: "hover:bg-gray-100 text-gray-700"
										}`}
									>
										{item}
									</div>
								))}
							</div>
						)}
					</div>

					{/* Location Input */}
					<div
						className="w-5/12 flex items-center text-[16px] bg-[#F4F4F4] rounded-full px-6"
						style={{
							width: "344.3640441894531px",
							height: "66.64610290527344px",
							borderRadius: "35.88px",
							paddingTop: "18.32px",
							paddingRight: "26.65px",
							paddingBottom: "18.32px",
							paddingLeft: "26.65px",
							gap: "12.37px",
							background: "#F4F4F4",
							opacity: 1,
							transform: "rotate(0deg)",
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-[#52525B]"
						>
							<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
							<circle cx="12" cy="10" r="3"></circle>
						</svg>
						<input
							type="text"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setcity(e.target.value)
							}
							placeholder="Near you or Enter City"
							className="hero-input border-none shadow-none bg-transparent focus:ring-0 h-full w-full placeholder:text-[#52525B] placeholder:text-lg"
						/>
					</div>

					{/* Find Button */}
					<Button
						className="text-white inline-flex items-center justify-center hover:cursor-pointer transition-all duration-300"
						style={{
							width: "119.17px",
							height: "71.75px",
							borderRadius: "122.47px",
							paddingTop: "12.37px",
							paddingRight: "39.59px",
							paddingBottom: "12.37px",
							paddingLeft: "39.59px",
							gap: "12.37px",
							background: "#5FE089",
							opacity: 1,
							transform: "rotate(0deg)",
							fontFamily: "var(--font-montserrat)",
							fontWeight: 600,
							fontSize: "17.32px",
							lineHeight: "29.69px",
							verticalAlign: "middle",
							color: "#FFFFFF",
						}}
						onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
							(e.currentTarget.style.background = "#4ad87b")
						}
						onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
							(e.currentTarget.style.background = "#5FE089")
						}
						onClick={handleSearch}
					>
						Find
					</Button>
				</div>
			</div>

			{/* Results below search */}
			<div className="mt-6">
				{error && <div className="text-red-500 text-sm">{error}</div>}
				{loading && (
					<div className="flex justify-center items-center py-8">
						<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
					</div>
				)}
				{!loading && doctors.length > 0 && (
					<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
						{doctors.map((doctor) => (
							<DoctorResultCard key={doctor.id} doctor={doctor} router={router} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}

// Result card (no navigation)
function DoctorResultCard({ doctor, router }: { doctor: Doctor, router: ReturnType<typeof useRouter> }) {
	const fullName =
		doctor.user?.fullName ||
		[doctor.firstName, doctor.lastName].filter(Boolean).join(" ") ||
		"Unknown";

	const displaySpecialization =
		doctor.specialization || formatSpecializations(doctor.primarySpecialization);

	const displayQualifications =
		doctor.qualifications || formatEducation(doctor.education);

	const expYears =
		doctor.experienceYears ??
		(doctor.yearsOfExperience !== undefined
			? Number(doctor.yearsOfExperience)
			: 0);

	const reviewsCount = Array.isArray(doctor.reviews)
		? doctor.reviews.length
		: doctor.reviewCount ?? 0;

	const avgRating =
		Array.isArray(doctor.reviews) && doctor.reviews.length > 0
			? computeAvgRating(doctor.reviews)
			: doctor.rating ?? 4.5;

	const feeVal =
		doctor.FeesPerConsultation != null
			? Number(doctor.FeesPerConsultation)
			: doctor.consultationFee;
	const displayFee =
		feeVal != null && !Number.isNaN(Number(feeVal))
			? Number(feeVal).toLocaleString()
			: "N/A";

	const handleBookAppointment = (e?: React.MouseEvent) => {
		if (e) e.stopPropagation();
		router.push(`/patient-dashboard/AppointmentBooking?doctorId=${doctor.id}`);
	};

	const handleVideoConsultation = (e?: React.MouseEvent) => {
		if (e) e.stopPropagation();
		// You can add navigation for video consultation here if needed
	};

	const handleCardClick = () => {
		router.push(`/patient-dashboard/doctor-Profile?doctorId=${doctor.id}`);
	};

	return (
		<div
			className="bg-[#F8F8F8] rounded-4xl p-4 sm:p-6 md:p-7 lg:p-10 cursor-pointer"
			onClick={handleCardClick}
		>
			<div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center gap-4 lg:gap-0">
				<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-7 lg:gap-10 items-center sm:items-center w-full lg:w-auto">
					<div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-34 lg:h-34 rounded-full overflow-hidden bg-yellow-500 flex items-center justify-center flex-shrink-0 relative">
						{(doctor.profilePicture || (doctor.profilePic && doctor.profilePic !== "")) ? (
							<Image
								src={doctor.profilePicture || doctor.profilePic || ""}
								alt={`Dr. ${fullName}`}
								fill
								sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 136px"
								className="object-cover"
								priority
							/>
						) : (
							<User className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-400" />
						)}
					</div>

					<div className="flex flex-col gap-y-1 text-center sm:text-left w-full sm:w-auto">
						<h2 className="text-xl sm:text-2xl md:text-[1.75rem] lg:text-3xl font-semibold text-[#414141] mb-0">
							{fullName}
						</h2>

						<div className="flex items-center justify-center sm:justify-start">
							<span className="inline-flex items-center text-green-600 text-xs py-1 px-2.5 bg-[#E8E8E8] rounded-2xl">
								<span className={`w-2 h-2 ${true ? "bg-green-500" : "bg-gray-400"} rounded-full mr-1`}></span>
								<span className="text-[#3D3D3D]">PMDC Verified</span>
							</span>
						</div>

						<p className="text-gray-600 text-xs sm:text-sm font-medium">
							{displaySpecialization}
						</p>

						{displayQualifications && (
							<p className="text-gray-600 text-xs sm:text-sm font-medium">
								{displayQualifications}
							</p>
						)}

						<div className="flex items-center gap-4 sm:gap-5 md:gap-5 lg:gap-6 justify-center sm:justify-start">
							<div>
								<p className="text-gray-600 text-xs sm:text-sm font-normal">
									{expYears} Years
								</p>
								<p className="text-[8px] text-gray-500 leading-none">Experience</p>
							</div>
							<div className="items-center gap-1">
								<div className="flex items-center text-yellow-400">
									<div className="flex">
										{[...Array(3)].map((_, i) => (
											<Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 stroke-none" />
										))}
									</div>
									<span className="ml-1 text-xs sm:text-sm font-normal text-gray-600">
										{avgRating ?? 4.5}
									</span>
								</div>
								<p className="text-[8px] text-gray-500 leading-none">
									{reviewsCount} Reviews
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Buttons (no navigation) */}
				<div className="w-full lg:ml-auto lg:w-auto flex flex-col gap-1.5 items-stretch sm:items-end">
					<button
						className="whitespace-nowrap py-2.5 sm:py-2.5 md:py-2.5 lg:py-3 px-4 sm:px-4 md:px-4 lg:px-5 text-sm border text-black border-black rounded-full bg-white"
						onClick={handleVideoConsultation}
					>
						Video Consultation
					</button>
					<button
						className="whitespace-nowrap w-full bg-[#5fe089] text-black rounded-full py-2.5 sm:py-2.5 md:py-2.5 lg:py-3 px-4 sm:px-4 md:px-4 lg:px-5 text-sm"
						onClick={handleBookAppointment}
					>
						Book an Appointment
					</button>
				</div>
			</div>

			<div className="mt-6 sm:mt-7 md:mt-8 lg:mt-10 bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-3xl">
				<div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-2">
					<div className="text-center sm:text-left">
						<p className="font-medium text-gray-700 text-sm sm:text-sm md:text-base">
							{doctor.availableForVideoConsultation ? "Online Video Consultation" : "In-Clinic Consultation"}
						</p>
						{(doctor.availableToday ?? true) && (
							<div className="flex items-center mt-1.5 justify-center sm:justify-start">
								<span className="inline-flex items-center text-green-600 text-xs py-1 px-2.5 bg-[#E8E8E8] rounded-2xl">
									<span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
									<span className="text-[#3D3D3D]">Available today</span>
								</span>
							</div>
						)}
					</div>
					<div className="text-xl sm:text-xl md:text-2xl font-semibold text-gray-800">
						Rs {displayFee}
					</div>
				</div>
			</div>
		</div>
	);
}
