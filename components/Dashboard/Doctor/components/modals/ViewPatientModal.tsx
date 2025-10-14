
import { useRef } from "react";

interface ViewPatientModalProps {
	open: boolean;
	onClose: () => void;
	onSchedule: () => void;
}

export default function ViewPatientModal({ open, onClose, onSchedule }: ViewPatientModalProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/30 bg-opacity-40 z-50 flex items-center justify-center">
			<div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg flex flex-col gap-8">
				<h2 className="text-xl font-semibold text-gray-800 mb-2">View Medical Reports</h2>
				<div className="flex flex-col items-center gap-6">
					<label
						htmlFor="medical-record-upload"
						className="border border-dashed border-gray-300 rounded-xl px-6 py-4 flex items-center gap-2 cursor-pointer w-full justify-center text-gray-600 hover:border-[#5FE089] transition"
					>
						<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
							<path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
							<path d="M7 10l5-5 5 5" />
							<path d="M12 15V5" />
						</svg>
						Upload Medical Record
						<input
							id="medical-record-upload"
							type="file"
							ref={fileInputRef}
							className="hidden"
						/>
					</label>
				</div>
				<div className="flex items-center justify-between mt-4">
					<button
						className="text-gray-700 text-base px-6 py-2 rounded-full hover:bg-gray-100 transition"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className="bg-[#5FE089] hover:bg-[#4dcc73] text-white text-base px-10 py-2 rounded-full transition"
						onClick={onSchedule}
					>
						Schedule
					</button>
				</div>
			</div>
		</div>
	);
}
