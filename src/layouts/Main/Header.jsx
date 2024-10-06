import { Badge } from "antd";
import { useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { imageBaseUrl } from "../../config";
import useUser from "../../hook/useUser";
import { useGetNotificationsQuery } from "../../redux/features/notification/notificationApi";

const Header = () => {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const { data: notifications, refetch } = useGetNotificationsQuery(1, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  // Refetch notifications when location changes
  useEffect(() => {
    refetch();
  }, [location, refetch]);

  const pendingNotifications = notifications?.filter(
    (notification) => notification.isParoved === "pending"
  );

  return (
    <div className="w-full sticky top-0 flex bg-[#edf5ff] justify-between items-center py-5 rounded-xl mb-5">
      <div className="px-5">
        <h2 className="text-lg font-bold text-[#1E66CA]">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-gray-500">Have a nice day.</p>
      </div>
      <div className="flex items-center gap-5">
        {location.pathname === "/dashboard/users" ||
        location.pathname === "/dashboard/appointments" ||
        location.pathname === "/dashboard/earnings" ? (
          <div>{/* <SearchBox /> */}</div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex gap-5">
        <div onClick={() => navigate("notifications")} className="relative flex items-center">
          <IoIosNotificationsOutline
            style={{ cursor: "pointer" }}
            className="bg-primary size-10 text-[#1E66CA] border border-[#1E66CA] rounded-full p-2"
          />
          {pendingNotifications?.length > 0 && (
            <Badge
              count={pendingNotifications?.length}
              className="ml-2 absolute top-0 right-0"
            />
          )}
        </div>
        <div
          onClick={() => navigate("profile-information")}
          className="flex items-center cursor-pointer mr-[30px] bg-primary text-[#1E66CA] rounded-full p-1"
        >
          <img
            src={`${imageBaseUrl}/${user?.image?.publicFileUrl}`}
            className="size-10 rounded-full"
            alt="User"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
