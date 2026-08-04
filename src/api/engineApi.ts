import { baseApi } from './baseApi';
import type { EngineStatus } from './types';

export const engineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    startEngine: builder.mutation<EngineStatus, number>({
      query: (id) => ({ url: `/engine?id=${id}&status=started`, method: 'PATCH' }),
    }),
    stopEngine: builder.mutation<EngineStatus, number>({
      query: (id) => ({ url: `/engine?id=${id}&status=stopped`, method: 'PATCH' }),
    }),
    drive: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({ url: `/engine?id=${id}&status=drive`, method: 'PATCH' }),
    }),
  }),
});

export const { useStartEngineMutation, useStopEngineMutation, useDriveMutation } = engineApi;
