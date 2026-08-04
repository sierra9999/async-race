import { useEffect } from 'react';
import { useGetCarsQuery } from '@/api/garageApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPage } from '@/store/garageUiSlice';
import { GARAGE_PAGE_SIZE } from '@/constants';
import type { Car } from '@/api/types';

interface GaragePageData {
  cars: Car[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
}

function useGaragePage(): GaragePageData {
  const page = useAppSelector((state) => state.garageUi.page);
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetCarsQuery(page);
  const cars = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / GARAGE_PAGE_SIZE));
  useEffect(() => {
    if (data !== undefined && page > totalPages) {
      dispatch(setPage(totalPages));
    }
  }, [data, page, totalPages, dispatch]);
  return { cars, total, page, totalPages, isLoading, isError };
}

export default useGaragePage;
