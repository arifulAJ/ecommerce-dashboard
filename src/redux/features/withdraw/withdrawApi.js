import { baseApi } from "../../api/baseApi";

const withdrawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWithdraw: builder.query({
      query: ({
        page,
        userName,
        date,
      }) => {
        const params = new URLSearchParams();
        if (page) {
          params.append("page", page);
        }
        if (userName) {
          params.append("userName", userName);
        }
        if (date) params.append("date", date);
        return {
          url: "/withdrow/showAllWithdrowInAdmin",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Withdraw"],
    }),
    approvedWithdraw: builder.mutation({
      query: (id) => ({
        url: `/withdrow/withdrowAccept?id=${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Withdraw"],
    }),
    cancelWithdraw: builder.mutation({
      query: (id) => ({
        url: `/withdrow/withdrowcancel?id=${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Withdraw"],
    }),
  }),
});
export const {
  useGetWithdrawQuery,
  useApprovedWithdrawMutation,
  useCancelWithdrawMutation,
} = withdrawApi;
