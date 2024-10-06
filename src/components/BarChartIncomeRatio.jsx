import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState, useEffect } from "react";
import { Select } from "antd";
import { useGetRevenueChartDataQuery } from "../redux/features/dashboard/dashboardApi";

const BarChartIncomeRatio = () => {
  const currentYear = new Date().getFullYear().toString();
  const { data: barChartData } = useGetRevenueChartDataQuery(year);
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    setYear(currentYear);
  }, [currentYear]);

  const handleYearChange = (value) => {
    setYear(value);
  };

  const data =
    barChartData?.monthlyRevenue?.map((item) => ({
      month: item.month,
      revenue: item.revenue,
    })) || [];

  const years = [...Array(50)].map((_, i) => (currentYear - i).toString());

  return (
    <div className="w-full md:w-[63%] bg-white p-6 ">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h1 className="text-gray-500 font-medium">Income Revenue</h1>
          <p className="text-[35px] text-[#1E66CA] font-bold">
            ${barChartData?.totalRevenue}
          </p>
        </div>
        <div>
          <Select
            value={year}
            onChange={handleYearChange}
            className="custom-select"
            dropdownClassName="custom-select-dropdown"
          >
            {years.map((yearOption) => (
              <Select.Option key={yearOption} value={yearOption}>
                {yearOption}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="w-full h-96 relative">
        <ResponsiveContainer width="100%" height="100%" className="absolute">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#8884d8", fontSize: 12 }}
              axisLine={{ stroke: "#ccc" }}
              tickLine={{ stroke: "#ccc" }}
            />
            <YAxis
              tick={{ fill: "#8884d8", fontSize: 12 }}
              axisLine={{ stroke: "#ccc" }}
              tickLine={{ stroke: "#ccc" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
              }}
              cursor={{ fill: "rgba(30, 102, 202, 0.1)" }}
            />
            <Legend
              formatter={() => `Revenue (${year})`}
              wrapperStyle={{ color: "#1E66CA" }}
            />
            <Bar
              dataKey="revenue"
              fill="url(#colorUv)"
              barSize={20}
              radius={[10, 10, 0, 0]}
            />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1E66CA" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1E66CA" stopOpacity={0.4} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartIncomeRatio;
