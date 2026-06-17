import React, { useState } from "react";
import { RevisionItem, ALL_TASKS, ROADMAP } from "./roadmapData";

interface RevisionPlannerProps {
  revisions: RevisionItem[];
  onAddRevision: (label: string, weekNum: number) => void;
  onToggleRevisionStatus: (id: string) => void;
  onDeleteRevision: (id: string) => void;
}

export default function RevisionPlanner({
  revisions,
  onAddRevision,
  onToggleRevisionStatus,
  onDeleteRevision,
}: RevisionPlannerProps) {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [customTopic, setCustomTopic] = useState<string>("");
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Filter tasks for the selected week
  const weekTasks = ALL_TASKS.filter((t) => t.weekNum === selectedWeek);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    let topicLabel = "";

    if (customTopic.trim()) {
      topicLabel = customTopic.trim();
    } else if (selectedTask) {
      const task = ALL_TASKS.find((t) => t.id === selectedTask);
      if (task) {
        topicLabel = task.label;
      }
    }

    if (!topicLabel) return;

    onAddRevision(topicLabel, selectedWeek);
    setCustomTopic("");
    setSelectedTask("");
  };

  const pendingRevisions = revisions.filter((r) => r.status === "pending");
  const completedRevisions = revisions.filter((r) => r.status === "revised");

  return (
    <div className="card mt-6">
      <div className="flex items-center justify-between mb-4 border-b border-[var(--border-soft)] pb-3">
        <div className="flex items-center gap-2">
          <div className="card-label !m-0 !text-sm">Revision Planner</div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-elev-3)] text-[var(--text-dim)] font-mono">
            {pendingRevisions.length} active
          </span>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            showHistory
              ? "bg-[var(--purple-soft)] text-[var(--purple)] border border-[var(--purple)]"
              : "bg-[var(--bg-elev-3)] text-[var(--text-dim)] hover:text-[var(--text)] border border-transparent"
          }`}
          title={showHistory ? "Show Active Revision List" : "Show Revision History"}
        >
          {showHistory ? "📋 Active Queue" : "🕒 History"}
        </button>
      </div>

      {!showHistory ? (
        <div>
          {/* Add Revision Form */}
          <form onSubmit={handleAdd} className="flex flex-col gap-3 mb-4 bg-[var(--bg-elev-2)] p-3 rounded-[var(--radius-sm)] border border-[var(--border-soft)]">
            <div className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-wide">
              Add Topic to Revise
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Week Select */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-[var(--text-faint)] uppercase font-semibold">Week</label>
                <select
                  value={selectedWeek}
                  onChange={(e) => {
                    setSelectedWeek(Number(e.target.value));
                    setSelectedTask("");
                  }}
                  className="bg-[var(--bg-elev-3)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] px-2.5 py-1.5 focus:outline-none focus:border-[var(--purple)] text-xs"
                >
                  {ROADMAP.map((w) => (
                    <option key={w.num} value={w.num}>
                      Week {w.num} — {w.title.substring(0, 18)}...
                    </option>
                  ))}
                </select>
              </div>

              {/* Task Select */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-[var(--text-faint)] uppercase font-semibold">Select Topic</label>
                <select
                  value={selectedTask}
                  onChange={(e) => {
                    setSelectedTask(e.target.value);
                    setCustomTopic(""); // clear custom input
                  }}
                  className="bg-[var(--bg-elev-3)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] px-2.5 py-1.5 focus:outline-none focus:border-[var(--purple)] text-xs"
                >
                  <option value="">-- Choose from Week --</option>
                  {weekTasks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label} {t.diff ? `(${t.diff})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Topic Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-[var(--text-faint)] uppercase font-semibold">Or Type Custom Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Backtracking, HLD Uber"
                  value={customTopic}
                  onChange={(e) => {
                    setCustomTopic(e.target.value);
                    setSelectedTask(""); // clear task select
                  }}
                  className="bg-[var(--bg-elev-3)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] px-2.5 py-1.5 focus:outline-none focus:border-[var(--purple)] text-xs placeholder:text-[var(--text-faint)]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedTask && !customTopic.trim()}
              className="mt-1 py-1.5 bg-[var(--purple)] hover:bg-[#8B5CF6] disabled:bg-[var(--bg-elev-3)] disabled:text-[var(--text-faint)] disabled:cursor-not-allowed text-[var(--bg)] font-semibold text-xs rounded-[var(--radius-sm)] transition-all uppercase tracking-wider"
            >
              + Add to Revision Queue
            </button>
          </form>

          {/* Pending Revision List */}
          <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
            {pendingRevisions.length > 0 ? (
              pendingRevisions.map((rev) => (
                <div
                  key={rev.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-[var(--radius-sm)] bg-[var(--bg-elev-2)] border border-[var(--border-soft)] hover:border-[var(--border)] transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-[var(--purple-soft)] text-[var(--purple)] flex-shrink-0">
                      W{rev.weekNum}
                    </span>
                    <span className="text-sm font-medium text-[var(--text)] truncate">
                      {rev.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {/* Mark Revised Button */}
                    <button
                      onClick={() => onToggleRevisionStatus(rev.id)}
                      className="w-7 h-7 flex items-center justify-center rounded bg-[var(--bg-elev-3)] border border-[var(--border-soft)] text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all font-bold cursor-pointer"
                      title="Mark as Revised"
                    >
                      ✓
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => onDeleteRevision(rev.id)}
                      className="w-7 h-7 flex items-center justify-center rounded bg-[var(--bg-elev-3)] border border-[var(--border-soft)] text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all font-bold cursor-pointer"
                      title="Delete Topic"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-[var(--text-faint)]">
                📚 No active topics in your revision queue. Add some from the form above!
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Revision History List */
        <div>
          <div className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-wide mb-3">
            Revision History
          </div>
          <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1">
            {completedRevisions.length > 0 ? (
              completedRevisions.map((rev) => {
                const dateStr = rev.revisedAt
                  ? new Date(rev.revisedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                  : "Recently";
                return (
                  <div
                    key={rev.id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-[var(--radius-sm)] bg-[var(--bg-elev-2)] border border-[var(--border-soft)] opacity-75 hover:opacity-100 transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-[var(--teal-soft)] text-[var(--teal)] flex-shrink-0">
                        W{rev.weekNum}
                      </span>
                      <span className="text-sm font-medium text-[var(--text)] line-through truncate">
                        {rev.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <span className="text-[10.5px] font-mono text-[var(--text-faint)]">
                        Revised: {dateStr}
                      </span>
                      {/* Restore Button */}
                      <button
                        onClick={() => onToggleRevisionStatus(rev.id)}
                        className="w-7 h-7 flex items-center justify-center rounded bg-[var(--bg-elev-3)] border border-[var(--border-soft)] text-[var(--purple)] hover:bg-[var(--purple-soft)] transition-all font-bold cursor-pointer"
                        title="Re-add to Revision Queue"
                      >
                        ↩
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => onDeleteRevision(rev.id)}
                        className="w-7 h-7 flex items-center justify-center rounded bg-[var(--bg-elev-3)] border border-[var(--border-soft)] text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all font-bold cursor-pointer"
                        title="Delete Permanently"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6 text-xs text-[var(--text-faint)]">
                ⏳ You haven't completed any revisions yet. Mark a topic as done to see it here!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
