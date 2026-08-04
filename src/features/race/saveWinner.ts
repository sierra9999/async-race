import { store } from '@/store';
import { winnersApi } from '@/api/winnersApi';
import { isNotFoundError } from '@/api/errors';
import type { Winner } from '@/api/types';

async function createWinnerRow(carId: number, timeSec: number): Promise<void> {
  await store
    .dispatch(winnersApi.endpoints.createWinner.initiate({ id: carId, wins: 1, time: timeSec }))
    .unwrap();
}

async function updateWinnerRow(existing: Winner, timeSec: number): Promise<void> {
  await store
    .dispatch(
      winnersApi.endpoints.updateWinner.initiate({
        id: existing.id,
        wins: existing.wins + 1,
        time: Math.min(existing.time, timeSec),
      }),
    )
    .unwrap();
}

async function saveWinner(carId: number, timeSec: number): Promise<void> {
  const lookup = store.dispatch(
    winnersApi.endpoints.getWinner.initiate(carId, { forceRefetch: true }),
  );
  try {
    const existing = await lookup.unwrap();
    await updateWinnerRow(existing, timeSec);
  } catch (error) {
    if (isNotFoundError(error)) {
      await createWinnerRow(carId, timeSec).catch(() => undefined);
      return;
    }
  } finally {
    lookup.unsubscribe();
  }
}

export default saveWinner;
