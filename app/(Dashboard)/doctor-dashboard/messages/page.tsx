"use client";
import Messages from "@/components/Dashboard/Doctor/components/Messages";
import { initSocket } from "@/lib/Sockets/socket";
import { useAuth } from "@/src/contexts/AuthContext";
import { useEffect } from "react";

export default function MessagesPage() {
  


	return (
	<div
      className="w-full h-full overflow-y-auto overflow-x-hidden"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
      }}
    >
      {/* Hide scrollbar for Chrome, Safari, Edge */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
			<h1 className="text-2xl font-bold ">Messages</h1>
			<Messages />
		</div>
	);
}
