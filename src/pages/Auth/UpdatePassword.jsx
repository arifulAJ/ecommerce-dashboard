import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { GoArrowLeft } from "react-icons/go";
import { Form, Input, message } from "antd";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { LockOutlined } from "@ant-design/icons";

const UpdatePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const { email } = useParams();
  const navigate = useNavigate();

  const onFinish = async ({ new_password }) => {
    const res = await changePassword({
      email,
      password: new_password,
    });
    if (res?.error) {
      message.error(res.error.data.message);
      return;
    }
    if (res.data) {
      message.success(res?.data?.message);
      navigate("/auth");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center p-2">
      <div className="w-full md:w-[500px] border border-[#1e66ca] p-8 rounded-2xl space-y-3">
        <img src={logo} alt="" className="w-72 mx-auto" />
        <div className="flex items-center justify-center gap-2">
          <Link to="/auth">
            <GoArrowLeft className="text-[32px]" />
          </Link>
          <h1 className="text-[24px] font-medium">Update Password</h1>
        </div>
        <p className="text-center mx-auto w-[80%] font-medium mb-[24px] text-[#5C5C5C] text-[16px]">
          Your password must be 8-10 characters long.
        </p>
        <Form
          name="update_password"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          onFinish={onFinish}
          className="mt-2"
        >
          <Form.Item
            name="new_password"
            label={<span className="text-[16px]">New Password</span>}
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
              {
                min: 8,
                max: 10,
                message: "Password must be between 8 and 10 characters!",
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Enter Your New Password"
              className="w-full py-3 rounded-xl"
              prefix={<LockOutlined className="mr-2 text-gray-500" />}
            />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            label={<span className="text-[16px]">Confirm Password</span>}
            dependencies={["new_password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              className="w-full py-3 rounded-xl"
              placeholder="Confirm Your Password"
              prefix={<LockOutlined className="mr-2 text-gray-500" />}
            />
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className="w-full bg-[#1e66ca] text-white px-2 py-3 border rounded-xl mt-2"
            >
              Confirm
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePassword;
