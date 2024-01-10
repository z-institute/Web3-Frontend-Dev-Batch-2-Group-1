"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BalanceChartProps {
  data: {
    [key: string]: string | number | undefined;
  }[];
}

const BalanceChart = ({ data }: BalanceChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="btc" stackId="a" fill="#8884d8" />
        <Bar dataKey="eth" stackId="a" fill="#82ca9d" />
        <Bar dataKey="sol" stackId="a" fill="#ffc658" />
        <Bar dataKey="ton" stackId="a" fill="#d0ed57" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BalanceChart;
