import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import PlayerBar from "@/components/PlayerBar";
import LoginModal from "@/components/LoginModal";
import ProModal from "@/components/ProModal";
import { TRACKS } from "@/data/soundwave";

export default function Index() {
  const [activeNav, setActiveNav] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [playingId, setPlayingId] = useState<number | null>(1);
  const [likedIds, setLikedIds] = useState<number[]>([1, 3]);
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [activeSituation, setActiveSituation] = useState<string | null>(null);
  const [progress, setProgress] = useState(37);
  const [volume, setVolume] = useState(75);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPro, setShowPro] = useState(false);

  const currentTrackIndex = TRACKS.findIndex((t) => t.id === playingId);
  const currentTrack = TRACKS[currentTrackIndex] ?? TRACKS[0];

  const toggleLike = (id: number) => {
    setLikedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const playTrack = (id: number) => {
    setPlayingId(id === playingId ? null : id);
    setProgress(0);
  };

  const toggleMood = (label: string) => {
    setActiveMood(activeMood === label ? null : label);
    setActiveSituation(null);
  };

  const toggleSituation = (label: string) => {
    setActiveSituation(activeSituation === label ? null : label);
    setActiveMood(null);
  };

  const togglePlay = () => {
    setPlayingId(playingId ? null : currentTrack.id);
  };

  const skipNext = () => {
    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * TRACKS.length);
      setPlayingId(TRACKS[randomIndex].id);
    } else {
      const nextIndex = (currentTrackIndex + 1) % TRACKS.length;
      setPlayingId(TRACKS[nextIndex].id);
    }
    setProgress(0);
  };

  const skipPrev = () => {
    if (progress > 5) {
      setProgress(0);
      return;
    }
    const prevIndex = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    setPlayingId(TRACKS[prevIndex].id);
    setProgress(0);
  };

  const playRandom = () => {
    const randomIndex = Math.floor(Math.random() * TRACKS.length);
    setPlayingId(TRACKS[randomIndex].id);
    setProgress(0);
  };

  const playFirst = () => {
    setPlayingId(TRACKS[0].id);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[600px] h-[600px] top-[-200px] left-[-100px] bg-purple-600 opacity-20 animate-float" />
        <div className="orb w-[400px] h-[400px] top-[30%] right-[-150px] bg-cyan-500 opacity-15 animate-float-delayed" />
        <div className="orb w-[300px] h-[300px] bottom-[10%] left-[20%] bg-pink-500 opacity-10 animate-float" />
      </div>

      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      <MainContent
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        playingId={playingId}
        likedIds={likedIds}
        activeMood={activeMood}
        activeSituation={activeSituation}
        onToggleMood={toggleMood}
        onToggleSituation={toggleSituation}
        onToggleLike={toggleLike}
        onPlayTrack={playTrack}
        onPlayFirst={playFirst}
        onPlayRandom={playRandom}
        onLogin={() => setShowLogin(true)}
        onPro={() => setShowPro(true)}
      />

      <PlayerBar
        playingId={playingId}
        likedIds={likedIds}
        progress={progress}
        volume={volume}
        shuffle={shuffle}
        repeat={repeat}
        onTogglePlay={togglePlay}
        onToggleLike={toggleLike}
        onSkipNext={skipNext}
        onSkipPrev={skipPrev}
        onToggleShuffle={() => setShuffle((s) => !s)}
        onToggleRepeat={() => setRepeat((r) => !r)}
        onVolumeChange={setVolume}
        onProgressChange={setProgress}
      />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToPro={() => { setShowLogin(false); setShowPro(true); }}
        />
      )}

      {showPro && (
        <ProModal
          onClose={() => setShowPro(false)}
          onLogin={() => { setShowPro(false); setShowLogin(true); }}
        />
      )}
    </div>
  );
}
