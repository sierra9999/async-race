import { useCallback } from 'react';
import { store } from '@/store';
import { useAppDispatch } from '@/store/hooks';
import { setIsRacing, announceWinner, clearWinner, type CarRaceStatus } from '@/store/raceSlice';
import { msToSeconds } from '@/utils/formatTime';
import type { Car } from '@/api/types';
import useCarEngine from './useCarEngine';

const SETTLED_STATES: readonly CarRaceStatus[] = ['finished', 'broken'];

function carStatus(id: number): CarRaceStatus {
  return store.getState().race.carStates[id] ?? 'idle';
}

function allSettled(carIds: number[]): boolean {
  return carIds.every((id) => SETTLED_STATES.includes(carStatus(id)));
}

function finishRaceIfSettled(carIds: number[]): boolean {
  if (store.getState().race.isRacing && allSettled(carIds)) {
    store.dispatch(setIsRacing(false));
    return true;
  }
  return false;
}

function watchForRaceCompletion(carIds: number[]): void {
  const unsubscribe = store.subscribe(() => {
    const stillRacing = store.getState().race.isRacing;
    if (!stillRacing || finishRaceIfSettled(carIds)) {
      unsubscribe();
    }
  });
}

function recordWin(car: Car, durationMs: number): void {
  const timeSec = msToSeconds(durationMs);
  store.dispatch(announceWinner({ name: car.name, timeSec }));
}

function useRace(): {
  startRace: (cars: Car[]) => void;
  resetRace: (carIds: number[]) => Promise<void>;
} {
  const dispatch = useAppDispatch();
  const { start, stop } = useCarEngine();

  const startRace = useCallback(
    (cars: Car[]) => {
      dispatch(setIsRacing(true));
      dispatch(clearWinner());

      let won = false;

      cars.forEach((car) => {
        start(car.id, (durationMs) => {
          if (won) {
            return;
          }
          won = true;
          recordWin(car, durationMs);
        });
      });

      watchForRaceCompletion(cars.map((car) => car.id));
    },
    [dispatch, start],
  );

  const resetRace = useCallback(
    async (carIds: number[]): Promise<void> => {
      const carsToStop = carIds.filter((id) => carStatus(id) !== 'idle');
      await Promise.allSettled(carsToStop.map((id) => stop(id)));
      dispatch(clearWinner());
      dispatch(setIsRacing(false));
    },
    [dispatch, stop],
  );

  return { startRace, resetRace };
}

export default useRace;
