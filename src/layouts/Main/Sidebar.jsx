import { NavLink, useNavigate } from "react-router-dom";
import { BiSolidCategory, BiSolidDashboard } from "react-icons/bi";
import { HiLogout } from "react-icons/hi";
import { FaCalendarDays } from "react-icons/fa6";
import logo2 from "../../assets/logo2.png";
import { IoBagSharp, IoSettingsOutline } from "react-icons/io5";
import { BsCalendar2 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { LuCircleDollarSign } from "react-icons/lu";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/auth");
  };
  return (
    <div className="w-full flex flex-col justify-between bg-[#1E66CA] min-h-screen rounded-lg border-2">
      <div>
        <div className="p-[32px]">
          <img src={logo2} alt="" />
        </div>

        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "flex text-[#3BA6F6]  gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[white] m-[16px] rounded-lg "
              : isActive
              ? "flex text-white gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#1E66CA]  m-[16px] rounded-lg border-l-8 border-l-white"
              : "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#1E66CA]  m-[16px] rounded-lg"
          }
        >
          <div className="flex justify-start items-center gap-2">
            <BiSolidDashboard className="text-[40px]" width={25} height={35} />{" "}
            Dashboard
          </div>
        </NavLink>

        <NavLink
          to="/boutiques"
          className={({ isActive }) =>
            isActive
              ? "flex text-white gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#1E66CA]  m-[16px] rounded-lg border-l-8 border-l-white border-gray-600"
              : "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px]  m-[16px] rounded-lg"
          }
        >
          <div className="flex justify-start items-center gap-2">
            <IoBagSharp className="text-[40px]" width={35} height={35} />
            Boutiques
          </div>
        </NavLink>

        <NavLink
          to="/shoppers"
          className={({ isActive, isPending }) =>
            isPending
              ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
              : isActive
              ? "flex text-white gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#1E66CA]  m-[16px] rounded-lg border-l-8 border-l-white border-gray-600"
              : "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px]  m-[16px] rounded-lg"
          }
        >
          <div className="flex justify-start items-center gap-2">
            <BsCalendar2 size={35} />
            Shoppers
          </div>
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive, isPending }) =>
            isPending
              ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
              : isActive
              ? "flex text-white gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#1E66CA]  m-[16px] rounded-lg border-l-8 border-l-white border-gray-600"
              : "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px]  m-[16px] rounded-lg"
          }
        >
          <div className="flex justify-start items-center gap-2">
            <BiSolidCategory size={35} />
            Categories
          </div>
        </NavLink>

        <NavLink
          to="/drivers"
          className={({ isActive, isPending }) =>
            isPending
              ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
              : isActive
              ? "flex text-white gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#1E66CA]  m-[16px] rounded-lg border-l-8 border-l-white border-gray-600"
              : "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px]  m-[16px] rounded-lg"
          }
        >
          <div className="flex justify-start items-center gap-2">
            <FaCalendarDays size={35} />
            Drivers
          </div>
        </NavLink>
        <NavLink
          to="/withdraw"
          className={({ isActive, isPending }) =>
            isPending
              ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
              : isActive
              ? "flex text-white gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#1E66CA]  m-[16px] rounded-lg border-l-8 border-l-white border-gray-600"
              : "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px]  m-[16px] rounded-lg"
          }
        >
          <div className="flex justify-start items-center gap-2">
            <LuCircleDollarSign size={35} />
            Withdraw
          </div>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive, isPending }) =>
            isPending
              ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
              : isActive
              ? "flex text-white gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#1E66CA]  m-[16px] rounded-lg border-l-8 border-l-white border-gray-600"
              : "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px]  m-[16px] rounded-lg"
          }
        >
          <div className="flex justify-start items-center gap-2">
            <IoSettingsOutline size={35} />
            Settings
          </div>
        </NavLink>
      </div>

      <div className="mb-[32px]" onClick={handleLogOut}>
        <div className="flex items-center w-[80%] rounded-lg mx-auto py-4 ml-[18px] justify-center bg-white bg-opacity-5  cursor-pointer gap-2 text-[white] font-medium">
          <HiLogout width={25} height={25} />
          <span className="text-[20px] ">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
