'use client';
import { useState, useRef } from "react";
import Image from "next/image";

const patients = [
  {
    name: "Sarah Johnson",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "11:07 AM",
    unread: 2,
    avatar: "/images/doctors/d1.png"
  },
  {
    name: "John Doe",
    message: "Praesent commodo cursus magna.",
    time: "09:30 AM",
    unread: 1,
    avatar: "/images/doctors/d1.png"
  },
  {
    name: "Emma Brown",
    message: "Donec ullamcorper nulla non metus auctor fringilla.",
    time: "Yesterday",
    unread: 1,
    avatar: "/images/doctors/d1.png"
  }
];

const messages = [
  {
    sender: "patient",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "MAY 18, 2025"
  },
  {
    sender: "doctor",
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "MAY 18, 2025"
  }
];

export default function Messages() {
  const [selectedPatient, setSelectedPatient] = useState(0);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col md:flex-row h-[85vh] bg-[#F7F7F7] rounded-2xl overflow-hidden shadow-sm">
      {/* Sidebar (desktop + mobile toggle) */}
      <div className={`md:w-[320px] w-full bg-white p-4 flex flex-col gap-4 transition-all duration-300
        ${sidebarOpen ? "block" : "hidden md:flex"}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mb-2">
          <input
            type="text"
            placeholder="Search or Add"
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none text-sm"
          />
          <button className="mt-2 sm:mt-0 bg-[#5FE089] text-white px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap">
            + Add
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {patients.map((patient, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition border border-transparent ${
                selectedPatient === idx
                  ? "bg-[#F7F7F7] border-[#5FE089]"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setSelectedPatient(idx);
                setSidebarOpen(false);
              }}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src={patient.avatar}
                  alt={patient.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800 text-sm">
                  {patient.name}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {patient.message.split(" ").slice(0, 2).join(" ")}...
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-gray-400">{patient.time}</span>
                <span className="bg-[#5FE089] text-white text-xs rounded-full px-2 py-0.5">
                  {patient.unread}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar for mobile */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b md:hidden">
          <button
            className="text-gray-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <Image
              src={patients[selectedPatient].avatar}
              alt={patients[selectedPatient].name}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-gray-800 text-sm">
                {patients[selectedPatient].name}
              </div>
              <div className="text-xs text-gray-500">Patient</div>
            </div>
          </div>
        </div>

        {/* Header (desktop) */}
        <div className="hidden md:flex items-center gap-3 px-8 py-4 bg-white border-b">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={patients[selectedPatient].avatar}
              alt={patients[selectedPatient].name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-800">
              {patients[selectedPatient].name}
            </div>
            <div className="text-xs text-gray-500">Patient</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 md:px-8 py-4 md:py-6 flex flex-col gap-4 overflow-y-auto">
          <div className="w-full text-center text-xs text-gray-400 mb-2">
            {messages[0].time}
          </div>

          {/* Patient message */}
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <Image
                src={patients[selectedPatient].avatar}
                alt={patients[selectedPatient].name}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="bg-[#006D5B] text-white rounded-2xl px-4 py-2 text-sm max-w-[80%] md:max-w-[60%]">
              {messages[0].text}
            </div>
          </div>

          {/* Doctor message */}
          <div className="flex items-start gap-2 justify-end">
            <div className="bg-[#5FE089] text-white rounded-2xl px-4 py-2 text-sm max-w-[80%] md:max-w-[60%]">
              {messages[1].text}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="px-4 md:px-8 py-4 bg-white border-t">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message"
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none bg-[#DDFBE3] pr-20 text-sm"
            />
            <div className="absolute right-4 flex items-center gap-2">
              <button className="text-gray-400 hover:text-gray-700">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-gray-700">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15A7.96 7.96 0 0020 12c0-4.42-3.58-8-8-8S4 7.58 4 12c0 .34.02.67.06 1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
