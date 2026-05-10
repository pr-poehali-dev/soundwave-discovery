import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "@/data/soundwave";

interface SidebarProps {
  activeNav: number;
  onNavChange: (i: number) => void;
}

export default function Sidebar({ activeNav, onNavChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-20 glass flex flex-col items-center py-8 gap-2 z-50 border-r border-white/5">
      <div className="mb-6 flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl btn-neon flex items-center justify-center animate-pulse-glow">
          <Icon name="Waves" size={20} className="text-white" />
        </div>
      </div>
      {NAV_ITEMS.map((item, i) => (
        <button
          key={i}
          onClick={() => onNavChange(i)}
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
  );
}
