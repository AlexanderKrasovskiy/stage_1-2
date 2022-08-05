import { createElement, getTbody } from './renderHelpers';
import { RenderWinnersParams } from '../types';
import { MAX_WINNERS_ON_PAGE } from '../model/apiHelpers';

export class WinnersView {
  winnersDiv;
  // prevPageBtn;
  // nextPageBtn;
  sortByModel: (x: 'wins' | 'time') => void;
  flipPageByModel: (x: 1 | -1) => void;

  constructor(rootElement: HTMLElement) {
    this.winnersDiv = createElement('div', 'winners hidden');
    rootElement.append(this.winnersDiv);

    // this.prevPageBtn = createElement('button', 'btn', 'PREV', '', true);
    // this.nextPageBtn = createElement('button', 'btn', 'NEXT', '', true);

    this.sortByModel = () => {};
    this.flipPageByModel = () => {};
  }

  public renderWinners({ winners, total, page, order, sortBy }: RenderWinnersParams) {
    this.winnersDiv.innerHTML = '';

    const winnersCountHeading = createElement('h2', '', `Winners (${total})`);
    const pageCountHeading = createElement('h3', '', `Page #${page}`);

    const table = createElement('table');
    const thead = this.getThead(order, sortBy);
    const tbody = getTbody(winners, page);
    table.append(thead, tbody);

    const paginationDiv = createElement('div', 'pagination');

    const prevPageBtn = createElement('button', 'btn', 'PREV');
    const nextPageBtn = createElement('button', 'btn', 'NEXT');

    prevPageBtn.addEventListener('click', () => {
      this.flipPageByModel(-1);
    });

    nextPageBtn.addEventListener('click', () => {
      this.flipPageByModel(1);
    });

    this.handlePaginationStyles(total, page, prevPageBtn, nextPageBtn);

    paginationDiv.append(prevPageBtn, nextPageBtn);

    this.winnersDiv.append(winnersCountHeading, pageCountHeading, table, paginationDiv);
  }

  public bindHandleFlipPage(callback: (x: 1 | -1) => void) {
    this.flipPageByModel = callback;
  }

  private handlePaginationStyles(count: number, page: number, prevPageBtn: HTMLElement, nextPageBtn: HTMLElement) {
    if (page === 1) {
      prevPageBtn.setAttribute('disabled', '');
      prevPageBtn.classList.remove('btn-primary');
    } else {
      prevPageBtn.removeAttribute('disabled');
      prevPageBtn.classList.add('btn-primary');
    }
    if (count <= MAX_WINNERS_ON_PAGE || page * MAX_WINNERS_ON_PAGE >= count) {
      nextPageBtn.setAttribute('disabled', '');
      nextPageBtn.classList.remove('btn-primary');
    } else {
      nextPageBtn.removeAttribute('disabled');
      nextPageBtn.classList.add('btn-primary');
    }
  }

  private getThead(order: 'ASC' | 'DESC' | undefined, sortBy: 'wins' | 'time' | undefined) {
    const thead = createElement('thead', 'table__head');

    const tr = createElement('tr');
    const numHeading = createElement('th', '', '№');
    const carHeading = createElement('th', '', 'Car');
    const nameHeading = createElement('th', '', 'Name');

    let winsArrow = '';
    if (sortBy === 'wins' && order === 'ASC') winsArrow = ' ↑';
    if (sortBy === 'wins' && order === 'DESC') winsArrow = ' ↓';
    const winsHeading = createElement('th', 'pointer', `Wins${winsArrow}`);
    winsHeading.addEventListener('click', () => {
      this.sortByModel('wins');
    });

    let timeArrow = '';
    if (sortBy === 'time' && order === 'ASC') timeArrow = ' ↑';
    if (sortBy === 'time' && order === 'DESC') timeArrow = ' ↓';
    const timeHeading = createElement('th', 'pointer', `Best time${timeArrow}`);
    timeHeading.addEventListener('click', () => {
      this.sortByModel('time');
    });

    tr.append(numHeading, carHeading, nameHeading, winsHeading, timeHeading);
    thead.append(tr);

    return thead;
  }

  public bindHandleSort(callback: (x: 'wins' | 'time') => void) {
    this.sortByModel = callback;
  }

  public showWinners() {
    this.winnersDiv.classList.remove('hidden');
  }

  public hideWinners() {
    this.winnersDiv.classList.add('hidden');
  }
}
