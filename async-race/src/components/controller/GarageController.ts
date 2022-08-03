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
    this.view.bindNextPage(this.model.flipPage.bind(this.model));
    this.view.bindPrevPage(this.model.flipPage.bind(this.model));
    this.view.bindGenerateRandomCars(this.model.generateRandomCars.bind(this.model));
    this.view.bindStartEngine(this.model.startEngine.bind(this.model));
    this.view.bindDriveCar(this.model.drive.bind(this.model));
    this.view.bindStopEngine(this.model.stopEngine.bind(this.model));
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
