import { useEffect, useRef, useState } from "react";
import { postUserByDoctor } from "@/lib/Api/Public/user_api";

interface AddPatientsModalProps {
	open: boolean;
	onClose: () => void;
	onSubmit: () => void;
	onSchedule: () => void;
}

export default function AddPatientsModal({ open, onClose, onSchedule, onSubmit }: AddPatientsModalProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const initialFormState = {
		fullName: "",
		email: "",
		gender: "Male",
		bloodGroup: "A+",
		phoneNumber: "",
		country: "Pakistan",
		city: "Karachi",
		password: "patient123",
		role: "patient",
		medicalRecord: [] as File[],
	};

	const [form, setForm] = useState(initialFormState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Reset form every time modal opens fresh
	useEffect(() => {
		if (open) {
			setForm(initialFormState);
			setError(null);
			setLoading(false);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	}, [open]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;

		if (type === "file") {
			const files = Array.from((e.target as HTMLInputElement).files || []);
			setForm((prev) => ({
				...prev,
				medicalRecord: [...prev.medicalRecord, ...files],
			}));
		} else {
			setForm((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleRemoveFile = (index: number) => {
		setForm((prev) => ({
			...prev,
			medicalRecord: prev.medicalRecord.filter((_, i) => i !== index),
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const payload: any = {
				fullName: form.fullName,
				gender: form.gender.toLowerCase(),
				country: form.country,
				city: form.city,
				email: form.email,
				phoneNumber: form.phoneNumber,
				password: form.password,
				role: form.role,
				bloodGroup: form.bloodGroup,
			};
			const formData = new FormData();
			Object.entries(payload).forEach(([key, value]) => formData.append(key, value as string));

			if (form.medicalRecord.length > 0) {
				console.log("Uploading files:", form.medicalRecord);
				form.medicalRecord.forEach((file) => formData.append("previousReportsFiles", file));
				
			}
			await postUserByDoctor(formData as any);
			
			onSubmit();
			setLoading(false);
			onClose();
		} catch (err: any) {
			setError(err?.message || "Failed to add patient");
			setLoading(false);
		}
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
			<div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl flex flex-col gap-8">
				<h2 className="text-xl font-semibold text-gray-800 mb-2">Add Patient</h2>

				<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Form fields */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
							<input type="text" name="fullName" value={form.fullName} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
							<input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
							<select name="gender" value={form.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2">
								<option>Male</option>
								<option>Female</option>
								<option>Other</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
							<select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2">
								{["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
									<option key={bg}>{bg}</option>
								))}
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
							<input type="text" name="country" value={form.country} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">City</label>
							<input type="text" name="city" value={form.city} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
							<input type="text" name="password" value={form.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
							<input type="text" name="role" value={form.role} readOnly className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed" />
						</div>
					</div>

					{/* Phone number */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
						<input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="+92 772 55486" required />
					</div>

					{/* Upload section */}
					<div className="flex flex-col mt-2">
						<label
							htmlFor="medical-record-upload"
							className="border border-dashed border-gray-300 rounded-xl px-6 py-4 flex items-center gap-2 cursor-pointer w-full justify-center text-gray-600 hover:border-[#5FE089] transition"
						>
							<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
								<path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
								<path d="M7 10l5-5 5 5" />
								<path d="M12 15V5" />
							</svg>
							Upload Medical Records
							<input
								id="medical-record-upload"
								name="medicalRecord"
								type="file"
								multiple
								ref={fileInputRef}
								className="hidden"
								onChange={handleChange}
							/>
						</label>

						{/* Show uploaded files */}
						{form.medicalRecord.length > 0 && (
							<ul className="mt-3 space-y-2">
								{form.medicalRecord.map((file, idx) => (
									<li
										key={idx}
										className="flex items-center justify-between text-sm bg-gray-50 border rounded-md px-3 py-2"
									>
										<span className="truncate">{file.name}</span>
										<button
											type="button"
											onClick={() => handleRemoveFile(idx)}
											className="text-red-500 hover:text-red-700 text-xs font-medium"
										>
											Remove
										</button>
									</li>
								))}
							</ul>
						)}
					</div>

					{error && <div className="text-red-500 text-sm">{error}</div>}

					{/* Actions */}
					<div className="flex items-center justify-between mt-4">
						<button
							type="button"
							className="text-gray-700 text-base px-6 py-2 rounded-full hover:bg-gray-100 transition"
							onClick={onClose}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-[#5FE089] hover:bg-[#4dcc73] text-white text-base px-10 py-2 rounded-full transition"
							disabled={loading}
						>
							{loading ? "Adding..." : "Add Patient"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
