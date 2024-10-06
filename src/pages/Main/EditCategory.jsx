import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { imageBaseUrl } from "../../config";
import {
  useGetSingleCategoriesQuery,
  useUpdateCategoriesMutation,
} from "../../redux/features/category/categoryApi";
import { FaCamera } from "react-icons/fa6";

const EditCategory = () => {
  const { id } = useParams();
  const { data: responseData } = useGetSingleCategoriesQuery(id);
  const [viewImage, setViewImage] = useState(null);
  const [updateCategory, { isLoading }] = useUpdateCategoriesMutation();
  const [singleCategory, setSingleCategory] = useState(null);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageError, setImageError] = useState(false);

  // Update the form values when the API response changes
  useEffect(() => {
    if (responseData) {
      setSingleCategory(responseData?.data?.attributes);
      if (responseData?.data?.attributes?.categoryImage?.publicFileUrl) {
        setViewImage(`${imageBaseUrl}/${responseData?.data?.attributes?.categoryImage?.publicFileUrl}`);
      }
    }
  }, [responseData]);

  const handleUploadScore = async (values) => {
    const formdata = new FormData();
    if (values?.categoryName) {
      formdata.append("name", values?.categoryName);
    }

    if (selectedFile) {
      formdata.append("categoryImage", selectedFile);
    } else if (!viewImage) {
      // Handle case where no image is selected at all
      setImageError(true);
      return;
    }

    const res = await updateCategory({ formdata, id });

    if (res?.error) {
      message.error(res.error?.data?.message);
    } else if (res.data) {
      message.success(res?.data?.message);
      navigate(`/categories`);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setViewImage(URL.createObjectURL(file)); // Set preview image for the selected file
      setImageError(false); // Reset image error when a file is selected
    }
  };

  const handleDivClick = () => {
    document.getElementById("imageUpload").click();
  };

  return (
    <div className="w-full ml-[24px] overflow-auto">
      <div className="flex gap-5">
        <h1 className="text-[30px] text-[#1E66CA] font-bold mb-5">Edit Category</h1>
      </div>
      <div>
        {singleCategory && (
          <Form
            name="basic"
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 40 }}
            layout="vertical"
            onFinish={handleUploadScore}
            autoComplete="off"
            initialValues={{
              categoryName: singleCategory?.name,
            }}
          >
               <div className="relative w-60 h-40 rounded-xl border mb-2 flex justify-center items-center bg-[#e8ebf0] cursor-pointer">
              {/* Image preview */}
              {viewImage ? (
                <img
                  src={viewImage}
                  alt="Selected"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="bg-[#c6dadc] p-2 text-white">
                  <FaCamera size={30} />
                </div>
              )}

              {/* Overlay text/button to change the image */}
              <div
                className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"
                onClick={handleDivClick}
              >
                <FaCamera size={30} className="text-white mb-2" />
                <p className="text-white text-sm">Click to change image</p>
              </div>
            </div>
            <div className="flex gap-5">
              <Form.Item
                name="categoryName"
                label={<span className="text-textColor text-[18px] ">Category Name</span>}
                className="flex-1"
                rules={[
                  {
                    required: true,
                    message: "Please input category name",
                  },
                ]}
              >
                <Input
                  placeholder="Category name"
                  className="p-4 bg-primary
                    rounded-xl w-full
                    justify-start
                    border
                    border-secondary
                    mt-[12px]
                    items-center
                    gap-4 inline-flex focus:bg-primary hover:bg-primary focus:border-secondary hover:border-secondary"
                />
              </Form.Item>
            </div>

         

            {/* Show an error message if no image is selected */}
            {imageError && (
              <span className="text-red-500 text-sm">Please upload a category image.</span>
            )}

            <input
              id="imageUpload"
              type="file"
              style={{ display: "none" }} // Hide the input
              onChange={handleFileChange}
            />

            <Button
              htmlType="submit"
              block
              type="primary"
              className="w-full h-12 rounded-xl mt-[30px] px-2 py-4  text-white bg-[#1E66CA]"
            >
              {isLoading ? (
                <h1 className="flex justify-center items-center gap-1">
                  <ImSpinner6 className="animate-spin size-5" />
                  <span>Update Category</span>
                </h1>
              ) : (
                "Update Category"
              )}
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default EditCategory;
