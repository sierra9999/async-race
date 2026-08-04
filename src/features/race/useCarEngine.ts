import { useCallback } from 'react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { store } from '@/store';
import { setCarState, bumpGeneration } from '@/store/raceSlice';
import { useStartEngineMutation, useDriveMutation } from '@/api/engineApi';
import { HTTP_INTERNAL_ERROR } from '@/constants';
import { startCarAnimation, stopCarAnimation } from './animation';

function currentGeneration(id: number): number {
  return store.getState().race.generation[id] ?? 0;
}

function bumpAndCaptureGeneration(id: number): number {
  store.dispatch(bumpGeneration(id));
  return currentGeneration(id);
}
type DriveMutation = ReturnType<typeof useDriveMutation>[0];

function isEngineBrokenError(error: FetchBaseQueryError): boolean {
  if (error.status === HTTP_INTERNAL_ERROR) {
    return true;
  }
  return error.status === 'PARSING_ERROR' && error.originalStatus === HTTP_INTERNAL_ERROR;
}

function handleDrive(id: number, generation: number, drive: DriveMutation): void {
  drive(id)
    .unwrap()
    .catch((error: FetchBaseQueryError) => {
      if (currentGeneration(id) !== generation) {
        return;
      }
      if (isEngineBrokenError(error)) {
        stopCarAnimation(id);
        store.dispatch(setCarState({ id, status: 'broken' }));
      }
    });
}

function handleAnimationFinish(
  id: number,
  generation: number,
  durationMs: number,
  onFinish?: (durationMs: number) => void,
): void {
  if (currentGeneration(id) !== generation) {
    return;
  }
  onFinish?.(durationMs);
  store.dispatch(setCarState({ id, status: 'finished' }));
}

function handleStartResponse(
  id: number,
  generation: number,
  drive: DriveMutation,
  onFinish: ((durationMs: number) => void) | undefined,
  velocity: number,
  distance: number,
): void {
  if (currentGeneration(id) !== generation) {
    return;
  }
  const durationMs = distance / velocity;
  store.dispatch(setCarState({ id, status: 'driving' }));
  startCarAnimation(id, durationMs, () =>
    handleAnimationFinish(id, generation, durationMs, onFinish),
  );
  handleDrive(id, generation, drive);
}

function handleStartFailure(id: number, generation: number): void {
  if (currentGeneration(id) !== generation) {
    return;
  }
  store.dispatch(setCarState({ id, status: 'idle' }));
}

function useCarEngine(): {
  start: (id: number, onFinish?: (durationMs: number) => void) => void;
} {
  const [startEngine] = useStartEngineMutation();
  const [drive] = useDriveMutation();
  const start = useCallback(
    (id: number, onFinish?: (durationMs: number) => void) => {
      store.dispatch(setCarState({ id, status: 'starting' }));
      const generation = bumpAndCaptureGeneration(id);
      startEngine(id)
        .unwrap()
        .then(({ velocity, distance }) => {
          handleStartResponse(id, generation, drive, onFinish, velocity, distance);
        })
        .catch(() => {
          handleStartFailure(id, generation);
        });
    },
    [startEngine, drive],
  );
  return { start };
}

export default useCarEngine;
