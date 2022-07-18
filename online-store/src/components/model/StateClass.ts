import { State } from '../types';
import { makeDeepCopyWithSet } from '../../helpers';

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

export class StateClass {
  private static instance: StateClass;
  data: State;

  private constructor() {
    this.data = makeDeepCopyWithSet(defaultState);
  }

  public static getInstance(): StateClass {
    if (!StateClass.instance) {
      StateClass.instance = new StateClass();
    }

    return StateClass.instance;
  }

  public resetDataFilters() {
    const { filters, search } = makeDeepCopyWithSet(defaultState);
    this.data.filters = filters;
    this.data.search = search;
  }

  public setDefaultState() {
    this.data = makeDeepCopyWithSet(defaultState);
  }
}
