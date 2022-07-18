import { Model } from './index';
import { StateClass } from './StateClass';

jest.spyOn(Model.prototype, 'addStorageHandler').mockImplementation(() => {});

const model = new Model();
const instance = StateClass.getInstance();
const mockProductArr = [
  {
    id: 11,
    brand: 'Google',
    name: 'Google Pixel 6',
    color: 'white',
    img: 'pixel-6-white.jpg',
    storage: 256,
    price: 699,
    inStock: true,
    year: 2021,
  },
  {
    id: 14,
    brand: 'Apple',
    name: 'Apple iPhone 13 Pro',
    color: 'black',
    img: '13pro-black.jpg',
    storage: 512,
    price: 1299,
    inStock: true,
    year: 2022,
  },
  {
    id: 22,
    brand: 'OnePlus',
    name: 'OnePlus 8T',
    color: 'green',
    img: '8t-green.jpg',
    storage: 256,
    price: 599,
    inStock: false,
    year: 2019,
  },
];

beforeEach(() => {
  model['_data'] = mockProductArr;
});

afterEach(() => {
  instance.setDefaultState();
});

describe('Model.filterByBrand(mockProductArr)', () => {
  it('returns an array', () => {
    expect(model['filterByBrand'](mockProductArr)).toBeInstanceOf(Array);
  });

  it('should return an array of Google products', () => {
    instance.data.filters.brand.add('google');
    const expected = mockProductArr[0];
    expect(model['filterByBrand'](mockProductArr)).toEqual([expected]);
  });
});

describe('Model.filterByStorage(mockProductArr)', () => {
  it('should return an array of 512gb products', () => {
    instance.data.filters.storage.add('512gb');
    const expected = mockProductArr[1];
    expect(model['filterByStorage'](mockProductArr)).toEqual([expected]);
  });

  it('should return 2 results when filter is set to 256gb', () => {
    instance.data.filters.storage.add('256gb');
    expect(model['filterByStorage'](mockProductArr).length).toBe(2);
  });
});

describe('Model.filterByColor(mockProductArr)', () => {
  it('should return an array of green and white products', () => {
    instance.data.filters.color.add('green');
    instance.data.filters.color.add('white');
    const expected = [mockProductArr[0], mockProductArr[2]];
    expect(model['filterByColor'](mockProductArr)).toEqual(expected);
  });
});

describe('Model.filterInStock(mockProductArr)', () => {
  it('should return an array of inStock products', () => {
    instance.data.filters.inStock = true;
    const expected = [mockProductArr[0], mockProductArr[1]];
    expect(model['filterInStock'](mockProductArr)).toEqual(expected);
  });
});

describe('Model.filterByPrice(mockProductArr)', () => {
  it('should return an array of products above $1000', () => {
    instance.data.filters.price.from = 1000;
    const expected = [mockProductArr[1]];
    expect(model['filterByPrice'](mockProductArr)).toEqual(expected);
  });
});

describe('Model.filterByYear(mockProductArr)', () => {
  it('should return array of products produced in 2019', () => {
    instance.data.filters.year.to = 2019;
    const expected = [mockProductArr[2]];
    expect(model['filterByYear'](mockProductArr)).toEqual(expected);
  });
});

describe('Model.filterBySearch(mockProductArr)', () => {
  it('should return an array of products, matching "13 pro"', () => {
    instance.data.search = '13 pro';
    const expected = [mockProductArr[1]];
    expect(model['filterBySearch'](mockProductArr)).toEqual(expected);
  });
});

describe('Model.handleSortBy()', () => {
  it('should return array of products sorted by name (A-Z)', () => {
    instance.data.sortBy = 'name-a';
    const expected = [mockProductArr[1], mockProductArr[0], mockProductArr[2]];
    expect(model['handleSortBy']()).toEqual(expected);
  });
});
