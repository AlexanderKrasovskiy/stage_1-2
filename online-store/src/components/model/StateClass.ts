import { State } from '../types';
import { makeDeepCopyWithSet } from '../../helpers';

export const DEFAULT_PRICE_FROM = 300;
export const DEFAULT_PRICE_TO = 1300;
export const DEFAULT_YEAR_FROM = 2019;
export const DEFAULT_YEAR_TO = 2022;

const DEFAULT_STATE: State = {
  filters: {
    brand: new Set(),
    storage: new Set(),
    color: new Set(),
    inStock: false,
    price: {
      from: DEFAULT_PRICE_FROM,
      to: DEFAULT_PRICE_TO,
    },
    year: {
      from: DEFAULT_YEAR_FROM,
      to: DEFAULT_YEAR_TO,
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
    this.data = makeDeepCopyWithSet(DEFAULT_STATE);
  }

  public static getInstance(): StateClass {
    if (!StateClass.instance) {
      StateClass.instance = new StateClass();
    }

    return StateClass.instance;
  }

  public resetDataFilters() {
    const { filters, search } = makeDeepCopyWithSet(DEFAULT_STATE);
    this.data.filters = filters;
    this.data.search = search;
  }

  public setDefaultState() {
    this.data = makeDeepCopyWithSet(DEFAULT_STATE);
  }
}
