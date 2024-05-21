import React, { useState } from "react";
import Chart from "react-apexcharts";

const BarChart = () => {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  });

  const [pieOptions, setPieOptions] = useState({
    series: [44, 55, 13, 33],
    labels: ["Apple", "Mango", "Orange", "Watermelon"],
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ]);

  return (
    <div className="flex justify-center mt-9 gap-6 flex-wrap ">
      <Chart options={options} series={series} type="bar" width="600" />
      <Chart options={options} series={series} type="line" width="600" />
      <Chart options={options} series={series} type="line" width="600" />
      <Chart options={pieOptions} series={pieOptions.series} type="donut" width="500" />
    </div>
  );
};

export default BarChart;
