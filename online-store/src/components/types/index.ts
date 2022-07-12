export type State = {
  filters: {
    brand: string[];
    storage: number[];
    color: string[];
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
  inCart: number[];
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
