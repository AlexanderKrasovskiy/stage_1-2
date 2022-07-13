import { State } from '../types';

const defaultState: State = {
  filters: {
    brand: new Set(),
    storage: new Set(),
    color: new Set(),
    inStock: false,
    price: {
      from: 300,
      to: 1300,
    },
    year: {
      from: 2019,
      to: 2022,
    },
  },
  search: '',
  inCart: new Set(),
  sortBy: '',
};

class StateClass {
  private static instance: StateClass;
  data: State;

  private constructor() {
    this.data = defaultState;
  }

  public static getInstance(): StateClass {
    if (!StateClass.instance) {
      StateClass.instance = new StateClass();
    }

    return StateClass.instance;
  }

  public resetDataFilters() {
    this.data.filters = {
      brand: new Set(),
      storage: new Set(),
      color: new Set(),
      inStock: false,
      price: {
        from: 300,
        to: 1300,
      },
      year: {
        from: 2019,
        to: 2022,
      },
    };
    this.data.search = '';
  }

  public setDefaultState() {
    this.data = defaultState;
  }
}

export default StateClass;
