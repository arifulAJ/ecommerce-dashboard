import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Table,
} from "antd";
const { Item } = Form;
import { BsInfoCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import {
  useApprovedWithdrawMutation,
  useCancelWithdrawMutation,
  useGetWithdrawQuery,
} from "../../redux/features/withdraw/withdrawApi";

const Withdraw = () => {
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [userName, setUserName] = useState(""); // State for user name
  const [user, setUser] = useState();
  const [withdrawList, setWithdrawList] = useState([]);

  // Update API call to include currentPage, userName, and date
  const { data, isFetching, isError, error } = useGetWithdrawQuery({
    page: currentPage,
    userName,
    date,
  });

  const [
    approvedWithdraw,
    { data: approvedData, isError: approvedIsError, error: approvedError },
  ] = useApprovedWithdrawMutation();

  const [
    cancelWithdraw,
    { data: cancelData, isError: cancelIsError, error: cancelError },
  ] = useCancelWithdrawMutation();

  const dataSource = withdrawList?.map((withdraw, index) => ({
    key: withdraw?._id,
    si: index + 1,
    userName: withdraw.userId?.name,
    bankName: withdraw.bankName,
    bnakAccountNumber: withdraw.bnakAccountNumber,
    amount: withdraw?.withdrowAmount,
    date: withdraw?.createdAt,
    status: withdraw.status,
  }));

  const handleView = (record) => {
    setUser(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "name",
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
    },
    {
      title: "Bank Account Number",
      dataIndex: "bnakAccountNumber",
      key: "b/a/cNumber",
    },
    {
      title: "Withdraw Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (text ? moment(text).format("DD MMM YYYY") : "N/A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "pending" ? (
          <h1 className="text-yellow-500 font-semibold">{status}</h1>
        ) : status === "aproved" ? (
          <h1 className="text-emerald-500 font-semibold">{status}</h1>
        ) : (
          <h1 className="text-rose-500 font-semibold">{status}</h1>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <BsInfoCircle
            onClick={() => handleView(record)}
            size={18}
            className="text-[red] cursor-pointer"
          />
        </Space>
      ),
    },
  ];

  const onFinish = (values) => {
    const { userName, date } = values;
    setUserName(userName); 
    setDate(date ? moment(date).format("YYYY-MM-DD") : "");
  };

  const handleApprovedStatus = (id) => {
    approvedWithdraw(id);
  };

  const handleCancelStatus = (id) => {
    cancelWithdraw(id);
  };

  useEffect(() => {
    if (isError && error) {
      setWithdrawList([]);
    } else if (data) {
      setWithdrawList(data?.data?.attributes);
    }
  }, [data, isError, error]);

  useEffect(() => {
    if (approvedIsError && approvedError) {
      Swal.fire({
        icon: "error",
        title: approvedError?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else if (approvedData) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: approvedData?.message,
        showConfirmButton: false,
      });
      setIsModalOpen(false);
    }
  }, [approvedData, approvedIsError, approvedError]);

  useEffect(() => {
    if (cancelError && cancelIsError) {
      Swal.fire({
        icon: "error",
        title: cancelError?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else if (cancelData) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: cancelData?.message,
        showConfirmButton: false,
      });
      setIsModalOpen(false);
    }
  }, [cancelData, cancelError, cancelIsError]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[30px] font-bold">Withdrawal</h1>
      </div>
      <div className="mt-[24px] rounded-xl shadow ">
        <div className="flex py-[22px] mx-[20px] justify-between items-center">
          <h1 className="text-[24px]">Withdrawal Request</h1>
          <Form layout="inline" onFinish={onFinish}>
            <Item name="userName">
              <Input type="text" placeholder="Enter User Name" />
            </Item>
            <Item name="date">
              <DatePicker placeholder="Select Date" format="YYYY-MM-DD" />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Item>
          </Form>
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
            loading={isFetching}
            pagination={{
              current: currentPage,
              pageSize: 10, // Adjust this based on your needs
              total: data?.meta?.totalItems || 0, // Set total items for pagination
              onChange: (page) => setCurrentPage(page), // Update page on change
            }}
            columns={columns}
            dataSource={dataSource}
          />
        </ConfigProvider>
      </div>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        centered
        closeIcon
      >
        <div className="text-black bg-primary">
          <div className="w-full flex py-6 px-5 justify-between items-center">
            <p className="text-2xl font-bold">Withdraw Request Details</p>
          </div>
          <div className="p-[20px] ">
            <div className="flex justify-between border-b py-[16px]">
              <p>User Name: </p>
              <p>{user?.userName ? user?.userName : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Bank Name:</p>
              <p>{user?.bankName ? user?.bankName : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Bank Account Number</p>
              <p>{user?.bnakAccountNumber ? user?.bnakAccountNumber : "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Withdraw Amount :</p>
              <p>{user?.amount ? user?.amount : "N/A"}</p>
            </div>
            <div className="flex justify-center gap-4 items-center pt-[16px]">
              {user?.status === "pending" ? (
                <>
                  <button
                    onClick={() => handleCancelStatus(user?.key)}
                    className="px-5 py-2 border  bg-blue-500 rounded text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleApprovedStatus(user?.key)}
                    className="px-5 py-2 border border-blue-500 rounded "
                  >
                    Approve
                  </button>
                </>
              ) : user?.status === "aproved" ? (
                <button
                  disabled
                  className="px-5 py-2 border bg-[#1E66CA] text-white rounded"
                >
                  Approved
                </button>
              ) : (
                <button
                  disabled
                  className="px-5 py-2 border bg-rose-500 text-white rounded"
                >
                  Canceled
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Withdraw;
