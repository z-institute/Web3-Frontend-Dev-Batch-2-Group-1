import React from "react";
import { Bar } from "react-chartjs-2";
// Chart.js and its components are imported to create the chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale,
} from "chart.js";
import "chartjs-adapter-moment"; // Needed for time scale

// Registration of Chart.js components necessary to create a bar chart with a time series
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale
);

interface BalanceChartProps {
  historyData: {
    time: number;
    received: string;
    sentToSelf: string;
    sent: string;
  }[];
}

const BalanceChart = ({ historyData }: BalanceChartProps) => {
  // Data processing to convert Satoshi values into Bitcoin and create data points
  const dataPoints = historyData.map((entry) => ({
    t: new Date(entry.time * 1000),
    y:
      (parseInt(entry.received, 10) + // Parse the string for received Satoshis and convert to Bitcoin
        parseInt(entry.sentToSelf, 10) - // Parse and add Satoshis sent to self, as they don't change the balance
        parseInt(entry.sent, 10)) / // Parse and subtract Satoshis sent from the wallet
      100000000, // Satoshi to Bitcoin conversion factor
  }));

  // Sort the data points by timestamp
  dataPoints.sort((a, b) => a.t - b.t);

  // Creating labels and data arrays for the chart dataset
  const labels = dataPoints.map((dp) => dp.t);
  const data = dataPoints.map((dp) => dp.y);

  // Configuring the data and appearance of the bar chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Net BTC Balance Change Over Time",
        data: data,
        fill: false,
        backgroundColor: "rgb(33, 150, 243)",
        borderColor: "rgba(33, 150, 243, 0.2)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Net BTC Balance Change",
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BalanceChart;
