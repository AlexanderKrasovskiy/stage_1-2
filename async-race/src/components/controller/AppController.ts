import { createElement } from '../view/helpers/renderHelpers';
import { AppView } from '../view/AppView';
import { GarageController } from './GarageController';
import { WinnersController } from './WinnersController';

export class AppController {
  root;
  appView;
  garageController;
  winnersController;

  constructor() {
    this.root = createElement('main');
    this.appView = new AppView(this.root);
    this.garageController = new GarageController(this.root);
    this.winnersController = new WinnersController(this.root);
  }

  switchToGarage() {
    this.winnersController.hide();
    this.garageController.show();
  }

  switchToWinners() {
    this.garageController.hide();
    this.winnersController.show();
  }

  start() {
    this.appView.bindSwitchToGarage(this.switchToGarage.bind(this));
    this.appView.bindSwitchToWinners(this.switchToWinners.bind(this));
  }
}
