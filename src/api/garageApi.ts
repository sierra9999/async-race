import { GARAGE_PAGE_SIZE } from '@/constants';
import { baseApi } from './baseApi';
import { withPageTotal } from './pagination';
import type { Car, PagedResult } from './types';

export const garageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<PagedResult<Car>, number>({
      query: (page) => `/garage?_page=${page}&_limit=${GARAGE_PAGE_SIZE}`,
      transformResponse: (cars: Car[], meta) => withPageTotal(cars, meta),
      providesTags: ['Cars'],
    }),
  }),
});
export const { useGetCarsQuery } = garageApi;
