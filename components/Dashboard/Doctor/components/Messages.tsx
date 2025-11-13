'use client';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/src/contexts/AuthContext";
import { initSocket } from "@/lib/Sockets/socket";
import { Fetchpatients } from "@/lib/Api/Patient/patient_api";
import axios from "axios";


export interface Patient {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  gender: string | null;
  country: string;
  city: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "patient" | string;
  isDeleted: boolean;
  socketId: string | null;
  isOnline: boolean;
  messages?: ChatMessage[];
  lastMessage?: string;
  unread?: number;
}

export interface ChatMessage {
  senderId: number;
  senderName: string;
  text: string;
  time: string;
}


export default function Messages() {
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState(0);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

 
  const socketRef = useRef<any>(null);


  const fetchPatients = async () => {
  const response = (await Fetchpatients("patient")) as Patient[];
  setPatients(response.map((p: Patient) => ({ ...p, messages: [], unread: 0 })));
};


  useEffect(() => {
    fetchPatients();
  }, []);

 
  const mapApiMessageToChatMessage = (msg: any): ChatMessage => {
    const isCurrentUserSender = msg.sendBy.id === user?.id;
    return {
      senderId: msg.sendBy.id,
      senderName: isCurrentUserSender ? "You" : msg.sendBy.fullName,
      text: msg.messageBody,
      time: msg.createdAt,
    };
  };

 const fetchChatHistory = async (receiverId: number) => {
  if (!user?.id) return;

  try {
    // Messages sent by current user
    const sentRes = await axios.get(
      "https://sehatyarr-c23468ec8014.herokuapp.com/messages/communication/logs",
      { params: { senderId: user.id, receiverId } }
    );

  
  

    // Map API messages to ChatMessage
    const sentMessages: ChatMessage[] = sentRes.data.map(mapApiMessageToChatMessage);
  

    // Merge and sort by time
    const history: ChatMessage[] = [...sentMessages].sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    setPatients(prev =>
      prev.map(p =>
        p.id === receiverId
          ? {
              ...p,
              messages: history,
              unread: 0,
              lastMessage: history[history.length - 1]?.text,
            }
          : p
      )
    );
  } catch (err) {
    console.error(err);
  }
};



useEffect(() => {
  if (!user?.id) return;

  // 1️⃣ Initialize socket
  const socket = initSocket(user.id.toString());
  socketRef.current = socket;

  // 2️⃣ Attach listeners
 

  const handleMessage = (msg: any) => {
    console.log("📩 Incoming message:", msg);

    setPatients((prev) =>
      prev.map((p, idx) => {
        if (p.id === msg.senderId || p.id === msg.receiverId) {
          const isActive = idx === selectedPatient;
          const newMessage = {
            senderId: msg.senderId,
            senderName:
              msg.senderId === parseInt(user?.id || "0") ? "You" : p.fullName,
            text: msg.message,
            time: new Date().toISOString(),
          };
          return {
            ...p,
            messages: [...(p.messages || []), newMessage],
            lastMessage: newMessage.text,
            unread: isActive ? 0 : (p.unread || 0) + 1,
          };
        }
        return p;
      })
    );
  };


  socketRef.current.on("message", handleMessage);


}, []);



const sendMessage = () => {
  if (!input.trim() || !user) return;

  const receiver = patients[selectedPatient];


 
  const senderId = parseInt(user.id, 10);

  const payload = {
    message: input,
    senderId,
    receiverId: receiver.id,
  };

  socketRef.current.emit("message", payload);


  setPatients(prev =>
    prev.map((p, idx) =>
      idx === selectedPatient
        ? {
            ...p,
            messages: [
              ...(p.messages || []),
              {
                senderId,
                senderName: "You",
                text: input,
                time: new Date().toISOString(),
              },
            ],
            lastMessage: input,
          }
        : p
    )
  );

  setInput("");
};


 
  const handleSelectPatient = (idx: number) => {
    setSelectedPatient(idx);
    setSidebarOpen(false);
    fetchChatHistory(patients[idx].id);
  };


  return (
    <div className="flex flex-col md:flex-row h-[85vh] bg-[#F7F7F7] rounded-2xl overflow-hidden shadow-sm">
      {/* Sidebar */}
      <div
        className={`md:w-[320px] w-full bg-white p-4 flex flex-col gap-4 transition-all duration-300
        ${sidebarOpen ? "block" : "hidden md:flex"}`}
      >
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
              onClick={() => handleSelectPatient(idx)}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src={"/images/doctors/d1.png"}
                  alt={patient.fullName}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800 text-sm">{patient.fullName}</div>
                <div className="text-xs text-gray-500 truncate">{patient.lastMessage || ""}</div>
              </div>
              {patient.unread ? (
                <div className="bg-[#5FE089] text-white text-xs rounded-full px-2 py-0.5">{patient.unread}</div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b md:hidden">
          <button className="text-gray-600" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <Image
              src={"/images/doctors/d1.png"}
              alt={patients[selectedPatient]?.fullName}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-gray-800 text-sm">{patients[selectedPatient]?.fullName}</div>
              <div className="text-xs text-gray-500">Patient</div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 md:px-8 py-4 md:py-6 flex flex-col gap-4 overflow-y-auto">
          {(patients[selectedPatient]?.messages || []).map((msg, i) => {
            const isSender = msg.senderId == parseInt(user?.id||"0");

            return (
              <div
                key={i}
                className={`flex items-start gap-2 ${isSender ? "justify-end" : "justify-start"}`}
              >
                {!isSender && (
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image
                      src={"/images/doctors/d1.png"}
                      alt={msg.senderName}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                )}

                <div
                  className={`${
                    isSender ? "bg-[#5FE089] text-white" : "bg-[#006D5B] text-white"
                  } rounded-2xl px-4 py-2 text-sm max-w-[80%] md:max-w-[60%]`}
                >
                  <div className="text-xs font-semibold mb-1">{msg.senderName}</div>
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="px-4 md:px-8 py-4 bg-white border-t flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message"
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none bg-[#DDFBE3] text-sm"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-[#5FE089] px-4 py-2 rounded-full text-white font-medium text-sm"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
