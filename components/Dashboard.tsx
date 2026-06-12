import React from "react";
import { Stats, LEVELS, ROADMAP, ALL_TASKS, getLevel } from "./roadmapData";
import Heatmap from "./Heatmap";
import RoadmapCharts from "./RoadmapCharts";

interface DashboardProps {
  stats: Stats;
  completed: Record<string, boolean>;
  activity: Record<string, number>;
  setActiveTab: (tab: string | number) => void;
}

export default function Dashboard({ stats, completed, activity, setActiveTab }: DashboardProps) {
  const lvl = getLevel(stats.earnedXP);

  // Find next uncompleted task
  const next = ALL_TASKS.find((t) => !completed[t.id]);

  const handleGoto = (num: number) => {
    setActiveTab(num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="grid grid-4">
        <div className="card">
          <div className="card-label">Total XP</div>
          <div className="card-value accent-gold">{stats.earnedXP}</div>
          <div className="card-sub">of {stats.totalXP} XP available</div>
        </div>
        <div className="card">
          <div className="card-label">Level</div>
          <div className="card-value accent-purple">
            {lvl.idx + 1} / {LEVELS.length}
          </div>
          <div className="card-sub">{lvl.cur.title}</div>
        </div>
        <div className="card">
          <div className="card-label">Streak</div>
          <div className="card-value accent-coral">{stats.currentStreak}d</div>
          <div className="card-sub">best: {stats.bestStreak} days</div>
        </div>
        <div className="card">
          <div className="card-label">Overall Progress</div>
          <div className="card-value accent-teal">{stats.overallPct.toFixed(0)}%</div>
          <div className="card-sub">
            {stats.doneCount} / {stats.totalCount} tasks
          </div>
        </div>
      </div>

      {/* Next Up Section */}
      <div className="section-title">
        <span className="dot" style={{ backgroundColor: "var(--gold)" }}></span>
        Next Up
      </div>
      {next ? (
        <div className="nextup">
          <div className="nextup-icon">
            {next.category === "dsa" ? "🧩" : next.category === "ai" ? "🤖" : "📣"}
          </div>
          <div className="nextup-body">
            <div className="nextup-label">+{next.xp} XP</div>
            <div className="nextup-text">{next.label}</div>
            <div className="nextup-meta">
              {next.category === "dsa"
                ? `Week ${next.weekNum} · ${next.day} · ${next.pattern} · ${next.diff}`
                : `Week ${next.weekNum} · ${next.category === "ai" ? "AI/ML Track" : "Letbex Outreach"}`}
            </div>
          </div>
          <button className="nextup-btn" onClick={() => handleGoto(next.weekNum)}>
            Go to Week {next.weekNum} →
          </button>
        </div>
      ) : (
        <div className="nextup">
          <div className="nextup-body">
            <div className="nextup-text">🏆 Everything is complete. You finished the entire 12-week plan.</div>
          </div>
        </div>
      )}

      {/* Heatmap Section */}
      <div className="section-title">
        <span className="dot" style={{ backgroundColor: "var(--teal)" }}></span>
        Your Build Streak
      </div>
      <div className="card heatmap-card">
        <Heatmap activity={activity} />
      </div>

      {/* Progress Charts */}
      <div className="section-title">
        <span className="dot" style={{ backgroundColor: "var(--purple)" }}></span>
        Progress Breakdown
      </div>
      <RoadmapCharts stats={stats} completed={completed} />

      {/* Overview Table */}
      <div className="section-title">
        <span className="dot" style={{ backgroundColor: "var(--coral)" }}></span>
        12-Week Overview
      </div>
      <div className="card">
        <table className="overview-table">
          <thead>
            <tr>
              <th>Week</th>
              <th>Focus</th>
              <th>Progress</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ROADMAP.map((w) => {
              const pw = stats.perWeek[w.num];
              const pct = pw && pw.total ? (pw.done / pw.total) * 100 : 0;
              return (
                <tr key={w.num} onClick={() => handleGoto(w.num)}>
                  <td style={{ fontFamily: "var(--font-mono)", color: "var(--purple)", fontWeight: 700 }}>
                    W{w.num}
                  </td>
                  <td>{w.title}</td>
                  <td>
                    <div className="ov-bar">
                      <div className="ov-bar-fill" style={{ width: `${pct}%` }}></div>
                    </div>
                  </td>
                  <td style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)", fontSize: "11px" }}>
                    {pw ? pw.done : 0}/{pw ? pw.total : 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
