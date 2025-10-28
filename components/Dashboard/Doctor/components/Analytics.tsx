'use client';
import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const pieData = {
	labels: ["Age 18-30", "Age 31-45", "Age 46-60", "Age 60+"],
	datasets: [
		{
			data: [35, 30, 20, 15],
			backgroundColor: ["#4FC3F7", "#80CBC4", "#FFD54F", "#FF8A65"],
			borderWidth: 1,
		},
	],
};

const barData = {
	labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
	datasets: [
		{
			label: "Appointments",
			data: [120, 140, 130, 160, 150, 175],
			backgroundColor: "#4FC3F7",
			borderRadius: 4,
		},
	],
};

const Analytics = () => {
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div
					style={{
						width: 556,
						height: 377,
						background: "#FFFFFF",
						border: "1px solid #F3F4F6",
						boxShadow: "0px 1px 2px 0px #0000000D",
						borderRadius: 20,
						padding: 1,
						opacity: 1,
					}}
					className="overflow-hidden"
				>
										<div style={{ display: "flex", alignItems: "center", height: 48, paddingLeft: 12 }}>
											<h2 style={{
												fontFamily: "Roboto, sans-serif",
												fontWeight: 600,
												fontStyle: "normal",
												fontSize: 18,
												lineHeight: "28px",
												letterSpacing: "0px",
												verticalAlign: "middle",
												color: "#1F2937",
												margin: 0,
											}}>Patient Demographics</h2>
										</div>
										<div style={{ width: "100%", height: "calc(100% - 48px)" }}>
									<Pie
										data={pieData}
										options={{
											maintainAspectRatio: false,
											radius: "85%",
											layout: { padding: 8 },
											plugins: { legend: { position: "right" } },
										}}
									/>
					</div>
				</div>

				<div
					style={{
						width: 556,
						height: 377,
						background: "#FFFFFF",
						border: "1px solid #F3F4F6",
						boxShadow: "0px 1px 2px 0px #0000000D",
						borderRadius: 20,
						padding: 1,
						opacity: 1,
					}}
					className="overflow-hidden"
				>
										<div style={{ display: "flex", alignItems: "center", height: 48, paddingLeft: 12 }}>
											<h2 style={{
												fontFamily: "Roboto, sans-serif",
												fontWeight: 600,
												fontStyle: "normal",
												fontSize: 18,
												lineHeight: "28px",
												letterSpacing: "0px",
												verticalAlign: "middle",
												color: "#1F2937",
												margin: 0,
											}}>Monthly Appointments</h2>
										</div>
										<div style={{ width: "100%", height: "calc(100% - 48px)" }}>
						<Bar
							data={barData}
							options={{
								maintainAspectRatio: false,
								scales: { y: { beginAtZero: true } },
								plugins: { legend: { display: false } },
							}}
						/>
					</div>
				</div>
			</div>

			{/* Reports & Export region (below charts) */}
			<div className="mt-8 space-y-6">
				{/* Patient Reports card */}
				<div className="bg-white rounded-xl p-6 shadow">
					<h3 className="text-xl font-semibold mb-4">Patient Reports</h3>
					<div className="bg-gray-100 rounded-lg p-4">
						<table className="w-full text-left">
							<thead>
								<tr className="text-sm text-gray-600">
									<th className="py-3">Patient Name</th>
									<th className="py-3">Appointment Date</th>
									<th className="py-3">Diagnosis Summary</th>
									<th className="py-3">Status</th>
									<th className="py-3">Action</th>
								</tr>
							</thead>
							<tbody>
								{[1, 2, 3, 4].map((i) => (
									<tr key={i} className="border-t border-gray-200">
										<td className="py-4 flex items-center gap-3">
											<img src="/images/doctors/default.png" alt="avatar" className="w-8 h-8 rounded-full" />
											<span className="text-sm text-gray-800">Sarah Johnson</span>
										</td>
										<td className="py-4 text-sm text-gray-700">Oct 12, 2024</td>
										<td className="py-4 text-sm text-gray-700">Hypertension follow-up, medication adjustment</td>
										<td className="py-4">
											<span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">Complete</span>
										</td>
										<td className="py-4 text-sm text-emerald-600">View Report</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Export Reports card */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-gray-100 rounded-lg p-6">
						<h4 className="text-lg font-medium mb-2">Monthly Report</h4>
						<p className="text-sm text-gray-600 mb-4">Complete monthly performance summary</p>
						<div className="flex items-center gap-4">
							<button className="bg-emerald-400 text-white px-6 py-2 rounded-full font-medium">PDF Export</button>
							<button className="border border-gray-300 px-6 py-2 rounded-full">Export Excel</button>
						</div>
					</div>
					<div className="bg-gray-100 rounded-lg p-6">
						<h4 className="text-lg font-medium mb-2">Yearly Report</h4>
						<p className="text-sm text-gray-600 mb-4">Annual performance and financial summary</p>
						<div className="flex items-center gap-4">
							<button className="bg-emerald-400 text-white px-6 py-2 rounded-full font-medium">PDF Export</button>
							<button className="border border-gray-300 px-6 py-2 rounded-full">Export Excel</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Analytics;
