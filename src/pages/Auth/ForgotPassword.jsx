import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Form, Input, message } from "antd";
import { MdOutlineMail } from "react-icons/md";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";
const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const onFinish = async ({ email }) => {
    const res = await forgotPassword({ email: email });
    if (res?.error) {
      message.error(res?.error?.data?.message);
      return;
    }
    if (res.data) {
      message.success("We've sent you an email with a otp.");
      navigate(`/auth/verify/${email}`);
    }
    navigate(`/auth/verify/${email}`);
  };
  return (
    <div className="w-full h-screen flex justify-center  items-center p-2">
      <div className="w-full md:w-[500px] border border-[#1e66ca] p-8 rounded-2xl space-y-3">
        <img src={logo} alt="" className="w-72 mx-auto" />
        <div className="flex items-center justify-center gap-2">
          <Link to={`/auth`}>
            <GoArrowLeft className="text-[32px]" />
          </Link>

          <h1 className="text-[24px] font-medium">Forgot password</h1>
        </div>
        <p className="text-center mx-auto w-[80%] font-medium text-[#5C5C5C] text-[16px]">
          Please enter your email address to reset your password.
        </p>
        <Form
          name="normal_login"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          className="mt-2"
        >
          <Form.Item
            name="email"
            label={<span className="text-[16px]">Email</span>}
            rules={[
              {
                required: true,
                message: "Please Input Your Email!",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter Your Email"
              className="w-full py-3 rounded-xl"
              name="email"
              prefix={<MdOutlineMail className="mr-2  size-5 text-gray-500" />}
            />
          </Form.Item>
          <Form.Item>
            <button className="w-full bg-[#1e66ca] text-white  px-2 py-3  border bg-secondary rounded-xl mt-2">
              Send OTP
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
