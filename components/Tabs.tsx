import React from "react";
import { Stats } from "./roadmapData";

interface TabsProps {
  activeTab: string | number;
  setActiveTab: (tab: string | number) => void;
  stats: Stats;
}

export default function Tabs({ activeTab, setActiveTab, stats }: TabsProps) {
  const handleTabClick = (tab: string | number) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <nav className="tabs">
      <button
        className={`tab ${activeTab === "dashboard" ? "active" : ""}`}
        onClick={() => handleTabClick("dashboard")}
      >
        Dashboard
      </button>

      <button
        className={`tab tab-character ${activeTab === "character" ? "active" : ""}`}
        onClick={() => handleTabClick("character")}
        title="Hero Profile"
      >
        ⚔️ Hero
      </button>

      {weeks.map((num) => {
        const pw = stats.perWeek[num];
        const done = pw && pw.done === pw.total;
        return (
          <button
            key={num}
            className={`tab ${activeTab === num ? "active" : ""}`}
            onClick={() => handleTabClick(num)}
          >
            W{num}
            {done && <span className="tick">✓</span>}
          </button>
        );
      })}

      <button
        className={`tab ${activeTab === "ach" ? "active" : ""}`}
        onClick={() => handleTabClick("ach")}
      >
        Achievements
      </button>
    </nav>
  );
}
