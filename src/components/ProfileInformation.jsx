import { Input } from "antd";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useUser from "../hook/useUser";
import { imageBaseUrl } from "../config";

const ProfileInformation = () => {
  const currentUser = useUser();
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center ml-[24px] mt-[40px] mb-[63px]">
        <h1 className="text-[30px] font-medium">Profile Information</h1>
        <div
          onClick={() => navigate(`/edit-profile/${currentUser?._id}`)}
          className="flex gap-2 items-center py-[15px]
                 px-[40px]
                  bg-secondary
                  rounded-lg
                  border border-blue-500
                  cursor-pointer
                  "
        >
          <FaEdit size={17} />
          <p>Edit Profile</p>
        </div>
      </div>
      <div className="lg:flex ml-[24px] p-[36px] rounded-xl gap-5">
        <div className="w-[33%] bg-primary rounded-xl ml-[24px] flex flex-col justify-center items-center gap-[30px] p-10">
          <img
            className="w-[200px] h-[200px] rounded-full"
            src={`${imageBaseUrl}/${currentUser?.image?.publicFileUrl}`}
            alt="profileImage"
          />
          <div className="flex flex-col justify-center items-center">
            <p className="text-[20px] ">
              {currentUser?.role?.toUpperCase() || "Admin"}
            </p>
            <h1 className="text-[30px] font-medium">
              {currentUser?.name?.toUpperCase() || "Md Rakib Islam"}
            </h1>
          </div>
        </div>
        <div className="flex-1 w-[66%]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex gap-[25px]">
              <div className="flex-1">
                <label htmlFor="" className=" text-[18px] font-medium">
                  Name
                </label>
                <Input
                  placeholder="First name"
                  value={currentUser?.name}
                  className="p-4 bg-primary
                          rounded-xl w-full 
                          justify-start 
                          border
                          border-secondary
                          mt-[12px]
                          items-center 
                         
                          gap-4 inline-flex hover:border-secondary focus:bg-primary hover:bg-primary"
                  type="text"
                  readOnly
                />
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="" className="  text-[18px] font-medium mb-[12px]">
                Email
              </label>
              <Input
                placeholder="Email"
                value={currentUser?.email}
                className="p-4 bg-primary
                rounded-xl w-full 
                justify-start 
                border
                border-secondary
                mt-[12px]
                items-center 
               
                gap-4 inline-flex hover:border-secondary focus:bg-primary hover:bg-primary"
                type="text"
                readOnly
              />
            </div>
            <div className="flex-1">
              <label htmlFor="" className="  text-[18px] font-medium mb-[12px]">
                Phone Number
              </label>
              <Input
                placeholder="Phone"
                value={currentUser?.phone || "Not Provided"}
                className="p-4 bg-primary
                rounded-xl w-full 
                justify-start 
                border
                border-secondary
                mt-[12px]
                items-center 
               
                gap-4 inline-flex hover:border-secondary focus:bg-primary hover:bg-primary"
                type="text"
                readOnly
              />
            </div>
            {/* <div className="flex-1">
              <label
                htmlFor=""
                className="text-white  text-[18px] font-medium mb-[12px]"
              >
                Date Of Birth
              </label>
              <Input
                // onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder="Date Of Birth"
                value={currentUser?.dateOfBirth?.split("T")[0]}
                className="p-4 bg-[#706768]
               rounded w-full 
               justify-start 
               border-none
               mt-[12px]
               text-white
               items-center 
               gap-4 inline-flex outline-none focus:border-none focus:bg-[#706768] hover:bg-[#706768]"
                prefix={<CiCalendarDate color="white" size={20} />}
               
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
