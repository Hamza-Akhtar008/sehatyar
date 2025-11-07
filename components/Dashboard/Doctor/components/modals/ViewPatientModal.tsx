import { getAppointmentsForPatient } from "@/lib/Api/appointment";
import { useEffect, useState } from "react";
import { FileText, Image, Download, Eye } from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";

interface ViewPatientModalProps {
	open: boolean;
	onClose: () => void;
	onSchedule: () => void;
	patient?: any;
}

export default function ViewPatientModal({
	open,
	onClose,
	onSchedule,
	patient,
}: ViewPatientModalProps) {
	const [completedAppointments, setCompletedAppointments] = useState<any[]>([]);

	useEffect(() => {
		if (!patient?.id) return;

		const fetchAppointments = async () => {
			try {
				const response = await getAppointmentsForPatient(patient.id);
				const completed = (response || []).filter(
					(app: any) => app.status?.toLowerCase() === "completed"
				);
				setCompletedAppointments(completed);
			} catch (err) {
				console.error("Error fetching appointments:", err);
			}
		};
		fetchAppointments();
	}, [patient]);

	if (!open) return null;

	const previousFiles = patient?.patientProfile?.previousReportsFiles || [];

	const isImage = (url: string) =>
		/\.(jpeg|jpg|png|gif|webp)$/i.test(url);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] border border-gray-200">
				{/* Header */}
				<div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
					<h2 className="text-2xl font-semibold text-gray-900">Patient Files</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 text-2xl transition"
					>
						×
					</button>
				</div>

				{patient && (
					<div className="mt-4 space-y-4">
						<div className="flex items-center gap-4">
							<img
								src={patient.patientProfile?.profilePic || "/assets/doctors.svg"}
								alt={patient.fullName}
								className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm"
							/>
							<div>
								<p className="font-semibold text-lg text-gray-900">
									{patient.fullName}
								</p>
								<p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
							</div>
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
							<div><span className="font-medium text-gray-900">Gender:</span> {patient.gender || "N/A"}</div>
							<div><span className="font-medium text-gray-900">Phone:</span> {patient.phoneNumber || "N/A"}</div>
							<div><span className="font-medium text-gray-900">Email:</span> {patient.email || "N/A"}</div>
							<div><span className="font-medium text-gray-900">Last Visit:</span> {patient.updatedAt ? new Date(patient.updatedAt).toLocaleDateString() : "-"}</div>
							<div><span className="font-medium text-gray-900">Condition:</span> {patient.patientProfile?.condition || "N/A"}</div>
							<div><span className="font-medium text-gray-900">Age:</span> {patient.patientProfile?.age || "N/A"}</div>
							<div><span className="font-medium text-gray-900">Blood Group:</span> {patient.patientProfile?.bloodGroup || "N/A"}</div>
						</div>

						{patient.patientProfile?.allergies?.length > 0 && (
							<div className="text-sm text-gray-700">
								<span className="font-medium text-gray-900">Allergies:</span>{" "}
								{patient.patientProfile.allergies.join(", ")}
							</div>
						)}
					</div>
				)}

				{/* Previous Reports */}
			
				{/* Previous Reports */}
				<div className="border-t border-gray-200 pt-4">
					<h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
						Uploaded Reports
					</h3>

					{previousFiles.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{previousFiles.map((file: string, index: number) => (
								<div
									key={index}
									className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all bg-gray-50"
								>
									<div className="p-2 bg-blue-100 rounded-lg">
										{isImage(file) ? (
											<Image className="w-5 h-5 text-blue-600" />
										) : (
											<FileText className="w-5 h-5 text-blue-600" />
										)}
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-gray-800 truncate">
											Report {index + 1}
										</p>
										<p className="text-xs text-gray-500 truncate">
											{file.split("/").pop()}
										</p>
									</div>
									<div className="flex items-center gap-2">
										<a
											href={file}
											target="_blank"
											rel="noopener noreferrer"
											className="p-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
										>
											<Eye className="w-4 h-4" />
										</a>
										<a
											href={file}
											download
											className="p-1.5 rounded-md bg-green-600 hover:bg-green-700 text-white transition"
										>
											<Download className="w-4 h-4" />
										</a>
									</div>
								</div>
							))}
						</div>
					) : (
						<p className="text-sm text-gray-500 italic">
							No uploaded reports found.
						</p>
					)}
				</div>

				{/* Completed Appointments Files */}
				<div className="border-t border-gray-200 mt-6 pt-5">
					<h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
						Completed Appointment Files
					</h3>

					{completedAppointments.length > 0 ? (
						<div className="space-y-5">
							{completedAppointments.map((appointment, index) => (
								<div key={index} className="space-y-2">
									<p className="text-sm font-medium text-gray-700">
										Appointment #{appointment.id}
									</p>
									{appointment.medicalHistoryFiles?.length > 0 ? (
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											{appointment.medicalHistoryFiles.map(
												(file: string, idx: number) => (
													<div
														key={idx}
														className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all bg-gray-50"
													>
														<div className="p-2 bg-blue-100 rounded-lg">
															{isImage(file) ? (
																<Image className="w-5 h-5 text-blue-600" />
															) : (
																<FileText className="w-5 h-5 text-blue-600" />
															)}
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-800 truncate">
																File {idx + 1}
															</p>
															<p className="text-xs text-gray-500 truncate">
																{file.split("/").pop()}
															</p>
														</div>
														<div className="flex items-center gap-2">
															<a
																href={file}
																target="_blank"
																rel="noopener noreferrer"
																className="p-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
															>
																<Eye className="w-4 h-4" />
															</a>
															
														</div>
													</div>
												)
											)}
										</div>
									) : (
										<p className="text-xs text-gray-500 italic ml-1">
											No files in this appointment.
										</p>
									)}
								</div>
							))}
						</div>
					) : (
						<p className="text-sm text-gray-500 italic">
							No completed appointments found.
						</p>
					)}
				</div>

				{/* Footer */}
				<div className="flex justify-end mt-8 border-t pt-4">
					<button
						onClick={onClose}
						className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
