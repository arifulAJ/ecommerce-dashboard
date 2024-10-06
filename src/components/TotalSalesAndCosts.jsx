import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import {
  useGetSavenDaysOrderDetailsQuery,
  useGetTotalCostAndSellQuery,
} from "../redux/features/dashboard/dashboardApi";

const TotalSalesAndCosts = () => {
  const { data: savenDaysData } = useGetSavenDaysOrderDetailsQuery();
  const { data: chartData } = useGetTotalCostAndSellQuery();
  // Transform the fetched data into the format needed for the LineChart
  const data =
    chartData?.map((item) => ({
      name: item.day,
      uv: item.sales,
      pv: item.costs,
    })) || [];

  console.log(savenDaysData);
  return (
    <div className="w-full mt-5 rounded-xl flex gap-5 items-center justify-evenly px-10 py-1">
      <div className="flex-1">
        <h1 className="text-black font-bold">Total Sales & Costs</h1>
        <h1 className="text-6xl font-medium mt-8">
          {savenDaysData?.lastWeekOrderCount}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          {savenDaysData?.changeType === "Positive" ? (
            <small className="flex items-center gap-1 text-[#1EB564]">
              <BiUpArrowAlt /> {savenDaysData?.percentageChange}%
            </small>
          ) : (
            <small className="flex items-center gap-1 text-[#E74C3C]">
              <BiDownArrowAlt /> {savenDaysData?.percentageChange}%
            </small>
          )}
          <small className="text-[#111111] opacity-65">Vs last 7 days</small>
        </div>
      </div>
      <div>
        <LineChart width={700} height={195} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Line type="monotone" dataKey="pv" stroke="#0F60FF" strokeWidth={2} />
          <Line type="monotone" dataKey="uv" stroke="#0FB7FF" strokeWidth={2} />
        </LineChart>
      </div>
    </div>
  );
};

export default TotalSalesAndCosts;
