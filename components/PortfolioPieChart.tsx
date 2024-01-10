import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  PieProps,
  PieLabelRenderProps,
} from "recharts";

interface DataEntry {
  name: string;
  value: number;
}

const renderActiveShape: PieProps["activeShape"] = (props: unknown) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props as PieLabelRenderProps;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = (cx as number) + ((outerRadius as number) + 10) * cos;
  const sy = (cy as number) + ((outerRadius as number) + 10) * sin;
  const mx = (cx as number) + ((outerRadius as number) + 30) * cos;
  const my = (cy as number) + ((outerRadius as number) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx as number}
        cy={cy as number}
        innerRadius={innerRadius as number}
        outerRadius={outerRadius as number}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx as number}
        cy={cy as number}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius as number) + 6}
        outerRadius={(outerRadius as number) + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${((percent as number) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const PortfolioPieChart = ({ data }: { data: DataEntry[] }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter: PieProps["onMouseEnter"] = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PortfolioPieChart;
