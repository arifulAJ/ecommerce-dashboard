import { Table } from "antd"; // Importing Table from Ant Design
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import { TbDeviceIpadCancel } from "react-icons/tb";
import { useParams } from "react-router-dom";
import DriversStatus from "../../components/DriversStatus";
import { imageBaseUrl } from "../../config";
import { useGetSingleDriverQuery } from "../../redux/features/drivers/driversApi";

const DriverDetails = () => {
  const { driverId } = useParams();
  const { data } = useGetSingleDriverQuery(driverId, {
    skip: !driverId,
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  const {
    driver,
    totalDelivried,
    totalCancle,
    allOrderInfo,
  } = data;

  // Ant Design table columns
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Delivery Address',
      dataIndex: 'deliveryAddress',
      key: 'deliveryAddress',
    },
    {
      title: 'Shopper Name',
      dataIndex: 'shopperName',
      key: 'shopperName',
    },
    {
      title: 'Delivery Time',
      dataIndex: 'deliveryTime',
      key: 'deliveryTime',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  // Preparing data for the table
  const tableData = allOrderInfo?.map((order) => ({
    key: order._id,
    orderId: order.orderId,
    totalAmount: order.totalAmount,
    status: order.status,
    deliveryAddress: order.deliveryAddress,
    shopperName: order.userId?.name,
    deliveryTime: order.orderDeliveriedTime || 'N/A', // Assuming this field exists in your response
    date: new Date(order.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="w-full p-3 rounded-xl">
      <h1 className="text-[30px] font-bold my-5">Driver Details</h1>
      {/* Driver Info */}
      <div className="grid grid-cols-2 mb-16">
        <div className="flex items-center space-x-4">
          <img
            src={`${imageBaseUrl}${driver?.userId?.image?.publicFileUrl}`}
            alt={driver?.userId?.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">{driver?.userId?.name}</h2>
            <p className="text-gray-500">{driver?.userId?.email}</p>
            <p className="text-gray-500">{driver?.userId?.phone}</p>
          </div>
        </div>
        <div className="flex gap-5">
          <DriversStatus
            text="Delivered Orders"
            price={totalDelivried}
            icon={<BsFileEarmarkCheckFill size={40} />}
          />
          <DriversStatus
            text="Canceled Orders"
            price={totalCancle}
            icon={<TbDeviceIpadCancel size={40} />}
          />
        </div>
      </div>

      {/* Orders Info Table */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Order Information</h2>
        <Table 
          columns={columns} 
          dataSource={tableData} 
          pagination={{ pageSize: 5 }} 
        />
      </div>
    </div>
  );
};

export default DriverDetails;
