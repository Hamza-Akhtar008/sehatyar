"use client"

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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const PRIMARY_COLOR = "#62e18b"

export function AdminDashboard() {
  const stats = [
    { icon: Users, label: "Total Patients", value: "2,543", change: "+12%", positive: true },
    { icon: UserCheck, label: "Total Doctors", value: "128", change: "+5%", positive: true },
    { icon: Calendar, label: "Appointments", value: "45", change: "+8%", positive: true },
    { icon: Building2, label: "Hospitals", value: "12", change: "-2%", positive: false },
    { icon: DollarSign, label: "Revenue", value: "$48.5K", change: "+23%", positive: true },
  ]

const appointmentData = [
  { month: "Jan", appointments: 100, revenue: 500*100  },
  { month: "Feb", appointments: 520, revenue: 500*520  },
  { month: "Mar", appointments: 450, revenue: 500*450  },
  { month: "Apr", appointments: 680, revenue: 500*680  },
  { month: "May", appointments: 750, revenue: 500*750  },
  { month: "Jun", appointments: 890, revenue: 500*890 },
]


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
    { icon: FileText, label: "Generate Invoice" },
    { icon: Calendar, label: "Manage Appointments" },
  ]

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Healthcare Dashboard</h1>
        <p className="text-gray-600">Welcome back. Here's your system overview.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat, index) => {
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
        <TrendingUp size={24} style={{ color: "#16a34a" }} />
        Appointments & Revenue
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={appointmentData}>
          <defs>
            <linearGradient id="appointmentsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#4ade80" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.3} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis yAxisId="left" stroke="#16a34a" />
          <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
          <Tooltip contentStyle={{ backgroundColor: "#f9fafb", border: `2px solid #16a34a` }} />
          <Legend />
          <Bar yAxisId="left" dataKey="appointments" fill="url(#appointmentsGradient)" radius={[8, 8, 0, 0]} />
          <Bar yAxisId="right" dataKey="revenue" fill="url(#revenueGradient)" radius={[8, 8, 0, 0]} />
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
        {/* Recent Activities */}
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
                <div key={activity.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
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

        {/* Quick Actions & Notifications */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <button
                    key={index}
                    style={{ backgroundColor: PRIMARY_COLOR }}
                    className="w-full py-3 px-4 rounded-lg text-white font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Icon size={18} />
                    {action.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Notifications</h2>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3 border-l-4" style={{ borderLeftColor: PRIMARY_COLOR }}>
                <p className="text-sm font-medium text-gray-900">New Registration</p>
                <p className="text-xs text-gray-600 mt-1">2 doctors awaiting verification</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border-l-4" style={{ borderLeftColor: "#3b82f6" }}>
                <p className="text-sm font-medium text-gray-900">Payment Pending</p>
                <p className="text-xs text-gray-600 mt-1">5 invoices pending</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border-l-4" style={{ borderLeftColor: "#8b5cf6" }}>
                <p className="text-sm font-medium text-gray-900">System Maintenance</p>
                <p className="text-xs text-gray-600 mt-1">Scheduled tomorrow 2 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
