/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { imageBaseUrl } from "../config";
import { useGetSingleDriverQuery } from "../redux/features/drivers/driversApi";
import { Image } from "antd";
import { Link } from "react-router-dom";

const DriversCart = ({ driver }) => {
  const { data: driverDetails } = useGetSingleDriverQuery(driver?._id, {
    skip: !driver?._id,
  });
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl my-5">
      <div className="flex border-b-2 px-4 py-3 justify-between ">
        <Link to={`/drivers/${driver?._id}`}>
          <div className="flex items-center gap-3">
            <div className="w-[60px] h-[60px] rounded-full relative">
              <img
                className="rounded-full w-full h-full"
                src={`${imageBaseUrl}${driver?.image?.publicFileUrl}`}
                alt=""
              />

              <img
                className="absolute bottom-[10px] right-[-5px]  w-[20px] rounded-full"
                src="https://i.ibb.co/CvNF1q9/image.png"
                alt=""
              />
            </div>
            <div>
              <h1 className="font-medium ">{driver?.name}</h1>
              <p className="text-sm text-[#111111] opacity-[40%]">
                {driver?.email}
              </p>
            </div>
          </div>
        </Link>
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <p className="text-[#1E66CA] font-bold">See More Details</p>
          <FaAngleDown className="text-[#1E66CA]" />
        </div>
      </div>

      <div
        className={`transition-all ease-in-out duration-500 ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="grid grid-cols-4 lg:grid-cols-7 gap-3  p-3 mx-14">
          <div className="border-l-2 border-[#1E66CA] px-4 py-3 border-r-2">
            <p className="font-bold">MAKE</p>
            <p className="text-[#8DB501]">{driverDetails?.driver?.make}</p>
          </div>
          <div className=" border-[#1E66CA] px-4 py-3 border-r-2">
            <p className="font-bold">MODEL</p>
            <p className="text-[#8DB501]">{driverDetails?.driver?.model}</p>
          </div>
          <div className=" border-[#1E66CA] px-4 py-3 border-r-2">
            <p className="font-bold">YEAR</p>
            <p className="text-[#8DB501]">{driverDetails?.driver?.year}</p>
          </div>
          <div className="border-[#1E66CA] px-4 py-3 ">
            <p className="font-bold">REG.NO</p>
            <p className="text-[#8DB501]">
              {driverDetails?.driver?.registrationNumber}
            </p>
          </div>
          <div>
            <p className="font-bold">Driver License</p>
            <div className="w-full h-28">
              <Image
                width="100%"
                height="100%"
                className="w-full rounded-lg relative"
                src={`${imageBaseUrl}/${driverDetails?.driver?.driverLicense?.destination}/${driverDetails?.driver?.driverLicense?.filename}`}
                alt=""
              />
            </div>
          </div>
          <div>
            <p className="font-bold">Register</p>
            <div className="w-full h-28">
              <Image
                width="100%"
                height="100%"
                className="w-full rounded-lg relative"
                src={`${imageBaseUrl}/${driverDetails?.driver?.registration?.destination}/${driverDetails?.driver?.registration?.filename}`}
                alt=""
              />
            </div>
          </div>
          <div>
            <p className="font-bold">Police Check</p>
            <div className="w-full h-28">
              <Image
                width="100%"
                height="100%"
                className="w-full h-full rounded-lg relative"
                src={`${imageBaseUrl}/${driverDetails?.driver?.policeCheck?.destination}/${driverDetails?.driver?.policeCheck?.filename}`}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 py-4 mx-5">
          <p className="text-[#111111] opacity-[40%] font-bold">
            Documentation Accepted
          </p>
          <IoIosCheckmarkCircle className="text-[#8DB501]" size={20} />
        </div>
      </div>
    </div>
  );
};

export default DriversCart;
