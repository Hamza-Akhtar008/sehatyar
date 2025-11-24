import React, { memo, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/call/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, ScreenShare } from "lucide-react";
import UniversalTooltip from "./TooltipUniversal";
import { cn } from "@/lib/utils"; // You may need to import a utility like this for conditional classes

// The ParticipantVideo component remains an excellent, reusable piece. No changes needed.
const ParticipantVideo = memo(({ participant, localUserName, isScreenShareView = false }) => {
    const videoRef = useRef(null);
    const streamToDisplay = isScreenShareView ? participant.screenStream : participant.stream;

    useEffect(() => {
        if (videoRef.current && streamToDisplay) {
            videoRef.current.srcObject = streamToDisplay;
        }
    }, [streamToDisplay]);

    const isLocalUser = participant.name === localUserName;

    return (
        <div className="relative w-full h-full rounded-lg bg-gray-900 overflow-hidden flex items-center justify-center">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={isLocalUser || isScreenShareView}
                className={cn("w-full h-full", 
                    isScreenShareView ? 'object-contain' : 'object-cover mirror-self',
                    streamToDisplay && (isScreenShareView || participant.videoOn) ? "" : "hidden"
                )}
            />
            {(!streamToDisplay || (!isScreenShareView && !participant.videoOn)) && <Users className="h-16 w-16 text-gray-400" />}
            
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-3 py-1 rounded-md text-sm">
                {participant.name} {isLocalUser && !isScreenShareView && "(You)"}
            </div>

            {!isScreenShareView && (
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 p-1.5 rounded-full">
                  {participant.micOn ? <Mic className="h-4 w-4"/> : <MicOff className="h-4 w-4 text-red-500"/> }
              </div>
            )}
        </div>
    );
});
ParticipantVideo.displayName = "ParticipantVideo";


