import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Stats, ROADMAP, ALL_TASKS } from "./roadmapData";

interface RoadmapChartsProps {
  stats: Stats;
  completed: Record<string, boolean>;
}

export default function RoadmapCharts({ stats, completed }: RoadmapChartsProps) {
  const weeklyRef = useRef<HTMLCanvasElement | null>(null);
  const categoryRef = useRef<HTMLCanvasElement | null>(null);

  const weeklyChartInst = useRef<any>(null);
  const categoryChartInst = useRef<any>(null);

  useEffect(() => {
    // 1. Weekly Chart
    if (weeklyRef.current) {
      if (weeklyChartInst.current) {
        weeklyChartInst.current.destroy();
      }

      weeklyChartInst.current = new Chart(weeklyRef.current, {
        type: "bar",
        data: {
          labels: ROADMAP.map((w) => "W" + w.num),
          datasets: [
            {
              label: "Completion %",
              data: ROADMAP.map((w) => {
                const pw = stats.perWeek[w.num];
                return pw && pw.total ? Math.round((pw.done / pw.total) * 100) : 0;
              }),
              backgroundColor: ROADMAP.map((w) =>
                w.num <= 4 ? "rgba(167,139,250,0.7)" : w.num <= 9 ? "rgba(69,214,196,0.7)" : "rgba(255,139,107,0.7)"
              ),
              borderRadius: 4,
              maxBarThickness: 28,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Completion by Week",
              color: "#8A93A6",
              font: { size: 11, family: "ui-monospace" },
              padding: { bottom: 10 },
            },
          },
          scales: {
            y: {
              min: 0,
              max: 100,
              ticks: { color: "#545D70", font: { size: 10 } },
              grid: { color: "#1F2530" },
            },
            x: {
              ticks: { color: "#8A93A6", font: { size: 10, family: "ui-monospace" } },
              grid: { display: false },
            },
          },
        },
      });
    }

    // 2. Category Chart
    if (categoryRef.current) {
      if (categoryChartInst.current) {
        categoryChartInst.current.destroy();
      }

      let dsaDone = 0, dsaTot = 0, aiDone = 0, aiTot = 0, lbDone = 0, lbTot = 0;
      ALL_TASKS.forEach((t) => {
        if (t.category === "dsa") {
          dsaTot++;
          if (completed[t.id]) dsaDone++;
        }
        if (t.category === "ai") {
          aiTot++;
          if (completed[t.id]) aiDone++;
        }
        if (t.category === "letbex") {
          lbTot++;
          if (completed[t.id]) lbDone++;
        }
      });

      categoryChartInst.current = new Chart(categoryRef.current, {
        type: "doughnut",
        data: {
          labels: [`DSA (${dsaDone}/${dsaTot})`, `AI/ML (${aiDone}/${aiTot})`, `Letbex (${lbDone}/${lbTot})`],
          datasets: [
            {
              data: [dsaDone, aiDone, lbDone],
              backgroundColor: ["#A78BFA", "#45D6C4", "#FF8B6B"],
              borderColor: "#161B24",
              borderWidth: 3,
            },
            {
              // ghost ring showing remaining
              data: [dsaTot - dsaDone, aiTot - aiDone, lbTot - lbDone],
              backgroundColor: ["rgba(167,139,250,0.12)", "rgba(69,214,196,0.12)", "rgba(255,139,107,0.12)"],
              borderColor: "#161B24",
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "60%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#8A93A6",
                font: { size: 10.5, family: "ui-monospace" },
                boxWidth: 10,
                padding: 10,
              },
            },
            title: {
              display: true,
              text: "Tasks Completed by Category",
              color: "#8A93A6",
              font: { size: 11, family: "ui-monospace" },
              padding: { bottom: 10 },
            },
            tooltip: { enabled: false },
          },
        },
      });
    }

    // cleanup on unmount
    return () => {
      if (weeklyChartInst.current) {
        weeklyChartInst.current.destroy();
        weeklyChartInst.current = null;
      }
      if (categoryChartInst.current) {
        categoryChartInst.current.destroy();
        categoryChartInst.current = null;
      }
    };
  }, [stats, completed]);

  return (
    <div className="grid grid-2">
      <div className="card chart-card">
        <canvas ref={weeklyRef}></canvas>
      </div>
      <div className="card chart-card">
        <canvas ref={categoryRef}></canvas>
      </div>
    </div>
  );
}
