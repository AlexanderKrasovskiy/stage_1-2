import { Product } from '../types';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import {
  StateClass,
  DEFAULT_PRICE_FROM,
  DEFAULT_PRICE_TO,
  DEFAULT_YEAR_FROM,
  DEFAULT_YEAR_TO,
} from '../model/StateClass';

const MAX_CART_SIZE = 20;

export class View {
  _cardsContainer;
  priceSlider;
  yearSlider;
  brandApple;
  brandGoogle;
  brandOneplus;
  storage64;
  storage128;
  storage256;
  storage512;
  colorWhite;
  colorBlack;
  colorGreen;
  filterInStock;
  resetBtn;
  searchInput;
  searchClearBtn;
  sortBySelect;
  cartCount;
  clearStorage;

  constructor() {
    this._cardsContainer = document.querySelector('#products_container') as HTMLDivElement;

    this.brandApple = document.querySelector('#brands_apple') as HTMLInputElement;
    this.brandGoogle = document.querySelector('#brands_google') as HTMLInputElement;
    this.brandOneplus = document.querySelector('#brands_oneplus') as HTMLInputElement;

    this.storage64 = document.querySelector('#storage_64gb') as HTMLInputElement;
    this.storage128 = document.querySelector('#storage_128gb') as HTMLInputElement;
    this.storage256 = document.querySelector('#storage_256gb') as HTMLInputElement;
    this.storage512 = document.querySelector('#storage_512gb') as HTMLInputElement;

    this.colorWhite = document.querySelector('#color_options_item_white') as HTMLInputElement;
    this.colorBlack = document.querySelector('#color_options_item_black') as HTMLInputElement;
    this.colorGreen = document.querySelector('#color_options_item_green') as HTMLInputElement;

    this.filterInStock = document.querySelector('#filters_instock') as HTMLInputElement;

    this.priceSlider = document.querySelector('#filters_price_slider') as noUiSlider.target;
    this.yearSlider = document.querySelector('#filters_year_slider') as noUiSlider.target;

    this.resetBtn = document.querySelector('#reset_btn') as HTMLButtonElement;
    this.clearStorage = document.querySelector('#clear_storage_btn') as HTMLButtonElement;

    this.searchInput = document.querySelector('#search_input') as HTMLInputElement;
    this.searchClearBtn = document.querySelector('#search_clear_btn') as HTMLSpanElement;

    this.sortBySelect = document.querySelector('#sort_by') as HTMLSelectElement;

    this.cartCount = document.querySelector('#cart_count') as HTMLSpanElement;

    this._drawRange();
  }

  private _drawRange() {
    noUiSlider.create(this.priceSlider, {
      start: [DEFAULT_PRICE_FROM, DEFAULT_PRICE_TO],
      connect: true,
      range: {
        min: DEFAULT_PRICE_FROM,
        max: DEFAULT_PRICE_TO,
      },
      step: 100,
      tooltips: {
        to: function (numericValue) {
          return numericValue.toFixed();
        },
      },
      margin: 200,
    });

    noUiSlider.create(this.yearSlider, {
      start: [DEFAULT_YEAR_FROM, DEFAULT_YEAR_TO],
      connect: true,
      range: {
        min: DEFAULT_YEAR_FROM,
        max: DEFAULT_YEAR_TO,
      },
      step: 1,
      tooltips: {
        to: function (numericValue) {
          return numericValue.toFixed();
        },
      },
    });
  }

  public setFilters(state: StateClass) {
    const { brand, storage, color, inStock, price, year } = state.data.filters;

    if (brand.size) {
      if (brand.has('apple')) this.brandApple.checked = true;
      if (brand.has('google')) this.brandGoogle.checked = true;
      if (brand.has('oneplus')) this.brandOneplus.checked = true;
    }
    if (storage.size) {
      if (storage.has('64gb')) this.storage64.checked = true;
      if (storage.has('128gb')) this.storage128.checked = true;
      if (storage.has('256gb')) this.storage256.checked = true;
      if (storage.has('512gb')) this.storage512.checked = true;
    }
    if (color.size) {
      if (color.has('white')) this.colorWhite.checked = true;
      if (color.has('black')) this.colorBlack.checked = true;
      if (color.has('green')) this.colorGreen.checked = true;
    }
    this.filterInStock.checked = inStock;
    if (price.from > DEFAULT_PRICE_FROM || price.to < DEFAULT_PRICE_TO)
      this.priceSlider.noUiSlider?.set([price.from, price.to]);
    if (year.from > DEFAULT_YEAR_FROM || year.to < DEFAULT_YEAR_TO)
      this.yearSlider.noUiSlider?.set([year.from, year.to]);
  }

