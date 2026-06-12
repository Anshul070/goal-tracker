import React from "react";
import { ROADMAP, Stats, xpForDsa, AI_XP, LB_XP } from "./roadmapData";

interface WeekViewProps {
  weekNum: number;
  stats: Stats;
  completed: Record<string, boolean>;
  onToggle: (id: string, xp: number, checked: boolean) => void;
}

export default function WeekView({ weekNum, stats, completed, onToggle }: WeekViewProps) {
  const w = ROADMAP[weekNum - 1];
  if (!w) return null;

  const pw = stats.perWeek[weekNum];
  const pct = pw && pw.total ? (pw.done / pw.total) * 100 : 0;

  const handleCheckboxChange = (id: string, xp: number, e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(id, xp, e.target.checked);
  };

  return (
    <div>
      <div className="week-head">
        <div className="week-num">Week {w.num} of 12</div>
        <div className="week-title">{w.title}</div>
        <div className="week-intro">{w.intro}</div>
        <div className="week-progress">
          <div className="week-progress-track">
            <div className="week-progress-fill" style={{ width: `${pct}%` }}></div>
          </div>
          <div className="week-progress-label">
            {pw ? pw.done : 0}/{pw ? pw.total : 0} · {pw ? pw.earnedXP : 0}/{pw ? pw.totalXP : 0} XP
          </div>
        </div>
      </div>

      {/* DSA Tasks */}
      <div className="task-group dsa-group">
        <div className="task-group-head">🧩 DSA — Day by Day</div>
        {w.days.flatMap((d, di) =>
          d.items.map((it, ii) => {
            if (it.d === "—") {
              return (
                <div className="note-row" key={`note-${di}-${ii}`}>
                  <span className="task-day">{d.day}</span>
                  <span>{it.n}</span>
                </div>
              );
            }
            const id = `t-w${w.num}-d${di}-i${ii}`;
            const done = !!completed[id];
            const xp = xpForDsa(it.d);
            return (
              <div className={`task-row ${done ? "done" : ""}`} key={id}>
                <span className="task-day">{d.day}</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={done}
                  onChange={(e) => handleCheckboxChange(id, xp, e)}
                />
                <div className="task-body">
                  <div className="task-text">{it.n}</div>
                  <div className="task-tags">
                    <span className="tag tag-pattern">{it.p}</span>
                    <span className={`tag tag-${it.d}`}>{it.d}</span>
                  </div>
                </div>
                <div className="task-xp">+{xp}</div>
              </div>
            );
          })
        )}
      </div>

      {/* AI / ML Track */}
      <div className="task-group ai-group">
        <div className="task-group-head">
          🤖 AI / ML Track — {w.aiTitle}
        </div>
        {w.ai.map((txt, i) => {
          const id = `t-w${w.num}-ai${i}`;
          const done = !!completed[id];
          return (
            <div className={`task-row ${done ? "done" : ""}`} key={id}>
              <input
                type="checkbox"
                className="checkbox"
                checked={done}
                onChange={(e) => handleCheckboxChange(id, AI_XP, e)}
              />
              <div className="task-body">
                <div className="task-text">{txt}</div>
              </div>
              <div className="task-xp">+{AI_XP}</div>
            </div>
          );
        })}
      </div>

      {/* Letbex Outreach Track */}
      <div className="task-group lb-group">
        <div className="task-group-head">📣 Letbex / Outreach</div>
        {w.letbex.map((txt, i) => {
          const id = `t-w${w.num}-lb${i}`;
          const done = !!completed[id];
          return (
            <div className={`task-row ${done ? "done" : ""}`} key={id}>
              <input
                type="checkbox"
                className="checkbox"
                checked={done}
                onChange={(e) => handleCheckboxChange(id, LB_XP, e)}
              />
              <div className="task-body">
                <div className="task-text">{txt}</div>
              </div>
              <div className="task-xp">+{LB_XP}</div>
            </div>
          );
        })}
      </div>

      {/* Resources Section */}
      <div className="section-title">
        <span className="dot" style={{ backgroundColor: "var(--text-faint)" }}></span>
        Resources
      </div>
      <div className="card">
        <ul className="resources-list">
          {w.resources.map((r, idx) => (
            <li key={idx}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
