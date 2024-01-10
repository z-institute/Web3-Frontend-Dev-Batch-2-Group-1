"use client";

import React from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

interface BalanceChartProps {
  data: {
    [key: string]: string | number;
  }[];
}

const BalanceChart = ({ data }: BalanceChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <Bar dataKey="eth" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BalanceChart;
