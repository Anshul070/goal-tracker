import React from "react";
import { ACHIEVEMENTS, Stats, checkAchievements } from "./roadmapData";

interface AchievementsViewProps {
  stats: Stats;
  completed: Record<string, boolean>;
}

export default function AchievementsView({ stats, completed }: AchievementsViewProps) {
  const checks = checkAchievements(stats, completed);

  return (
    <div>
      <div className="section-title">
        <span className="dot" style={{ backgroundColor: "var(--gold)" }}></span>
        Achievements
      </div>
      <div className="ach-grid">
        {ACHIEVEMENTS.map((a) => {
          const unlocked = checks[a.id];
          return (
            <div className={`ach-card ${unlocked ? "unlocked" : "locked"}`} key={a.id}>
              <div className="ach-icon">{a.icon}</div>
              <div className="ach-title">{a.title}</div>
              <div className="ach-desc">{a.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
