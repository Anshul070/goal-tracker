import React from "react";

interface HeatmapProps {
  activity: Record<string, number>;
}

export default function Heatmap({ activity }: HeatmapProps) {
  const days = 91; // 13 weeks
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells: { date: Date | null; key: string | null; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    cells.push({ date: d, key, count: activity[key] || 0 });
  }

  // pad start to begin on Monday
  if (cells.length > 0 && cells[0].date) {
    const firstDow = (cells[0].date.getDay() + 6) % 7; // 0=Mon, 1=Tue... 6=Sun
    for (let i = 0; i < firstDow; i++) {
      cells.unshift({ date: null, key: null, count: -1 });
    }
  }

  // group into columns of 7 days
  const cols: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    cols.push(cells.slice(i, i + 7));
  }

  function getBgColor(c: number) {
    if (c === -1) return "transparent";
    if (c === 0) return "var(--bg-elev-2)";
    if (c === 1) return "rgba(69,214,196,0.30)";
    if (c === 2) return "rgba(69,214,196,0.55)";
    if (c === 3) return "rgba(69,214,196,0.8)";
    return "var(--teal)";
  }

  return (
    <>
      <div className="heatmap-wrap">
        {cols.map((col, colIdx) => (
          <div className="heatmap-col" key={colIdx}>
            {col.map((cell, cellIdx) => {
              const title = cell.key ? `${cell.key}: ${cell.count} task${cell.count === 1 ? "" : "s"}` : "";
              return (
                <div
                  className="heatmap-cell"
                  key={cellIdx}
                  title={title}
                  style={{
                    backgroundColor: getBgColor(cell.count),
                    borderColor: cell.key ? undefined : "transparent",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        Less
        <div className="heatmap-cell" style={{ backgroundColor: "var(--bg-elev-2)" }}></div>
        <div className="heatmap-cell" style={{ backgroundColor: "rgba(69,214,196,0.30)" }}></div>
        <div className="heatmap-cell" style={{ backgroundColor: "rgba(69,214,196,0.55)" }}></div>
        <div className="heatmap-cell" style={{ backgroundColor: "rgba(69,214,196,0.8)" }}></div>
        <div className="heatmap-cell" style={{ backgroundColor: "var(--teal)" }}></div>
        More · last 13 weeks
      </div>
    </>
  );
}
