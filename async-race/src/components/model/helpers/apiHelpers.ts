import { Car, CarParams, RaceParams, WinnersParams, Winner } from '../../types';

const HOST = 'http://127.0.0.1:3000';
export const MAX_CARS_ON_PAGE = 7;
export const MAX_WINNERS_ON_PAGE = 10;

export const getCars = async (page = 1, limit = MAX_CARS_ON_PAGE) => {
  try {
    const url = `${HOST}/garage/?_page=${page}&_limit=${limit}`;
    const res = await fetch(url);
    const carsArr = (await res.json()) as Car[];
    const totalCars = Number(res.headers.get('X-Total-Count'));
    return {
      cars: carsArr,
      total: totalCars,
    };
  } catch (e) {
    console.error(e);
    return {
      cars: [],
      total: 0,
    };
  }
};

export const getCar = async (id: number) => {
  try {
    const url = `${HOST}/garage/${id}`;
    const res = await fetch(url);
    const car = (await res.json()) as Car;
    return car;
  } catch (e) {
    console.error(e);
    return { id: 0, name: '', color: '' };
  }
};

export const createCarReq = async (data: CarParams) => {
  try {
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
  } catch (e) {
    console.error(e);
    return { id: 0, name: '', color: '' };
  }
};

export const deleteCarReq = async (id: number) => {
  try {
    const url = `${HOST}/garage/${id}`;
    const res = await fetch(url, {
      method: 'DELETE',
    });
    if (res.ok) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const updateCarReq = async (id: number, data: CarParams) => {
  try {
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
  } catch (e) {
    console.error(e);
    return { id: 0, name: '', color: '' };
  }
};

export const startEngineReq = async (id: number) => {
  try {
    const url = `${HOST}/engine/?id=${id}&status=started`;
    const res = await fetch(url, { method: 'PATCH' });
    const raceParams = (await res.json()) as RaceParams;
    return raceParams;
  } catch (e) {
    console.error(e);
    return {
      velocity: 49,
      distance: 500000,
    };
  }
};

export const stopEngineReq = async (id: number) => {
  try {
    const url = `${HOST}/engine/?id=${id}&status=stopped`;
    const res = await fetch(url, { method: 'PATCH' });
    if (res.ok) return true;
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const driveReq = async (id: number) => {
  try {
    const url = `${HOST}/engine/?id=${id}&status=drive`;
    const res = await fetch(url, {
      method: 'PATCH',
    });
    if (res.status === 200) {
      return { success: true, code: res.status };
    }
    return { success: false, code: res.status };
  } catch (e) {
    console.error(e);
    return { success: false, code: 500 };
  }
};

export const getWinnersReq = async ({ page, limit = MAX_WINNERS_ON_PAGE, sortBy, order }: WinnersParams) => {
  try {
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
  } catch (e) {
    console.error(e);
    return {
      winners: [],
      total: 0,
    };
  }
};

export const getWinnerReq = async (id: number) => {
  try {
    const url = `${HOST}/winners/${id}`;
    const res = await fetch(url);
    const winner = (await res.json()) as Winner;
    return {
      winner,
      status: res.status,
    };
  } catch (e) {
    console.error(e);
    return {
      winner: { wins: 0, time: 100, id: 0 },
      status: 404,
    };
  }
};

export const createWinnerReq = async (data: Winner) => {
  try {
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
  } catch (e) {
    console.error(e);
    return { wins: 0, time: 100, id: 0 };
  }
};

export const deleteWinnerReq = async (id: number) => {
  try {
    const url = `${HOST}/winners/${id}`;
    const res = await fetch(url, {
      method: 'DELETE',
    });
    if (res.ok) return true;
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const updateWinnerReq = async ({ id, wins, time }: Winner) => {
  try {
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
  } catch (e) {
    console.error(e);
    return { wins: 0, time: 100, id: 0 };
  }
};
