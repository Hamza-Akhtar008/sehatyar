"use client"

import { FetchClinicStats } from "@/lib/Api/Clinic/clinic_api"
import {
  Users,
  UserCheck,
  Calendar,
  Building2,
  DollarSign,
  FileText,
  TrendingUp,
  Plus,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const PRIMARY_COLOR = "#62e18b"
interface StatItem {
  icon: any;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

interface AppointmentChartItem {
  month: string;
  appointments: number;
  revenue: number;
}

interface MonthWiseStat {
  month: string;              // "2025-11"
  totalrevenue: string;       // "500"
  totalappointments: string;  // "1"
}

export function AdminDashboard() {



const [stats, setStats] = useState<StatItem[]>([]);
const [appointmentData, setAppointmentData] = useState<AppointmentChartItem[]>([]);

  const fetchStats = async () => {
    const response = await FetchClinicStats();
    const { usersCount, totalAppointments } = response;

    const updatedStats = [
      {
        icon: Users,
        label: "Total Patients",
        value: usersCount?.patientCount?.toString() || "0",
        change: "+0%",
        positive: true,
      },
      {
        icon: UserCheck,
        label: "Total Doctors",
        value: usersCount?.doctorsCount?.toString() || "0",
        change: "+0%",
        positive: true,
      },
      {
        icon: Calendar,
        label: "Appointments",
        value: totalAppointments?.count?.toString() || "0",
        change: "+0%",
        positive: true,
      },
      {
        icon: DollarSign,
        label: "Revenue",
        value: `${totalAppointments?.revenue?.toLocaleString() || "0"} PKR`,
        change: "+0%",
        positive: true,
      },
    ];

    setStats(updatedStats);

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// type the api map
const apiMap: Record<number, { appointments: number; revenue: number }> = {};

(totalAppointments?.monthWiseStats as MonthWiseStat[]).forEach((item: MonthWiseStat) => {
  const monthIndex = Number(item.month.split("-")[1]) - 1;

  apiMap[monthIndex] = {
    appointments: Number(item.totalappointments),
    revenue: Number(item.totalrevenue),
  };
});

// build full year dataset with fallback 0,0
const fullYearData: AppointmentChartItem[] = monthNames.map((name, index) => {
  const apiData = apiMap[index];

  return {
    month: name,
    appointments: apiData?.appointments ?? 0,
    revenue: apiData?.revenue ?? 0,
  };
});

setAppointmentData(fullYearData);

  };

  useEffect(() => {
    fetchStats();
  }, []);


 
  const departmentData = [
    { name: "Cardiology", value: 35, color: PRIMARY_COLOR },
    { name: "Neurology", value: 25, color: "#3b82f6" },
    { name: "Orthopedic", value: 20, color: "#8b5cf6" },
    { name: "Pediatrics", value: 15, color: "#f97316" },
    { name: "Other", value: 5, color: "#cbd5e1" },
  ]

  const recentActivities = [
    {
      id: 1,
      title: "New Patient Registered",
      description: "John Doe registered as a new patient",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Doctor Verified",
      description: "Dr. Sarah Johnson verified credentials",
      time: "4 hours ago",
    },
    {
      id: 3,
      title: "Appointment Scheduled",
      description: "25 new appointments scheduled today",
      time: "6 hours ago",
    },
  ]

  const quickActions = [
    { icon: Plus, label: "Add Doctor" },
    { icon: Plus, label: "Add Hospital" },

  ]

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Clinic Dashboard</h1>
        <p className="text-gray-600">Welcome back. Here's your system overview.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats && stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: PRIMARY_COLOR + "15" }}>
                  <Icon size={24} style={{ color: PRIMARY_COLOR }} />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-semibold ${stat.positive ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp size={24} style={{ color: PRIMARY_COLOR }} />
            Appointments & Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#f9fafb", border: `2px solid ${PRIMARY_COLOR}` }} />
              <Legend />
              <Bar dataKey="appointments" fill={PRIMARY_COLOR} radius={[8, 8, 0, 0]} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        {/* <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity size={24} style={{ color: PRIMARY_COLOR }} />
            Department Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#f9fafb", border: `2px solid ${PRIMARY_COLOR}` }} />
            </PieChart>
          </ResponsiveContainer>
        </div> */}
      </div>

      {/* Bottom Section */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  {/* Recent Activities (takes 2/3 width on large screens) */}
  <div className="lg:col-span-2">
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Activity size={24} style={{ color: PRIMARY_COLOR }} />
          Recent Activities
        </h2>
        <button className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
          >
            <div
              className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: PRIMARY_COLOR }}
            ></div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{activity.title}</h4>
              <p className="text-gray-600 text-sm">{activity.description}</p>
              <span className="text-gray-500 text-xs mt-1 block">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Quick Actions (takes 1/3 width on large screens) */}
  <div>
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
      <div className="space-y-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              style={{ backgroundColor: PRIMARY_COLOR }}
              className="w-full py-3 px-4 rounded-lg text-white font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Icon size={18} />
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  </div>
</div>

    </div>
  )
}
