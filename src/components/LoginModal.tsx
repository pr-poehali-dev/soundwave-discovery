import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LoginModalProps {
  onClose: () => void;
  onSwitchToPro: () => void;
}

export default function LoginModal({ onClose, onSwitchToPro }: LoginModalProps) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" style={{ backdropFilter: "blur(8px)" }} />
      <div
        className="relative glass-strong rounded-3xl p-8 w-full max-w-md border border-white/10 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors">
          <Icon name="X" size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl btn-neon flex items-center justify-center">
            <Icon name="Waves" size={20} className="text-white" />
          </div>
          <div>
            <div className="font-display font-black gradient-text text-lg">SoundWave</div>
            <div className="text-[10px] text-white/35 font-body tracking-wide">ТВОЯ ВОЛНА МУЗЫКИ</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 glass rounded-xl p-1 mb-6">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 rounded-lg text-sm font-body font-semibold transition-all ${
              tab === "login" ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            Войти
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-2 rounded-lg text-sm font-body font-semibold transition-all ${
              tab === "register" ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            Регистрация
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-3 mb-6">
          {tab === "register" && (
            <div className="relative">
              <Icon name="User" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full glass border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm font-body text-white placeholder:text-white/25 outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          )}
          <div className="relative">
            <Icon name="Mail" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full glass border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm font-body text-white placeholder:text-white/25 outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div className="relative">
            <Icon name="Lock" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full glass border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm font-body text-white placeholder:text-white/25 outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </div>

        <button className="w-full btn-neon rounded-xl py-3 font-body font-semibold text-white text-sm relative z-10 mb-4">
          {tab === "login" ? "Войти" : "Создать аккаунт"}
        </button>

        <div className="text-center">
          <span className="text-white/30 text-xs font-body">Хочешь без рекламы? </span>
          <button onClick={onSwitchToPro} className="text-purple-400 text-xs font-body hover:text-purple-300 transition-colors font-semibold">
            Попробуй Pro →
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-white/20 text-xs font-body">или</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="glass border border-white/8 rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm font-body text-white/60 hover:text-white hover:border-white/15 transition-all">
            <span className="text-base">🌐</span> Google
          </button>
          <button className="glass border border-white/8 rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm font-body text-white/60 hover:text-white hover:border-white/15 transition-all">
            <span className="text-base">🍎</span> Apple
          </button>
        </div>
      </div>
    </div>
  );
}
