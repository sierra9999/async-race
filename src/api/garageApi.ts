import { GARAGE_PAGE_SIZE } from '@/constants';
import { baseApi } from './baseApi';
import { withPageTotal } from './pagination';
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
  }),
});

export const { useGetCarsQuery, useCreateCarMutation, useUpdateCarMutation } = garageApi;
