import { TIME_DECIMALS } from '@/constants';

export function formatSeconds(seconds: number): string {
  return seconds.toFixed(TIME_DECIMALS);
}

export default formatSeconds;
