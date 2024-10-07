
import { Button, Form, Input, Select, Modal, message } from "antd";
import { useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { FiPlus, FiX } from "react-icons/fi";
import { SketchPicker } from "react-color"; // Color Picker
import { Option } from "antd/es/mentions";
import { useAddBoutiqueProductMutation } from "../../redux/features/boutiques/boutiquesApi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";

const AddBoutiqueProduct = () => {
  const [selectedFile, setSelectedFile] = useState(null); // To store the selected file (image)
  const [preview, setPreview] = useState(null); // For image preview
  const [imageError, setImageError] = useState(false); // Handle file upload errors
  const [color, setColor] = useState([]); // Array to store colors
  const [selectedSizes, setSelectedSizes] = useState([]); // Array for selected sizes (variants)
  const [colorPickerVisible, setColorPickerVisible] = useState(false); // Toggle for color picker modal
  const [sizeModalVisible, setSizeModalVisible] = useState(false); // Toggle for size modal
  const [tempSize, setTempSize] = useState({
    size: "",
    inventoryQuantity: "",
    price: "",
  }); // Temp state to handle size input
  const [addProduct] = useAddBoutiqueProductMutation(); // Redux mutation to add product
  const { data: responseData } = useGetCategoriesQuery(1);
  const navigate = useNavigate();
  const { boutiqueId } = useParams(); // Get boutique ID from URL params

  const categoriesData = responseData?.data?.attributes?.allCatagory || [];

  // Handle form submission
  const handleUploadScore = async (values) => {
    const { productName, category } = values;
    const formdata = new FormData();

    const updatedColorArray = color.map(c => c.replace('#', ''));
    if (productName) formdata.append("productName", productName);
    if (category) formdata.append("category", category);
    if (selectedFile) formdata.append("productImage1", selectedFile);
    if (selectedSizes.length)
      formdata.append("variants", JSON.stringify(selectedSizes)); // Append variants as a JSON string
    if (updatedColorArray.length) formdata.append("color", JSON.stringify(updatedColorArray)); // Append color as a JSON string
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
  // Handle file selection and preview generation
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Set selected file
      setPreview(URL.createObjectURL(file)); // Generate a preview
      setImageError(false); // Reset error state
    }
  };

  // Trigger file input on div click
  const handleDivClick = () => {
    document.getElementById("imageUpload").click();
  };

  // Add new color to the list
  const handleColorAdd = (newColor) => {
    setColor([...color, newColor.hex]); // Add selected color to the array
    setColorPickerVisible(false); // Close color picker
  };

  // Add size to the size list
  const handleSizeAdd = () => {
    setSelectedSizes([...selectedSizes, tempSize]); // Add temp size object to the size array
    setTempSize({ size: "", inventoryQuantity: "", price: "" }); // Reset temp state
    setSizeModalVisible(false); // Close size modal
  };

  // Remove a color
  const removeColor = (index) => {
    const updatedColors = color.filter((_, i) => i !== index);
    setColor(updatedColors);
  };

  // Remove a size
  const removeSize = (index) => {
    const updatedSizes = selectedSizes.filter((_, i) => i !== index);
    setSelectedSizes(updatedSizes);
  };

  console.log(color)
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
          onFinish={handleUploadScore}
          autoComplete="off"
        >
          {/* Image Upload Section */}
          <div
            className={`relative w-60 h-40 rounded-xl border mb-2 flex justify-center items-center bg-[#e8ebf0] cursor-pointer ${
              imageError ? "border-red-500" : ""
            }`}
            onClick={handleDivClick}
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

            {preview && (
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl">
                <FaCamera size={30} className="text-white mb-2" />
                <p className="text-white text-sm">Click to change image</p>
              </div>
            )}
          </div>

          {imageError && (
            <span className="text-red-500 text-sm">
              Please upload a product image.
            </span>
          )}

          <input
            id="imageUpload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
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
                {color.map((col, index) => (
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
        onOk={() => setColorPickerVisible(false)}
        onCancel={() => setColorPickerVisible(false)}
        footer={null}
        centered
      >
        <SketchPicker color={color} onChangeComplete={handleColorAdd} />
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
          <button
            onClick={handleSizeAdd}
            className="w-full py-3 rounded-xl bg-blue-500 text-white"
          >
            Add Size
          </button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddBoutiqueProduct;