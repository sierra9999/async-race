export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}
