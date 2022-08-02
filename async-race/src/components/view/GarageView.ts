import { createElement, createForm, createCarSvgText } from './viewHelpers';
import { RenderGarageParams, Car } from '../types';

export class GarageView {
  garageDiv;
  formCreate;
  formUpdate;
  raceStartBtn;
  raceResetBtn;
  generateCarsBtn;
  carsCountHeading;
  garagePage;
  carsList;
  prevPageBtn;
  nextPageBtn;
  modalWinner;

  constructor(rootElement: HTMLElement) {
    this.garageDiv = createElement('div', 'garage');
    rootElement.append(this.garageDiv);
    this.formCreate = createForm(false);
    this.formUpdate = createForm(true);
    this.raceStartBtn = createElement('button', 'btn btn-primary', 'RACE');
    this.raceResetBtn = createElement('button', 'btn', 'RESET', '', true);
    this.generateCarsBtn = createElement('button', 'btn btn-secondary', 'GENERATE CARS');
    this.carsCountHeading = createElement('h2');
    this.garagePage = createElement('h3');
    this.carsList = createElement('ul', 'cars__list');
    this.prevPageBtn = createElement('button', 'btn', 'PREV', '', true);
    this.nextPageBtn = createElement('button', 'btn', 'NEXT', '', true);
    this.modalWinner = createElement('div', 'modal__winner hidden');
  }

  renderGarage = ({ carsArr, count, page }: RenderGarageParams) => {
    const garageControls = createElement('div', 'garage__controls');
    const raceControls = createElement('div', 'race__controls');
    raceControls.append(this.raceStartBtn, this.raceResetBtn, this.generateCarsBtn);
    garageControls.append(this.formCreate, this.formUpdate, raceControls);

    this.carsCountHeading.innerText = `Garage (${count} cars)`;
    this.garagePage.innerText = `Page #${page}`;

    carsArr.forEach((car) => this.insertCarLi(car));

    const paginationDiv = createElement('div', 'pagination');
    if (count > 7) {
      this.nextPageBtn.classList.add('btn-primary');
      this.nextPageBtn.removeAttribute('disabled');
    }
    paginationDiv.append(this.prevPageBtn, this.nextPageBtn);

    this.garageDiv.append(
      garageControls,
      this.carsCountHeading,
      this.garagePage,
      this.carsList,
      paginationDiv,
      this.modalWinner,
    );
    // listeners later
  };

  insertCarLi(car: Car) {
    const { name, color } = car; // id
    const li = createElement('li', 'car__li');

    const selectCarBtn = createElement('button', 'btn btn-secondary', 'SELECT');
    const deleteCarBtn = createElement('button', 'btn btn-secondary', 'REMOVE');
    const carNameSpan = createElement('span', 'car__name', `${name}`);

    const carConfigDiv = createElement('div');
    carConfigDiv.append(selectCarBtn, deleteCarBtn, carNameSpan);

    const engineStartBtn = createElement('button', 'btn__start btn__start-active', '▶');
    const engineStopBtn = createElement('button', 'btn__stop', '■', '', true);
    const raceTrack = createElement('div', 'race__track');
    raceTrack.innerHTML = createCarSvgText(color);
    // const svg = raceTrack.lastChild as SVGElement;
    // svg.style.fill = '#ffffff';
    // svg.style.transform = 'translateX(200px)';

    // MEGA OBJ - {id: {id, btns, nameSpan, svg, animationID}}
    const finishFlagSpan = createElement('span', 'finish__flag', '🏁');
    raceTrack.prepend(engineStartBtn, engineStopBtn, finishFlagSpan);

    li.append(carConfigDiv, raceTrack);
    this.carsList.append(li);
  }

  hideGarage() {
    this.garageDiv.classList.add('hidden');
  }

  showGarage() {
    this.garageDiv.classList.remove('hidden');
  }
}
