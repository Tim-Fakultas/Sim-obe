"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { DashboardData, ChartData } from "@/lib/type";
import { color } from "chart.js/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard({
  userName,
  cplData,
  plData,
  bkData,
  subCpmkData,
}: DashboardData) {
  const colors = {
    blue: "rgba(54, 162, 235, 0.8)",
    yellow: "rgba(255, 206, 86, 0.8)",
    borderBlue: "rgba(54, 162, 235, 1)",
    borderYellow: "rgba(255, 206, 86, 1)",
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        type: "linear",
        ticks: {
          color: "#333",
          font: { weight: "bold" },
          callback: (tickValue: string | number) => {
            if (typeof tickValue === "number")
              return tickValue % 5 === 0 ? tickValue : "";
            return tickValue;
          },
        },
        grid: {
          drawTicks: true,
          color: "rgba(0,0,0,0)",
        },
      },
      x: {
        type: "category",
        ticks: {
          color: "#333",
          font: { weight: "bold" },
        },
      },
    },
  };

  const buildChartData = (
    data: ChartData,
    color: string,
    borderColor: string
  ) => ({
    labels: data.labels,
    datasets: [
      {
        label: "",
        data: data.values,
        backgroundColor: color,
        borderColor,
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: borderColor,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Selamat Datang {userName}</h1>

      <div className="mb-8">
        <Line
          data={buildChartData(cplData, colors.blue, colors.borderBlue)}
          options={chartOptions}
        />
      </div>

      <div className="mb-8">
        <Line
          data={buildChartData(plData, colors.yellow, colors.borderYellow)}
          options={chartOptions}
        />
      </div>

      <div className="mb-8">
        <Line
          data={buildChartData(bkData, colors.yellow, colors.borderYellow)}
          options={chartOptions}
        />
      </div>

      <div className="mb-8">
        <Line
          data={buildChartData(subCpmkData, colors.yellow, colors.borderYellow)}
          options={chartOptions}
        />
      </div>
    </div>
  );
}
