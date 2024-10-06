import { UploadOutlined } from "@ant-design/icons";
import {
    Button,
    ConfigProvider,
    DatePicker,
    Form,
    Input,
    Modal,
    Table,
    Upload,
    message,
} from "antd";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { imageBaseUrl } from "../../config";
import {
    useDeleteBoutiqueMutation,
    useGetBoutiquesQuery,
    useSendFeedBackBoutiqueMutation,
    useUpdateBoutiquePercentageMutation,
} from "../../redux/features/boutiques/boutiquesApi";
const { TextArea } = Input;

const Boutiques = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [page, setPage] = useState(1);
  const [month, setMonth] = useState(null); // State to store selected month
  const [year, setYear] = useState(null);   // State to store selected year
  const [form] = Form.useForm(); // Form instance for the edit modal
  const navigate = useNavigate();
  const [image, setImage] = useState();
  
  // Get boutiques query with month and year params
  const { data: responseData, isFetching } = useGetBoutiquesQuery({ month, year, page });
  const [sendFeedBack] = useSendFeedBackBoutiqueMutation();
  const [updatePercentage] = useUpdateBoutiquePercentageMutation();
  const [deleteBoutique] = useDeleteBoutiqueMutation();

  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        setImage(info.fileList[0].originFileObj);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setImage(info.fileList[0].originFileObj);
      }
    },
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handlePercentageEdit = (record) => {
    setSelectedRecord(record);
    form.setFieldsValue({
      percentage: record?.boutiquePersentage, // Set initial value for percentage
    });
    setIsEditModalOpen(true);
  };

  const handlePercentageCancel = () => {
    setSelectedRecord(null);
    form.resetFields(); // Reset form fields
    setIsEditModalOpen(false);
  };

  const handleDelete = async (recordId) => {
    const res = await deleteBoutique(recordId);
    if (res.error) {
      console.log(res.error);
      message.error(res.error.data?.message);
    }
    if (res.data) {
      message.success(res.data?.message);
    }
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div
          onClick={() => navigate(`/boutique-details/${record._id}`)}
          className="flex gap-2 items-center cursor-pointer"
        >
          <img
            className="w-[34px] h-[34px] rounded-full"
            src={`${imageBaseUrl}${record?.image?.publicFileUrl}`}
            alt=""
          />
          <div>
            <p className="font-medium">{record?.name}</p>
            <p className="font-medium text-[#111111] opacity-35">
              {record?.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "RATE",
      dataIndex: "rate",
      key: "rate",
      render: (_, record) => <p>{record?.rate}</p>,
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      render: (_, record) => (
        <div className="flex justify-items-center items-center gap-5">
          <p>{record?.boutiquePersentage}%</p>
          <FiEdit
            size={18}
            className="text-[#bebebe] cursor-pointer"
            onClick={() => handlePercentageEdit(record)} // Handle edit click
          />
        </div>
      ),
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      render: (_, record) => <p>{record?.address}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <div className="flex gap-5">
            <CiEdit
              onClick={() => navigate(`/edit-boutiques/${record._id}`)}
              className="text-gray-800 cursor-pointer size-6"
            />
            <MdDelete
              onClick={() => handleDelete(record?._id)}
              className="text-[red] size-6 cursor-pointer"
            />
          </div>
        );
      },
    },
    {
      title: "FEEDBACK",
      dataIndex: "feedback",
      key: "feedback",
      render: (_, record) => (
        <p
          onClick={() => handleView(record)}
          className="text-[#1E66CA] cursor-pointer"
        >
          Send Feedback
        </p>
      ),
    },
  ];

  const onChange = (date) => {
    if (date) {
      const selectedMonth = date.month(); // Get month (0-11)
      const selectedYear = date.year(); // Get year
      setMonth(selectedMonth + 1); // Adjust for 1-12
      setYear(selectedYear);
    } else {
      setMonth(null);
      setYear(null);
    }
  };

  const handleSubmit = async (values) => {
    const { title, description } = values;
    const formData = new FormData();
    if (title) {
      formData.append("title", title);
    }
    if (description) {
      formData.append("description", description);
    }
    if (selectedRecord?._id) {
      formData.append("boutiqueId", selectedRecord?._id);
    }
    if (image) {
      formData.append("feedBackImage", image);
    }

    const res = await sendFeedBack(formData);
    if (res.error) {
      message.error(res.error?.data?.message);
    }
    if (res.data && res.data.statusCode === 200) {
      message.success("Feedback sent successfully");
      setIsModalOpen(false);
    }
  };

  const handleEditSubmit = async (values) => {
    const { percentage } = values;
    const res = await updatePercentage({
      id: selectedRecord?._id,
      taka: percentage,
    });
    if (res.error) {
      message.error("Error updating percentage");
    }
    if (res.data && res.data.statusCode === 200) {
      message.success("Percentage updated successfully");
      form.resetFields(); // Reset form fields
      setSelectedRecord(null);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[30px] font-bold">Boutiques</h1>
        <div className="flex flex-col items-center gap-2">
          <p
            onClick={() => navigate("/add-boutiques")}
            className="text-[#1E66CA] font-medium flex cursor-pointer items-center gap-2 border px-5 py-2 rounded-xl border-[#1E66CA]"
          >
            <IoMdAdd size={20} />
            Add New Boutique
          </p>
        </div>
      </div>
      <div className="mt-[24px] rounded-xl shadow ">
        <div className="flex py-[22px] mx-[20px] justify-between items-center">
          <p className="text-[24px] font-medium">Boutiques List</p>
          <DatePicker
            className="custom-date-picker"
            onChange={onChange}
            picker="month"
            suffixIcon
          />
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
              current: responseData?.meta?.currentPage,
              total: responseData?.meta?.totalItems,
              pageSize: 10,
              onChange: (page) => setPage(page),
            }}
            loading={isFetching}
            columns={columns}
            dataSource={responseData?.data || []}
          />
        </ConfigProvider>
      </div>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        centered
      >
        <div>
          <p className="text-xl font-bold my-5">Send Feedback</p>
          <div>
            <Form
              name="wrap"
              style={{
                maxWidth: 600,
              }}
              onFinish={handleSubmit}
            >
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please enter title",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Title"
                  className="p-4 rounded-xl w-full justify-start border mt-[12px] items-center gap-4 "
                />
              </Form.Item>

              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please enter description",
                  },
                ]}
              >
                <TextArea
                  placeholder="Explain here.."
                  rows={4}
                  className="p-4 rounded-xl w-full justify-start border mt-[12px] items-center gap-4 "
                />
              </Form.Item>
              <Form.Item name="img">
                <Upload {...props} className="w-full">
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <button className="w-full px-5 py-2 rounded-xl bg-blue-500 text-white">
                  Send Feedback
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
      {/* Edit Boutique Percentage Modal */}
      <Modal
        title="Edit Boutique Percentage"
        open={isEditModalOpen}
        onCancel={handlePercentageCancel}
        footer={null}
        centered
      >
        <Form
          form={form}
          name="editPercentage"
          onFinish={handleEditSubmit}
          initialValues={{
            percentage: selectedRecord?.boutiquePersentage,
          }}
        >
          <Form.Item
            name="percentage"
            rules={[{ required: true, message: "Please enter percentage" }]}
          >
            <Input
              type="number"
              className="p-4 rounded-xl w-full justify-start border mt-[12px] items-center gap-4 "
            />
          </Form.Item>
          <Form.Item>
            <button className="w-full px-5 py-2 bg-blue-500 rounded-xl text-white">
              Update
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Boutiques;