  public setSort(state: StateClass) {
    const { sortBy } = state.data;
    if (sortBy) {
      this.sortBySelect.value = sortBy;
    }
  }

  public setCart(state: StateClass) {
    const { inCart } = state.data;
    const size = inCart.size;

    if (size === 0) {
      this.cartCount.classList.remove('cart__count-active');
    } else {
      this.cartCount.classList.add('cart__count-active');
      this.cartCount.innerText = String(size);
    }
  }

  public drawCards(productsArr: Product[]) {
    this._cardsContainer.innerHTML = '';

    if (productsArr.length) {
      const fragment = document.createDocumentFragment();
      productsArr.forEach((el) => fragment.append(this.generateCard(el)));
      this._cardsContainer.append(fragment);
    } else {
      const h2 = document.createElement('h2');
      h2.innerText = 'Извините, совпадений не обнаружено';
      this._cardsContainer.append(h2);
    }
  }

  private generateCard(productInfo: Product) {
    const { name, storage, img, inStock, year, color, price, id } = productInfo;
    const instance = StateClass.getInstance();
    const inCart = instance.data.inCart.has(id);

    // card
    const card = this._createElement('div', 'card');
    !inStock ? (card.style.opacity = '0.5') : '';

    // title
    const cardTitle = this._createElement('div', 'card__title');
    const cardName = this._createElement('span', 'card__name', name);
    const cardStorage = this._createElement('span', 'card__storage', `${storage}gb`);
    cardTitle.append(cardName, cardStorage);

    // img
    const cardImg = this._createElement('div', 'card__img');
    cardImg.style.backgroundImage = `url('./assets/icons/${img}')`;

    // tags
    const cardTags = this._createElement('div', 'card__tags');
    const inStockText = inStock ? 'In Stock' : 'Out of Stock';
    const inStockTag = this._createElement('span', 'tag tag__instock', inStockText);
    const yearTag = this._createElement('span', 'tag tag__year', String(year));
    const colorTag = this._createElement('span', 'tag tag__color', color);
    cardTags.append(inStockTag, yearTag, colorTag);

    // cardFooter
    const cardFooter = this._createElement('div', 'card__footer');
    const cardPrice = this._createElement('span', 'card__price', `$${price}`);

    const btnClass = !inStock || inCart ? 'card__btn card__btn-clicked' : 'card__btn';
    const btnText = !inStock || inCart ? '-' : '+';
    const cardBtn = this._createElement('button', btnClass, btnText);

    if (inStock) this.addBtnHandler(cardBtn, id);

    cardFooter.append(cardPrice, cardBtn);

    // combine elements
    card.append(cardTitle, cardImg, cardTags, cardFooter);

    return card;
  }

  private _createElement(tag: string, className = '', text = '') {
    const el = document.createElement(tag);
    el.className = className;
    el.innerText = text;
    return el;
  }

  private addBtnHandler(btn: HTMLElement, productId: number) {
    btn.addEventListener('click', () => {
      const instance = StateClass.getInstance();

      const cartSize = instance.data.inCart.size;
      const inCart = instance.data.inCart.has(productId);

      if (cartSize === MAX_CART_SIZE && !inCart) {
        this.showAlert();
        return;
      }

      if (inCart) {
        instance.data.inCart.delete(productId);
        btn.classList.remove('card__btn-clicked');
        btn.innerText = '+';
      } else {
        instance.data.inCart.add(productId);
        btn.classList.add('card__btn-clicked');
        btn.innerText = '-';
      }
      this.setCart(instance);
    });
  }

  private showAlert() {
    const alert = this._createElement('div', 'alert', 'Извините, все слоты заполнены');
    const btn = this._createElement('span', 'alert__btn', '+');

    btn.addEventListener(
      'click',
      () => {
        alert.remove();
      },
      { once: true },
    );

    alert.append(btn);
    document.body.append(alert);

    setTimeout(() => {
      alert.classList.add('alert-active');
    }, 0);

    setTimeout(() => {
      alert.classList.remove('alert-active');
    }, 2400);

    setTimeout(() => {
      alert.remove();
    }, 2800);
  }

