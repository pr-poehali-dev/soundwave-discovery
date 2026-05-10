import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { TRACKS, MOODS, SITUATIONS, MOOD_SEARCH_MAP } from "@/data/soundwave";

interface MainContentProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  playingId: number | null;
  likedIds: number[];
  activeMood: string | null;
  activeSituation: string | null;
  onToggleMood: (label: string) => void;
  onToggleSituation: (label: string) => void;
  onToggleLike: (id: number) => void;
  onPlayTrack: (id: number) => void;
  onPlayFirst: () => void;
  onPlayRandom: () => void;
  onLogin: () => void;
  onPro: () => void;
}

export default function MainContent({
  searchQuery,
  onSearchChange,
  playingId,
  likedIds,
  activeMood,
  activeSituation,
  onToggleMood,
  onToggleSituation,
  onToggleLike,
  onPlayTrack,
  onPlayFirst,
  onPlayRandom,
  onLogin,
  onPro,
}: MainContentProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const getSmartMoodFromQuery = () => {
    const q = searchQuery.toLowerCase();
    for (const [key, mood] of Object.entries(MOOD_SEARCH_MAP)) {
      if (q.includes(key)) return mood;
    }
    return null;
  };

  const smartMood = getSmartMoodFromQuery();

  const SITUATION_MOOD_MAP: Record<string, string> = {
    "Утро понедельника": "вдохновение",
    "Пробежка в парке": "энергия",
    "Вечер с друзьями": "радость",
    "Дождь за окном": "меланхолия",
  };

  const filteredTracks = TRACKS.filter((t) => {
    if (activeSituation) return t.mood === (SITUATION_MOOD_MAP[activeSituation] ?? "энергия");
    if (!searchQuery && !activeMood) return true;
    if (!searchQuery && activeMood) return t.mood === activeMood.toLowerCase();
    const q = searchQuery.toLowerCase();
    if (smartMood) return t.mood === smartMood;
    return (
      t.title.toLowerCase().includes(q) ||
      t.artist.toLowerCase().includes(q) ||
      t.genre.toLowerCase().includes(q) ||
      t.mood.toLowerCase().includes(q) ||
      t.lyrics.toLowerCase().includes(q) ||
      t.album.toLowerCase().includes(q)
    );
  });

  const getSearchHint = () => {
    if (!searchQuery) return null;
    if (smartMood) {
      const moodEmoji = MOODS.find((m) => m.label.toLowerCase() === smartMood)?.emoji || "🎵";
      return `${moodEmoji} Умный поиск: подбираю треки с настроением «${smartMood}»`;
    }
    return null;
  };

  return (
    <main className="ml-20 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/5 px-8 py-4 flex items-center gap-6">
        <div className="flex-1">
          <h1 className="font-display text-lg font-black gradient-text">SoundWave</h1>
          <p className="text-[10px] text-white/35 font-body tracking-wide">ТВОЯ ВОЛНА МУЗЫКИ</p>
        </div>

        {/* Smart Search */}
        <div className="flex-1 max-w-2xl relative">
          <div
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 border ${
              searchFocused
                ? "border-purple-500/60 bg-purple-500/8 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                : "border-white/8 bg-white/3"
            }`}
            style={{ backdropFilter: "blur(20px)" }}
          >
            <Icon
              name="Search"
              size={18}
              className={`transition-colors flex-shrink-0 ${searchFocused ? "text-purple-400" : "text-white/30"}`}
            />
            <input
              ref={searchRef}
              type="text"
              placeholder='Исполнитель, трек, строчка или "песня про осень и расставание"...'
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none font-body"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchQuery ? (
              <button onClick={() => onSearchChange("")} className="text-white/25 hover:text-white/60 transition-colors">
                <Icon name="X" size={16} />
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <Icon name="Sparkles" size={14} className="text-purple-400/60" />
                <span className="text-[10px] text-purple-400/50 font-body font-medium hidden xl:block">УМНЫЙ ПОИСК</span>
              </div>
            )}
          </div>

          {getSearchHint() && (
            <div
              className="absolute top-full mt-2 left-0 right-0 rounded-xl px-4 py-2.5 flex items-center gap-2 animate-fade-in border border-purple-500/20"
              style={{ background: "rgba(168,85,247,0.1)", backdropFilter: "blur(20px)" }}
            >
              <Icon name="Sparkles" size={14} className="text-purple-400" />
              <span className="text-xs text-purple-300 font-body">{getSearchHint()}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onLogin} className="glass rounded-xl px-4 py-2 text-sm font-body text-white/55 hover:text-white border border-white/5 hover:bg-white/5 transition-all">
            Войти
          </button>
          <button onClick={onPro} className="btn-neon rounded-xl px-4 py-2 text-sm font-body font-semibold text-white relative z-10">
            Pro версия
          </button>
        </div>
      </header>

      <div className="px-8 py-8 space-y-12">

        {/* Hero */}
        {!searchQuery && (
          <section className="relative rounded-3xl overflow-hidden" style={{ minHeight: 300 }}>
            <img
              src="https://cdn.poehali.dev/projects/c2743870-3ba8-410b-bcb9-096c499ccf8a/files/03d2dce7-1004-49f4-a059-850f7577e354.jpg"
              alt="SoundWave"
              className="absolute inset-0 w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, hsl(240,15%,6%) 45%, transparent 100%)" }} />
            <div className="relative z-10 p-10 flex items-center" style={{ minHeight: 300 }}>
              <div className="max-w-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1 items-end h-5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <span className="text-[10px] font-body text-cyan-400 font-bold tracking-widest uppercase">Живая волна</span>
                </div>
                <h2 className="font-display text-4xl font-black text-white leading-tight mb-3">
                  Музыка,<br /><span className="gradient-text">которая понимает</span>
                </h2>
                <p className="text-white/50 font-body text-sm mb-6 leading-relaxed">
                  Ищи по настроению, строчкам песни или ситуации.<br />
                  «Песня про осень и расставание» — и мы найдём.
                </p>
                <div className="flex gap-3">
                  <button onClick={onPlayFirst} className="btn-neon rounded-2xl px-6 py-3 font-body font-semibold text-white flex items-center gap-2 relative z-10">
                    <Icon name="Play" size={16} className="text-white" />
                    Слушать сейчас
                  </button>
                  <button onClick={onPlayRandom} className="glass rounded-2xl px-6 py-3 font-body font-semibold text-white/65 hover:text-white border border-white/10 flex items-center gap-2 transition-all hover:bg-white/5">
                    <Icon name="Shuffle" size={16} />
                    Случайное
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Mood */}
        {!searchQuery && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-bold text-white">Настроение</h2>
              <button className="text-sm text-white/35 hover:text-purple-400 transition-colors font-body">Все →</button>
            </div>
            <div className="grid grid-cols-6 gap-3">
              {MOODS.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => onToggleMood(mood.label)}
                  className="mood-tag rounded-2xl p-4 flex flex-col items-center gap-2 border transition-all"
                  style={{
                    background:
                      activeMood === mood.label
                        ? `linear-gradient(135deg, ${mood.gradFrom}33, ${mood.gradTo}22)`
                        : mood.bg,
                    borderColor: activeMood === mood.label ? `${mood.gradFrom}60` : "rgba(255,255,255,0.06)",
                    boxShadow: activeMood === mood.label ? `0 4px 24px ${mood.gradFrom}30` : "none",
                  }}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-xs font-body text-white/75 font-medium">{mood.label}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Situations */}
        {!searchQuery && !activeMood && !activeSituation && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-bold text-white">Время и место</h2>
              <button className="text-sm text-white/35 hover:text-purple-400 transition-colors font-body">Все →</button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {SITUATIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => onToggleSituation(s.label)}
                  className={`rounded-2xl p-5 text-left border transition-all group ${
                    activeSituation === s.label
                      ? "border-purple-500/50 bg-purple-500/10"
                      : "glass border-white/5 hover:border-purple-500/30 hover:bg-purple-500/5"
                  }`}
                >
                  <div className="text-3xl mb-3">{s.emoji}</div>
                  <div className="font-body font-semibold text-white/85 text-sm mb-1">{s.label}</div>
                  <div className="font-body text-white/30 text-xs">{s.desc}</div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Tracks */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                {searchQuery ? `Результаты поиска` : activeSituation ? activeSituation : activeMood ? `Настроение: ${activeMood}` : "Главная волна"}
              </h2>
              {searchQuery && (
                <p className="text-sm text-white/35 font-body mt-1">
                  Найдено {filteredTracks.length} треков · «{searchQuery}»
                </p>
              )}
            </div>
            {!searchQuery && (
              <button className="text-sm text-white/35 hover:text-purple-400 transition-colors font-body">Все треки →</button>
            )}
          </div>

          {filteredTracks.length === 0 ? (
            <div className="glass rounded-3xl p-16 text-center border border-white/5">
              <div className="text-5xl mb-4">🎵</div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Ничего не найдено</h3>
              <p className="text-white/35 font-body text-sm max-w-sm mx-auto">
                Попробуй описать настроение: «грустная песня про дождь» или «энергичная для тренировки»
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTracks.map((track, idx) => (
                <div
                  key={track.id}
                  className={`track-card rounded-2xl p-4 flex items-center gap-4 border transition-all ${
                    playingId === track.id
                      ? "border-purple-500/40 bg-purple-500/5"
                      : "border-white/5 bg-white/2 hover:bg-white/4"
                  }`}
                  style={{ backdropFilter: "blur(10px)", animationDelay: `${idx * 0.05}s` }}
                >
                  {/* Cover */}
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                    {playingId === track.id && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="flex gap-0.5 items-end h-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="wave-bar" style={{ width: 2, animationDelay: `${i * 0.15}s` }} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-body font-semibold text-white text-sm truncate">{track.title}</span>
                      <span
                        className="text-[10px] font-body px-2 py-0.5 rounded-full flex-shrink-0 font-medium"
                        style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc" }}
                      >
                        {track.mood}
                      </span>
                    </div>
                    <div className="text-white/35 text-xs font-body truncate">{track.artist} · {track.album}</div>
                  </div>

                  <span className="text-xs text-white/20 font-body hidden lg:block w-28 text-center">{track.genre}</span>

                  <div className="hidden md:flex items-center gap-1 text-white/25 w-16">
                    <Icon name="Play" size={10} />
                    <span className="text-xs font-body">{track.plays}</span>
                  </div>

                  <span className="text-sm text-white/35 font-body w-10 text-right flex-shrink-0">{track.duration}</span>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => onToggleLike(track.id)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        likedIds.includes(track.id)
                          ? "text-pink-400 bg-pink-500/15"
                          : "text-white/25 hover:text-white/55 hover:bg-white/5"
                      }`}
                    >
                      <Icon name="Heart" size={15} />
                    </button>
                    <button
                      onClick={() => onPlayTrack(track.id)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        playingId === track.id
                          ? "bg-gradient-to-br from-purple-500 to-cyan-500 text-white shadow-[0_4px_16px_rgba(168,85,247,0.4)]"
                          : "border border-white/10 text-white/50 hover:text-white hover:border-purple-500/40 bg-white/3"
                      }`}
                    >
                      <Icon name={playingId === track.id ? "Pause" : "Play"} size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Discoveries */}
        {!searchQuery && !activeMood && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-bold text-white">Открытия недели</h2>
              <button className="text-sm text-white/35 hover:text-cyan-400 transition-colors font-body">Все →</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {TRACKS.slice(0, 3).map((track) => (
                <div
                  key={track.id}
                  className="track-card rounded-2xl overflow-hidden border border-white/5"
                  style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <button
                      onClick={() => onPlayTrack(track.id)}
                      className="absolute bottom-3 right-3 w-11 h-11 btn-neon rounded-xl flex items-center justify-center relative z-10"
                    >
                      <Icon name={playingId === track.id ? "Pause" : "Play"} size={17} className="text-white" />
                    </button>
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[9px] font-body font-bold text-cyan-400 tracking-widest uppercase px-2 py-1 rounded-lg"
                        style={{ background: "rgba(34,211,238,0.15)", border: "1px solid rgba(34,211,238,0.3)" }}
                      >
                        НОВИНКА
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-body font-semibold text-white text-sm mb-0.5">{track.title}</div>
                      <div className="text-white/40 text-xs font-body">{track.artist}</div>
                    </div>
                    <button
                      onClick={() => onToggleLike(track.id)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        likedIds.includes(track.id) ? "text-pink-400 bg-pink-500/15" : "text-white/25 hover:text-white/60"
                      }`}
                    >
                      <Icon name="Heart" size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}