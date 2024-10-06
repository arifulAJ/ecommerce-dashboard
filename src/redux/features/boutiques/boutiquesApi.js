import { baseApi } from "../../api/baseApi";

const boutiquesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoutiques: builder.query({
      query: ({ month, year, page }) => {
        const params = new URLSearchParams();
        if (month) {
          params.append("month", month);
        }
        if (year) {
          params.append("year", year);
        }
        if (page) {
          params.append("page", page);
        }

        return {
          url: `/admin/getAllBoutiqueForAdmin`,
          method: "GET",
          params,
        };
      },
      providesTags: ["Boutiques"],
      transformResponse: (response) => ({
        data: response?.data?.attributes,
        meta: response?.pagination?.attributes,
      }),
    }),
    getSingleBoutique: builder.query({
      query: (id) => ({
        url: `/admin/boutiqueDetails?id=${id}`,
        method: "GET",
      }),
      providesTags: ["Boutiques"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    addBoutiques: builder.mutation({
      query: (data) => ({
        url: `/admin/addBoutique`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Boutiques"],
    }),
    updateBoutique: builder.mutation({
      query: (data) => ({
        url: `/admin/updateProfileOfboutiqueInDashboared`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Boutiques"],
    }),
    sendFeedBackBoutique: builder.mutation({
      query: (data) => ({
        url: `/admin/sendFeedback`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Boutiques"],
    }),
    updateBoutiquePercentage: builder.mutation({
      query: (data) => ({
        url: `/admin/addPresentageForBoutique`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Boutiques"],
    }),
    updateBoutiquePromotionImage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/addPromotionImageForBoutiqu?id=${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Boutiques"],
    }),
    deleteBoutique: builder.mutation({
      query: (id) => ({
        url: `/admin/deleteBoutique?id=${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Boutiques"],
    }),
    addBoutiqueProduct : builder.mutation({
      query:(fromData)=>({
        url:"/admin/productCreateFromAdmin",
        method: "POST",
        body: fromData
      }),
      invalidatesTags: ["Boutiques"],
    }),
    getBoutiqueProduct: builder.query({
      query: (id)=>({
        url:`/admin/showProductById?productId=${id}`,
        method: "GET",
      }),
      providesTags:["Boutiques"]
    }),
    updateBoutiqueProduct: builder.mutation({
      query:(data)=>({
        url: "/admin/productUpdateForAdmin",
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["Boutiques"],
    }),
    deleteBoutiqueProduct : builder.mutation({
      query: (id)=>({
        url: `/admin/deleteProductForAdmin?id=${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Boutiques"],
    }),


  }),
});

export const {
  useGetBoutiquesQuery,
  useGetSingleBoutiqueQuery,
  useUpdateBoutiqueMutation,
  useAddBoutiquesMutation,
  useSendFeedBackBoutiqueMutation,
  useUpdateBoutiquePercentageMutation,
  useUpdateBoutiquePromotionImageMutation,
  useDeleteBoutiqueMutation,
  useAddBoutiqueProductMutation,
  useDeleteBoutiqueProductMutation,
  useGetBoutiqueProductQuery,
  useUpdateBoutiqueProductMutation
} = boutiquesApi;
