import { WinnersView } from '../view/WinnersView';
import { WinnersModel } from '../model/WinnersModel';

export class WinnersController {
  view;
  model;

  constructor(rootElement: HTMLElement) {
    this.view = new WinnersView(rootElement);
    this.model = new WinnersModel();

    this.view.bindHandleSort(this.handleSort.bind(this));
    this.view.bindHandleFlipPage(this.handleFlipPage.bind(this));
  }

  private async handleSort(by: 'wins' | 'time') {
    this.model.setSort(by);
    const res = await this.model.getWinners();
    this.view.renderWinners(res);
  }

  private async handleFlipPage(byNum: 1 | -1) {
    this.model.flipPage(byNum);
    const res = await this.model.getWinners();
    this.view.renderWinners(res);
  }

  public async show() {
    this.model.setSort(undefined);
    const res = await this.model.getWinners();
    this.view.renderWinners(res);
    this.view.showWinners();
  }

  public hide() {
    this.view.hideWinners();
  }
}
