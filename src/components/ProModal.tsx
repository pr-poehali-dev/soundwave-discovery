import Icon from "@/components/ui/icon";

interface ProModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const FEATURES_FREE = [
  "Умный поиск по настроению",
  "Основные треки и плейлисты",
  "Реклама раз в 30 минут",
  "Офлайн до 10 треков",
];

const FEATURES_PRO = [
  "Без рекламы навсегда",
  "Офлайн до 1000 треков",
  "Hi-Fi качество звука",
  "Эксклюзивные подкасты",
  "Синхронизация устройств",
  "Таймер сна",
];

export default function ProModal({ onClose, onLogin }: ProModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" style={{ backdropFilter: "blur(8px)" }} />
      <div
        className="relative glass-strong rounded-3xl p-8 w-full max-w-2xl border border-white/10 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors">
          <Icon name="X" size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-body font-bold text-yellow-400 tracking-widest uppercase" style={{ background: "rgba(234,179,8,0.15)", border: "1px solid rgba(234,179,8,0.3)" }}>
            ✦ Специальное предложение
          </div>
          <h2 className="font-display text-3xl font-black text-white mb-2">
            Выбери свой <span className="gradient-text">тариф</span>
          </h2>
          <p className="text-white/45 font-body text-sm">Отмени подписку в любой момент</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Free */}
          <div className="glass rounded-2xl p-6 border border-white/8">
            <div className="font-display text-lg font-bold text-white mb-1">Бесплатно</div>
            <div className="text-3xl font-display font-black text-white mb-1">0 ₽</div>
            <div className="text-white/35 text-xs font-body mb-5">навсегда</div>
            <ul className="space-y-2.5 mb-6">
              {FEATURES_FREE.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm font-body text-white/60">
                  <Icon name="Check" size={14} className="text-white/30 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full glass border border-white/10 rounded-xl py-2.5 text-sm font-body text-white/50 hover:text-white hover:border-white/20 transition-all">
              Текущий план
            </button>
          </div>

          {/* Pro */}
          <div className="relative rounded-2xl p-6 border border-purple-500/40 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(34,211,238,0.08))" }}>
            <div className="absolute top-3 right-3">
              <span className="text-[9px] font-body font-bold text-white tracking-widest uppercase px-2 py-1 rounded-lg" style={{ background: "linear-gradient(135deg, #a855f7, #22d3ee)" }}>
                PRO
              </span>
            </div>
            <div className="font-display text-lg font-bold text-white mb-1">SoundWave Pro</div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-3xl font-display font-black text-white">199 ₽</span>
              <span className="text-white/40 text-sm font-body mb-1">/мес</span>
            </div>
            <div className="text-white/35 text-xs font-body mb-5">= 6.6 ₽ в день</div>
            <ul className="space-y-2.5 mb-6">
              {FEATURES_PRO.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm font-body text-white/85">
                  <Icon name="Check" size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button onClick={onLogin} className="w-full btn-neon rounded-xl py-2.5 text-sm font-body font-semibold text-white relative z-10">
              Подключить Pro
            </button>
          </div>
        </div>

        <p className="text-center text-white/25 text-xs font-body">
          Нажимая «Подключить Pro», вы соглашаетесь с условиями использования. Отмена в любой момент.
        </p>
      </div>
    </div>
  );
}
