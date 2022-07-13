import { Callback, Product } from '../types';
import data from './data.json';
import StateClass from './StateClass';

class Model {
  //private _state: State | Record<string, string>;
  private _state: StateClass;
  private _data: Product[];

  constructor() {
    this._state = StateClass.getInstance(); // LOCAL ST
    this._data = data;
  }

  public getState(callback: Callback<StateClass>) {
    callback(this._state);
  }

  public getData(callback: Callback<Product[]>) {
    this.filterData();
    callback(this._data);
  }

  private filterData() {
    if (!this._state.data.sortBy) {
      const sortedProducts = this._data.sort((a, b) => b.price - a.price);
      this._data = sortedProducts;
      // this._data = this._data.sort((a, b) => b.price - a.price);
      // add inCart prop
    }
  }
}

export default Model;
