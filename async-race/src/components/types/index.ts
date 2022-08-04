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

export type RenderWinnersParams = {
  winners: WinnerWithCar[];
  total: number;
  page: number;
};

export type Handler = () => void;

export type CreateCarHandler = (x: CarParams) => void;

export type RenderGarageParams = {
  carsArr: Car[];
  count: number;
  page: number;
};

export type UpdateViewHandler = (x: RenderGarageParams) => void;

export interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  color: HTMLInputElement;
}

export type LiData = {
  id: number;
  name: string;
  color: string;
  selectBtn: HTMLButtonElement;
  deleteBtn: HTMLButtonElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
  svg: SVGElement;
  flag: HTMLSpanElement;
  animationID: number;
  // nameSpan: HTMLSpanElement;
};

type DriveResult = {
  success: boolean;
  code: number;
};

export type DriveHandler = (id: number) => Promise<DriveResult>;
