import { baseApi } from "../../api/baseApi";

const shopperApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShopperByOrder: builder.query({
      query: (page) => ({
        url: `/admin/getShoperByOrder?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Shopper"],
      transformResponse: (response) => ({
        data: response?.data?.attributes,
      }),
    }),
    getShoppers: builder.query({
      query: () => ({
        url: `/admin/getAllShopper`,
        method: "GET",
      }),
      providesTags: ["Shopper"],
      transformResponse: (response) => ({
        data: response?.data?.attributes,
        meta: response?.pagination?.attributes,
      }),
    }),
    getShopperDetails: builder.query({
      query:(id)=>({
        url:`/admin/showShopperDetails?id=${id}`,
        method: "GET"
      })
    }),
    blockAndUnblock: builder.mutation({
      query: (id) => ({
        url: `/admin/blocakShopper?id=${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Shopper"],
      transformResponse: (response) => response?.data?.attributes,
    }),
  }),
});

export const {
  useGetShopperByOrderQuery,
  useGetShoppersQuery,
  useBlockAndUnblockMutation,
  useGetShopperDetailsQuery
} = shopperApi;
