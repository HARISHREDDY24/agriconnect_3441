import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-3 shadow-md rounded-md border border-border"
      >
        <p className="font-medium text-text-primary">{`${label}`}</p>
        <p className="text-primary">
          <span className="font-medium">₹{payload[0].value}</span>
        </p>
      </motion.div>
    );
  }

  return null;
};

const PriceChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const prices = data.map(item => item.price);
  const minPrice = Math.min(...prices) * 0.95; // 5% below min
  const maxPrice = Math.max(...prices) * 1.05; // 5% above max

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          onMouseMove={(e) => {
            if (e && e.activeTooltipIndex !== undefined) {
              setHoveredIndex(e.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#4b5563', fontSize: 12 }}
          />
          <YAxis 
            domain={[minPrice, maxPrice]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#4b5563', fontSize: 12 }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="var(--color-primary)"
            strokeWidth={3}
            dot={(props) => {
              const { cx, cy, index } = props;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={index === hoveredIndex ? 6 : 4}
                  fill={index === hoveredIndex ? "var(--color-primary)" : "white"}
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  className="transition-all duration-200"
                />
              );
            }}
            activeDot={{ r: 8, fill: "var(--color-primary)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default PriceChart;