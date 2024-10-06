import { Button, Form, Input, Select, Modal, message } from "antd";
import { useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { FiPlus, FiX } from "react-icons/fi";
import { HexColorPicker } from "react-colorful"; // Color Picker from react-colorful
import { Option } from "antd/es/mentions";
import { useAddBoutiqueProductMutation } from "../../redux/features/boutiques/boutiquesApi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";

const AddBoutiqueProduct = () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // To store the selected files (images)
  const [previews, setPreviews] = useState([]); // For image previews
  const [imageError, setImageError] = useState(false); // Handle file upload errors
  const [color, setColor] = useState("#ffffff"); // Single color value
  const [selectedColors, setSelectedColors] = useState([]); // Array to store multiple colors
  const [selectedSizes, setSelectedSizes] = useState([]); // Array for selected sizes (variants)
  const [colorPickerVisible, setColorPickerVisible] = useState(false); // Toggle for color picker modal
  const [sizeModalVisible, setSizeModalVisible] = useState(false); // Toggle for size modal
  const [tempSize, setTempSize] = useState({
    size: "",
    inventoryQuantity: "",
    price: "",
  }); // Temp state to handle size input
  const [addProduct, { isLoading }] = useAddBoutiqueProductMutation(); // Redux mutation to add product
  const { data: responseData } = useGetCategoriesQuery(1);
  const navigate = useNavigate();
  const { boutiqueId } = useParams(); // Get boutique ID from URL params

  const categoriesData = responseData?.data?.attributes?.allCatagory || [];

  // Handle form submission
  const handleUploadProduct = async (values) => {
    const { productName, category } = values;
    const formdata = new FormData();

    if (productName) formdata.append("productName", productName);
    if (category) formdata.append("category", category);

    // Ensure images are appended only once
    selectedFiles.forEach((file) => {
      formdata.append("productImage1", file);
    });

    if (selectedSizes.length)
      formdata.append("variants", JSON.stringify(selectedSizes)); // Append variants as a JSON string
    if (selectedColors.length)
      formdata.append("color", JSON.stringify(selectedColors)); // Append color as a JSON string
    if (boutiqueId) formdata.append("boutiqueId", boutiqueId);

    try {
      const res = await addProduct(formdata).unwrap();
      if (res) {
        message.success(res.message);
        navigate(`/boutique-details/${boutiqueId}`);
      }
    } catch (error) {
      message.error("Failed to add product.");
    }
  };

  // Handle file selection and preview generation for multiple images
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to Array
    setSelectedFiles([...selectedFiles, ...files]); // Append new files to the existing array

    // Generate image previews for new files
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);

    setImageError(false); // Reset error state
  };

  // Trigger file input on div click
  const handleDivClick = () => {
    document.getElementById("imageUpload").click();
  };

  // Add the currently selected color to the list of selected colors
  const handleColorAdd = () => {
    setSelectedColors([...selectedColors, color]); // Add the single color to the array
    setColorPickerVisible(false); // Close the color picker modal
  };

  // Add size to the size list
  const handleSizeAdd = () => {
    setSelectedSizes([...selectedSizes, tempSize]); // Add temp size object to the size array
    setTempSize({ size: "", inventoryQuantity: "", price: "" }); // Reset temp state
    setSizeModalVisible(false); // Close size modal
  };

  // Remove a color
  const removeColor = (index) => {
    const updatedColors = selectedColors.filter((_, i) => i !== index);
    setSelectedColors(updatedColors);
  };

  // Remove a size
  const removeSize = (index) => {
    const updatedSizes = selectedSizes.filter((_, i) => i !== index);
    setSelectedSizes(updatedSizes);
  };

  // Remove image preview
  const removeImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);

    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
  };

  return (
    <div className="ml-[24px] overflow-auto">
      <div className="mt-5 cursor-pointer flex items-center pb-3 gap-2">
        <h1 className="text-[24px] text-textColor font-semibold">
          Add New Product
        </h1>
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          onFinish={handleUploadProduct}
          autoComplete="off"
        >
          {/* Image Upload Section */}
          <div className="flex flex-wrap gap-2 mb-2">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative w-32 h-32 border rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={preview}
                  alt={`Selected ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-black bg-opacity-50 p-1 rounded-full">
                  <FiX
                    className="text-white cursor-pointer"
                    onClick={() => removeImage(index)}
                  />
                </div>
              </div>
            ))}

            <div
              className="w-32 h-32 flex justify-center items-center bg-[#e8ebf0] cursor-pointer border rounded-lg"
              onClick={handleDivClick}
            >
              <FaCamera size={30} />
            </div>
          </div>

          {imageError && (
            <span className="text-red-500 text-sm">
              Please upload at least one product image.
            </span>
          )}

          <input
            id="imageUpload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple // Enable multiple image upload
          />

          {/* Product Name Input */}
          <Form.Item
            name="productName"
            label={
              <span className="text-textColor text-[18px]">Product Name</span>
            }
            rules={[{ required: true, message: "Please input product name" }]}
          >
            <Input
              placeholder="Product Name"
              className="p-4 bg-primary rounded-xl w-full border border-secondary"
            />
          </Form.Item>

          {/* Category Select */}
          <Form.Item
            name="category"
            label={<span className="text-textColor text-[18px]">Category</span>}
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select Category" size="large">
              {categoriesData?.map((category) => {
                return (
                  <Option key={category?._id} value={category?.name}>
                    {category?.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          {/* Color Picker Section */}
          <div className="flex flex-col gap-3">
            <div>
              <label htmlFor="color" className="text-lg">
                <span className="text-rose-500">*</span> Color
              </label>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex gap-3">
                {selectedColors.map((col, index) => (
                  <div key={index} className="relative">
                    <div
                      style={{ backgroundColor: col }}
                      className="w-8 h-8 rounded-full border"
                    />
                    <div className="absolute -top-2 -right-2 rounded-full">
                      <FiX
                        size={15}
                        className="ml-2 cursor-pointer text-red-500"
                        onClick={() => removeColor(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="size-8 border-[#1e66ca] flex justify-center items-center rounded-full border-2 cursor-pointer"
                onClick={() => setColorPickerVisible(true)}
              >
                <FiPlus />
              </div>
            </div>
          </div>

          {/* Size Section */}
          <div className="mt-5 flex flex-col gap-3">
            <div>
              <label htmlFor="color" className="text-lg">
                <span className="text-rose-500">*</span> Size
              </label>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex flex-col gap-3">
                {selectedSizes.map((sizeObj, index) => (
                  <div key={index} className="relative flex items-center">
                    <div className="size-8 border rounded-full flex justify-center items-center">
                      {sizeObj?.size}
                    </div>
                    <div className="absolute -top-2 -right-2 rounded-full">
                      <FiX
                        size={15}
                        className="ml-2 cursor-pointer text-red-500"
                        onClick={() => removeSize(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="size-8 border-[#1e66ca] flex justify-center items-center rounded-full border-2 cursor-pointer"
                onClick={() => setSizeModalVisible(true)}
              >
                <FiPlus />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            loading={isLoading}
            htmlType="submit"
            block
            className="block w-[500px] h-[56px] mt-[30px] px-2 py-4 text-white bg-[#1E66CA]"
          >
            Add Product
          </Button>
        </Form>
      </div>

      {/* Color Picker Modal */}
      <Modal
        title="Select Color"
        open={colorPickerVisible}
        onOk={handleColorAdd}
        onCancel={() => setColorPickerVisible(false)}
        footer={null}
        centered
        className="flex justify-center items-center"
      >
        {/* Wrapper div with the desired width and height */}
        <div style={{ width: "100%", height: "400px" }}>
          <HexColorPicker color={color} onChange={setColor} />
        </div>
      </Modal>

      {/* Size Modal */}
      <Modal
        title="Add Size"
        open={sizeModalVisible}
        onOk={handleSizeAdd}
        onCancel={() => setSizeModalVisible(false)}
        footer={null}
        centered
      >
        <Form layout="vertical">
          <Form.Item label="Size">
            <Input
              value={tempSize.size}
              placeholder="Size"
              className="p-4 bg-primary rounded-xl w-full border border-secondary"
              onChange={(e) =>
                setTempSize({ ...tempSize, size: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Inventory Quantity">
            <Input
              value={tempSize.inventoryQuantity}
              placeholder="Inventory Quantity"
              className="p-4 bg-primary rounded-xl w-full border border-secondary"
              onChange={(e) =>
                setTempSize({ ...tempSize, inventoryQuantity: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input
              value={tempSize.price}
              placeholder="Price"
              className="p-4 bg-primary rounded-xl w-full border border-secondary"
              onChange={(e) =>
                setTempSize({ ...tempSize, price: e.target.value })
              }
            />
          </Form.Item>
          <Button
            type="primary"
            block
            onClick={handleSizeAdd}
            className="w-full h-12 rounded-xl bg-blue-500 text-white"
          >
            Add Size
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddBoutiqueProduct;
