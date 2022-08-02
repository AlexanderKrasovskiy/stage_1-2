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
  }

  switchToGarage = () => {
    // winnersController.hide()
    // garageController.show()
    console.log('garageController.getGarage()');
  };

  switchToWinners = () => {
    // await winnersController.getWinners()
    // garageController.hide()
    // winnersController.show()
    console.log('winnersController.getWinners()');
  };

  start = () => {
    this.appView.bindSwitchToGarage(this.switchToGarage);
    this.appView.bindSwitchToWinners(this.switchToWinners);
  };
}
