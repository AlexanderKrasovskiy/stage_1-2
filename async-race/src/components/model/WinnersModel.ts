import { getWinnersReq } from './apiHelpers';
import { WinnerWithCar } from '../types';

export class WinnersModel {
  constructor(
    private winnersPage = 1,
    private sortBy: 'wins' | 'time' | undefined = undefined,
    private order: 'ASC' | 'DESC' | undefined = undefined,
    private winners: WinnerWithCar[] = [],
    private winnersCount = 0,
  ) {}

  public async getWinners() {
    await this.updateWinnersState();
    // console.log('PAGE in GetWinners in Model after Update', this.winnersPage);
    return {
      winners: this.winners,
      total: this.winnersCount,
      page: this.winnersPage,
      order: this.order,
      sortBy: this.sortBy,
    };
  }

  public setSort(by: 'wins' | 'time' | undefined) {
    this.sortBy = by;
    this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
    // console.log('SORT BY: ', by);
  }

  public flipPage(byNum: 1 | -1) {
    this.winnersPage += byNum;
    // console.log('PAGE in FLIP in Model', this.winnersPage);
  }

  private async updateWinnersState() {
    const { winners, total } = await getWinnersReq({
      page: this.winnersPage,
      sortBy: this.sortBy,
      order: this.order,
    });

    this.winners = winners;
    this.winnersCount = total;
  }
}
