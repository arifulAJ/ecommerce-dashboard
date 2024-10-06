import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/loginImage.png";
import logo from "../../assets/logo.png";
import { GoLock } from "react-icons/go";
import { Form, Input, message } from "antd";
import { MdOutlineMail } from "react-icons/md";
import { useSignInMutation } from "../../redux/features/auth/authApi";
import { ImSpinner6 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { loggedUser } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [login, { isLoading }] = useSignInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async ({ email, password }) => {
    try {
      const res = await login({ email, password });
      if (res?.error) {
        message.error(res?.error?.data?.message || "Something went wrong");
        return;
      } else if (res?.data?.data) {
        dispatch(
          loggedUser({
            token: res?.data?.data?.token,
            user: res?.data?.data?.attributes,
          })
        );
        message.success(res?.data?.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="w-full h-screen hidden lg:block relative">
        <img
          src={loginImg}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-14 p-10 flex flex-col justify-center">
          <span className="text-white  text-6xl text-center font-bold mx-auto">
            Welcome
          </span>
          <span className="text-center text-white text-2xl  mt-2">
            You are entering a unique place, where you can explore fashion
          </span>
        </div>
      </div>
      {/* <!-- Right: Login Form --> */}
      <div className="w-full h-screen p-8">
        <div className="flex justify-center">
          <img src={logo} alt="" className="w-72 h-full mx-auto" />
        </div>
        <div className="mt-10">
          <h1 className="flex text-[#1E66CA] text-[44px] font-semibold">
            Login
          </h1>
          <p>To continue to the app, please enter login information</p>
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
                prefix={
                  <MdOutlineMail className="mr-2  size-5 text-gray-500" />
                }
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={<span className="text-[16px]">Password</span>}
              rules={[
                {
                  required: true,
                  message: "Please Input Your Password!",
                },
              ]}
            >
              <Input.Password
                name="password"
                size="large"
                placeholder="Enter Your Password"
                className="w-full py-3 rounded-xl"
                prefix={<GoLock className="mr-2  size-5 text-gray-500" />}
              />
            </Form.Item>
            <div className="flex justify-end items-center mb-2">
              <Link
                to="/auth/forgot-password"
                className="text-secondary font-medium hover:text-secondary"
              >
                Forgot password?
              </Link>
            </div>
            <Form.Item>
              <button className="w-full bg-[#1e66ca] text-white  px-2 py-3  border bg-secondary rounded-xl">
                {isLoading ? (
                  <h1 className="flex justify-center items-center gap-1">
                    <ImSpinner6 className="animate-spin size-5" />{" "}
                    <span>Login</span>
                  </h1>
                ) : (
                  "Login"
                )}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
