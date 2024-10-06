import { useState } from "react";
import {
  useApprovedDriverNotificationsMutation,
  useApprovedProductNotificationMutation,
  useDenyDriverNotificationsMutation,
  useDenyProductNotificationMutation,
  useGetNotificationsQuery,
} from "../../redux/features/notification/notificationApi";
import moment from "moment";
import { imageBaseUrl } from "../../config";
import { message, Pagination } from "antd";
import driverImage from "../../assets/driver.png";

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data: notifications, refetch } = useGetNotificationsQuery(currentPage, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const [approveDriver] = useApprovedDriverNotificationsMutation();
  const [denyDriver] = useDenyDriverNotificationsMutation();
  const [approveProduct] = useApprovedProductNotificationMutation();
  const [denyProduct] = useDenyProductNotificationMutation();

  

  const getTimeAgo = (date) => {
    return moment(date).fromNow();
  };

  const todayNotifications = notifications?.filter((notification) =>
    moment(notification?.createdAt).isSame(moment(), "day")
  );

  const yesterdayNotifications = notifications?.filter((notification) =>
    moment(notification?.createdAt).isSame(moment().subtract(1, "day"), "day")
  );

  const olderNotifications = notifications?.filter(
    (notification) =>
      !moment(notification.createdAt).isSame(moment(), "day") &&
      !moment(notification.createdAt).isSame(moment().subtract(1, "day"), "day")
  );

  const handleDriverApprove = async (driverId) => {
    const res = await approveDriver(driverId);
    if (res?.error) {
      message.error(res.error.data?.message);
    }
    if (res.data) {
      message.success(res?.data?.message);
      refetch();
    }
  };

  const handleDriverDeny = async (driverId) => {
    const res = await denyDriver(driverId);
    if (res?.error) {
      message.error(res.error.data?.message);
    }
    if (res.data) {
      message.success(res?.data?.message);
      refetch();
    }
  };

  const handleProductApprove = async (productId) => {
    const res = await approveProduct(productId);
    if (res?.error) {
      message.error(res.error.data?.message);
    }
    if (res.data) {
      message.success(res?.data?.message);
      refetch();
    }
  };

  const handleProductDeny = async (productId) => {
    const res = await denyProduct(productId);
    if (res?.error) {
      message.error(res.error.data?.message);
    }
    if (res.data) {
      message.success(res?.data?.message);
      refetch();
    }
  };

  const renderNotifications = (notifications, title) => {
    // Implementing pagination logic
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedNotifications = notifications.slice(
      startIndex,
      startIndex + pageSize
    );

    return (
      <div>
        <h1 className="text-[30px] font-bold">{title}</h1>
        {paginatedNotifications.map((notification) => (
          <div
            key={notification._id}
            className="flex justify-between items-center my-4 bg-[#edf5ff] rounded-xl  px-3 py-5"
          >
            <div className="flex items-center gap-5">
              {notification?.type === "product" ? (
                <>
                  <img
                    src={`${imageBaseUrl}${notification?.productId?.firstImage?.publicFileUrl}`}
                    alt={notification?.productId?.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <p>{notification?.message}</p>
                  {notification?.isParoved === "pending" ? (
                    <>
                      <button
                        onClick={() =>
                          handleProductDeny(notification?.productId?._id)
                        }
                        className="border-2 border-[#1E66CA] px-8 py-2 rounded-xl"
                      >
                        Deny
                      </button>
                      <button
                        onClick={() =>
                          handleProductApprove(notification?.productId?._id)
                        }
                        className="text-[white] bg-[#1E66CA] px-7 py-2 rounded-xl"
                      >
                        Approve
                      </button>
                    </>
                  ) : notification?.isParoved === "aproved" ? (
                    <button
                      disabled
                      className="text-[white] bg-[#1E66CA] px-7 py-2 rounded-xl"
                    >
                      Approved
                    </button>
                  ) : (
                    <button
                      disabled
                      className="border-2 border-[#1E66CA] px-8 py-2 rounded-xl"
                    >
                      Deny
                    </button>
                  )}
                </>
              ) : (
                <>
                  <img
                    src={driverImage}
                    alt="Driver"
                    className="w-12 h-12 rounded-full border border-blue-500"
                  />
                  <p>{notification?.message}</p>
                  {notification?.isParoved === "pending" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDriverDeny(notification?.userId?._id)
                        }
                        className="border-2 border-[#1E66CA] px-8 py-2 rounded-xl"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() =>
                          handleDriverApprove(notification?.userId?._id)
                        }
                        className="text-[white] bg-[#1E66CA] px-7 py-2 rounded-xl"
                      >
                        Accept
                      </button>
                    </>
                  ) : notification?.isParoved === "aproved" ? (
                    <button
                      disabled
                      className="text-[white] bg-[#1E66CA] px-7 py-2 rounded-xl"
                    >
                      Accepted
                    </button>
                  ) : (
                    <button
                      disabled
                      className="border-2 border-[#1E66CA] px-8 py-2 rounded-xl"
                    >
                      Rejected
                    </button>
                  )}
                </>
              )}
            </div>
            <p className="text-[#111111] opacity-[40%]">
              {getTimeAgo(notification?.createdAt)}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-white">
      {todayNotifications?.length > 0 &&
        renderNotifications(todayNotifications, "Today")}
      {yesterdayNotifications?.length > 0 &&
        renderNotifications(yesterdayNotifications, "Yesterday")}
      {olderNotifications?.length > 0 &&
        renderNotifications(olderNotifications, "Older")}
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={notifications?.length}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </div>
  );
};

export default Notification;
