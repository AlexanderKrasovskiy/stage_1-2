import Model from '../model';
import View from '../view';

class Controller {
  private model: Model;
  private view: View;

  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  public start() {
    this.model.getState((state) => {
      this.view.setFilters(state);
      // this.view.setSort(state);
      // this.view.setCart(state);
    });

    this.model.getData((data) => this.view.drawCards(data));
  }
}

export default Controller;
