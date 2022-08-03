import {
  getCars,
  createCarReq,
  deleteCarReq,
  updateCarReq,
  MAX_CARS_ON_PAGE,
  startEngineReq,
  driveReq,
  stopEngineReq,
} from './apiHelpers';
import { Car, RenderGarageParams, CarParams, UpdateViewHandler } from '../types';
import { getRandomCarsArr } from './randomCarsHelpers';

const NUM_CARS_TO_GENERATE = 100;

export class GarageModel {
  updateGarageView: UpdateViewHandler;

  constructor(private carsPage = 1, private cars: Car[] = [], private carsCount = 0) {
    this.updateGarageView = () => {};
  }

  // private winnersPage = 1,
  // private winners: WinnerWithCar[] = [],
  // private winnersCount = 0,
  // private sortBy: 'wins' | 'time' | null = null,
  // private order: 'ASC' | 'DESC' | null = null

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
    // await deleteWinnerReq;
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
