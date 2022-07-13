import Model from '../model';
import View from '../view';

class Controller {
  private model: Model;
  private view: View;

  constructor() {
    this.model = new Model();
    this.view = new View();
    // this.model.getData = this.model.getData.bind(this.model);
    // this.view.drawCards = this.view.drawCards.bind(this.view);
  }

  public start() {
    this.model.getState((state) => {
      this.view.setCart(state);
      this.view.setFilters(state);
      // this.view.setRange(state);
      // this.view.setSort(state);
    });

    this.model.getData((data) => this.view.drawCards(data));

    this.view.addListeners(() => this.model.getData((data) => this.view.drawCards(data)));
  }
}

export default Controller;
