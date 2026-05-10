import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import PlayerBar from "@/components/PlayerBar";
import { TRACKS } from "@/data/soundwave";

export default function Index() {
  const [activeNav, setActiveNav] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [playingId, setPlayingId] = useState<number | null>(1);
  const [likedIds, setLikedIds] = useState<number[]>([1, 3]);
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [progress] = useState(37);

  const currentTrack = TRACKS.find((t) => t.id === playingId) || TRACKS[0];

  const toggleLike = (id: number) => {
    setLikedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const playTrack = (id: number) => {
    setPlayingId(id === playingId ? null : id);
  };

  const toggleMood = (label: string) => {
    setActiveMood(activeMood === label ? null : label);
  };

  const togglePlay = () => {
    setPlayingId(playingId ? null : currentTrack.id);
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
        onToggleMood={toggleMood}
        onToggleLike={toggleLike}
        onPlayTrack={playTrack}
      />

      <PlayerBar
        playingId={playingId}
        likedIds={likedIds}
        progress={progress}
        onTogglePlay={togglePlay}
        onToggleLike={toggleLike}
      />
    </div>
  );
}
