import { PlusOutlined } from "@ant-design/icons";
import { useLoadScript } from "@react-google-maps/api"; // Import for Google Maps
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddBoutiquesMutation } from "../../redux/features/boutiques/boutiquesApi";

const libraries = ["places"]; // Required for Google Places API

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const AddBoutiques = () => {
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [address, setAddress] = useState(""); // State for address
  const [latitude, setLatitude] = useState(null); // Latitude
  const [longitude, setLongitude] = useState(null); // Longitude
  const [addBoutiques] = useAddBoutiquesMutation();
  const navigate = useNavigate();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY, // Replace with your actual Google Maps API key
    libraries,
  });
  
  const handleAddMatch = async (values) => {
    const { name, email, password, rate, phone, city, state, description } =
      values;
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (email) formData.append("email", email);
    if (password) formData.append("password", password);
    if (rate) formData.append("rate", rate);
    if (phone) formData.append("phone", phone);
    if (address) formData.append("address", address);
    if (city) formData.append("city", city);
    if (state) formData.append("state", state);
    if (description) formData.append("description", description);
    if (file) formData.append("image", file);
    if (latitude && longitude) {
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
    }
    try {
      const res = await addBoutiques(formData);
      if (res.error) {
        message.error(res?.error?.data?.message);
        return;
      } if (res?.data) {
        message.success("Boutique Added successfully");
        navigate("/boutiques");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const imageFile = e.target.files[0];
    const isDone = beforeUpload(imageFile);
    if (isDone) {
      setFile(imageFile);
      setImageUrl(URL.createObjectURL(imageFile));
    } else {
      setImageUrl("");
      setFile("");
    }
  };

  // Function to handle the selection from the Google Places Autocomplete
  const handlePlaceSelect = (autocomplete) => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      setAddress(place.formatted_address);
      setLatitude(place.geometry.location.lat());
      setLongitude(place.geometry.location.lng());
    }
  };

  // Initialize Autocomplete and set event listener
  const handleLoadAutocomplete = (autocomplete) => {
    if (autocomplete) {
      autocomplete.addListener("place_changed", () =>
        handlePlaceSelect(autocomplete)
      );
    }
  };

  return (
    <div className="w-full ml-[24px]">
      <h1 className="text-[30px] text-[#1E66CA] font-bold">Add Boutiques</h1>
      <div>
        <div>
          <Form
            name="basic"
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 40 }}
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={handleAddMatch}
            autoComplete="off"
          >
            <div>
              <Form.Item
                label={
                  <span className="text-black text-[18px] ">
                    Add Boutique’s Profile Picture
                  </span>
                }
                className="flex-1"
                rules={[
                  {
                    required: true,
                    message: "Please upload Boutique's image!",
                  },
                ]}
              >
                <div className="size-24 border border-dashed rounded-full border-gray-500 flex items-center relative ">
                  {imageUrl && (
                    <img
                      className="size-24 rounded-full"
                      src={imageUrl}
                      alt={imageUrl}
                    />
                  )}
                  <div className="absolute bg-gray-800 bg-opacity-20  left-0 right-0 bottom-0 top-0 flex justify-center items-center rounded-full text-white cursor-pointer">
                    <label
                      htmlFor="file"
                      className="w-full flex flex-col gap-1 items-center justify-center text-center cursor-pointer"
                    >
                      <PlusOutlined />
                      Upload
                    </label>
                    <input
                      onChange={handleChange}
                      type="file"
                      name="file"
                      id="file"
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </Form.Item>
            </div>
            <div className="flex gap-5">
              <Form.Item
                name="name"
                label={
                  <span className="text-black text-[18px] ">
                    Boutique’s Name
                  </span>
                }
                className="flex-1"
                rules={[
                  {
                    required: true,
                    message: "Please input Boutique’s Name!",
                  },
                ]}
              >
                <Input
                  name="name"
                  placeholder="Boutique’s Name"
                  className="p-4
                rounded-xl w-full 
                justify-start 
                border
                items-center 
                gap-4 "
                />
              </Form.Item>
              <Form.Item
                name="email"
                label={<span className=" text-[18px] ">Email Address</span>}
                className="flex-1"
                rules={[
                  {
                    required: true,
                    message: "Please input Email!",
                  },
                ]}
              >
                <Input
                  placeholder="Email Address"
                  className="p-4
                rounded-xl w-full 
                justify-start 
                border
                items-center 
                gap-4 "
                />
              </Form.Item>
            </div>
            <div className="flex gap-5">
              <Form.Item
                name="phone"
                label={
                  <span className="text-black text-[18px] ">Phone Number</span>
                }
                className="flex-1"
                rules={[
                  {
                    required: true,
                    message: "Please input phone number!",
                  },
                ]}
              >
                <Input
                  placeholder="Phone Number"
                  className="p-4
                    rounded-xl w-full 
                    justify-start 
                    border
                    items-center 
                    gap-4 "
                />
              </Form.Item>
              <Form.Item
                name="password"
                label={
                  <span className="text-black text-[18px] ">Password</span>
                }
                className="flex-1"
                rules={[
                  {
                    required: true,
                    message: "Please input password!",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter your password"
                  className="p-4
                rounded-xl w-full 
                justify-start 
                border
                items-center 
                gap-4 "
                />
              </Form.Item>
            </div>
            <div className="flex gap-5">
              <Form.Item
                name="rate"
                label={
                  <span className="text-black text-[18px] ">
                    Boutique’s Rate
                  </span>
                }
                className="flex-1"
                rules={[
                  {
                    required: true,
                    message: "Please input Boutique’s Rate!",
                  },
                ]}
              >
                <Input
                  min={1}
                  max={5}
                  placeholder="Boutique’s Rate"
                  className="p-4
                rounded-xl w-full 
                justify-start 
                border
                items-center 
                gap-4 "
                />
              </Form.Item>
              <div className="flex-1 space-y-2">
                <label className="text-black text-[18px]">
                  {" "}
                  <span className="text-rose-500">*</span> Address
                </label>
                {isLoaded && (
                  <Input
                    id="autocomplete"
                    type="text"
                    placeholder="Enter address"
                    className="p-4 rounded-xl w-full justify-start border items-center gap-4 "
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} // Set typed value to state
                    onFocus={(e) => {
                      const autocomplete =
                        new window.google.maps.places.Autocomplete(e.target);
                      handleLoadAutocomplete(autocomplete); // Load Autocomplete when focused
                    }}
                  />
                )}
              </div>
            </div>
            {/* Address Search with Google Places Autocomplete */}
            <div className="flex gap-5">
              <Form.Item
                name="city"
                label={<span className=" text-[18px] ">City</span>}
                className="flex-1"
                rules={[
                  {
                    required: true,
                    message: "Please input your City!",
                  },
                ]}
              >
                <Input
                  placeholder="City"
                  className="p-4 rounded-xl w-full justify-start border items-center gap-4 "
                />
              </Form.Item>
              <Form.Item
                name="state"
                label={<span className="text-black text-[18px] ">State</span>}
                className="flex-1"
                rules={[
                  {
                    required: true,
                    message: "Please input State!",
                  },
                ]}
              >
                <Input
                  placeholder="State"
                  className="p-4 rounded-xl w-full justify-start border items-center gap-4 "
                />
              </Form.Item>
            </div>

            <div className="flex gap-5">
              <Form.Item
                name="description"
                label={<span className=" text-[18px] ">Description</span>}
                className="flex-1"
                rules={[
                  {
                    required: true,
                    message: "Please input Description!",
                  },
                ]}
              >
                <Input
                  placeholder="Description"
                  className="p-4
                rounded-xl w-full 
                justify-start 
                border
                items-center 
                gap-4 "
                />
              </Form.Item>
            </div>
            <Button
              htmlType="submit"
              block
              style={{
                marginTop: "30px",
                backgroundColor: "#1E66CA",
                color: "#fff",
                borderRadius: "12px",
                size: "18px",
                height: "56px",
              }}
            >
              Add
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddBoutiques;
