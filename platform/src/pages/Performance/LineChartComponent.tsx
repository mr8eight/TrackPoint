import React from "react";
import ReactECharts from "echarts-for-react";

interface LineChartProps {
  title: string;
  data: { avg: number[]; max: number[] };
  time: string[];
  yAxisName: string;
}

const LineChart: React.FC<LineChartProps> = ({
  title,
  data,
  time,
  yAxisName,
}) => {
  const options = {
    title: {
      text: title,
      left: "left",
      textStyle: { fontSize: 16, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: time,
      name: "时间",
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      name: yAxisName,
    },
    series: [
      {
        name: "最大值",
        type: "line",
        data: data.max,
        color: "#F44336",
      },
      {
        name: "平均值",
        type: "line",
        data: data.avg,
        color: "black",
      },
    ],
  };

  return <ReactECharts option={options} style={{ width: "100%" }} />;
};

export default LineChart;
