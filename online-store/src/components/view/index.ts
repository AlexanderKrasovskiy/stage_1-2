import { State, Product } from '../types';

class View {
  _cardsContainer;

  constructor() {
    this._cardsContainer = document.querySelector('#products') as HTMLDivElement;
  }

  public setFilters(state: State | Record<string, string>) {
    const { filters } = state;
    console.log(filters);
  }

  // setSort(state) {}

  // setCart(state) {}

  public drawCards(productsArr: Product[]) {
    this._cardsContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    productsArr.forEach((el) => fragment.append(this.generateCard(el)));

    this._cardsContainer.append(fragment);
  }

  private generateCard(productInfo: Product) {
    const { name, storage, img, inStock, year, color, price } = productInfo;

    const card = this._createElement('div', 'card');

    // title
    const cardTitle = this._createElement('div', 'card__title');
    const cardName = this._createElement('span', 'card__name', name);
    const cardStorage = this._createElement('span', 'card__storage', storage + 'gb');
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
    const cardPrice = this._createElement('span', 'card__price', '$' + price);
    const btnClass = inStock ? 'card__btn' : 'card__btn card__btn-clicked';
    const btnText = inStock ? '+' : '-';
    const cardBtn = this._createElement('button', btnClass, btnText);
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
}

export default View;
