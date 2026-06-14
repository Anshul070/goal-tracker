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

  // embedded=1 tells the character page to hide its own top bar
  const params = new URLSearchParams({
    xp: String(stats.earnedXP),
    dsa: String(stats.dsaDone),
    ai: String(aiCompleted),
    letbex: String(letbexCompleted),
    streak: String(stats.currentStreak),
    pct: String(Math.round(stats.overallPct)),
    embedded: "1",
  });

  return (
    <div className="character-view-wrapper">
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
