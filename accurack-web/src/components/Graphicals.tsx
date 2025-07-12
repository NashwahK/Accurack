import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const pieData = [
  { name: "COGS", value: 50, color: "#0573EC" },
  { name: "Logistics", value: 10, color: "#C7DC1C" },
  { name: "Marketing", value: 20, color: "#ff6600" },
  { name: "Profit Margin", value: 20, color: "#00cc99" },
];

const barData = [
  { department: "Manufacturing", value: 500, fill: "#C7DC1C" },
  { department: "Production", value: 300, fill: "#EF7C23" },
  { department: "Design", value: 700, fill: "#0573EC" },
  { department: "Stitching", value: 800, fill: "#C7DC1C" },
  { department: "Packaging", value: 250, fill: "#EF7C23" },
  { department: "Shipping", value: 350, fill: "#0573EC" },
];

const GaugeChart = () => {
  const percent = 75;

  const clamped = Math.min(Math.max(percent, 0), 100);
  const radius = 60;
  const circumference = Math.PI * radius;
  const progress = (clamped / 100) * circumference;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow w-full md:w-1/3">
      <h3 className="text-2xl font-extrabold mb-4">Supply Chain Efficiency</h3>

      <div className="relative w-60 h-40 mx-auto">
        <svg width="100%" height="100%" viewBox="0 0 160 80">
          <path
            d="M 20 80 A 60 60 0 0 1 140 80"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M 20 80 A 60 60 0 0 1 140 80"
            fill="none"
            stroke="#66cc33"
            strokeWidth="20"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p className="text-center text-3xl font-bold mt-6">{clamped}%</p>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        orders shipped on time
      </p>
    </div>
  );
};

const Graphicals = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const charts = [
    <div
      key="pie"
      className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow w-full md:w-1/3"
    >
      <h3 className="text-2xl font-extrabold mb-2">Unit Economics</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={pieData} dataKey="value" outerRadius={80} label>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>,

    <div
      key="bar"
      className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow w-full md:w-1/3"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-extrabold">Stock Levels</h3>
        <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">
          February 2025
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={barData}
          barSize={30}
          barCategoryGap="15%"
          margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
        >
          <CartesianGrid stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="department"
            stroke="#6b7280"
            tick={{ fontSize: 11 }}
            interval={0}
            padding={{ left: 5, right: 5 }}
          />
          <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#ffffff", borderColor: "#d1d5db" }}
            labelStyle={{ fontWeight: "bold" }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {barData.map((entry, index) => (
              <Cell key={`bar-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>,

    <GaugeChart key="gauge" />,
  ];

  return (
    <div className="mt-8">
      {isMobile ? (
        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {charts.map((chart, i) => (
            <SwiperSlide key={i}>{chart}</SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex gap-6">{charts}</div>
      )}
    </div>
  );
};

export default Graphicals;
