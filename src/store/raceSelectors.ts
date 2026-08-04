import type { RootState } from './index';
import type { CarRaceStatus } from './raceSlice';

export type PageRaceStatus = 'idle' | 'racing' | 'finished';

const IN_MOTION: readonly CarRaceStatus[] = ['starting', 'driving', 'stopping'];

function selectPageRaceStatus(state: RootState, carIds: number[]): PageRaceStatus {
  const { carStates } = state.race;
  const statusOf = (id: number): CarRaceStatus => carStates[id] ?? 'idle';
  if (carIds.some((id) => IN_MOTION.includes(statusOf(id)))) {
    return 'racing';
  }
  if (carIds.every((id) => statusOf(id) === 'idle')) {
    return 'idle';
  }
  return 'finished';
}

export default selectPageRaceStatus;
