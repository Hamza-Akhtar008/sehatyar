import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (userID: string) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BASE_URL as string, {
     
    transports: ['websocket', 'polling'],
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      auth: {
        userId:userID,
      },
   
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket disconnected:", reason);
    });

    socket.on("reconnect", (attempt) => {
      console.log(`🔄 Reconnected after ${attempt} attempts, new socket id: ${socket?.id}`);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });
  }

  return socket;
};

export const getSocket = () => socket;
