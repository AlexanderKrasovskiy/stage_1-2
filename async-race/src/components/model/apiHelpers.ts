import { Car, CarParams, RaceParams, WinnersParams, Winner } from '../types';

const HOST = 'http://127.0.0.1:3000';
export const MAX_CARS_ON_PAGE = 7;
const MAX_WINNERS_ON_PAGE = 10;

//
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
// getCars().then(console.log).catch(console.error);

// 200 - {Car} / 404 NOT FOUND - {}
export const getCar = async (id: number) => {
  const url = `${HOST}/garage/${id}`;
  const res = await fetch(url);
  const car = (await res.json()) as Car;
  return car;
};
// getCar(1).then(console.log).catch(console.error);
// getCar(20).then(console.log).catch(console.error);

// 200 - {Car}
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
// createCar({ name: 'Maybach', color: 'VeryBlack' }).then(console.log).catch(console.error);

// 200 - {} / 404 - {}
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
// deleteCar(6).then(console.log).catch(console.error);
// deleteCar(6).then(console.log).catch(console.error);

// 200 - {Car} / 404 - {}
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
// updateCar(1, { name: 'TETRIS', color: '#660099' }).then(console.log).catch(console.error);

// 200 OK {raceParams} / 400 Wrong Params / 404 Not Found
export const startEngineReq = async (id: number) => {
  const url = `${HOST}/engine/?id=${id}&status=started`;
  const res = await fetch(url, { method: 'PATCH' });
  const raceParams = (await res.json()) as RaceParams;
  return raceParams;
};
// startEngine(1).then(console.log).catch(console.error);

// 200 OK {raceParams} / 400 Wrong Params / 404 Not Found
// !!!___ enable STOP only after res from START
export const stopEngineReq = async (id: number) => {
  const url = `${HOST}/engine/?id=${id}&status=stopped`;
  const res = await fetch(url, { method: 'PATCH' });
  if (res.ok) return true;
  return false;
};
// stopEngine(1).then(console.log).catch(console.error);

// 200 OK { success: true } / 500 engine broken
// 400 Wrong Params / 404 Not Found (first set start)
// 429 drive in progress (no multi drive req)
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
// startEngine(1).then(() => drive(1)).then(console.log).catch(console.error);

// 200 OK - {id, wins, time} -> { ..., color, name }
export const getWinners = async ({ page, limit = MAX_WINNERS_ON_PAGE, sortBy, order }: WinnersParams) => {
  let url = `${HOST}/winners/?_page=${page}&_limit=${limit}`;
  if (sortBy && order) url += `&_sort=${sortBy}&_order=${order}`;
  // let url = `${HOST}/winners/?_page=${String(page)}&_limit=${String(limit)}`;
  // if (sortBy && order) url += `&_sort=${String(sortBy)}&_order=${String(order)}`;

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
// getWinners({ page: 1 }).then(console.log).catch(console.error);

// 200 OK - {id, wins, time} / 404 Not Found - {}
export const getWinner = async (id: number) => {
  const url = `${HOST}/winners/${id}`;
  const res = await fetch(url);
  const winner = (await res.json()) as Winner;
  return winner;
};
// getWinner(10).then(console.log).catch(console.error);

// ? m.b. FN getWinnerStatus

// 201 CREATED - {id, wins, time} / 500 Duplicate ID
export const createWinner = async (data: Winner) => {
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
// createWinner({ id: 2, wins: 1, time: 7.77 }).then(console.log).catch(console.error);

// 200 OK - {} / 404 Not Found - {}
export const deleteWinner = async (id: number) => {
  const url = `${HOST}/winners/${id}`;
  const res = await fetch(url, {
    method: 'DELETE',
  });
  if (res.ok) return true;
  return false;
};
// deleteWinner(2).then(console.log).catch(console.error);

// 200 OK - {} / 404 Not Found - {}
export const updateWinner = async ({ id, wins, time }: Winner) => {
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
// updateWinner({ id: 8, wins: 3, time: 42 }).then(console.log).catch(console.error);
