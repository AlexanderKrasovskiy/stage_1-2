import { GarageView } from '../view/GarageView';
import { GarageModel } from '../model/GarageModel';
import { CarParams, RenderGarageParams } from '../types';

export class GarageController {
  view;
  model;

  constructor(rootElement: HTMLElement) {
    // this.root = rootElement;
    this.view = new GarageView(rootElement);
    this.model = new GarageModel();

    // bindidngs
    this.view.bindCreateCar(this.handleCreateCar);
    this.view.bindDeleteCar(this.model.deleteCar);
    this.model.bindUpdateGarage(this.handleUpdateGarage);

    // init
    this.model.initGarage(this.view.initGarage);
  }

  handleCreateCar = async (props: CarParams) => {
    await this.model.createCar(props);
  };

  handleUpdateGarage = (props: RenderGarageParams) => {
    this.view.updateGarage(props);
  };

  hide = () => {
    this.view.hideGarage();
  };

  show = () => {
    this.view.showGarage();
  };
}
