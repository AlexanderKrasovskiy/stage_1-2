import {
  getCars,
  createCarReq,
  deleteCarReq,
  updateCarReq,
  MAX_CARS_ON_PAGE,
  startEngineReq,
  driveReq,
  stopEngineReq,
  getWinnerReq,
  updateWinnerReq,
  createWinnerReq,
  deleteWinnerReq,
} from './apiHelpers';
import { Car, RenderGarageParams, CarParams, UpdateViewHandler } from '../types';
import { getRandomCarsArr } from './randomCarsHelpers';

const NUM_CARS_TO_GENERATE = 100;

export class GarageModel {
  updateGarageView: UpdateViewHandler;

  constructor(private carsPage = 1, private cars: Car[] = [], private carsCount = 0) {
    this.updateGarageView = () => {};
  }

  public async initGarage(renderView: (obj: RenderGarageParams) => void) {
    await this.updateGarageState();

    renderView({
      carsArr: this.cars,
      count: this.carsCount,
      page: this.carsPage,
    });
  }

  public async createCar(props: CarParams) {
    await createCarReq(props);
    await this.updateGarageState();

    this.updateGarageView({
      carsArr: this.cars,
      count: this.carsCount,
      page: this.carsPage,
    });
  }

  public async generateRandomCars(count = NUM_CARS_TO_GENERATE) {
    const carsArr = getRandomCarsArr(count);
    await Promise.all(carsArr.map((c) => createCarReq(c)));

    await this.updateGarageState();

    this.updateGarageView({
      carsArr: this.cars,
      count: this.carsCount,
      page: this.carsPage,
    });
  }

  public async deleteCar(id: number) {
    await deleteCarReq(id);
    await deleteWinnerReq(id);

    const prevPage = this.carsPage - 1;
    if (prevPage * MAX_CARS_ON_PAGE === this.carsCount - 1 && this.carsPage > 1) {
      this.carsPage = prevPage;
    }

    await this.updateGarageState();

    this.updateGarageView({
      carsArr: this.cars,
      count: this.carsCount,
      page: this.carsPage,
    });
  }

  public async updateCar({ id, name, color }: Car) {
    await updateCarReq(id, { name, color });
    await this.updateGarageState();

    this.updateGarageView({
      carsArr: this.cars,
      count: this.carsCount,
      page: this.carsPage,
    });
  }

  public async startEngine(id: number) {
    const raceParams = await startEngineReq(id);
    return raceParams;
  }

  public async drive(id: number) {
    const result = await driveReq(id);
    return result;
  }

  public async stopEngine(id: number) {
    const result = await stopEngineReq(id);
    return result;
  }

  public async postWinner(id: number, timeMs: number) {
    const { winner, status } = await getWinnerReq(id);
    if (status === 200) {
      const newWinsCount = winner.wins + 1;
      const newTime = timeMs / 1000 < winner.time ? timeMs / 1000 : winner.time;
      await updateWinnerReq({ id, wins: newWinsCount, time: newTime });
    } else {
      await createWinnerReq({ id, wins: 1, time: timeMs / 1000 });
    }
  }

  public async flipPage(val: number) {
    this.carsPage += val;
    await this.updateGarageState();

    this.updateGarageView({
      carsArr: this.cars,
      count: this.carsCount,
      page: this.carsPage,
    });
  }

  public bindUpdateGarage(callback: UpdateViewHandler) {
    this.updateGarageView = callback;
  }

  private async updateGarageState() {
    const { cars, total } = await getCars(this.carsPage);
    this.cars = cars;
    this.carsCount = total;
  }
}