  public addListeners(redraw: () => void) {
    this.addFilterOptionsListener(this.brandApple, redraw);
    this.addFilterOptionsListener(this.brandGoogle, redraw);
    this.addFilterOptionsListener(this.brandOneplus, redraw);

    this.addFilterOptionsListener(this.storage64, redraw);
    this.addFilterOptionsListener(this.storage128, redraw);
    this.addFilterOptionsListener(this.storage256, redraw);
    this.addFilterOptionsListener(this.storage512, redraw);

    this.addFilterOptionsListener(this.colorWhite, redraw);
    this.addFilterOptionsListener(this.colorBlack, redraw);
    this.addFilterOptionsListener(this.colorGreen, redraw);

    this.addInStockListener(this.filterInStock, redraw);

    this.addRangeListener(this.priceSlider, 'price', redraw);
    this.addRangeListener(this.yearSlider, 'year', redraw);

    this.addResetListener(redraw);
    this.addClearStorageListener(redraw);

    this.addSearchInputListener(redraw);
    this.addSearchClearListener(redraw);

    this.addSortByListener(redraw);
  }

  private addFilterOptionsListener(element: HTMLInputElement, redraw: () => void) {
    element.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const instance = StateClass.getInstance();

      const groupName = target.name as 'brand' | 'storage' | 'color';

      if (target.checked) {
        instance.data.filters[groupName].add(target.value);
      } else {
        instance.data.filters[groupName].delete(target.value);
      }
      redraw();
    });
  }

  private addInStockListener(element: HTMLInputElement, redraw: () => void) {
    element.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const instance = StateClass.getInstance();

      if (target.checked) {
        instance.data.filters.inStock = true;
      } else {
        instance.data.filters.inStock = false;
      }
      redraw();
    });
  }

  private addRangeListener(slider: noUiSlider.target, type: 'price' | 'year', redraw: () => void) {
    slider.noUiSlider?.on('change', function () {
      const instance = StateClass.getInstance();
      const [from, to] = slider.noUiSlider?.get(true) as number[];

      instance.data.filters[type].from = from;
      instance.data.filters[type].to = to;
      redraw();
    });
  }

  private addResetListener(redraw: () => void) {
    this.resetBtn.addEventListener('click', () => {
      // Reset state (filters & search)
      const instance = StateClass.getInstance();
      instance.resetDataFilters();
      // Reset sliders
      this.priceSlider.noUiSlider?.reset();
      this.yearSlider.noUiSlider?.reset();
      // Clear input
      this.searchInput.value = '';

      redraw();
    });
  }

  private addClearStorageListener(redraw: () => void) {
    this.clearStorage.addEventListener('click', () => {
      // Clear storage
      localStorage.removeItem('catalogState');

      // Set default state
      const instance = StateClass.getInstance();
      instance.setDefaultState();
      // Reset all controls
      this.brandApple.checked = false;
      this.brandGoogle.checked = false;
      this.brandOneplus.checked = false;

      this.storage64.checked = false;
      this.storage128.checked = false;
      this.storage256.checked = false;
      this.storage512.checked = false;

      this.colorWhite.checked = false;
      this.colorBlack.checked = false;
      this.colorGreen.checked = false;

      this.filterInStock.checked = false;

      this.priceSlider.noUiSlider?.set([DEFAULT_PRICE_FROM, DEFAULT_PRICE_TO]);
      this.yearSlider.noUiSlider?.set([DEFAULT_YEAR_FROM, DEFAULT_YEAR_TO]);

      this.sortBySelect.value = 'price-high';

      this.cartCount.classList.remove('cart__count-active');
      this.cartCount.innerText = '';

      this.searchInput.value = '';

      redraw();
    });
  }

  private addSearchInputListener(redraw: () => void) {
    this.searchInput.addEventListener('input', (evt) => {
      const instance = StateClass.getInstance();
      const { value } = evt.target as HTMLInputElement;
      instance.data.search = value;

      if (value.length > 0) {
        this.searchClearBtn.classList.add('search__clear-active');
      } else {
        this.searchClearBtn.classList.remove('search__clear-active');
      }

      redraw();
    });
  }

  private addSearchClearListener(redraw: () => void) {
    this.searchClearBtn.addEventListener('click', () => {
      const instance = StateClass.getInstance();
      instance.data.search = '';
      this.searchInput.value = '';

      this.searchClearBtn.classList.remove('search__clear-active');

      redraw();
    });
  }

  private addSortByListener(redraw: () => void) {
    this.sortBySelect.addEventListener('change', (evt) => {
      const instance = StateClass.getInstance();
      const { value } = evt.target as HTMLSelectElement;
      instance.data.sortBy = value;
      redraw();
    });
  }
}