const VideoCallScreen = memo(({
    participants,
    setParticipants,
    localUserName,
    socket,
    roomID,
    onToggleScreenShare,
    isSharingScreen,
    isAudioOnly, // ADDED: Receive the new prop

}) => {
    // State management for local user's media controls
    const localUser = participants.find(p => p.name === localUserName);
    const [isVideoEnabled, setIsVideoEnabled] = useState(() => localUser?.videoOn ?? true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(() => localUser?.micOn ?? true);
    
    useEffect(() => {
        const localUser = participants.find(p => p.name === localUserName);
        if (localUser) {
            setIsVideoEnabled(localUser.videoOn);
            setIsAudioEnabled(localUser.micOn);
        }
    }, [participants, localUserName]);

    // Effect to handle media state changes from remote users
    useEffect(() => {
        const handleMediaStateChanged = ({ userName, enabled, mediaType }) => {
            setParticipants(prev => prev.map(p => p.name === userName ? { ...p, [mediaType === "video" ? "videoOn" : "micOn"]: enabled } : p));
        };

        const handleScreenShareStatus = ({ name, isSharing }) => {
            const sharerName = isSharing ? name : null;
            setParticipants(prev => prev.map(p => ({
                ...p, 
                isCurrentlySharing: p.name === sharerName
            })));
        };

        socket?.on("mediaStateChanged", handleMediaStateChanged);
        socket?.on("screenShareStatus", handleScreenShareStatus);

        return () => {
            socket?.off("mediaStateChanged", handleMediaStateChanged);
            socket?.off("screenShareStatus", handleScreenShareStatus);
        };
    }, [socket, setParticipants]);

    const toggleMedia = (mediaType) => {
      // ... This function remains unchanged from the previous version ...
      const localParticipant = participants.find(p => p.name === localUserName);
      if (!localParticipant?.stream) return;

      const isVideo = mediaType === "video";
      const tracks = isVideo 
          ? localParticipant.stream.getVideoTracks()
          : localParticipant.stream.getAudioTracks();

      if (tracks.length > 0) {
          const track = tracks[0];
          track.enabled = !track.enabled;
          const isEnabled = track.enabled;
          if (isVideo) {
              setIsVideoEnabled(isEnabled);
          } else {
              setIsAudioEnabled(isEnabled);
          }
          setParticipants((prev) =>
              prev.map((p) => (p.name === localUserName ? { ...p, [isVideo ? "videoOn" : "micOn"]: isEnabled } : p))
          );
          socket?.emit("mediaStateChange", { roomID, userName: localUserName, enabled: isEnabled, mediaType });
      } else {
          toast({
              title: `No ${mediaType} track found`,
              description: "Please check your device and browser permissions.",
              variant: "destructive"
          });
      }
    };

    const handleLeaveCall = () => {
        socket?.disconnect();
        window.location.href = "/";
    };

    const screenSharer = participants.find(p => p.isCurrentlySharing && p.screenStream);
    const participantCount = participants.length;

    // Helper function to determine the grid layout dynamically
    const getGridLayout = (count) => {
        if (count === 1) return "grid-cols-1";
        if (count === 2) return "grid-cols-2";
        if (count >= 3 && count <= 4) return "grid-cols-2 grid-rows-2";
        if (count >= 5 && count <= 9) return "grid-cols-3 grid-rows-3";
        return "grid-cols-4"; // For 10-12 participants
    };

    return (
      <div className="flex h-screen w-full flex-col bg-gray-950 text-gray-100 overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 flex p-4 gap-4 overflow-hidden">
          {screenSharer ? (
            // Screen Sharing Layout ---
            <>
              {/* Main view for the screen share */}
              <div className="flex-1 h-full relative">
                <ParticipantVideo participant={screenSharer} localUserName={localUserName} isScreenShareView={true} />
                <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                  {screenSharer.name} is sharing their screen
                </div>
              </div>
              {/* Sidebar for other participants */}
              <div className="w-full lg:w-64 flex flex-col gap-4 overflow-y-auto">
                {participants.map((participant) => (
                  <div key={participant.name} className="relative w-full aspect-video shrink-0">
                    <ParticipantVideo participant={participant} localUserName={localUserName} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Grid Layout
            <div className={`w-full h-full grid ${getGridLayout(participantCount)} gap-4 items-center justify-center`}>
              {participants.map((participant) => (
                <div key={participant.name} className={cn("relative w-full h-full", {
                    "col-span-1 row-span-1": participantCount > 2,
                    "col-span-2 row-span-2": participantCount === 1 // Special case for 1 user to take up space
                })}>
                  <ParticipantVideo participant={participant} localUserName={localUserName} />
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer Control Bar */}
        <footer className="w-full p-4 bg-gray-950/80 border-t border-gray-800 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            {/* Left-aligned Leave Button */}
            <div className="w-1/3 flex justify-start">
              <UniversalTooltip content={"Leave call"}>
                <Button variant="destructive" size="lg" onClick={handleLeaveCall} className="!bg-red-600 hover:!bg-red-700">
                  <PhoneOff className="h-5 w-5 mr-2" />
                  Leave
                </Button>
              </UniversalTooltip>
            </div>

            {/* Centered Media Controls */}
            <div className="w-1/3 flex items-center justify-center gap-4">
              <UniversalTooltip content={isAudioEnabled ? "Mute" : "Unmute"}>
                <Button variant="ghost" size="icon" onClick={() => toggleMedia("audio")} className="rounded-full w-12 h-12 bg-gray-700 hover:bg-gray-600 data-[state=on]:bg-red-500">
                  {isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                </Button>
              </UniversalTooltip>

              {/* CHANGED: Conditionally render the video button */}
              {!isAudioOnly && (
                <UniversalTooltip content={isVideoEnabled ? "Stop video" : "Start video"}>
                  <Button variant="ghost" size="icon" onClick={() => toggleMedia("video")} className="rounded-full w-12 h-12 bg-gray-700 hover:bg-gray-600">
                    {isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
                  </Button>
                </UniversalTooltip>
              )}
              
              {/* CHANGED: Conditionally render the screen share button */}
              {!isAudioOnly && (
                <UniversalTooltip content={isSharingScreen ? "Stop sharing" : (screenSharer ? `${screenSharer.name} is sharing` : "Share screen")}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleScreenShare}
                    disabled={!!screenSharer && !isSharingScreen}
                    className="rounded-full w-12 h-12 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed data-[sharing=true]:bg-blue-600"
                    data-sharing={isSharingScreen}
                  >
                    <ScreenShare className="h-6 w-6" />
                  </Button>
                </UniversalTooltip>
              )}
            </div>

            {/* Right-aligned placeholder for balance */}
            <div className="w-1/3"></div>
          </div>
        </footer>
      </div>
    );
});

VideoCallScreen.displayName = "VideoCallScreen";

export default VideoCallScreen;