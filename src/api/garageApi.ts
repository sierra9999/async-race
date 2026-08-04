import { GARAGE_PAGE_SIZE } from '@/constants';
import { baseApi } from './baseApi';
import { withPageTotal } from './pagination';
import { isNotFoundError } from './errors';
import type { Car, PagedResult } from './types';

export interface CarInput {
  name: string;
  color: string;
}

export interface UpdateCarInput extends CarInput {
  id: number;
}

export const garageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<PagedResult<Car>, number>({
      query: (page) => `/garage?_page=${page}&_limit=${GARAGE_PAGE_SIZE}`,
      transformResponse: (cars: Car[], meta) => withPageTotal(cars, meta),
      providesTags: ['Cars'],
    }),
    createCar: builder.mutation<Car, CarInput>({
      query: (body) => ({ url: '/garage', method: 'POST', body }),
      invalidatesTags: ['Cars'],
    }),
    updateCar: builder.mutation<Car, UpdateCarInput>({
      query: ({ id, ...body }) => ({ url: `/garage/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Cars'],
    }),
    deleteCar: builder.mutation<{ id: number }, number>({
      queryFn: async (id, _queryApi, _extraOptions, baseQuery) => {
        const garageResult = await baseQuery({ url: `/garage/${id}`, method: 'DELETE' });
        if (garageResult.error) {
          return { error: garageResult.error };
        }
        const winnersResult = await baseQuery({ url: `/winners/${id}`, method: 'DELETE' });
        if (winnersResult.error && !isNotFoundError(winnersResult.error)) {
          return { error: winnersResult.error };
        }
        return { data: { id } };
      },
      invalidatesTags: ['Cars', 'Winners'],
    }),
  }),
});

export const { useGetCarsQuery, useCreateCarMutation, useUpdateCarMutation, useDeleteCarMutation } =
  garageApi;
