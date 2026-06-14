"use client";

import React, { useEffect, useRef } from "react";
import { Stats, ALL_TASKS } from "./roadmapData";

interface CharacterViewProps {
  stats: Stats;
  completed: Record<string, boolean>;
}

export default function CharacterView({ stats, completed }: CharacterViewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Compute AI and Letbex done counts from completed map
  const aiCompleted = ALL_TASKS.filter(
    (t) => t.category === "ai" && completed[t.id]
  ).length;
  const letbexCompleted = ALL_TASKS.filter(
    (t) => t.category === "letbex" && completed[t.id]
  ).length;
  const aiTotal = ALL_TASKS.filter((t) => t.category === "ai").length;
  const letbexTotal = ALL_TASKS.filter((t) => t.category === "letbex").length;

  const heroStats = {
    xp: stats.earnedXP,
    dsaSolved: stats.dsaDone,
    aiCompleted,
    letbexCompleted,
    streak: stats.currentStreak,
    overallPct: Math.round(stats.overallPct),
  };

  function sendStats() {
    const frame = iframeRef.current;
    if (!frame || !frame.contentWindow) return;
    frame.contentWindow.postMessage(
      { type: "HERO_UPDATE", stats: heroStats },
      "*"
    );
  }

  useEffect(() => {
    sendStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats, completed]);

  function handleLoad() {
    // Small delay to ensure the iframe's JS is ready
    setTimeout(sendStats, 100);
  }

  const params = new URLSearchParams({
    xp: String(stats.earnedXP),
    dsa: String(stats.dsaDone),
    ai: String(aiCompleted),
    letbex: String(letbexCompleted),
    streak: String(stats.currentStreak),
    pct: String(Math.round(stats.overallPct)),
  });

  return (
    <div className="character-view-wrapper">
      <div className="character-view-header">
        <div className="character-view-title">
          <span className="character-view-icon">⚔️</span>
          Hero Profile
        </div>
        <div className="character-view-stats-summary">
          <span className="cv-pill cv-pill-dsa">🧩 {stats.dsaDone}/{stats.dsaTotal} DSA</span>
          <span className="cv-pill cv-pill-ai">🤖 {aiCompleted}/{aiTotal} AI</span>
          <span className="cv-pill cv-pill-letbex">📣 {letbexCompleted}/{letbexTotal} Letbex</span>
          <span className="cv-pill cv-pill-xp">⭐ {stats.earnedXP} XP</span>
        </div>
      </div>
      <iframe
        ref={iframeRef}
        src={`/character-profile.html?${params.toString()}`}
        title="Hero Character Profile"
        className="character-iframe"
        onLoad={handleLoad}
      />
    </div>
  );
}
