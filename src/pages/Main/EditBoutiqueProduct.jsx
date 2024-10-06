/* eslint-disable no-unused-vars */
import { Button, Form, Input, Select, Modal, message } from "antd";
import { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa6";
import { FiPlus, FiX } from "react-icons/fi";
import { SketchPicker } from "react-color";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBoutiqueProductQuery,
  useUpdateBoutiqueProductMutation,
} from "../../redux/features/boutiques/boutiquesApi";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";
import { imageBaseUrl } from "../../config";
import { Option } from "antd/es/mentions";

const EditBoutiqueProduct = () => {
  const { productId } = useParams(); // Get boutique ID and product ID from URL
  const navigate = useNavigate();
  const { data: responseProductData } = useGetBoutiqueProductQuery(productId);
  const { data: categoriesData } = useGetCategoriesQuery(1);
  const productData = responseProductData?.data?.attributes?.product;

  const [images, setImages] = useState([]); // Combined state for existing and new images
  const [imageError, setImageError] = useState(false); // Handle file upload errors
  const [color, setColor] = useState([]); // Store colors
  const [selectedSizes, setSelectedSizes] = useState([]); // Store selected sizes
  const [colorPickerVisible, setColorPickerVisible] = useState(false); // Color picker modal toggle
  const [sizeModalVisible, setSizeModalVisible] = useState(false); // Size modal toggle
  const [tempSize, setTempSize] = useState({
    size: "",
    inventoryQuantity: "",
    price: "",
  }); // Temp state for size input
  const [editingSizeIndex, setEditingSizeIndex] = useState(null); // Track the index of size being edited
  const [updateProduct, { isLoading }] = useUpdateBoutiqueProductMutation(); // Redux mutation to update the product

  // Handle form submission
  const handleUpdateProduct = async (values) => {
    const { productName, category } = values;
    const formdata = new FormData();

    const updatedColorArray = color.map((c) => c.replace("#", ""));
    if (productName) formdata.append("productName", productName);
    if (category) formdata.append("category", category);

    // Append images for database submission
    images.forEach((image) => {
      formdata.append("productImage1", image.file || image); // Use the file property for new uploads
    });

    if (selectedSizes.length)
      formdata.append("variants", JSON.stringify(selectedSizes));
    if (updatedColorArray.length)
      formdata.append("color", JSON.stringify(updatedColorArray));
    if (productId) formdata.append("productId", productId);

    try {
      const res = await updateProduct(formdata);
      if (res.error) {
        message.error(res?.error?.message);
      }
      if (res?.data) {
        message.success(res?.data?.message);
        navigate(
          `/boutique-details/${res?.data?.data?.attributes?.updatedProduct?.userId}`
        );
      }
    } catch (error) {
      message.error("Failed to update product.");
    }
  };

  // Handle file selection and preview generation for multiple images
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to Array
    const newImages = files.map((file) => ({
      file, // Store the actual file object
      preview: URL.createObjectURL(file), // Create a preview URL
    }));

    setImages([...images, ...newImages]); // Append new images to the existing array
    setImageError(false); // Reset error state
  };

  // Trigger file input on div click
  const handleDivClick = () => {
    document.getElementById("imageUpload").click();
  };

  // Add new color to the list
  const handleColorAdd = (newColor) => {
    setColor([...color, newColor.hex]);
    setColorPickerVisible(false);
  };

  // Add or edit size in the list
  const handleSizeAddOrUpdate = () => {
    if (editingSizeIndex !== null) {
      // Update existing size
      const updatedSizes = [...selectedSizes];
      updatedSizes[editingSizeIndex] = tempSize;
      setSelectedSizes(updatedSizes);
      setEditingSizeIndex(null);
    } else {
      // Add new size
      setSelectedSizes([...selectedSizes, tempSize]);
    }
    setTempSize({ size: "", inventoryQuantity: "", price: "" });
    setSizeModalVisible(false);
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

  // Remove image preview
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Open the size modal with pre-filled values for editing
  const handleEditSize = (index) => {
    const sizeToEdit = selectedSizes[index];
    setTempSize(sizeToEdit);
    setEditingSizeIndex(index); // Set the index for editing
    setSizeModalVisible(true);
  };

  // Pre-fill form fields with existing product data
  useEffect(() => {
    if (productData) {
      const {
        color: existingColors,
        variants,
        images: existingImages,
      } = productData || {};

      // Set colors and sizes
      setColor(existingColors || []);
      setSelectedSizes(variants || []);
      setImages(
        existingImages.map((image) => `${imageBaseUrl}${image.publicFileUrl}`)
      ); // Set existing images
    }
  }, [productData]);

  return (
    <div className="ml-[24px] overflow-auto">
      <div className="mt-5 cursor-pointer flex items-center pb-3 gap-2">
        <h1 className="text-[24px] text-textColor font-semibold">
          Edit Product
        </h1>
      </div>
      <div>
        {productData && (
          <Form
            name="basic"
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 40 }}
            layout="vertical"
            onFinish={handleUpdateProduct}
            autoComplete="off"
            initialValues={{
              productName: productData?.name,
              category: productData?.category,
            }}
          >
            {/* Image Upload Section */}
            <div className="flex flex-wrap gap-2 mb-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 border rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    src={typeof image === "string" ? image : image.preview} // Use the preview for new images
                    alt={`Image ${index + 1}`}
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
              label={
                <span className="text-textColor text-[18px]">Category</span>
              }
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select Category" size="large">
                {categoriesData?.data?.attributes?.allCatagory.map(
                  (category) => (
                    <Option key={category?._id} value={category?.name}>
                      {category?.name}
                    </Option>
                  )
                )}
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
                        style={{
                          backgroundColor: col.startsWith("#")
                            ? col
                            : `#${col}`,
                        }}
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
                <div className="flex gap-3">
                  {selectedSizes.map((sizeObj, index) => (
                    <div key={index} className="relative flex items-center">
                      <div
                        className="size-8 border rounded-full flex justify-center items-center cursor-pointer"
                        onClick={() => handleEditSize(index)} // Open edit modal on click
                      >
                        {sizeObj?.size}
                      </div>
                      <div className="absolute -top-2 -right-2 rounded-full">
                        <FiX
                          size={15}
                          className="ml-2 cursor-pointer text-red-500"
                          onClick={() => removeSize(index)} // Directly remove size without opening modal
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="size-8 border-[#1e66ca] flex justify-center items-center rounded-full border-2 cursor-pointer"
                  onClick={() => {
                    setTempSize({ size: "", inventoryQuantity: "", price: "" });
                    setEditingSizeIndex(null); // Clear the edit index when adding a new size
                    setSizeModalVisible(true);
                  }}
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
              Update Product
            </Button>
          </Form>
        )}
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
        title={editingSizeIndex !== null ? "Edit Size" : "Add Size"} // Dynamic title
        open={sizeModalVisible}
        onOk={handleSizeAddOrUpdate}
        onCancel={() => setSizeModalVisible(false)}
        footer={null}
        centered
      >
        <Form layout="vertical">
          <Form.Item label="Size">
            <Input
              disabled={editingSizeIndex !== null}
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
                setTempSize({
                  ...tempSize,
                  inventoryQuantity: e.target.value,
                })
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
            onClick={handleSizeAddOrUpdate}
            className="w-full h-12 rounded-xl bg-blue-500 text-white"
          >
            {editingSizeIndex !== null ? "Update Size" : "Add Size"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default EditBoutiqueProduct;
