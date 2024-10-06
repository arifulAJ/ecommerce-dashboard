import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import OTPInput from "react-otp-input";
import { useVerifyOtpMutation } from "../../redux/features/auth/authApi";
import { message } from "antd";
const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const [verifyOtp] = useVerifyOtpMutation();
  const navigate = useNavigate();
  const handleVerifyOtp = async () => {
    const res = await verifyOtp({ email, code: otp });
    if (res?.error) {
      message.error(res.error.data.message);
      return;
    }
    if (res.data) {
      message.success("OTP verified successfully");
      navigate(`/auth/update-password/${email}`);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center p-2">
      <div className="w-full md:w-[500px] border border-[#1e66ca] p-8 rounded-2xl space-y-3">
        <img src={logo} alt="Logo" className="w-72 mx-auto" />
        <div className="flex items-center justify-center gap-2">
          <Link to="/auth">
            <GoArrowLeft className="text-[32px]" />
          </Link>
          <h1 className="text-[24px] font-medium">Verify OTP</h1>
        </div>
        <p className="text-center mx-auto w-[80%] font-medium mb-[24px] text-[#5C5C5C] text-[16px]">
          Please enter the otp we have sent you in your email.
        </p>
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2 w-full mx-auto mt-4">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputStyle={{
                height: "50px",
                background: "#ffffff",
                width: "50px",
                border: "1px solid #1e66ca",
                margin: "0 10px",
                outline: "none",
                color: "black",
              }}
              renderSeparator={<span> </span>}
              renderInput={(props) => <input {...props} />}
              containerStyle={{
                display: "flex",
                justifyContent: "center",
              }}
            />
          </div>
          <button
            onClick={handleVerifyOtp}
            className="w-full bg-[#1e66ca] text-white px-2 py-3 border bg-secondary rounded-xl mt-2"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
