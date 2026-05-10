import Icon from "@/components/ui/icon";
import { TRACKS } from "@/data/soundwave";

interface PlayerBarProps {
  playingId: number | null;
  likedIds: number[];
  progress: number;
  volume: number;
  shuffle: boolean;
  repeat: boolean;
  onTogglePlay: () => void;
  onToggleLike: (id: number) => void;
  onSkipNext: () => void;
  onSkipPrev: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onVolumeChange: (v: number) => void;
  onProgressChange: (v: number) => void;
}

export default function PlayerBar({
  playingId,
  likedIds,
  progress,
  volume,
  shuffle,
  repeat,
  onTogglePlay,
  onToggleLike,
  onSkipNext,
  onSkipPrev,
  onToggleShuffle,
  onToggleRepeat,
  onVolumeChange,
  onProgressChange,
}: PlayerBarProps) {
  const currentTrack = TRACKS.find((t) => t.id === playingId) || TRACKS[0];

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    onProgressChange(Math.max(0, Math.min(100, pct)));
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    onVolumeChange(Math.max(0, Math.min(100, pct)));
  };

  const volumeIcon = volume === 0 ? "VolumeX" : volume < 50 ? "Volume1" : "Volume2";

  return (
    <div
      className="fixed bottom-0 left-20 right-0 z-50 border-t border-white/5"
      style={{ background: "rgba(15,12,25,0.92)", backdropFilter: "blur(30px)" }}
    >
      {/* Progress bar — clickable */}
      <div
        className="player-progress cursor-pointer"
        onClick={handleProgressClick}
        title="Перемотать"
      >
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
          <button
            onClick={onToggleShuffle}
            className={`transition-colors relative ${shuffle ? "text-purple-400" : "text-white/30 hover:text-white/60"}`}
            title="Перемешать"
          >
            <Icon name="Shuffle" size={18} />
            {shuffle && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />}
          </button>
          <button onClick={onSkipPrev} className="text-white/55 hover:text-white transition-colors" title="Назад">
            <Icon name="SkipBack" size={22} />
          </button>
          <button
            onClick={onTogglePlay}
            className="w-12 h-12 btn-neon rounded-full flex items-center justify-center relative z-10 animate-pulse-glow"
          >
            <Icon name={playingId ? "Pause" : "Play"} size={20} className="text-white" />
          </button>
          <button onClick={onSkipNext} className="text-white/55 hover:text-white transition-colors" title="Вперёд">
            <Icon name="SkipForward" size={22} />
          </button>
          <button
            onClick={onToggleRepeat}
            className={`transition-colors relative ${repeat ? "text-purple-400" : "text-white/30 hover:text-white/60"}`}
            title="Повторять"
          >
            <Icon name="Repeat" size={18} />
            {repeat && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />}
          </button>
        </div>

        {/* Volume + extra */}
        <div className="flex items-center gap-4 w-72 justify-end">
          <div className="flex items-center gap-2">
            <button onClick={() => onVolumeChange(volume === 0 ? 75 : 0)} className="text-white/35 hover:text-white/70 transition-colors">
              <Icon name={volumeIcon} size={16} />
            </button>
            <div
              className="w-24 h-1 rounded-full cursor-pointer"
              style={{ background: "rgba(255,255,255,0.08)" }}
              onClick={handleVolumeClick}
              title="Громкость"
            >
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${volume}%`, background: "linear-gradient(90deg, #a855f7, #22d3ee)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}