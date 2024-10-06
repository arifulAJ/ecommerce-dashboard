import { baseApi } from "../../api/baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivecyPolicy: builder.query({
      query: () => ({
        url: "/user/privecyPolicy",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes[0],
      providesTags: ["PrivacyPolicy"],
    }),
    updatePrivacyPolicy: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/user/updateTermsOfUse?id=${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["PrivacyPolicy"],
    }),
    getDeliveryAndServiceFee: builder.query({
      query: () => ({
        url: "/admin/showDeliveryCharge",
        method: "GET",
      }),
      providesTags: ["Fee"],
    }),
    updateDeliveryAndServiceFee: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/updateDeliveryCharge?id=${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Fee"],
    }),
  }),
});

export const {
  useGetPrivecyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetDeliveryAndServiceFeeQuery,
  useUpdateDeliveryAndServiceFeeMutation,
} = settingApi;
