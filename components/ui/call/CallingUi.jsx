import React, { memo, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/call/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, ScreenShare, Sparkles, NotebookPen, Clock, Volume2 } from "lucide-react";
import UniversalTooltip from "./TooltipUniversal";
import { cn } from "@/lib/utils";
import FilterSelector from "./FilterSelector";
import NotesPanel from "./NotesPanel";
import AudioSettingsPanel from "./AudioSettingsPanel";

// The ParticipantVideo component remains an excellent, reusable piece.
const ParticipantVideo = memo(({ participant, localUserName, isScreenShareView = false, filterClass }) => {
  const videoRef = useRef(null);
  const streamToDisplay = isScreenShareView ? participant.screenStream : participant.stream;

  useEffect(() => {
    if (videoRef.current && streamToDisplay) {
      videoRef.current.srcObject = streamToDisplay;
    }
  }, [streamToDisplay]);

  const isLocalUser = participant.name === localUserName;

  // Determine the filter to apply:
  // 1. For local user: use the passed `filterClass` (which comes from `selectedFilter` state)
  // 2. For remote user: use `participant.filter` which is synced via socket
  const appliedFilter = isLocalUser ? filterClass : (participant.filter || "");

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center glass-panel shadow-2xl transition-all duration-300 hover:scale-[1.01]">
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocalUser || isScreenShareView}
        className={cn(
          "w-full h-full transition-transform duration-300",
          isScreenShareView ? "object-contain" : "object-cover mirror-self",
          streamToDisplay && (isScreenShareView || participant.videoOn) ? "" : "hidden",
          !isScreenShareView ? appliedFilter : ""
        )}
      />

      {/* Gradient overlay when video is off */}
      {(!streamToDisplay || (!isScreenShareView && !participant.videoOn)) && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#5fe089]/10 via-[#1dd3c4]/10 to-[#5fe089]/10 flex items-center justify-center backdrop-blur-md">
          <div className="p-6 rounded-full bg-white/5 border border-white/10 shadow-xl">
            <Users className="h-16 w-16 text-white/50" />
          </div>
        </div>
      )}

      {/* Participant name */}
      <div className="absolute bottom-4 left-4 bg-black/40 border border-white/10 px-4 py-1.5 rounded-full text-sm font-medium text-white backdrop-blur-md shadow-lg">
        {participant.name} {isLocalUser && !isScreenShareView && "(You)"}
      </div>

      {/* Mic status */}
      {!isScreenShareView && (
        <div className={cn(
          "absolute bottom-4 right-4 p-2 rounded-full shadow-lg backdrop-blur-md border border-white/10 transition-colors",
          participant.micOn ? "bg-black/40 text-white" : "bg-red-500/80 text-white"
        )}>
          {participant.micOn ? (
            <Mic className="h-4 w-4" />
          ) : (
            <MicOff className="h-4 w-4" />
          )}
        </div>
      )}

      {/* Active speaker highlight */}
      {participant.isSpeaking && (
        <div className="absolute inset-0 rounded-2xl border-2 border-[#5fe089] pointer-events-none animate-pulse shadow-[0_0_20px_rgba(95,224,137,0.3)]"></div>
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
  isAudioOnly,
}) => {
  // State management for local user's media controls
  const localUser = participants.find(p => p.name === localUserName);
  const [isVideoEnabled, setIsVideoEnabled] = useState(() => localUser?.videoOn ?? true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(() => localUser?.micOn ?? true);

  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('filter-none');

  // Audio Settings state
  const [showAudioSettings, setShowAudioSettings] = useState(false);
  const [audioMode, setAudioMode] = useState('standard');

  // Notes state
  const [showNotes, setShowNotes] = useState(false);

  // Timer state (30 minutes default)
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft > 5 * 60) return "bg-[#5fe089]/20 text-[#5fe089] border-[#5fe089]/30";
    if (timeLeft > 1 * 60) return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    return "bg-red-500/20 text-red-500 border-red-500/30 animate-pulse";
  };

  // Emit filter change to other participants
  useEffect(() => {
    if (socket && roomID && localUserName) {
      socket.emit("updateUserFilter", {
        roomID,
        userName: localUserName,
        filter: selectedFilter
      });
    }
  }, [selectedFilter, socket, roomID, localUserName]);

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
      // toast({
      //     title: `No ${mediaType} track found`,
      //     description: "Please check your device and browser permissions.",
      //     variant: "destructive"
      // });
    }
  };

  const handleAudioModeChange = async (mode) => {
    setAudioMode(mode);
    setShowAudioSettings(false);

    const localParticipant = participants.find(p => p.name === localUserName);
    if (!localParticipant?.stream) return;

    const audioTrack = localParticipant.stream.getAudioTracks()[0];
    if (!audioTrack) return;

    try {
      const constraints = {
        standard: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        },
        'noise-reduction': {
          echoCancellation: true,
          noiseSuppression: { ideal: true },
          autoGainControl: true
        },
        'voice-clarity': {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: { ideal: true },
          channelCount: 1 // Mono is often clearer for voice
        }
      };

      await audioTrack.applyConstraints(constraints[mode]);
      console.log(`Applied audio mode: ${mode}`);
    } catch (err) {
      console.error("Failed to apply audio constraints:", err);
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
    if (count === 1) return "grid-cols-1 max-w-4xl mx-auto";
    if (count === 2) return "grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto";
    if (count >= 3 && count <= 4) return "grid-cols-2 grid-rows-2";
    if (count >= 5 && count <= 9) return "grid-cols-3 grid-rows-3";
    return "grid-cols-4"; // For 10-12 participants
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#0a0a0a] text-gray-100 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#5fe089]/5 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#1dd3c4]/5 blur-[100px]" />
      </div>

      {/* Timer Display */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md shadow-lg transition-all duration-500",
          getTimerColor()
        )}>
          <Clock className="w-4 h-4" />
          <span className="font-mono font-bold text-lg tracking-widest">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex p-6 gap-6 overflow-hidden relative z-10">
        <div className={cn("flex-1 flex flex-col gap-6 overflow-hidden transition-all duration-300", showNotes ? "mr-0" : "")}>
          {screenSharer ? (
            <>
              {/* Main screen share view */}
              <div className="flex-1 relative rounded-2xl overflow-hidden glass-panel shadow-2xl">
                <ParticipantVideo
                  participant={screenSharer}
                  localUserName={localUserName}
                  isScreenShareView={true}
                />
                <div className="absolute bottom-6 left-6 bg-black/60 border border-white/10 text-white px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md shadow-lg flex items-center gap-2">
                  <ScreenShare className="w-4 h-4 text-[#5fe089]" />
                  {screenSharer.name} is sharing their screen
                </div>
              </div>

              {/* Participant Sidebar */}
              <aside className="w-full h-48 flex gap-4 overflow-x-auto p-3 rounded-2xl glass-panel">
                {participants.map((participant) => (
                  <div
                    key={participant.name}
                    className="relative min-w-[280px] h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <ParticipantVideo
                      participant={participant}
                      localUserName={localUserName}
                      filterClass={participant.name === localUserName ? selectedFilter : ""}
                    />
                  </div>
                ))}
              </aside>
            </>
          ) : (
            /* Grid Layout for normal call */
            <div className={`w-full h-full grid ${getGridLayout(participantCount)} gap-6 items-center justify-center content-center p-4`}>
              {participants.map((participant) => (
                <div
                  key={participant.name}
                  className={cn(
                    "relative w-full h-full max-h-[calc(100vh-180px)] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300",
                    {
                      "col-span-1 row-span-1": participantCount > 2,
                      "col-span-2 row-span-2": participantCount === 1,
                    }
                  )}
                >
                  <ParticipantVideo
                    participant={participant}
                    localUserName={localUserName}
                    filterClass={participant.name === localUserName ? selectedFilter : ""}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notes Panel */}
        {showNotes && (
          <NotesPanel roomID={roomID} onClose={() => setShowNotes(false)} />
        )}
      </main>

      {/* Filter Selector Popup */}
      {showFilters && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-50">
          <FilterSelector currentFilter={selectedFilter} onSelectFilter={setSelectedFilter} />
        </div>
      )}

      {/* Audio Settings Popup */}
      {showAudioSettings && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-50 ml-16">
          <AudioSettingsPanel currentMode={audioMode} onSelectMode={handleAudioModeChange} />
        </div>
      )}

      {/* Footer Controls */}
      <footer className="w-full p-6 glass-panel border-t border-white/5 relative z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">

          {/* Leave Button */}
          <div className="flex-1 flex justify-start">
            <UniversalTooltip content="Leave call">
              <Button
                variant="destructive"
                size="lg"
                onClick={handleLeaveCall}
                className="bg-red-500/80 hover:bg-red-600/90 text-white rounded-full px-8 py-6 shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-105"
              >
                <PhoneOff className="h-5 w-5 mr-2" />
                <span className="font-semibold">End Call</span>
              </Button>
            </UniversalTooltip>
          </div>

          {/* Media Controls */}
          <div className="flex-1 flex items-center justify-center gap-6">
            <UniversalTooltip content={isAudioEnabled ? "Mute" : "Unmute"}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleMedia("audio")}
                className={cn(
                  "rounded-full w-14 h-14 glass-button shadow-lg",
                  !isAudioEnabled && "bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                )}
              >
                {isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
              </Button>
            </UniversalTooltip>

            {!isAudioOnly && (
              <>
                <UniversalTooltip content={isVideoEnabled ? "Stop video" : "Start video"}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleMedia("video")}
                    className={cn(
                      "rounded-full w-14 h-14 glass-button shadow-lg",
                      !isVideoEnabled && "bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                    )}
                  >
                    {isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
                  </Button>
                </UniversalTooltip>

                <UniversalTooltip content="Face Filters">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setShowFilters(!showFilters);
                      setShowAudioSettings(false);
                    }}
                    className={cn(
                      "rounded-full w-14 h-14 glass-button shadow-lg",
                      showFilters && "bg-[#5fe089]/20 border-[#5fe089]/50 text-[#5fe089]"
                    )}
                  >
                    <Sparkles className="h-6 w-6" />
                  </Button>
                </UniversalTooltip>

                <UniversalTooltip
                  content={isSharingScreen ? "Stop sharing" : screenSharer ? `${screenSharer.name} is sharing` : "Share screen"}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleScreenShare}
                    disabled={!!screenSharer && !isSharingScreen}
                    className={cn(
                      "rounded-full w-14 h-14 glass-button shadow-lg",
                      isSharingScreen && "bg-[#5fe089]/20 border-[#5fe089]/50 text-[#5fe089]"
                    )}
                    data-sharing={isSharingScreen}
                  >
                    <ScreenShare className="h-6 w-6" />
                  </Button>
                </UniversalTooltip>
              </>
            )}

            <UniversalTooltip content="Audio Settings">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowAudioSettings(!showAudioSettings);
                  setShowFilters(false);
                }}
                className={cn(
                  "rounded-full w-14 h-14 glass-button shadow-lg",
                  showAudioSettings && "bg-[#5fe089]/20 border-[#5fe089]/50 text-[#5fe089]"
                )}
              >
                <Volume2 className="h-6 w-6" />
              </Button>
            </UniversalTooltip>
          </div>

          <div className="flex-1 flex justify-end">
            <UniversalTooltip content="Consultation Notes">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotes(!showNotes)}
                className={cn(
                  "rounded-full w-14 h-14 glass-button shadow-lg",
                  showNotes && "bg-[#5fe089]/20 border-[#5fe089]/50 text-[#5fe089]"
                )}
              >
                <NotebookPen className="h-6 w-6" />
              </Button>
            </UniversalTooltip>
          </div>
        </div>
      </footer>
    </div>
  );
});

VideoCallScreen.displayName = "VideoCallScreen";

export default VideoCallScreen;