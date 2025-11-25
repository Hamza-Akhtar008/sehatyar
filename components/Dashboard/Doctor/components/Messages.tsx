'use client';
import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { useAuth } from "@/src/contexts/AuthContext";
import { initSocket } from "@/lib/Sockets/socket";
import { Fetchpatients } from "@/lib/Api/Patient/patient_api";
import axios from "axios";
import { Search, Plus, Send, Paperclip, MoreVertical, Phone, Video, ArrowLeft, Check, CheckCheck } from "lucide-react";

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
  lastMessageTime?: string;
  unread?: number;
}

export interface ChatMessage {
  senderId: number;
  senderName: string;
  text: string;
  time: string;
  type?: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
}

export default function Messages() {
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);

  // Handle responsive sidebar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setSidebarOpen(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchPatients = async () => {
    try {
      const response = (await Fetchpatients("patient")) as Patient[];
      // Initialize with empty messages and 0 unread
      setPatients(response.map((p: Patient) => ({ 
        ...p, 
        messages: [], 
        unread: 0,
        lastMessageTime: p.updatedAt || new Date().toISOString() // Fallback for sorting
      })));
    } catch (error) {
      console.error("Failed to fetch patients", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedPatientId, patients]);

  const mapApiMessageToChatMessage = (msg: any): ChatMessage => {
    const isCurrentUserSender = msg.sendBy.id === user?.id;
    return {
      senderId: msg.sendBy.id,
      senderName: isCurrentUserSender ? "You" : msg.sendBy.fullName,
      text: msg.messageBody,
      time: msg.createdAt,
      type: msg.type || 'text', // Assuming API might have this
    };
  };

  const fetchChatHistory = async (receiverId: number) => {
    if (!user?.id) return;

    try {
      const sentRes = await axios.get(
        "https://sehatyarr-c23468ec8014.herokuapp.com/messages/communication/logs",
        { params: { senderId: user.id, receiverId } }
      );

      const sentMessages: ChatMessage[] = sentRes.data.map(mapApiMessageToChatMessage);
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
                lastMessage: history[history.length - 1]?.text || p.lastMessage,
                lastMessageTime: history[history.length - 1]?.time || p.lastMessageTime,
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

    const socket = initSocket(user.id.toString());
    socketRef.current = socket;

    const handleMessage = (msg: any) => {
      console.log("📩 Incoming message:", msg);

      setPatients((prev) => {
        const updatedPatients = prev.map((p) => {
          if (p.id === msg.senderId || p.id === msg.receiverId) {
            const isActive = p.id === selectedPatientId;
            const newMessage: ChatMessage = {
              senderId: msg.senderId,
              senderName: msg.senderId === parseInt(user?.id || "0") ? "You" : p.fullName,
              text: msg.message,
              time: new Date().toISOString(),
              type: msg.type || 'text',
              fileUrl: msg.fileUrl,
              fileName: msg.fileName
            };
            
            return {
              ...p,
              messages: [...(p.messages || []), newMessage],
              lastMessage: newMessage.text,
              lastMessageTime: newMessage.time,
              unread: isActive ? 0 : (p.unread || 0) + 1,
            };
          }
          return p;
        });
        
        // Sort by lastMessageTime descending
        return updatedPatients.sort((a, b) => {
          const timeA = new Date(a.lastMessageTime || 0).getTime();
          const timeB = new Date(b.lastMessageTime || 0).getTime();
          return timeB - timeA;
        });
      });
    };

    socketRef.current.on("message", handleMessage);

    return () => {
      socketRef.current.off("message", handleMessage);
    };
  }, [user?.id, selectedPatientId]); 

  const sendMessage = () => {
    if ((!input.trim()) || !user || !selectedPatientId) return;

    const receiver = patients.find(p => p.id === selectedPatientId);
    if (!receiver) return;

    const senderId = parseInt(user.id, 10);
    const payload = {
      message: input,
      senderId,
      receiverId: receiver.id,
      type: 'text'
    };

    socketRef.current.emit("message", payload);

    setPatients(prev => {
      const updated = prev.map(p =>
        p.id === selectedPatientId
          ? {
              ...p,
              messages: [
                ...(p.messages || []),
                {
                  senderId,
                  senderName: "You",
                  text: input,
                  time: new Date().toISOString(),
                  type: 'text'
                } as ChatMessage,
              ],
              lastMessage: input,
              lastMessageTime: new Date().toISOString(),
            }
          : p
      );
      return updated.sort((a, b) => new Date(b.lastMessageTime || 0).getTime() - new Date(a.lastMessageTime || 0).getTime());
    });

    setInput("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !selectedPatientId) return;

    // In a real app, upload to server here and get URL.
    // For now, we'll simulate sending a file message.
    // We can use FileReader to show a preview if it's an image.
    
    const reader = new FileReader();
    reader.onload = () => {
        const fileUrl = reader.result as string;
        const isImage = file.type.startsWith('image/');
        
        const senderId = parseInt(user.id, 10);
        const receiver = patients.find(p => p.id === selectedPatientId);
        if(!receiver) return;

        const payload = {
            message: isImage ? "Sent an image" : `Sent a file: ${file.name}`,
            senderId,
            receiverId: receiver.id,
            type: isImage ? 'image' : 'file',
            fileUrl: fileUrl, // Sending base64 (not recommended for large files in prod, but works for demo)
            fileName: file.name
        };

        socketRef.current.emit("message", payload);

        setPatients(prev => {
            const updated = prev.map(p =>
              p.id === selectedPatientId
                ? {
                    ...p,
                    messages: [
                      ...(p.messages || []),
                      {
                        senderId,
                        senderName: "You",
                        text: payload.message,
                        time: new Date().toISOString(),
                        type: payload.type as 'text' | 'image' | 'file',
                        fileUrl: fileUrl,
                        fileName: file.name
                      },
                    ],
                    lastMessage: payload.message,
                    lastMessageTime: new Date().toISOString(),
                  }
                : p
            );
            return updated.sort((a, b) => new Date(b.lastMessageTime || 0).getTime() - new Date(a.lastMessageTime || 0).getTime());
          });
    };
    reader.readAsDataURL(file);
    
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSelectPatient = (id: number) => {
    setSelectedPatientId(id);
    if (isMobile) setSidebarOpen(false);
    fetchChatHistory(id);
  };

  const activePatient = patients.find(p => p.id === selectedPatientId);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col md:flex-row h-[85vh] bg-gradient-to-br from-white/80 via-gray-50/60 to-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 font-sans relative">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#5FE089]/10 blur-[100px]" />
        <div className="absolute top-[60%] -right-[10%] w-[35%] h-[35%] rounded-full bg-[#1dd3c4]/10 blur-[80px]" />
      </div>
      
      {/* Sidebar */}
      <div
        className={`md:w-[380px] w-full bg-white/40 backdrop-blur-md border-r border-white/30 flex flex-col transition-all duration-300 relative z-10
        ${sidebarOpen ? "block" : "hidden md:flex"}`}
      >
        {/* Sidebar Header */}
        <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Messages</h2>
                <button className="p-2 bg-white/60 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all text-[#5FE089] hover:bg-white/80 border border-white/40">
                    <Plus size={20} />
                </button>
            </div>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search patients..."
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-lg focus:ring-2 focus:ring-[#5FE089]/30 focus:bg-white/80 transition-all text-sm text-gray-700 placeholder:text-gray-400"
                />
            </div>
        </div>

        {/* Patient List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 custom-scrollbar">
          {patients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => handleSelectPatient(patient.id)}
              className={`group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                selectedPatientId === patient.id
                  ? "bg-white/70 backdrop-blur-md shadow-xl border border-white/50 scale-[1.02]"
                  : "hover:bg-white/50 hover:backdrop-blur-sm hover:shadow-lg border border-transparent"
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/30 backdrop-blur-sm ring-2 ring-white/50 shadow-lg">
                    <Image
                    src="/images/doctors/d1.png"
                    alt={patient.fullName}
                    width={48}
                    height={48}
                    className="object-cover"
                    />
                </div>
                {patient.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-lg shadow-green-500/50 animate-pulse"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-semibold text-sm truncate ${selectedPatientId === patient.id ? 'text-gray-900' : 'text-gray-800'}`}>
                        {patient.fullName}
                    </h3>
                    {patient.lastMessageTime && (
                        <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2 bg-white/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                            {formatTime(patient.lastMessageTime)}
                        </span>
                    )}
                </div>
                <p className={`text-xs truncate ${patient.unread ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
                    {patient.lastMessage || "No messages yet"}
                </p>
              </div>

              {patient.unread ? (
                <div className="min-w-[20px] h-5 flex items-center justify-center bg-gradient-to-br from-[#5FE089] to-[#4CD078] text-white text-[10px] font-bold rounded-full px-1.5 shadow-lg shadow-green-400/50 border border-white/30 backdrop-blur-sm animate-pulse">
                    {patient.unread}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {activePatient ? (
        <div className={`flex-1 flex flex-col bg-white/30 backdrop-blur-md relative z-10 ${!sidebarOpen ? 'block' : 'hidden md:flex'}`}>
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-white/30 flex items-center justify-between bg-white/50 backdrop-blur-xl sticky top-0 z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <button 
                        className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-white/60 hover:backdrop-blur-sm rounded-full transition-all shadow-sm"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white/40 backdrop-blur-sm ring-2 ring-white/50 shadow-lg">
                            <Image
                                src={"/images/doctors/d1.png"}
                                alt={activePatient.fullName}
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                        </div>
                        {activePatient.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-lg shadow-green-500/50 animate-pulse"></div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{activePatient.fullName}</h3>
                        <span className={`text-xs flex items-center gap-1 px-2 py-0.5 rounded-full backdrop-blur-sm ${
                            activePatient.isOnline 
                                ? 'text-green-600 bg-green-100/60' 
                                : 'text-gray-500 bg-gray-100/60'
                        }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                                activePatient.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                            }`} />
                            {activePatient.isOnline ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <button className="p-2.5 text-gray-500 hover:text-[#5FE089] hover:bg-white/60 hover:backdrop-blur-sm rounded-full transition-all shadow-sm hover:shadow-md border border-transparent hover:border-white/40">
                        <Phone size={20} />
                    </button>
                    <button className="p-2.5 text-gray-500 hover:text-[#5FE089] hover:bg-white/60 hover:backdrop-blur-sm rounded-full transition-all shadow-sm hover:shadow-md border border-transparent hover:border-white/40">
                        <Video size={20} />
                    </button>
                    <button className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-white/60 hover:backdrop-blur-sm rounded-full transition-all shadow-sm hover:shadow-md border border-transparent hover:border-white/40">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-transparent">
                {activePatient.messages?.map((msg, i) => {
                    const isSender = msg.senderId === parseInt(user?.id || "0");
                    return (
                        <div key={i} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex flex-col max-w-[75%] ${isSender ? 'items-end' : 'items-start'}`}>
                                <div 
                                    className={`px-5 py-3 rounded-2xl shadow-lg text-sm leading-relaxed backdrop-blur-md ${
                                        isSender 
                                            ? 'bg-gradient-to-br from-[#5FE089] to-[#4CD078] text-white rounded-tr-none border border-white/20' 
                                            : 'bg-white/70 text-gray-700 border border-white/40 rounded-tl-none'
                                    }`}
                                >
                                    {msg.type === 'image' && msg.fileUrl ? (
                                        <div className="mb-2 rounded-lg overflow-hidden border border-white/30 shadow-lg">
                                            <Image 
                                                src={msg.fileUrl} 
                                                alt="Shared image" 
                                                width={200} 
                                                height={200} 
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    ) : msg.type === 'file' ? (
                                        <div className="flex items-center gap-2 mb-1 p-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                                            <Paperclip size={16} />
                                            <span className="underline truncate max-w-[150px]">{msg.fileName || "Attachment"}</span>
                                        </div>
                                    ) : null}
                                    
                                    {msg.text}
                                </div>
                                <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-white/30 backdrop-blur-sm rounded-full">
                                    <span className="text-[10px] text-gray-600">{formatTime(msg.time)}</span>
                                    {isSender && (
                                        <CheckCheck size={12} className="text-[#5FE089] drop-shadow-sm" />
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 backdrop-blur-xl border-t border-white/30 shadow-lg">
                <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-2 rounded-full border border-white/40 focus-within:border-[#5FE089] focus-within:ring-2 focus-within:ring-[#5FE089]/20 focus-within:bg-white/80 transition-all shadow-lg">
                    <button 
                        className="p-2 text-gray-400 hover:text-[#5FE089] hover:bg-white/80 hover:backdrop-blur-sm rounded-full transition-all shadow-sm"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Paperclip size={20} />
                    </button>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={handleFileUpload}
                    />
                    
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-700 placeholder:text-gray-400 px-2"
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    
                    <button
                        className={`p-3 rounded-full transition-all shadow-lg border ${
                            input.trim() 
                                ? 'bg-gradient-to-br from-[#5FE089] to-[#4CD078] text-white hover:scale-105 hover:shadow-xl border-white/30 shadow-green-400/30' 
                                : 'bg-gray-200/60 backdrop-blur-sm text-gray-400 cursor-not-allowed border-white/20'
                        }`}
                        onClick={sendMessage}
                        disabled={!input.trim()}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
      ) : (
        <div className={`flex-1 flex-col items-center justify-center bg-white/20 backdrop-blur-md relative z-10 ${!sidebarOpen ? 'flex' : 'hidden md:flex'}`}>
            <div className="w-24 h-24 bg-white/40 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-xl">
                <Send size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Select a conversation</h3>
            <p className="text-gray-500 text-sm max-w-xs text-center">
                Choose a patient from the sidebar to start chatting or view history.
            </p>
        </div>
      )}
    </div>
  );
}
