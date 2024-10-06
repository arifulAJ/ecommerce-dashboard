import { baseApi } from "../../api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (page) => ({
        url: `/notifaction/adminNotifaction?page=${page}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes || [],
    }),
    approvedDriverNotifications: builder.mutation({
      query: (id) => ({
        url: `/notifaction/adminAprovedDriver?id=${id}`,
        method: "PATCH",
      }),
    }),
    denyDriverNotifications: builder.mutation({
      query: (id) => ({
        url: `/notifaction/adminDenayDriver?id=${id}`,
        method: "PATCH",
      }),
    }),
    approvedProductNotification: builder.mutation({
      query: (id) => ({
        url: `/notifaction/adminAprovedProduct?id=${id}`,
        method: "PATCH",
      }),
    }),
    denyProductNotification: builder.mutation({
      query: (id) => ({
        url: `/notifaction/adminDenayProduct?id=${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useApprovedDriverNotificationsMutation,
  useDenyDriverNotificationsMutation,
  useApprovedProductNotificationMutation,
  useDenyProductNotificationMutation,
} = notificationApi;
