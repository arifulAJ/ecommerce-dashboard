import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategories: builder.mutation({
      query: (formdata) => ({
        url: "/product/createCatery",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["Categories"],
    }),
    getCategories: builder.query({
      query: (page) => ({
        url: `/product/getallCategory?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    getSingleCategories: builder.query({
      query: (id) => ({
        url: `/product/getCategoryById?id=${id}`,
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    updateCategories: builder.mutation({
      query: ({ formdata, id }) => ({
        url: `/product/updateCategory?id=${id}`,
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategories: builder.mutation({
      query: (id) => ({
        url: `/product/categoryDeleted?categoryId=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useAddCategoriesMutation,
  useGetCategoriesQuery,
  useGetSingleCategoriesQuery,
  useUpdateCategoriesMutation,
  useDeleteCategoriesMutation,
} = categoryApi;
