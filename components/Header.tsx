import React from "react";
import { Stats, getLevel } from "./roadmapData";

interface HeaderProps {
  stats: Stats;
}

export default function Header({ stats }: HeaderProps) {
  const lvl = getLevel(stats.earnedXP);

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">12</div>
        <div>
          <div className="brand-title">12-Week Roadmap</div>
          <div className="brand-sub">DSA · Agentic AI · Letbex</div>
        </div>
      </div>
      <div className="stats-strip">
        <div className="level-chip">
          <span className="lv-icon">{lvl.cur.icon}</span>
          <span className="lv-num">LV {lvl.idx + 1}</span>
          <span className="lv-title">{lvl.cur.title}</span>
        </div>
        <div className="xp-track">
          <div className="xp-fill" style={{ width: `${lvl.pct}%` }}></div>
          <div className="xp-label">
            {stats.earnedXP} / {stats.totalXP} XP
          </div>
        </div>
        <div className="streak-chip">🔥 {stats.currentStreak}</div>
      </div>
    </header>
  );
}
