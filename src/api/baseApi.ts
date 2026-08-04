import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DEFAULT_API_BASE_URL } from '@/constants';
// eslint-disable-next-line import/prefer-default-export -- one shared api instance
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
  }),
  tagTypes: ['Cars', 'Winners'],
  endpoints: () => ({}),
});
