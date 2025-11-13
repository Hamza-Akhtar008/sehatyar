import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initSocket = (userID: string) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BASE_URL, {  // replace with your NestJS backend URL
      path: "/socket.io", // default path, adjust if your NestJS gateway uses a custom path
      auth: {
        userID,                           
      },
    });

    socket.on("connect", () => {
      console.log("Connected to NestJS socket server:", socket.id);
    });

    
  }

  return socket;
};
