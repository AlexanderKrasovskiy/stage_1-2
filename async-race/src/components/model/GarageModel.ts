import { getCars, createCarReq, deleteCarReq, updateCarReq } from './apiHelpers';
import { Car, RenderGarageParams, CarParams, UpdateViewHandler } from '../types';

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

  public async deleteCar(id: number) {
    await deleteCarReq(id);
    // await deleteWinnerReq;
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

  public bindUpdateGarage(callback: UpdateViewHandler) {
    this.updateGarageView = callback;
  }

  private async updateGarageState() {
    const { cars, total } = await getCars(this.carsPage);
    this.cars = cars;
    this.carsCount = total;
  }
}
