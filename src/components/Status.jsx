import { Empty, Spin } from "antd";
import { useGetRevenueChartDataQuery, useGetStatusDataQuery } from "../redux/features/dashboard/dashboardApi";

const Status = () => {
  const year = new Date().getFullYear().toString();
  const { data: barChartData } = useGetRevenueChartDataQuery(year);
  const {
    data: statusData,
    isFetching,
    isError,
    error,
  } = useGetStatusDataQuery();
  if (isFetching && !isError && !error) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  } else if (isError && error && !statusData) {
    return <Empty />;
  }
  return (
    <div className="w-full grid grid-cols-4 gap-[24px] mt-[24px]">
      <div className="bg-[#1E66CA] text-white shadow-xl px-[20px] py-[32px] flex justify-between items-center rounded-2xl">
        <div>
          <p className="text-xl font-semibold">Total Admin Earning</p>
          <h1 className=" text-[44px]">{statusData?.adminMoney}</h1>
        </div>
      </div>
      <div className="bg-[#1E66CA] text-white shadow-xl px-[20px] py-[32px] flex justify-between items-center rounded-2xl">
        <div>
          <p className="text-xl font-semibold">Total Boutiques</p>
          <h1 className=" text-[44px]">{statusData?.allTheBoutique}</h1>
        </div>
      </div>
      <div className="bg-[#1E66CA] text-white px-[20px] py-[32px] flex justify-between items-center rounded-2xl shadow-xl">
        <div>
          <p className="text-xl font-semibold">Total Drivers</p>
          <h1 className=" text-[44px]">{statusData?.allTheDriver}</h1>
        </div>
      </div>
      <div className="bg-[#1E66CA] text-white px-[20px] py-[32px] flex justify-between items-center rounded-2xl shadow-xl">
        <div>
          <p className="text-xl font-semibold">Completed Orders</p>
          <h1 className=" text-[44px]">{statusData?.compliteOrder}</h1>
        </div>
      </div>
      <div className="bg-[#1E66CA] text-white px-[20px] py-[32px] flex justify-between items-center rounded-2xl shadow-xl">
        <div>
          <p className="text-xl font-semibold">Income Revenue</p>
          <h1 className=" text-[44px]">$ {barChartData?.totalRevenue}</h1>
        </div>
      </div>
    </div>
  );
};

export default Status;
