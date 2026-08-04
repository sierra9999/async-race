import { MS_PER_SECOND, TIME_DECIMALS } from '@/constants';

export function msToSeconds(ms: number): number {
  return Number((ms / MS_PER_SECOND).toFixed(TIME_DECIMALS));
}

export function formatSeconds(seconds: number): string {
  return seconds.toFixed(TIME_DECIMALS);
}

export default formatSeconds;
