import { useEffect, useMemo } from 'react';
import { useGetWinnersQuery } from '@/api/winnersApi';
import { useGetCarsByIdsQuery } from '@/api/garageApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPage } from '@/store/winnersUiSlice';
import { WINNERS_PAGE_SIZE } from '@/constants';
import type { Car, Winner } from '@/api/types';

interface WinnersPageData {
  winners: Winner[];
  carsById: Record<number, Car>;
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
}

function useClampPage(page: number, totalPages: number, isLoaded: boolean): void {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoaded && page > totalPages) {
      dispatch(setPage(totalPages));
    }
  }, [isLoaded, page, totalPages, dispatch]);
}

function useWinnersPage(): WinnersPageData {
  const { page, sortBy, order } = useAppSelector((state) => state.winnersUi);
  const { data, isLoading, isError } = useGetWinnersQuery({ page, sort: sortBy, order });

  const winnerItems = data?.items;
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / WINNERS_PAGE_SIZE));

  useClampPage(page, totalPages, data !== undefined);

  const winnerIds = useMemo(
    () => (winnerItems ?? []).map((winner) => winner.id).sort((a, b) => a - b),
    [winnerItems],
  );
  const { data: carsById = {} } = useGetCarsByIdsQuery(winnerIds, { skip: winnerIds.length === 0 });

  return { winners: winnerItems ?? [], carsById, total, page, totalPages, isLoading, isError };
}

export default useWinnersPage;
