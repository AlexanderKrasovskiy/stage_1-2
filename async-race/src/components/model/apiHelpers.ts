import { Car, CarParams, RaceParams, WinnersParams, Winner } from '../types';

const HOST = 'http://127.0.0.1:3000';
export const MAX_CARS_ON_PAGE = 7;
export const MAX_WINNERS_ON_PAGE = 10;

export const getCars = async (page = 1, limit = MAX_CARS_ON_PAGE) => {
  const url = `${HOST}/garage/?_page=${page}&_limit=${limit}`;
  const res = await fetch(url);
  const carsArr = (await res.json()) as Car[];
  const totalCars = Number(res.headers.get('X-Total-Count'));
  return {
    cars: carsArr,
    total: totalCars,
  };
};

export const getCar = async (id: number) => {
  const url = `${HOST}/garage/${id}`;
  const res = await fetch(url);
  const car = (await res.json()) as Car;
  return car;
};

export const createCarReq = async (data: CarParams) => {
  const url = `${HOST}/garage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const newCar = (await res.json()) as Car;
  return newCar;
};

export const deleteCarReq = async (id: number) => {
  const url = `${HOST}/garage/${id}`;
  const res = await fetch(url, {
    method: 'DELETE',
  });
  if (res.ok) {
    return true;
  }
  return false;
};

export const updateCarReq = async (id: number, data: CarParams) => {
  const url = `${HOST}/garage/${id}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const updatedCar = (await res.json()) as Car;
  return updatedCar;
};

export const startEngineReq = async (id: number) => {
  const url = `${HOST}/engine/?id=${id}&status=started`;
  const res = await fetch(url, { method: 'PATCH' });
  const raceParams = (await res.json()) as RaceParams;
  return raceParams;
};

export const stopEngineReq = async (id: number) => {
  const url = `${HOST}/engine/?id=${id}&status=stopped`;
  const res = await fetch(url, { method: 'PATCH' });
  if (res.ok) return true;
  return false;
};

export const driveReq = async (id: number) => {
  const url = `${HOST}/engine/?id=${id}&status=drive`;
  const res = await fetch(url, {
    method: 'PATCH',
  });
  if (res.status === 200) {
    return { success: true, code: res.status };
  }
  return { success: false, code: res.status };
};

export const getWinnersReq = async ({ page, limit = MAX_WINNERS_ON_PAGE, sortBy, order }: WinnersParams) => {
  let url = `${HOST}/winners/?_page=${page}&_limit=${limit}`;
  if (sortBy && order) url += `&_sort=${sortBy}&_order=${order}`;

  const res = await fetch(url);
  const winnersArr = (await res.json()) as Winner[];
  const totalWinners = Number(res.headers.get('X-Total-Count'));

  const promises = winnersArr.map(async (winner) => {
    const car = await getCar(winner.id);
    const winnerWithCar = {
      ...winner,
      ...car,
    };
    return winnerWithCar;
  });

  const winnersWithCars = await Promise.all(promises);

  return {
    winners: winnersWithCars,
    total: totalWinners,
  };
};

export const getWinnerReq = async (id: number) => {
  const url = `${HOST}/winners/${id}`;
  const res = await fetch(url);
  const winner = (await res.json()) as Winner;
  return {
    winner,
    status: res.status,
  };
};

export const createWinnerReq = async (data: Winner) => {
  const url = `${HOST}/winners`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const newWinner = (await res.json()) as Winner;
  return newWinner;
};

export const deleteWinnerReq = async (id: number) => {
  const url = `${HOST}/winners/${id}`;
  const res = await fetch(url, {
    method: 'DELETE',
  });
  if (res.ok) return true;
  return false;
};

export const updateWinnerReq = async ({ id, wins, time }: Winner) => {
  const url = `${HOST}/winners/${id}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wins, time }),
  });
  const updatedWinner = (await res.json()) as Winner;
  return updatedWinner;
};
