import { State, Callback, Product } from '../types';
import data from './data.json';

class Model {
  private _state: State | Record<string, string>;
  private _data: Product[];

  constructor() {
    this._state = {}; // LOCAL ST
    this._data = data;
  }

  public getState(callback: Callback<State | Record<string, string>>) {
    callback(this._state);
  }

  public getData(callback: Callback<Product[]>) {
    this.filterData();
    callback(this._data);
  }

  private filterData() {
    if (!this._state.sortBy) {
      const sortedProducts = this._data.sort((a, b) => b.price - a.price);
      this._data = sortedProducts;
      // this._data = this._data.sort((a, b) => a.price - b.price);
    }
  }
}

export default Model;

// ___ STATE ___
// {
//   filters: {
//     brand: [],
//     storage: [],
//     color: [],
//     inStock: false,
//     price: {
//      from: 300,
//      to: 1300
//     },
//     year: {
//       from: 2019,
//       to: 2022
//     }
//   },
//   search: null,
//   inCart: [],
//   sortBy: ''
// }
