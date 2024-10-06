import { baseApi } from "../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatusData: builder.query({
      query: () => ({
        url: "/admin/getTotalOfTheDashboared",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes?.totalData,
    }),
    getRevenueChartData: builder.query({
      query: (year) => {
        return {
          url: `/admin/totalRevinew?year=${year}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response?.data?.attributes,
    }),
    getFeedBackRatio: builder.query({
      query: (year) => ({
        url: `/admin/feedbackRatio?year=${year}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getTodayOrders: builder.query({
      query: () => ({
        url: "/admin/todayorderDetailsinDashboared",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getSavenDaysOrderDetails : builder.query({
      query: () => ({
        url: `/admin/sevenDaysOrderDetailsinDashboared`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
    getTotalCostAndSell: builder.query({
      query: (year) => ({
        url: `/admin/totalCostAndSell?year=${year}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
  }),
});

export const {
  useGetStatusDataQuery,
  useGetRevenueChartDataQuery,
  useGetFeedBackRatioQuery,
  useGetTodayOrdersQuery,
  useGetSavenDaysOrderDetailsQuery,
  useGetTotalCostAndSellQuery,
} = dashboardApi;
