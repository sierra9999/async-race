export const DEFAULT_API_BASE_URL = 'http://127.0.0.1:3000';

export const GARAGE_PAGE_SIZE = 7;

export const WINNERS_PAGE_SIZE = 10;

export const ROUTES = {
  GARAGE: '/',
  WINNERS: '/winners',
} as const;

export const RANDOM_CARS_COUNT = 100;

export const DEFAULT_CAR_COLOR = '#000000';

export const CAR_NAME_MAX_LENGTH = 30;

export const HTTP_NOT_FOUND = 404;

export const HTTP_INTERNAL_ERROR = 500;

export const CAR_MAKES = [
  {
    brand: 'Tesla',
    models: [
      'Model S',
      'Model 3',
      'Model X',
      'Model Y',
      'Cybertruck',
      'Roadster',
      'Semi',
      'Plaid',
      'Long Range',
      'Performance',
    ],
  },
  { brand: 'BMW', models: ['M3', 'M5', 'M8', 'X1', 'X3', 'X5', 'X7', 'i4', 'i8', 'Z4'] },
  {
    brand: 'Mercedes',
    models: [
      'A-Class',
      'C-Class',
      'E-Class',
      'S-Class',
      'GLA',
      'GLB',
      'GLC',
      'GLE',
      'AMG GT',
      'EQS',
    ],
  },
  {
    brand: 'Ford',
    models: [
      'Mustang',
      'Focus',
      'Fiesta',
      'Explorer',
      'Bronco',
      'Ranger',
      'Escape',
      'Edge',
      'Puma',
      'Kuga',
    ],
  },
  { brand: 'Audi', models: ['A3', 'A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'R8', 'TT'] },
  {
    brand: 'Toyota',
    models: [
      'Corolla',
      'Camry',
      'Supra',
      'Yaris',
      'RAV4',
      'Prius',
      'Hilux',
      'Auris',
      'Avensis',
      'Aygo',
    ],
  },
  {
    brand: 'Honda',
    models: [
      'Civic',
      'Accord',
      'Jazz',
      'CR-V',
      'HR-V',
      'NSX',
      'Insight',
      'Legend',
      'Prelude',
      'S2000',
    ],
  },
  {
    brand: 'Volkswagen',
    models: [
      'Golf',
      'Passat',
      'Polo',
      'Tiguan',
      'Touareg',
      'Arteon',
      'T-Roc',
      'Jetta',
      'Scirocco',
      'Caddy',
    ],
  },
  {
    brand: 'Nissan',
    models: [
      'Altima',
      'GT-R',
      'Leaf',
      'Micra',
      'Juke',
      'Qashqai',
      'X-Trail',
      '370Z',
      'Navara',
      'Sentra',
    ],
  },
  {
    brand: 'Porsche',
    models: [
      '911',
      '718',
      'Cayenne',
      'Macan',
      'Panamera',
      'Taycan',
      'Boxster',
      'Cayman',
      'Carrera',
      'Targa',
    ],
  },
  {
    brand: 'Subaru',
    models: [
      'Impreza',
      'WRX',
      'Outback',
      'Forester',
      'Legacy',
      'BRZ',
      'Levorg',
      'Ascent',
      'Crosstrek',
      'Baja',
    ],
  },
] as const;

export const HEX_COLOR_LENGTH = 6;

export const MS_PER_SECOND = 1000;

export const TIME_DECIMALS = 2;
