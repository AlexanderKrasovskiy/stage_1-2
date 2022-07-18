import { Callback, Product, State } from '../types';
import productsData from './data.json';
import { StateClass } from './StateClass';
import { stringifyJsonWithSet, parseJsonWithSet } from '../../helpers';

export class Model {
  private _state: StateClass;
  private _data: Product[];

  constructor() {
    this._state = StateClass.getInstance();
    this._data = productsData;
    this.addStorageHandler();
  }

  public getState(callback: Callback<StateClass>) {
    callback(this._state);
  }

  public getData(callback: Callback<Product[]>) {
    const filteredResult = this.filterData();
    callback(filteredResult);
  }

  private filterData() {
    let filteredResult: Product[] = [];

    filteredResult = this.handleSortBy();
    filteredResult = this.filterByBrand(filteredResult);
    filteredResult = this.filterByStorage(filteredResult);
    filteredResult = this.filterByColor(filteredResult);
    filteredResult = this.filterInStock(filteredResult);
    filteredResult = this.filterByPrice(filteredResult);
    filteredResult = this.filterByYear(filteredResult);
    filteredResult = this.filterBySearch(filteredResult);

    return filteredResult;
  }

  private handleSortBy() {
    const sortBy = this._state.data.sortBy;

    if (sortBy === 'price-low') return this._data.sort((a, b) => a.price - b.price);
    if (sortBy === 'name-a')
      return this._data.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    if (sortBy === 'name-z')
      return this._data.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });

    return this._data.sort((a, b) => b.price - a.price);
  }

  private filterByBrand(productsArr: Product[]) {
    const brandsArr = Array(...this._state.data.filters.brand);
    if (brandsArr.length === 0 || brandsArr.length === 3) return productsArr;

    return productsArr.filter((el) => brandsArr.includes(el.brand.toLowerCase()));
  }

  private filterByStorage(productsArr: Product[]) {
    const storageArr = Array(...this._state.data.filters.storage);
    if (storageArr.length === 0 || storageArr.length === 4) return productsArr;

    return productsArr.filter((el) => storageArr.includes(`${el.storage}gb`));
  }

  private filterByColor(productsArr: Product[]) {
    const colorsArr = Array(...this._state.data.filters.color);
    if (colorsArr.length === 0 || colorsArr.length === 3) return productsArr;

    return productsArr.filter((el) => colorsArr.includes(el.color));
  }

  private filterInStock(productsArr: Product[]) {
    const inStockOnly = this._state.data.filters.inStock;
    if (!inStockOnly) return productsArr;

    return productsArr.filter((el) => el.inStock);
  }

  private filterByPrice(productsArr: Product[]) {
    const { from, to } = this._state.data.filters.price;
    if (from === 300 && to === 1300) return productsArr;

    return productsArr.filter((el) => el.price >= from && el.price <= to);
  }

  private filterByYear(productsArr: Product[]) {
    const { from, to } = this._state.data.filters.year;
    if (from === 2019 && to === 2022) return productsArr;

    return productsArr.filter((el) => el.year >= from && el.year <= to);
  }

  private filterBySearch(productsArr: Product[]) {
    const searchText = this._state.data.search;
    if (!searchText) return productsArr;

    return productsArr.filter((el) => el.name.toLowerCase().includes(searchText.toLowerCase()));
  }

  public addStorageHandler() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('catalogState', stringifyJsonWithSet(this._state.data));
    });

    if (localStorage.getItem('catalogState') !== null) {
      const savedDataJson = localStorage.getItem('catalogState') as string;
      const savedStateData: State = parseJsonWithSet(savedDataJson);

      this._state.data = savedStateData;
    }
  }
}
