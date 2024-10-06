import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useAddCategoriesMutation } from "../../redux/features/category/categoryApi";
import { FaCamera } from "react-icons/fa6";

const AddCategory = () => {
  const [addCategory, { isLoading }] = useAddCategoriesMutation();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState(false); // State to track image error

  const handleUploadScore = async (values) => {
    const { name } = values;
    // Image validation
    if (!selectedFile) {
      setImageError(true);
      return;
    }

    const formdata = new FormData();
    if (name) {
      formdata.append("name", name);
    }
    if (selectedFile) {
      formdata.append("categoryImage", selectedFile);
    }

    const res = await addCategory(formdata);
    if (res.error) {
      message.error(res?.error?.data || res?.error?.data?.message);
    }
    if (res.data) {
      message.success(res?.data?.message);
      navigate(`/categories`);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Set preview image
      setImageError(false); // Reset image error when a file is selected
    }
  };

  const handleDivClick = () => {
    document.getElementById("imageUpload").click();
  };

  return (
    <div className="ml-[24px] overflow-auto">
      <div className="mt-5 cursor-pointer flex items-center pb-3 gap-2">
        <h1 className="text-[24px] text-textColor font-semibold">Add New Category</h1>
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          onFinish={handleUploadScore}
          autoComplete="off"
        >
          <div
            className={`relative w-60 h-40 rounded-xl border mb-2 flex justify-center items-center bg-[#e8ebf0] cursor-pointer ${
              imageError ? "border-red-500" : ""
            }`}
            onClick={handleDivClick} // Make div clickable
          >
            {preview ? (
              <img
                src={preview}
                alt="Selected"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="bg-[#c6dadc] p-2 text-white">
                <FaCamera size={30} />
              </div>
            )}

            {/* Overlay text/button to change the image */}
            {preview && (
              <div
                className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"
              >
                <FaCamera size={30} className="text-white mb-2" />
                <p className="text-white text-sm">Click to change image</p>
              </div>
            )}
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

          <div className="flex gap-5">
            <Form.Item
              name="name"
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
                   
                    items-center
                    gap-4 inline-flex focus:bg-primary hover:bg-primary focus:border-secondary hover:border-secondary"
              />
            </Form.Item>
          </div>

          <Button
            htmlType="submit"
            block
            className="block w-[500px] h-[56px] mt-[30px] px-2 py-4  text-white bg-[#1E66CA]"
          >
            {isLoading ? (
              <h1 className="flex justify-center items-center gap-1">
                <ImSpinner6 className="animate-spin size-5" /> <span>Add Category</span>
              </h1>
            ) : (
              "Add Category"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddCategory;
