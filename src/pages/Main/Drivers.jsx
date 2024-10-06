import DriversStatus from "../../components/DriversStatus";
import { CgNotes } from "react-icons/cg";
import { TbDeviceIpadCancel } from "react-icons/tb";
import { AiOutlineStock } from "react-icons/ai";
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import DriversCart from "../../components/DriversCart";
import { useGetDriverDashboardQuery, useGetDriversQuery } from "../../redux/features/drivers/driversApi";
import { Pagination, Spin, Empty } from "antd";
import { useState } from "react";

const Drivers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Set how many drivers to show per page

  const { data: driverDashboard } = useGetDriverDashboardQuery();
  const { data: allDrivers, isFetching } = useGetDriversQuery(currentPage);

  // Calculate total items for pagination
  const totalItems = allDrivers?.meta?.totalItems || 0;

  return (
    <div>
      <div className="w-full grid grid-cols-4 gap-5">
        <DriversStatus
          text="Total Orders"
          price={driverDashboard?.totalOrder}
          icon={<CgNotes size={40} />}
        />
        <DriversStatus
          text="Total Earned"
          price={driverDashboard?.totalEarn}
          icon={<AiOutlineStock size={40} />}
        />
        <DriversStatus
          text="Delivered Orders"
          price={driverDashboard?.deliveriedOrder}
          icon={<BsFileEarmarkCheckFill size={40} />}
        />
        <DriversStatus
          text="Canceled Orders"
          price={driverDashboard?.cancelledOrder}
          icon={<TbDeviceIpadCancel size={40} />}
        />
      </div>

      <div>
        <h1 className="text-[30px] font-bold my-5">All Drivers</h1>
        {isFetching ? (
          <div className="flex justify-center items-center h-screen">
            <Spin size="large" />
          </div>
        ) : allDrivers?.length > 0 ? (
          <>
            {allDrivers?.map((driver, i) => (
              <DriversCart key={i} driver={driver} />
            ))}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItems}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false} // Hide size changer if not needed
              style={{ marginTop: '20px', textAlign: 'center' }} // Center the pagination
            />
          </>
        ) : (
          <Empty description="No Data Available" />
        )}
      </div>
    </div>
  );
};

export default Drivers;
