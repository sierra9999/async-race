import { baseApi } from './baseApi';
import type { Winner } from './types';

interface WinnerInput {
  id: number;
  wins: number;
  time: number;
}

// eslint-disable-next-line import/prefer-default-export -- one endpoints slice
export const winnersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWinner: builder.query<Winner, number>({
      query: (id) => `/winners/${id}`,
      providesTags: ['Winners'],
    }),
    createWinner: builder.mutation<Winner, WinnerInput>({
      query: (body) => ({ url: '/winners', method: 'POST', body }),
      invalidatesTags: ['Winners'],
    }),
    updateWinner: builder.mutation<Winner, WinnerInput>({
      query: ({ id, wins, time }) => ({
        url: `/winners/${id}`,
        method: 'PUT',
        body: { wins, time },
      }),
      invalidatesTags: ['Winners'],
    }),
  }),
});
