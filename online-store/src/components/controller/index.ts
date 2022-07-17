import { Model } from '../model';
import { View } from '../view';

import { importAll } from './loadImgs';

export class Controller {
  private model: Model;
  private view: View;

  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  public start() {
    this.model.getState((state) => {
      this.view.setCart(state);
      this.view.setFilters(state);
      this.view.setSort(state);
    });

    this.model.getData((data) => this.view.drawCards(data));

    this.view.addListeners(() => this.model.getData((data) => this.view.drawCards(data)));

    // Loads all images into dist
    importAll(require.context('../../assets/images/', true, /\.(png|svg|jpg|jpeg|gif)$/i));
  }
}
