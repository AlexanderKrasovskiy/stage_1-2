export type Car = {
  id: number;
  name: string;
  color: string;
};

export type CarParams = {
  name: string;
  color: string;
};

export type RaceParams = {
  velocity: number;
  distance: number;
};

export type WinnersParams = {
  page: number;
  limit?: number;
  sortBy?: 'wins' | 'time';
  order?: 'ASC' | 'DESC';
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type WinnerWithCar = Car & Winner;

export type Handler = () => void;

export type RenderGarageParams = {
  carsArr: Car[];
  count: number;
  page: number;
};
