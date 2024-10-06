import { Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useUser from "../hook/useUser";
import { updateProfileInfo } from "../redux/features/auth/authSlice";
import { useUpdateProfileMutation } from "../redux/features/profile/profileApi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { imageBaseUrl } from "../config";


const EditProfileInformation = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    `${imageBaseUrl}/${user?.image?.publicFileUrl}`
  );
  const dispatch = useDispatch();

  const [updateProfile, { data, isError, error }] = useUpdateProfileMutation();

  const handleUpdateProfile = async (values) => {
    const { name, email,phoneNumber } = values;

    const formData = new FormData();
    if (fileList) {
      formData.append("image", fileList);
    }
    if (name) {
      formData.append("name", name);
    }
    if (email) {
      formData.append("email", email);
    }
    if (phoneNumber) {
      formData.append("phone", phoneNumber);
    }

    updateProfile(formData);
  };

  useEffect(() => {
    if (isError && error) {
      message.error(error?.data?.message);
    } else if (data?.statusCode === 200 && data?.data) {
      dispatch(updateProfileInfo({ user: data?.data?.attributes }));
      message.success(data?.message);
      navigate("/profile-information");
    }
  }, [data, isError, error, dispatch, navigate]);

  const handleImage = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setFileList(e.target.files[0]);
  };

  return (
    <div>
      <div
        onClick={() => navigate("/profile-information")}
        className="flex cursor-pointer items-center mt-[40px] mb-[63px]"
      >
        <MdOutlineKeyboardArrowLeft size={30} />
        <h1 className="text-[20px] font-medium">Edit Profile</h1>
      </div>
      <div className="ml-[24px] p-[36px] rounded-xl">
        <Form
          name="basic"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          initialValues={{
            name: user?.name,
            email: user?.email,
            phoneNumber: user?.phone
          }}
          autoComplete="off"
          onFinish={handleUpdateProfile}
        >
          <div className="flex gap-5 rounded-xl">
            <div className="w-[33%] bg-primary ml-[24px] flex flex-col gap-4 justify-center items-center">
              <div className="size-48 relative bg-gray-400 rounded-full flex justify-center items-center">
                <img
                  className="rounded-full w-full h-full"
                  src={imageUrl}
                  alt="profileImage"
                />
                <label
                  htmlFor="file"
                  className="absolute w-full top-0 bottom-0 right-0 flex flex-col gap-1 justify-center items-center bg-gray-400 bg-opacity-50 text-white p-2 rounded-full cursor-pointer"
                >
                  <span className="font-semibold">Change Image</span>
                  <AiOutlineCloudUpload className="size-7" />
                </label>
                <input
                  style={{ display: "none" }}
                  onChange={handleImage}
                  type="file"
                  id="file"
                  className="hidden"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-[20px]">{user?.role?.toUpperCase()}</p>
                <h1 className="text-[30px] font-medium">
                  {user?.name?.toUpperCase()}
                </h1>
              </div>
            </div>
            <div className="flex-1 w-[66%]">
              <div className="flex flex-col gap-[24px]">
                <div className="flex gap-[25px]">
                  <div className="flex-1">
                    <Form.Item
                      label={
                        <span className="text-[18px] font-medium">Name</span>
                      }
                      name="name"
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Name!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Name"
                        className="p-4 bg-primary rounded-xl w-full justify-start border border-secondary mt-[12px] items-center gap-4 inline-flex hover:border-secondary focus:bg-primary hover:bg-primary"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex-1">
                  <Form.Item
                    label={
                      <span className="text-[18px] font-medium">Email</span>
                    }
                    name="email"
                    className="flex-1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Email"
                      readOnly
                      className="p-4 bg-primary rounded-xl w-full justify-start border border-secondary mt-[12px] items-center gap-4 inline-flex hover:border-secondary focus:bg-primary hover:bg-primary"
                    />
                  </Form.Item>
                </div>
                <div className="w-full flex-1 flex items-center">
                  <Form.Item
                    label={
                      <span className="text-[18px] font-medium">
                        Phone Number
                      </span>
                    }
                    name="phoneNumber"
                    className="flex-1"
                  >
                    <Input
                    type="number"
                      placeholder="Phone Number"
                      className="p-4 bg-primary rounded-xl w-full justify-start border border-secondary mt-[12px] items-center gap-4 inline-flex hover:border-secondary focus:bg-primary hover:bg-primary"
                    />
                  </Form.Item>
                </div>
              </div>
              <button className="w-full px-5 py-3 bg-blue-500 text-white font-medium rounded-xl">
                Update profile
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditProfileInformation;
