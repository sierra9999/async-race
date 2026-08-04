import { CAR_MAKES, HEX_COLOR_LENGTH } from '@/constants';

export interface RandomCar {
  name: string;
  color: string;
}
const HEX_CHARS = '0123456789abcdef'.split('');

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomHexColor(): string {
  let digits = '';
  for (let i = 0; i < HEX_COLOR_LENGTH; i += 1) {
    digits += pickRandom(HEX_CHARS);
  }
  return `#${digits}`;
}

export function generateRandomCars(count: number): RandomCar[] {
  const cars: RandomCar[] = [];
  for (let i = 0; i < count; i += 1) {
    const make = pickRandom(CAR_MAKES);
    cars.push({ name: `${make.brand} ${pickRandom(make.models)}`, color: randomHexColor() });
  }
  return cars;
}

export default generateRandomCars;
