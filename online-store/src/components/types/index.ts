export type State = {
  filters: {
    brand: Set<string>;
    storage: Set<string>;
    color: Set<string>;
    inStock: boolean;
    price: {
      from: number;
      to: number;
    };
    year: {
      from: number;
      to: number;
    };
  };
  search: string;
  inCart: Set<number>;
  sortBy: string;
};

export type Callback<T> = (data: T) => void;

export type Product = {
  id: number;
  brand: string;
  name: string;
  color: string;
  img: string;
  storage: number;
  price: number;
  inStock: boolean;
  year: number;
};
