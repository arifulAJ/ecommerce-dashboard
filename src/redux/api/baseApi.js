import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://dapperdriver.com:3030/api/v1', live
    baseUrl: 'https://ecommace-app.onrender.com/api/v1',
    // baseUrl: 'http://192.168.10.168:3030/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Boutiques","Shopper","Categories","PrivacyPolicy","Fee"],
  
  endpoints: () => ({}),
});