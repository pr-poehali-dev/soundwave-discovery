import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const TRACKS = [
  {
    id: 1,
    title: "Neon Dreams",
    artist: "Synthwave Project",
    album: "Cyberpunk Nights",
    duration: "3:42",
    genre: "Synthwave",
    mood: "энергия",
    cover: "https://cdn.poehali.dev/projects/c2743870-3ba8-410b-bcb9-096c499ccf8a/files/4afbdf2f-e135-4597-818d-d367d04a8c9b.jpg",
    lyrics: "неоновые огни горят в ночи твой голос эхом в пустоте",
    plays: "2.4М",
  },
  {
    id: 2,
    title: "Sunset Boulevard",
    artist: "Aurora Nights",
    album: "Golden Hour",
    duration: "4:15",
    genre: "Indie Pop",
    mood: "ностальгия",
    cover: "https://cdn.poehali.dev/projects/c2743870-3ba8-410b-bcb9-096c499ccf8a/files/e856c7e6-2344-4912-8088-d803201bd504.jpg",
    lyrics: "закат над городом последний луч касается крыш",
    plays: "1.8М",
  },
  {
    id: 3,
    title: "Ocean Deep",
    artist: "Chill Collective",
    album: "Blue Horizon",
    duration: "5:03",
    genre: "Ambient",
    mood: "расслабление",
    cover: "https://cdn.poehali.dev/projects/c2743870-3ba8-410b-bcb9-096c499ccf8a/files/9f6292a0-d433-434a-830a-fe40c6f4c8ef.jpg",
    lyrics: "глубина океана тишина на дне покой и вечность",
    plays: "987К",
  },
  {
    id: 4,
    title: "Electric Rush",
    artist: "Beat Machine",
    album: "Power Mode",
    duration: "3:28",
    genre: "Electronic",
    mood: "энергия",
    cover: "https://cdn.poehali.dev/projects/c2743870-3ba8-410b-bcb9-096c499ccf8a/files/4afbdf2f-e135-4597-818d-d367d04a8c9b.jpg",
    lyrics: "электрический заряд бежит по венам ритм не остановить",
    plays: "3.1М",
  },
  {
    id: 5,
    title: "Midnight Rain",
    artist: "The Dreamers",
    album: "Late Night",
    duration: "4:47",
    genre: "Alternative",
    mood: "меланхолия",
    cover: "https://cdn.poehali.dev/projects/c2743870-3ba8-410b-bcb9-096c499ccf8a/files/e856c7e6-2344-4912-8088-d803201bd504.jpg",
    lyrics: "дождь за окном полночь ты снова думаешь о нём расставание осень",
    plays: "1.2М",
  },
  {
    id: 6,
    title: "Solar Wind",
    artist: "Cosmic Pulse",
    album: "Universe",
    duration: "6:12",
    genre: "Ambient Electronic",
    mood: "вдохновение",
    cover: "https://cdn.poehali.dev/projects/c2743870-3ba8-410b-bcb9-096c499ccf8a/files/9f6292a0-d433-434a-830a-fe40c6f4c8ef.jpg",
    lyrics: "солнечный ветер несёт тебя сквозь галактики",
    plays: "756К",
  },
];

const MOODS = [
  { label: "Энергия", emoji: "⚡", gradFrom: "#f97316", gradTo: "#eab308", bg: "rgba(249,115,22,0.12)" },
  { label: "Расслабление", emoji: "🌊", gradFrom: "#22d3ee", gradTo: "#3b82f6", bg: "rgba(34,211,238,0.12)" },
  { label: "Ностальгия", emoji: "🌅", gradFrom: "#ec4899", gradTo: "#f43f5e", bg: "rgba(236,72,153,0.12)" },
  { label: "Вдохновение", emoji: "✨", gradFrom: "#a855f7", gradTo: "#6366f1", bg: "rgba(168,85,247,0.12)" },
  { label: "Меланхолия", emoji: "🌧️", gradFrom: "#64748b", gradTo: "#3b82f6", bg: "rgba(100,116,139,0.12)" },
  { label: "Радость", emoji: "🎉", gradFrom: "#10b981", gradTo: "#84cc16", bg: "rgba(16,185,129,0.12)" },
];

