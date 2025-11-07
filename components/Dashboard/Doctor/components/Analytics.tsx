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
			label: "Income",
			data: [120*500, 140*500, 130*500, 160*500, 150*500, 175*500],
			backgroundColor: "#4FC3F7",
			borderRadius: 4,
		},
	],
};

const Analytics = () => {
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
			

				<div
					style={{
					
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
				<div className="mt-8">
				<h2 className="text-xl font-semibold mb-4 text-gray-800">Revenue Analytics</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
					{/* Daily Revenue */}
					<div className="bg-white rounded-xl p-6 shadow border border-gray-100">
						<h4 className="text-sm text-gray-500 mb-1">Daily Revenue</h4>
						<p className="text-2xl font-semibold text-emerald-600">$2,450</p>
						<p className="text-xs text-gray-400 mt-1">+8% from yesterday</p>
					</div>

					{/* Weekly Revenue */}
					<div className="bg-white rounded-xl p-6 shadow border border-gray-100">
						<h4 className="text-sm text-gray-500 mb-1">Weekly Revenue</h4>
						<p className="text-2xl font-semibold text-emerald-600">$15,860</p>
						<p className="text-xs text-gray-400 mt-1">+12% from last week</p>
					</div>

					{/* Monthly Revenue */}
					<div className="bg-white rounded-xl p-6 shadow border border-gray-100">
						<h4 className="text-sm text-gray-500 mb-1">Monthly Revenue</h4>
						<p className="text-2xl font-semibold text-emerald-600">$68,420</p>
						<p className="text-xs text-gray-400 mt-1">+5% from last month</p>
					</div>
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
