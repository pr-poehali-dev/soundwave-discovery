import Icon from "@/components/ui/icon";
import { TRACKS } from "@/data/soundwave";

interface PlayerBarProps {
  playingId: number | null;
  likedIds: number[];
  progress: number;
  onTogglePlay: () => void;
  onToggleLike: (id: number) => void;
}

export default function PlayerBar({ playingId, likedIds, progress, onTogglePlay, onToggleLike }: PlayerBarProps) {
  const currentTrack = TRACKS.find((t) => t.id === playingId) || TRACKS[0];

  return (
    <div
      className="fixed bottom-0 left-20 right-0 z-50 border-t border-white/5"
      style={{ background: "rgba(15,12,25,0.92)", backdropFilter: "blur(30px)" }}
    >
      <div className="player-progress">
        <div className="player-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center gap-6 px-8 py-4">
        {/* Track info */}
        <div className="flex items-center gap-4 w-72">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
            <img src={currentTrack.cover} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="flex gap-0.5 items-end h-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="wave-bar" style={{ width: 2, animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-body font-semibold text-white text-sm truncate">{currentTrack.title}</div>
            <div className="text-white/40 text-xs font-body truncate">{currentTrack.artist}</div>
          </div>
          <button
            onClick={() => onToggleLike(currentTrack.id)}
            className={`flex-shrink-0 transition-all ${likedIds.includes(currentTrack.id) ? "text-pink-400" : "text-white/25 hover:text-white/55"}`}
          >
            <Icon name="Heart" size={16} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex-1 flex items-center justify-center gap-6">
          <button className="text-white/30 hover:text-white/60 transition-colors">
            <Icon name="Shuffle" size={18} />
          </button>
          <button className="text-white/55 hover:text-white transition-colors">
            <Icon name="SkipBack" size={22} />
          </button>
          <button
            onClick={onTogglePlay}
            className="w-12 h-12 btn-neon rounded-full flex items-center justify-center relative z-10 animate-pulse-glow"
          >
            <Icon name={playingId ? "Pause" : "Play"} size={20} className="text-white" />
          </button>
          <button className="text-white/55 hover:text-white transition-colors">
            <Icon name="SkipForward" size={22} />
          </button>
          <button className="text-white/30 hover:text-white/60 transition-colors">
            <Icon name="Repeat" size={18} />
          </button>
        </div>

        {/* Volume + extra */}
        <div className="flex items-center gap-4 w-72 justify-end">
          <div className="flex items-center gap-2">
            <Icon name="Volume2" size={16} className="text-white/35" />
            <div className="w-24 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div className="h-full w-3/4 rounded-full" style={{ background: "linear-gradient(90deg, #a855f7, #22d3ee)" }} />
            </div>
          </div>
          <button className="text-white/25 hover:text-white/55 transition-colors">
            <Icon name="Maximize2" size={16} />
          </button>
          <button className="text-white/25 hover:text-white/55 transition-colors">
            <Icon name="Moon" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