const SITUATIONS = [
  { label: "Утро понедельника", emoji: "☀️", desc: "Заряд на неделю" },
  { label: "Пробежка в парке", emoji: "🏃", desc: "Ритм не остановить" },
  { label: "Вечер с друзьями", emoji: "🥂", desc: "Атмосфера праздника" },
  { label: "Дождь за окном", emoji: "🌧️", desc: "Уютные мелодии" },
];

const NAV_ITEMS = [
  { icon: "Waves", label: "Волна" },
  { icon: "Heart", label: "Настроения" },
  { icon: "Clock", label: "Время" },
  { icon: "Compass", label: "Открытия" },
  { icon: "Radio", label: "Радио" },
  { icon: "User", label: "Профиль" },
];

const MOOD_SEARCH_MAP: Record<string, string> = {
  осень: "меланхолия",
  расставани: "меланхолия",
  грусть: "меланхолия",
  грустн: "меланхолия",
  бег: "энергия",
  спорт: "энергия",
  трениров: "энергия",
  вдохнов: "вдохновение",
  релакс: "расслабление",
  отдых: "расслабление",
  покой: "расслабление",
};

export default function Index() {
  const [activeNav, setActiveNav] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(1);
  const [likedIds, setLikedIds] = useState<number[]>([1, 3]);
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [progress] = useState(37);
  const searchRef = useRef<HTMLInputElement>(null);

  const getSmartMoodFromQuery = () => {
    const q = searchQuery.toLowerCase();
    for (const [key, mood] of Object.entries(MOOD_SEARCH_MAP)) {
      if (q.includes(key)) return mood;
    }
    return null;
  };

  const smartMood = getSmartMoodFromQuery();

  const filteredTracks = TRACKS.filter((t) => {
    if (!searchQuery && !activeMood) return true;

    if (!searchQuery && activeMood) {
      return t.mood === activeMood.toLowerCase();
    }

    const q = searchQuery.toLowerCase();

    if (smartMood) {
      return t.mood === smartMood;
    }

    return (
      t.title.toLowerCase().includes(q) ||
      t.artist.toLowerCase().includes(q) ||
      t.genre.toLowerCase().includes(q) ||
      t.mood.toLowerCase().includes(q) ||
      t.lyrics.toLowerCase().includes(q) ||
      t.album.toLowerCase().includes(q)
    );
  });

  const currentTrack = TRACKS.find((t) => t.id === playingId) || TRACKS[0];

  const toggleLike = (id: number) => {
    setLikedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const playTrack = (id: number) => {
    setPlayingId(id === playingId ? null : id);
  };

  const getSearchHint = () => {
    if (!searchQuery) return null;
    if (smartMood) {
      const moodEmoji = MOODS.find(m => m.label.toLowerCase() === smartMood)?.emoji || "🎵";
      return `${moodEmoji} Умный поиск: подбираю треки с настроением «${smartMood}»`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[600px] h-[600px] top-[-200px] left-[-100px] bg-purple-600 opacity-20 animate-float" />
        <div className="orb w-[400px] h-[400px] top-[30%] right-[-150px] bg-cyan-500 opacity-15 animate-float-delayed" />
        <div className="orb w-[300px] h-[300px] bottom-[10%] left-[20%] bg-pink-500 opacity-10 animate-float" />
      </div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-20 glass flex flex-col items-center py-8 gap-2 z-50 border-r border-white/5">
        <div className="mb-6 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl btn-neon flex items-center justify-center animate-pulse-glow">
            <Icon name="Waves" size={20} className="text-white" />
          </div>
        </div>
        {NAV_ITEMS.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveNav(i)}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 group ${
              activeNav === i
                ? "bg-gradient-to-br from-purple-500/30 to-cyan-500/20 border border-purple-500/40"
                : "hover:bg-white/5"
            }`}
          >
            <Icon
              name={item.icon}
              size={20}
              className={activeNav === i ? "text-purple-400" : "text-white/40 group-hover:text-white/70"}
            />
            <span className={`text-[8px] font-body ${activeNav === i ? "text-purple-300" : "text-white/30"}`}>
              {item.label}
            </span>
          </button>
        ))}
        <div className="flex-1" />
        <button className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/5 transition-all">
          <Icon name="Settings" size={18} className="text-white/30 hover:text-white/60" />
        </button>
      </aside>

      {/* Main content */}
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
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              {searchQuery ? (
                <button onClick={() => setSearchQuery("")} className="text-white/25 hover:text-white/60 transition-colors">
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
            <button className="glass rounded-xl px-4 py-2 text-sm font-body text-white/55 hover:text-white border border-white/5 hover:bg-white/5 transition-all">
              Войти
            </button>
            <button className="btn-neon rounded-xl px-4 py-2 text-sm font-body font-semibold text-white relative z-10">
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
                      {[1,2,3,4,5].map(i => (
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
                    <button className="btn-neon rounded-2xl px-6 py-3 font-body font-semibold text-white flex items-center gap-2 relative z-10">
                      <Icon name="Play" size={16} className="text-white" />
                      Слушать сейчас
                    </button>
                    <button className="glass rounded-2xl px-6 py-3 font-body font-semibold text-white/65 hover:text-white border border-white/10 flex items-center gap-2 transition-all hover:bg-white/5">
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
                    onClick={() => setActiveMood(activeMood === mood.label ? null : mood.label)}
                    className="mood-tag rounded-2xl p-4 flex flex-col items-center gap-2 border transition-all"
                    style={{
                      background: activeMood === mood.label
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
          {!searchQuery && !activeMood && (
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-xl font-bold text-white">Время и место</h2>
                <button className="text-sm text-white/35 hover:text-purple-400 transition-colors font-body">Все →</button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {SITUATIONS.map((s) => (
                  <button
                    key={s.label}
                    className="glass rounded-2xl p-5 text-left border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all group"
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
                  {searchQuery
                    ? `Результаты поиска`
                    : activeMood
                    ? `Настроение: ${activeMood}`
                    : "Главная волна"}
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
                    style={{
                      backdropFilter: "blur(10px)",
                      animationDelay: `${idx * 0.05}s`,
                    }}
                  >
                    {/* Cover */}
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                      {playingId === track.id && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="flex gap-0.5 items-end h-4">
                            {[1,2,3].map(i => (
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
                        onClick={() => toggleLike(track.id)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                          likedIds.includes(track.id)
                            ? "text-pink-400 bg-pink-500/15"
                            : "text-white/25 hover:text-white/55 hover:bg-white/5"
                        }`}
                      >
                        <Icon name="Heart" size={15} />
                      </button>
                      <button
                        onClick={() => playTrack(track.id)}
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
                  <div key={track.id} className="track-card rounded-2xl overflow-hidden border border-white/5" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}>
                    <div className="relative h-44 overflow-hidden">
                      <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <button
                        onClick={() => playTrack(track.id)}
                        className="absolute bottom-3 right-3 w-11 h-11 btn-neon rounded-xl flex items-center justify-center relative z-10"
                      >
                        <Icon name={playingId === track.id ? "Pause" : "Play"} size={17} className="text-white" />
                      </button>
                      <div className="absolute top-3 left-3">
                        <span className="text-[9px] font-body font-bold text-cyan-400 tracking-widest uppercase px-2 py-1 rounded-lg" style={{ background: "rgba(34,211,238,0.15)", border: "1px solid rgba(34,211,238,0.3)" }}>
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
                        onClick={() => toggleLike(track.id)}
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

      {/* Bottom Player */}
      <div
        className="fixed bottom-0 left-20 right-0 z-50 border-t border-white/5"
        style={{ background: "rgba(15,12,25,0.92)", backdropFilter: "blur(30px)" }}
      >
        <div className="player-progress">
          <div className="player-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center gap-6 px-8 py-4">
          {/* Track */}
          <div className="flex items-center gap-4 w-72">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img src={currentTrack.cover} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="flex gap-0.5 items-end h-3">
                  {[1,2,3].map(i => (
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
              onClick={() => toggleLike(currentTrack.id)}
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
              onClick={() => setPlayingId(playingId ? null : currentTrack.id)}
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
    </div>
  );
}
