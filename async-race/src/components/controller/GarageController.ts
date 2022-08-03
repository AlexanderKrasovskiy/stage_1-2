import { GarageView } from '../view/GarageView';
import { GarageModel } from '../model/GarageModel';

export class GarageController {
  view;
  model;

  constructor(rootElement: HTMLElement) {
    this.view = new GarageView(rootElement);
    this.model = new GarageModel();

    // bindidngs
    this.view.bindCreateCar(this.model.createCar.bind(this.model));
    this.view.bindDeleteCar(this.model.deleteCar.bind(this.model));
    this.view.bindUpdateCar(this.model.updateCar.bind(this.model));
    this.model.bindUpdateGarage(this.view.updateGarage.bind(this.view));

    // init
    this.model.initGarage(this.view.initGarage.bind(this.view));
  }

  public hide = () => {
    this.view.hideGarage();
  };

  public show = () => {
    this.view.showGarage();
  };
}
