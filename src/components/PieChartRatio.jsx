import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Select } from "antd";
import { useGetFeedBackRatioQuery } from "../redux/features/dashboard/dashboardApi";

const PieChartRatio = () => {
  const currentYear = new Date().getFullYear().toString();
  const [year, setYear] = useState(currentYear);
  const { data: rationData } = useGetFeedBackRatioQuery(year);

  const handleYearChange = (value) => {
    setYear(value);
  };

  const years = [...Array(50)].map((_, i) => (currentYear - i).toString());

  let percentage = rationData?.ratio || 0;

  return (
    <div className="w-[37%]">
      <div className="flex justify-between p-[16px]">
        <div>
          <h1 className="text-2xl text-black font-semibold">Shoppers</h1>
          <p className="text-sm text-[#111111] font-medium opacity-30">
            Shoppers feedback ratio
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
      <div className="w-full flex justify-center items-center mt-10">
        <div className="w-[180px] h-[180px]">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              rotation: 0.25,
              strokeLinecap: "butt",
              textSize: "16px",
              pathColor: "#1e66ca",
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default PieChartRatio;
