"use client";

import { useState, useRef, memo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/call/button";
import { Input } from "@/components/ui/call/input";

import { Alert, AlertTitle } from "@/components/ui/call/alert";
import { Camera, Loader2, RefreshCw, Mic, Video, Settings } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { io } from "socket.io-client";
import VideoCallScreen from "@/components/ui/call/CallingUi";

const backendDomain = "https://sehatyarr-c23468ec8014.herokuapp.com/signaling";

const peerConfiguration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function IndividualMeetingRoom() {
  const searchParams = useSearchParams();
  // Main camera/mic stream
  const [stream, setStream] = useState(null);
  // Separate stream for screen sharing
  const [screenStream, setScreenStream] = useState(null);

  const [permissionDenied, setPermissionDenied] = useState(false);
  const [userName, setUserName] = useState("");
  const [roomID, setRoomID] = useState("");
  const [isInCall, setIsInCall] = useState(false);
  const [loadingForJoiningCall, setLoadingForJoiningCall] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [isAudioOnly, setIsAudioOnly] = useState(false); // ADDED: State for audio-only call


  const socketRef = useRef(null);
  const localVideoRef = useRef(null);

  // Refs for camera/mic peer connections
  const peerConnectionsRef = useRef({});
  const pendingIceCandidates = useRef({});

  // NEW: Refs for screen share peer connections
  const screenPeerConnectionsRef = useRef({});
  const pendingScreenIceCandidates = useRef({});

  // Get roomID from URL and restore user name from localStorage
  useEffect(() => {
    const room = searchParams.get("roomId");
    if (room) setRoomID(room);
    // ADDED: Check for isAudioCall parameter
    const audioCallParam = searchParams.get("isAudioCall") === "true";
    setIsAudioOnly(audioCallParam);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserName(JSON.parse(storedUser)?.name || "");
      } catch (e) { console.error(e); }
    }
  }, [searchParams]);

  // Effect 1: Handles the socket connection lifecycle
  useEffect(() => {
    if (!roomID) return;
    const socket = io(backendDomain, { transports: ['websocket'] });
    socketRef.current = socket;
    socket.on('connect', () => console.log("Socket connected:", socket.id));
    socket.on('disconnect', () => console.log("Socket disconnected."));
    return () => socket.disconnect();
  }, [roomID]);


  const createPeerConnection = useCallback((remoteUserName, pcStream) => {
    if (peerConnectionsRef.current[remoteUserName]) {
      return peerConnectionsRef.current[remoteUserName];
    }
    const pc = new RTCPeerConnection(peerConfiguration);

    if (pcStream) {
      pcStream.getTracks().forEach((track) => pc.addTrack(track, pcStream));
    }

    pc.ontrack = (event) => {
      setParticipants((prev) => {
        const existingParticipant = prev.find((p) => p.name === remoteUserName);
        if (existingParticipant) {
          // If participant exists, update their stream
          return prev.map((p) => p.name === remoteUserName ? { ...p, stream: event.streams[0] } : p);
        }
        // If new, add them to the list
        return [...prev, { name: remoteUserName, stream: event.streams[0], micOn: true, videoOn: !isAudioOnly, screenStream: null }];
      });
    };

    pc.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit("sendIceCandidate", { roomID, senderName: userName, targetName: remoteUserName, candidate: event.candidate });
      }
    };
    peerConnectionsRef.current[remoteUserName] = pc;
    return pc;
  }, [roomID, userName, isAudioOnly]); // MODIFIED: Added isAudioOnly dependency

  const createAndSendOffer = useCallback(async (targetName) => {
    try {
      console.log(`Sending offer to: ${targetName}`);
      // `createPeerConnection` gets the main `stream` to add audio/video tracks
      const pc = createPeerConnection(targetName, stream);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socketRef.current.emit("sendOffer", {
        roomID,
        senderName: userName.trim(),
        targetName,
        offer: pc.localDescription
      });
    } catch (error) {
      console.error(`Error creating offer for ${targetName}:`, error);
    }
  }, [roomID, userName, stream, createPeerConnection]);

  const createScreenPeerConnection = useCallback((remoteUserName, pcScreenStream) => {
    if (screenPeerConnectionsRef.current[remoteUserName]) {
      return screenPeerConnectionsRef.current[remoteUserName];
    }
    const pc = new RTCPeerConnection(peerConfiguration);

    // If we are initiating the connection, add the local screen tracks
    if (pcScreenStream) {
      pcScreenStream.getTracks().forEach(track => pc.addTrack(track, pcScreenStream));
    }

    // This handles receiving the remote screen share stream
    pc.ontrack = (event) => {
      setParticipants(prev => prev.map(p =>
        p.name === remoteUserName ? { ...p, screenStream: event.streams[0] } : p
      ));
    };

    pc.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit("sendScreenIceCandidate", { roomID, senderName: userName, targetName: remoteUserName, candidate: event.candidate });
      }
    };
    screenPeerConnectionsRef.current[remoteUserName] = pc;
    return pc;
  }, [roomID, userName]);


  // Manages all socket event listeners
  useEffect(() => {
    if (!socketRef.current || !userName) return;
    const socket = socketRef.current;

    // Helper to process pending ICE candidates
    const processPendingCandidates = async (pcRef, pendingCandidatesRef, senderName) => {
      const pc = pcRef.current[senderName];
      const candidates = pendingCandidatesRef.current[senderName];
      if (pc?.remoteDescription && candidates?.length) {
        for (const candidate of candidates) {
          try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); }
          catch (err) { console.error("Error adding ICE candidate:", err); }
        }
        pendingCandidatesRef.current[senderName] = [];
      }
    };

    // Camera/Mic Handlers
    const handleReceiveOffer = async ({ offer, senderName }) => {
      if (!stream) return; // Don't process if local media isn't ready
      const pc = createPeerConnection(senderName, stream);

      // The rest of the function remains the same
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      await processPendingCandidates(
        peerConnectionsRef,
        pendingIceCandidates,
        senderName,
      );
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("sendAnswer", {
        roomID,
        senderName: userName,
        receiverName: senderName,
        answer,
      });
    };

    const handleReceiveAnswer = async ({ answer, senderName }) => {
      const pc = peerConnectionsRef.current[senderName];
      // Check if a PeerConnection exists and if it's actually expecting an answer.
      if (pc && pc.signalingState === 'have-local-offer') {
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
          // The connection is now stable, process any queued ICE candidates.
          await processPendingCandidates(peerConnectionsRef, pendingIceCandidates, senderName);
        } catch (err) {
          console.error("Error setting remote answer:", err);
        }
      } else {
        console.warn(`Received an answer from ${senderName}, but was not in the correct state. Current state: ${pc?.signalingState}`);
      }
    };

    // This handler is for EXISTING clients. When a newcomer arrives, they initiate the connection.
    const handleNewUserJoined = ({ name: newUserName }) => {
      // Don't try to connect to yourself if the server somehow sends your own name
      if (newUserName !== userName.trim()) {
        createAndSendOffer(newUserName);
      }
    };

    const handleReceiveIceCandidate = async ({ candidate, senderName }) => {
      const pc = peerConnectionsRef.current[senderName];
      if (pc?.remoteDescription) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } else {
        if (!pendingIceCandidates.current[senderName]) pendingIceCandidates.current[senderName] = [];
        pendingIceCandidates.current[senderName].push(candidate);
      }
    };

    // Screen Share Handlers
    const handleReceiveScreenOffer = async ({ offer, senderName }) => {
      const pc = createScreenPeerConnection(senderName, null); // We are receiving, so no local stream to add initially
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      await processPendingCandidates(screenPeerConnectionsRef, pendingScreenIceCandidates, senderName);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("sendScreenAnswer", { roomID, senderName: userName, receiverName: senderName, answer });
    };

    const handleReceiveScreenAnswer = async ({ answer, senderName }) => {
      const pc = screenPeerConnectionsRef.current[senderName];
      if (pc) await pc.setRemoteDescription(new RTCSessionDescription(answer));
      await processPendingCandidates(screenPeerConnectionsRef, pendingScreenIceCandidates, senderName);
    };

    const handleReceiveScreenIceCandidate = async ({ candidate, senderName }) => {
      const pc = screenPeerConnectionsRef.current[senderName];
      if (pc?.remoteDescription) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } else {
        if (!pendingScreenIceCandidates.current[senderName]) pendingScreenIceCandidates.current[senderName] = [];
        pendingScreenIceCandidates.current[senderName].push(candidate);
      }
    };

    const handleUserDisconnected = ({ name }) => {
      // Close both regular and screen share connections
      peerConnectionsRef.current[name]?.close();
      delete peerConnectionsRef.current[name];
      screenPeerConnectionsRef.current[name]?.close();
      delete screenPeerConnectionsRef.current[name];
      setParticipants((prev) => prev.filter((p) => p.name !== name));
    };

    const handleScreenShareStatus = ({ name, isSharing }) => {
      setParticipants(prev => prev.map(p => {
        // If the sharer stops, also nullify their screenStream
        if (p.name === name && !isSharing) {
          return { ...p, screenStream: null };
        }
        return p;
      }));
    };

    socket.on("receiveOffer", handleReceiveOffer);
    socket.on("receiveAnswer", handleReceiveAnswer);
    socket.on("receiveIceCandidate", handleReceiveIceCandidate);
    socket.on("receiveScreenOffer", handleReceiveScreenOffer);
    socket.on("receiveScreenAnswer", handleReceiveScreenAnswer);
    socket.on("receiveScreenIceCandidate", handleReceiveScreenIceCandidate);
    socket.on("userDisconnected", handleUserDisconnected);
    socket.on("screenShareStatus", handleScreenShareStatus);
    socket.on("newUserJoined", handleNewUserJoined);

    return () => {
      socket.off("receiveOffer");
      socket.off("receiveAnswer");
      socket.off("receiveIceCandidate");
      socket.off("receiveScreenOffer");
      socket.off("receiveScreenAnswer");
      socket.off("receiveScreenIceCandidate");
      socket.off("userDisconnected");
      socket.off("screenShareStatus");
      socket.off("newUserJoined");
    };
  }, [userName, stream, roomID, createPeerConnection, createAndSendOffer, createScreenPeerConnection]);

  const handleToggleScreenShare = async () => {
    // If already sharing, stop it
    if (screenStream) {
      // Notify others that you've stopped
      socketRef.current.emit("stopScreenShare", { roomID, name: userName.trim() });

      // Stop the local screen share tracks
      screenStream.getTracks().forEach(track => track.stop());

      // Close all screen share peer connections
      for (const peerName in screenPeerConnectionsRef.current) {
        screenPeerConnectionsRef.current[peerName].close();
      }

      // Clear the state and refs
      screenPeerConnectionsRef.current = {};
      pendingScreenIceCandidates.current = {};
      setScreenStream(null);
      return;
    }

    // If not sharing, start it
    try {
      const newScreenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: false // Typically, you don't share system audio
      });
      setParticipants(prev => prev.map(p =>
        p.name === userName.trim()
          ? { ...p, screenStream: newScreenStream }
          : p
      ));
      setScreenStream(newScreenStream);

      // Notify others you are starting to share
      socketRef.current.emit("startScreenShare", { roomID, name: userName.trim() });

      // Create new peer connections for screen sharing with every other participant
      const otherParticipants = participants.filter(p => p.name !== userName.trim());
      for (const participant of otherParticipants) {
        const pc = createScreenPeerConnection(participant.name, newScreenStream);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socketRef.current.emit("sendScreenOffer", {
          roomID,
          senderName: userName.trim(),
          targetName: participant.name,
          offer
        });
      }

      // Add a listener to handle the user clicking the browser's "Stop sharing" button
      newScreenStream.getVideoTracks()[0].onended = () => {
        handleToggleScreenShare();
      };
    } catch (error) {
      console.error("Error starting screen share:", error);
      toast({ title: "Could not start screen share.", variant: "destructive" });
    }
  };

  const requestMediaPermissions = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some(d => d.kind === "videoinput");
      const hasMic = devices.some(d => d.kind === "audioinput");

      if (!hasCamera && !hasMic) throw new Error("No camera or microphone found");

      // CHANGED: Conditionally request video based on isAudioOnly state
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: isAudioOnly ? false : hasCamera,
        audio: hasMic
      });

      setStream(mediaStream);
      if (localVideoRef.current) localVideoRef.current.srcObject = mediaStream;
      console.log("Media permissions granted.");
      setPermissionDenied(false);

    } catch (error) {
      console.error("Media permissions denied:", error);
      setPermissionDenied(true);
    }
  };

  const handleJoin = () => {
    if (!userName.trim() || !stream) return;

    setLoadingForJoiningCall(true);
    const payload = { roomID, name: userName.trim() };

    socketRef.current.emit("joinRoom", payload, (ack) => {
      setLoadingForJoiningCall(false);
      if (ack.error) {
        return toast({ title: ack.error, variant: "destructive" });
      }

      // CHANGED: Set videoOn to false if it's an audio-only call
      setParticipants([{ name: userName.trim(), stream: stream, micOn: true, videoOn: !isAudioOnly, screenStream: null }]);
      setIsInCall(true);
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0a0a0a] text-white px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#5fe089]/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#1dd3c4]/10 blur-[100px]" />
      </div>

      {isInCall ? (
        <VideoCallScreen
          participants={participants}
          setParticipants={setParticipants}
          localUserName={userName.trim()}
          socket={socketRef.current}
          roomID={roomID}
          onToggleScreenShare={handleToggleScreenShare}
          isSharingScreen={!!screenStream}
          isAudioOnly={isAudioOnly}
        />
      ) : (
        <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Media preview / access card */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col items-center justify-center min-h-[450px] transition-all duration-300 hover:shadow-2xl hover:bg-white/5">
            {!stream && !permissionDenied && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-[#5fe089]/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
                  {isAudioOnly ? <Mic className="w-10 h-10 text-[#5fe089]" /> : <Video className="w-10 h-10 text-[#5fe089]" />}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2 text-white">Ready to join?</h2>
                  <p className="text-gray-400">
                    Grant {isAudioOnly ? "microphone" : "camera and mic"} access to continue.
                  </p>
                </div>
                <Button
                  onClick={requestMediaPermissions}
                  className="rounded-full px-10 py-6 bg-gradient-to-r from-[#5fe089] to-[#00bfa6] hover:from-[#00bfa6] hover:to-[#5fe089] text-black font-bold shadow-lg shadow-[#5fe089]/20 transition-all duration-300 hover:scale-105"
                >
                  Grant Access
                </Button>
              </div>
            )}

            {permissionDenied && <PermissionDenied isAudioOnly={isAudioOnly} />}

            {isAudioOnly && stream && (
              <div className="flex flex-col items-center justify-center h-full animate-in fade-in zoom-in duration-500">
                <div className="w-32 h-32 rounded-full bg-[#5fe089]/20 flex items-center justify-center mb-6 ring-4 ring-[#5fe089]/10">
                  <Mic className="h-16 w-16 text-[#5fe089]" />
                </div>
                <p className="text-xl font-medium text-white">Microphone is active</p>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-1 h-1 rounded-full bg-[#5fe089] animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
            )}

            {!isAudioOnly && stream && (
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform scale-x-[-1]"
                />
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                  Preview
                </div>
              </div>
            )}
          </div>

          {/* User info / join form */}
          <div className="flex flex-col gap-8 p-10 rounded-3xl glass-panel relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Settings className="w-24 h-24 text-[#5fe089]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-white">You're all set</h2>
              <p className="text-gray-400">Enter your name to join the meeting room</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Display Name</label>
                <Input
                  placeholder="e.g. John Doe"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl px-4 py-6 focus:ring-[#5fe089] focus:border-[#5fe089] transition-all"
                />
              </div>

              <Button
                disabled={loadingForJoiningCall || !socketRef.current?.connected}
                onClick={handleJoin}
                className="w-full rounded-xl py-6 bg-gradient-to-r from-[#5fe089] to-[#00bfa6] hover:from-[#00bfa6] hover:to-[#5fe089] text-black font-bold shadow-lg shadow-[#5fe089]/20 transition-all duration-300 hover:scale-[1.02] text-lg flex items-center justify-center gap-3"
              >
                {loadingForJoiningCall ? <Loader2 className="animate-spin w-6 h-6" /> : `Join ${isAudioOnly ? "Audio Call" : "Video Call"}`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// MODIFIED: Accept isAudioOnly prop to show relevant message
const PermissionDenied = memo(({ isAudioOnly }) => (
  <div className="max-w-md mx-auto p-6 space-y-6 bg-red-500/10 rounded-2xl border border-red-500/20 backdrop-blur-sm">
    <div className="flex flex-col items-center text-center gap-4">
      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
        <Camera className="h-6 w-6 text-red-400" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">Permission Required</h3>
        <p className="text-gray-300 text-sm">
          Please enable {isAudioOnly ? "microphone" : "camera and microphone"} access in your browser settings to continue.
        </p>
      </div>
    </div>

    <Button
      onClick={() => window.location.reload()}
      className="w-full rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2 py-6"
    >
      <RefreshCw className="h-4 w-4" />
      Refresh Page
    </Button>
  </div>

));
PermissionDenied.displayName = "PermissionDenied";