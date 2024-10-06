import { baseApi } from "../../api/baseApi";

const driversApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDrivers: builder.query({
            query: (page) => ({
                url: `/admin/showAllDriverInDashboared?page=${page}`,
                method: "GET",
            }),
            transformResponse: (response) => response?.data?.attributes,
        }),
        getSingleDriver: builder.query({
            query: (id) => ({
                url: `/admin/showDriverDetails?id=${id}`,
                method: "GET",
            }),
            transformResponse: (response) => response?.data?.attributes,
        }),
        getDriverDashboard: builder.query({
            query: () => ({
                url: `/admin/driverDashboared`,
                method: "GET",
            }),
            transformResponse: (response) => response?.data?.attributes,
        })
    }),
});

export const { useGetDriversQuery, useGetSingleDriverQuery , useGetDriverDashboardQuery} = driversApi;
