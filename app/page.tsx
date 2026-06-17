"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  computeStats,
  getLevel,
  checkAchievements,
  ACHIEVEMENTS,
  Stats,
  RevisionItem,
} from "../components/roadmapData";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import Dashboard from "../components/Dashboard";
import WeekView from "../components/WeekView";
import AchievementsView from "../components/AchievementsView";
import CharacterView from "../components/CharacterView";
import Footer from "../components/Footer";
import ToastContainer, { Toast } from "../components/ToastContainer";

const STORAGE_KEY = "roadmap-tracker-v1";

function todayStr() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

export default function Page() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [activity, setActivity] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<string | number>("dashboard");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [revisions, setRevisions] = useState<RevisionItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load state on mount
  useEffect(() => {
    async function loadProgress() {
      try {
        const res = await fetch("/api/progress");
        if (res.ok) {
          const data = await res.json();
          
          // Read local storage data
          const saved = localStorage.getItem(STORAGE_KEY);
          const localData = saved ? JSON.parse(saved) : null;
          
          const dbIsEmpty = !data.completed || Object.keys(data.completed).length === 0;
          const localHasData = localData && localData.completed && Object.keys(localData.completed).length > 0;
          
          if (dbIsEmpty && localHasData) {
            // Migrate local storage progress to MongoDB
            if (localData.completed) setCompleted(localData.completed);
            if (localData.activity) setActivity(localData.activity);
            if (localData.notes) setNotes(localData.notes);
            if (localData.revisions) setRevisions(localData.revisions);
            
            // Sync to MongoDB
            await fetch("/api/progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                completed: localData.completed || {},
                activity: localData.activity || {},
                notes: localData.notes || {},
                revisions: localData.revisions || [],
              }),
            });
          } else {
            if (data.completed) setCompleted(data.completed);
            if (data.activity) setActivity(data.activity);
            if (data.notes) setNotes(data.notes);
            if (data.revisions) setRevisions(data.revisions);
          }
        } else {
          // Fallback to localStorage on API error
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.completed) setCompleted(parsed.completed);
            if (parsed.activity) setActivity(parsed.activity);
            if (parsed.notes) setNotes(parsed.notes);
            if (parsed.revisions) setRevisions(parsed.revisions);
          }
        }
      } catch (e) {
        console.error("Failed to fetch progress from API", e);
        // Fallback to localStorage on request error
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.completed) setCompleted(parsed.completed);
          if (parsed.activity) setActivity(parsed.activity);
          if (parsed.notes) setNotes(parsed.notes);
          if (parsed.revisions) setRevisions(parsed.revisions);
        }
      } finally {
        setIsHydrated(true);
      }
    }
    loadProgress();

    // Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service Worker registered:", reg.scope))
        .catch((err) => console.error("Service Worker registration failed:", err));
    }
  }, []);

  const saveProgress = async (
    nextCompleted: Record<string, boolean>,
    nextActivity: Record<string, number>,
    nextNotes?: Record<string, string>,
    nextRevisions?: RevisionItem[]
  ) => {
    const activeNotes = nextNotes !== undefined ? nextNotes : notes;
    const activeRevisions = nextRevisions !== undefined ? nextRevisions : revisions;
    // Save to local storage for quick sync/offline backup
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          completed: nextCompleted,
          activity: nextActivity,
          notes: activeNotes,
          revisions: activeRevisions,
        })
      );
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }

    // Save to MongoDB
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: nextCompleted,
          activity: nextActivity,
          notes: activeNotes,
          revisions: activeRevisions,
        }),
      });
    } catch (e) {
      console.error("Failed to save progress to MongoDB", e);
    }
  };

  const showToast = (text: string, gold = false) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, gold }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  const handleToggle = (id: string, xp: number, checked: boolean) => {
    const today = todayStr();

    // Compute stats with current state
    const statsBefore = computeStats(completed, activity);
    const checksBefore = checkAchievements(statsBefore, completed);

    // Prepare updated state
    const nextCompleted = { ...completed };
    const nextActivity = { ...activity };

    if (checked) {
      nextCompleted[id] = true;
      nextActivity[today] = (nextActivity[today] || 0) + 1;
    } else {
      delete nextCompleted[id];
      nextActivity[today] = Math.max(0, (nextActivity[today] || 0) - 1);
    }

    // Update state synchronously to calculate new stats immediately
    setCompleted(nextCompleted);
    setActivity(nextActivity);
    saveProgress(nextCompleted, nextActivity);

    // Compute stats with new values
    const statsAfter = computeStats(nextCompleted, nextActivity);
    const checksAfter = checkAchievements(statsAfter, nextCompleted);

    if (checked) {
      showToast(`+${xp} XP`);

      // level up?
      const lvlBefore = getLevel(statsBefore.earnedXP);
      const lvlAfter = getLevel(statsAfter.earnedXP);
      if (lvlAfter.idx > lvlBefore.idx) {
        setTimeout(() => {
          showToast(`⭐ Level Up! You're now ${lvlAfter.cur.title}`, true);
        }, 350);
      }

      // new achievements?
      let delay = 700;
      ACHIEVEMENTS.forEach((a) => {
        if (checksAfter[a.id] && !checksBefore[a.id]) {
          setTimeout(() => {
            showToast(`${a.icon} Achievement: ${a.title}`, true);
          }, delay);
          delay += 700;
        }
      });
    }
  };

  const handleSaveNote = (id: string, text: string) => {
    const nextNotes = { ...notes, [id]: text };
    setNotes(nextNotes);
    saveProgress(completed, activity, nextNotes);
  };

  const handleAddRevision = (label: string, weekNum: number) => {
    const newItem: RevisionItem = {
      id: Math.random().toString(36).substring(2, 9),
      label,
      weekNum,
      addedAt: new Date().toISOString(),
      status: "pending",
    };
    const nextRevisions = [newItem, ...revisions];
    setRevisions(nextRevisions);
    saveProgress(completed, activity, notes, nextRevisions);
    showToast(`Added to revision queue`);
  };

  const handleToggleRevisionStatus = (id: string) => {
    const nextRevisions = revisions.map((r) => {
      if (r.id === id) {
        const nextStatus: "pending" | "revised" = r.status === "pending" ? "revised" : "pending";
        return {
          ...r,
          status: nextStatus,
          revisedAt: nextStatus === "revised" ? new Date().toISOString() : undefined,
        };
      }
      return r;
    });
    setRevisions(nextRevisions);
    saveProgress(completed, activity, notes, nextRevisions);

    const item = revisions.find((r) => r.id === id);
    if (item) {
      if (item.status === "pending") {
        showToast(`Marked as revised!`);
      } else {
        showToast(`Restored to queue`);
      }
    }
  };

  const handleDeleteRevision = (id: string) => {
    const nextRevisions = revisions.filter((r) => r.id !== id);
    setRevisions(nextRevisions);
    saveProgress(completed, activity, notes, nextRevisions);
    showToast(`Topic deleted`);
  };

  const handleReset = () => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      setCompleted({});
      setActivity({});
      setNotes({});
      setRevisions([]);
      saveProgress({}, {}, {}, []);
      showToast("Progress reset");
    }
  };

  if (!isHydrated) {
    return (
      <div className="app">
        <div className="loading">Loading your progress…</div>
      </div>
    );
  }

  const stats = computeStats(completed, activity);

  return (
    <div className="app">
      <Header stats={stats} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} stats={stats} />

      <main id="view">
        {activeTab === "dashboard" && (
          <Dashboard
            stats={stats}
            completed={completed}
            activity={activity}
            setActiveTab={setActiveTab}
            revisions={revisions}
            onAddRevision={handleAddRevision}
            onToggleRevisionStatus={handleToggleRevisionStatus}
            onDeleteRevision={handleDeleteRevision}
          />
        )}
        {activeTab === "ach" && (
          <AchievementsView stats={stats} completed={completed} />
        )}
        {activeTab === "character" && (
          <CharacterView stats={stats} completed={completed} />
        )}
        {typeof activeTab === "number" && (
          <WeekView
            weekNum={activeTab}
            stats={stats}
            completed={completed}
            onToggle={handleToggle}
            notes={notes}
            onSaveNote={handleSaveNote}
          />
        )}
      </main>

      <Footer onReset={handleReset} />
      <ToastContainer toasts={toasts} />
    </div>
  );
}
