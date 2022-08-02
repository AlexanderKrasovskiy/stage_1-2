import { GarageView } from '../view/GarageView';
import { GarageModel } from '../model/GarageModel';

export class GarageController {
  garageView;
  garageModel;

  constructor(rootElement: HTMLElement) {
    // this.root = rootElement;
    this.garageView = new GarageView(rootElement);
    this.garageModel = new GarageModel();

    this.garageModel.updateGarage(this.garageView.renderGarage);
  }

  hide = () => {
    this.garageView.hideGarage();
  };

  show = () => {
    this.garageView.showGarage();
  };
}
