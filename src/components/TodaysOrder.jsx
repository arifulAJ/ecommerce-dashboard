/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { LineChart, Line } from "recharts";
import { useGetTodayOrdersQuery } from "../redux/features/dashboard/dashboardApi";
const TodaysOrder = () => {
  const { data } = useGetTodayOrdersQuery();

  const [todayOrderCount, setTodayOrderCount] = useState(0);
  const [yesterdayOrderCount, setYesterdayOrderCount] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [changeType, setChangeType] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      const {
        todayOrderCount,
        yesterdayOrderCount,
        percentageChange,
        changeType,
      } = data;

      setTodayOrderCount(todayOrderCount);
      setYesterdayOrderCount(yesterdayOrderCount);
      setPercentageChange(percentageChange);
      setChangeType(changeType);

      // Example data for the chart
      setChartData([
        { name: "Today", uv: todayOrderCount },
        { name: "Yesterday", uv: yesterdayOrderCount },
      ]);
    }
  }, [data]);

  return (
    <div className="mt-5 rounded-xl flex gap-5 items-center justify-evenly px-10 py-5">
      <div className="flex-1">
        <h1 className="text-black font-bold">Today's Orders</h1>
        <small className="text-[#111111] opacity-65">{todayOrderCount}</small>
        <h1 className="text-6xl font-medium mt-8">{yesterdayOrderCount}</h1>
        <div className="flex items-center gap-2 mt-2">
          {changeType === "Positive" ? (
            <small className="flex items-center gap-1 text-[#1EB564]">
              <BiUpArrowAlt /> {percentageChange}%
            </small>
          ) : (
            <small className="flex items-center gap-1 text-[#E74C3C]">
              <BiDownArrowAlt /> {percentageChange}%
            </small>
          )}
          <small className="text-[#111111] opacity-65">Vs last 7 days</small>
        </div>
      </div>
      <div>
        <LineChart width={300} height={100} data={chartData}>
          <Line type="monotone" dataKey="uv" stroke="#1EB564" strokeWidth={2} />
        </LineChart>
      </div>
    </div>
  );
};

export default TodaysOrder;
