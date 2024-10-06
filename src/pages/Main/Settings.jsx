import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <>
    <div>
    <h1 className="text-[30px] font-bold pb-5">Settings</h1>
    </div>
    <div className="w-full space-y-6">
      <Link to={"/settings/privacy-policy"} className="block">
        <button className="w-full px-5 py-3 rounded-xl border border-blue-500 text-start text-[17px]">
          Privacy Policy
        </button>
      </Link>
      <Link to={"/settings/delivery&service-fee"} className="block">
        <button className="w-full px-5 py-3 rounded-xl border border-blue-500 text-start text-[17px]">
          Delivery & Service Fee
        </button>
      </Link>
    </div>
    </>
  );
};

export default Settings;
