import { createElement } from '../view/viewHelpers';
import { AppView } from '../view/AppView';
import { GarageController } from './GarageController';

export class AppController {
  root;
  appView;
  garageController;

  constructor() {
    this.root = createElement('main');
    this.appView = new AppView(this.root);
    this.garageController = new GarageController(this.root);
    // this.winnersController = new winnersController(this.root);
  }

  switchToGarage = () => {
    // this.winnersController.hide()
    this.garageController.show();
  };

  switchToWinners = () => {
    // await this.winnersController.getWinners()
    this.garageController.hide();
    // this.winnersController.show()
  };

  start = () => {
    this.appView.bindSwitchToGarage(this.switchToGarage);
    this.appView.bindSwitchToWinners(this.switchToWinners);
  };
}
