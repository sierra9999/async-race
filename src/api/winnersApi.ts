import { WINNERS_PAGE_SIZE } from '@/constants';
import { baseApi } from './baseApi';
import { withPageTotal } from './pagination';
import type { PagedResult, Winner } from './types';

export type WinnerSortField = 'id' | 'wins' | 'time';
export type WinnerSortOrder = 'ASC' | 'DESC';

interface GetWinnersArgs {
  page: number;
  sort: WinnerSortField;
  order: WinnerSortOrder;
}

interface WinnerInput {
  id: number;
  wins: number;
  time: number;
}

export const winnersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWinners: builder.query<PagedResult<Winner>, GetWinnersArgs>({
      query: ({ page, sort, order }) =>
        `/winners?_page=${page}&_limit=${WINNERS_PAGE_SIZE}&_sort=${sort}&_order=${order}`,
      transformResponse: (winners: Winner[], meta) => withPageTotal(winners, meta),
      providesTags: ['Winners'],
    }),
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

export const { useGetWinnersQuery } = winnersApi;
