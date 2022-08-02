import { getCars } from './apiHelpers';
import { Car, RenderGarageParams } from '../types';

export class GarageModel {
  constructor(
    private carsPage = 1,
    private cars: Car[] = [],
    private carsCount = 0, // private animation: Record<number, number> = {}, // private winnersPage = 1, // private winners: WinnerWithCar[] = [], // private winnersCount = 0, // private sortBy: 'wins' | 'time' | null = null,
  ) // private order: 'ASC' | 'DESC' | null = null,

  // private view: 'garage' | 'winners' = 'garage',
  {}

  public async updateGarage(renderGarage: (obj: RenderGarageParams) => void) {
    const { cars, total } = await getCars(this.carsPage);
    this.cars = cars;
    this.carsCount = total;
    // console.log('____before garage render!!!');
    renderGarage({
      carsArr: this.cars,
      count: this.carsCount,
      page: this.carsPage,
    });
  }
}
