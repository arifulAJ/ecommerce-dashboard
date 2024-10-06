import { ConfigProvider, message, Table } from "antd";
import { imageBaseUrl } from "../config";
import {
  useGetBoutiquesQuery,
  useUpdateBoutiquePromotionImageMutation,
} from "../redux/features/boutiques/boutiquesApi";
import { IoMdCloudUpload } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { useRef } from "react";

const BoutiquePromotion = () => {
  const { data: responseData, isFetching,refetch } = useGetBoutiquesQuery({ month:null, yea:null, page:1});
  const [updatePromotionImage,{isLoading}] = useUpdateBoutiquePromotionImageMutation();
  const fileInputRefs = useRef({}); 

  const handlePromotionImage = async (record, event) => {
    const image = event.target.files[0];
    if (image) {
      const formData = new FormData();
      formData.append("promotionImage", image);

      try {
        const res = await updatePromotionImage({
          id: record._id, // Use the boutique's ID
          data: formData, // Send formData to the mutation
        });
        if(res.error){
          message.error(res.error.data?.message || res.error.data);
          refetch()
        }
       if(res.data){
        message.success('Promotion image updated successfully')
       }
      } catch (error) {
        console.log("Error uploading image:", error);
      }
    }
  };

  const triggerFileInput = (id) => {
    // Trigger the file input click for the specified boutique
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id].click();
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          className="w-[60px] h-[60px] rounded-full"
          src={`${imageBaseUrl}${record?.image?.publicFileUrl}`}
          alt=""
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <p className="font-medium">{record?.name}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => <p>{record?.email}</p>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_, record) => <p>{record?.address}</p>,
    },
    {
      title: "Promotion Image",
      key: "promotionImage",
      render: (_, record) => (
        <div>
          {record?.promotionImage?.publicFileUrl ? (
            <div className="w-[200px] relative">
              <img
                src={`${imageBaseUrl}${record?.promotionImage?.publicFileUrl}`}
                alt=""
                className="w-[200px] h-[130px] rounded-xl"
              />
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-30 rounded-xl"></div>
              <div onClick={() => triggerFileInput(record._id)}>
                <CiEdit className="size-7 absolute top-3 right-3 text-white cursor-pointer" />
              </div>
            </div>
          ) : (
            <div>
              <label
                className="w-[200px] font-semibold border rounded-xl p-4 flex flex-col justify-center items-center gap-2 text-gray-600 cursor-pointer"
                htmlFor={`image-${record._id}`}
              >
                <IoMdCloudUpload size={24} />
                <h1>Upload Image</h1>
              </label>
              <input
                type="file"
                name="image"
                id={`image-${record._id}`}
                accept="image/*"
                onChange={(event) => handlePromotionImage(record, event)}
                className="hidden"
                ref={(el) => (fileInputRefs.current[record._id] = el)} // Store reference to the input
              />
            </div>
          )}
          {/* Hidden file input for editing */}
          <input
            type="file"
            name="image"
            id={`edit-image-${record._id}`}
            accept="image/*"
            onChange={(event) => handlePromotionImage(record, event)}
            className="hidden"
            ref={(el) => (fileInputRefs.current[record._id] = el)} // Store reference to the input
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[30px] font-bold">Boutiques Promotions</h1>
      </div>
      <div className="mt-[24px] rounded-xl shadow">
        <div className="flex py-[22px] mx-[20px] justify-between items-center">
          <p className="text-[24px] font-medium">Boutiques Promotions List</p>
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
              onChange: (page) => console.log(page),
            }}
            loading={isLoading || isFetching}
            columns={columns}
            dataSource={responseData?.data || []}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default BoutiquePromotion;
