import { ConfigProvider, Switch, Table, Avatar, message, Modal } from "antd";
import moment from "moment";
import { useState } from "react";
import { imageBaseUrl } from "../../config";
import {
  useBlockAndUnblockMutation,
  useGetShopperByOrderQuery,
  useGetShopperDetailsQuery,
} from "../../redux/features/shopper/shopperApi";
import { Link } from "react-router-dom";

const Shoppers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedShopperId, setSelectedShopperId] = useState(null); // Store selected shopper ID
  const { data: shopperResponseData } = useGetShopperByOrderQuery(currentPage);
  const { data: shopperDetails} = useGetShopperDetailsQuery(
    selectedShopperId,
    {
      skip: !selectedShopperId, // Skip the API call until a shopper is selected
    }
  );

  const [blockUser] = useBlockAndUnblockMutation();
  const shoppers = shopperResponseData?.data || [];
  const meta = shopperResponseData?.meta || {};

  const onChangeBlockStatus = async (userId) => {
    try {
      const res = await blockUser(userId);
      if (res.error) {
        message.error(res?.error?.data?.message);
      }
      if (res.data) {
        if (res.data?.isBlocked) {
          message.success("Shopper blocked Successfully");
        } else {
          message.success("Shopper Unblocked Successfully");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  // Function to open the modal with shopper details
  const handleOpenModal = (shopperId) => {
    setSelectedShopperId(shopperId); // Set selected shopper ID
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShopperId(null); // Reset the selected shopper
  };

  const columns = [
    {
      title: "SHOPPER'S NAME",
      dataIndex: "userId",
      key: "userId",
      render: (user) => (
        <div className="flex flex-col items-start">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleOpenModal(user?._id)}
          >
            <Avatar src={`${imageBaseUrl}${user?.image?.publicFileUrl}`} />
            <div className="ml-3">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <Switch
              checked={user?.isBlocked}
              onChange={() => onChangeBlockStatus(user?._id)}
            />
            <span className="ml-2">Block</span>
          </div>
        </div>
      ),
    },
    {
      title: "ORDER QUANTITY",
      dataIndex: "orderItems",
      key: "orderItems",
      render: (orderItems) => orderItems?.orederedProduct?.length,
    },
    {
      title: "BOUTIQUE DETAILS",
      dataIndex: "boutiqueId",
      key: "boutiqueId",
      render: (boutique) => (
        <Link to={`/boutique-details/${boutique?._id}`}>
          <div className="flex items-center">
            <Avatar src={`${imageBaseUrl}${boutique?.image?.publicFileUrl}`} />
            <div className="ml-3">
              <p className="font-medium">{boutique?.name}</p>
              <p className="text-sm text-gray-500">{boutique?.email}</p>
            </div>
          </div>
        </Link>
      ),
    },
    {
      title: "PLACED DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("MMM DD, YYYY, hh:mm A"),
    },
  ];

  return (
    <div>
      <h1 className="text-[30px] font-bold">Shoppers</h1>
      <div className="w-full shadow rounded-xl">
        <div className="flex py-[22px] mx-[20px] justify-between items-center">
          <p className="text-[24px] font-medium">Shoppers List</p>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#1E66CA",
                headerColor: "white",
                headerBorderRadius: 2,
              },
            },
          }}
        >
          <Table
            pagination={{
              position: ["bottomCenter"],
              current: meta.currentPage,
              total: meta.totalItems,
              pageSize: 10,
              onChange: handleChangePage,
              showSizeChanger: false,
            }}
            columns={columns}
            dataSource={shoppers}
            rowKey={(record) => record._id}
          />
        </ConfigProvider>
      </div>

      {/* Modal for Shopper Details */}
      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
      >
        {shopperDetails ? (
          <div>
            <h1 className="text-2xl font-semibold text-center">
              Shopper Details
            </h1>
            <div>
              <img
                src={`${imageBaseUrl}${shopperDetails?.data?.attributes?.user?.image?.publicFileUrl}`}
                alt="image"
                className="size-28 mx-auto  my-3 rounded-full"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[15px]">
                <h1>Shopper Name : </h1>
                <h1>{shopperDetails?.data?.attributes?.user?.name}</h1>
              </div>
              <hr />
              <div className="flex justify-between items-center text-[15px]">
                <h1>Shopper Email : </h1>
                <h1>{shopperDetails?.data?.attributes?.user?.email}</h1>
              </div>
              <hr />
              <div className="flex justify-between items-center text-[15px]">
                <h1>Shopper Phone : </h1>
                <h1>{shopperDetails?.data?.attributes?.user?.phone}</h1>
              </div>
              <hr />
              <div className="flex justify-between items-center text-[15px]">
                <h1>Shopper Address : </h1>
                <h1>{shopperDetails?.data?.attributes?.user?.address}</h1>
              </div>
              <hr />
              <div className="flex justify-between items-center text-[15px]">
                <h1>Shopper City : </h1>
                <h1>{shopperDetails?.data?.attributes?.user?.city}</h1>
              </div>
              <hr />
              <div className="flex justify-between items-center text-[15px]">
                <h1>Shopper State : </h1>
                <h1>{shopperDetails?.data?.attributes?.user?.state}</h1>
              </div>
            </div>
          </div>
        ) : <h1 className="text-center">No Data Available</h1>}
      </Modal>
    </div>
  );
};

export default Shoppers;
