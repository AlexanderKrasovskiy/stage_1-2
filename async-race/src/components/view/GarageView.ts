import { createElement, createForm, createCarSvgText } from './renderHelpers';
import { RenderGarageParams, Car, CreateCarHandler, FormElements, LiData, RaceParams, DriveHandler } from '../types';
import { MAX_CARS_ON_PAGE } from '../model/apiHelpers';
import { startAnimation } from './animationHelpers';

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
  cars: Record<string, LiData>;
  selectedCar;
  deleteCarByModel: (id: number) => void;
  startEngineByModel: (id: number) => Promise<RaceParams>;
  driveByModel: DriveHandler;

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
    this.cars = {};
    this.selectedCar = 0;
    this.deleteCarByModel = () => {};
    this.startEngineByModel = () => Promise.resolve({ velocity: 1, distance: 1 });
    this.driveByModel = () => Promise.resolve({ success: true, code: 200 });
  }

  public initGarage({ carsArr, count, page }: RenderGarageParams) {
    const garageControls = createElement('div', 'garage__controls');
    const raceControls = createElement('div', 'race__controls');
    raceControls.append(this.raceStartBtn, this.raceResetBtn, this.generateCarsBtn);
    garageControls.append(this.formCreate, this.formUpdate, raceControls);

    // this.carsCountHeading.innerText = `Garage (${count} cars)`;
    // this.garagePage.innerText = `Page #${page}`;

    // carsArr.forEach((car) => this.insertCarLi(car));

    const paginationDiv = createElement('div', 'pagination');
    // if (count > 7) {
    //   this.nextPageBtn.classList.add('btn-primary');
    //   this.nextPageBtn.removeAttribute('disabled');
    // }
    paginationDiv.append(this.prevPageBtn, this.nextPageBtn);

    this.updateGarage({ carsArr, count, page });

    this.garageDiv.append(
      garageControls,
      this.carsCountHeading,
      this.garagePage,
      this.carsList,
      paginationDiv,
      this.modalWinner,
    );
  }

  private insertCarLi(car: Car) {
    const { name, color, id } = car; // id
    const li = createElement('li', 'car__li');

    const selectCarBtn = createElement('button', 'btn btn-secondary', 'SELECT') as HTMLButtonElement;
    const deleteCarBtn = createElement('button', 'btn btn-secondary', 'REMOVE') as HTMLButtonElement;
    const carNameSpan = createElement('span', 'car__name', `${name}`);

    const carConfigDiv = createElement('div');
    carConfigDiv.append(selectCarBtn, deleteCarBtn, carNameSpan);

    const engineStartBtn = createElement('button', 'btn__start btn__start-active', '▶') as HTMLButtonElement;
    const engineStopBtn = createElement('button', 'btn__stop', '■', '', true) as HTMLButtonElement;
    const raceTrack = createElement('div', 'race__track');
    raceTrack.innerHTML = createCarSvgText(color);
    const svg = raceTrack.lastChild as SVGElement;

    const finishFlagSpan = createElement('span', 'finish__flag', '🏁');
    raceTrack.prepend(engineStartBtn, engineStopBtn, finishFlagSpan);

    li.append(carConfigDiv, raceTrack);
    this.carsList.append(li);

    // MEGA OBJ - {id: {id, 4_btns, nameSpan, svg, animation, flag, name, color }}
    const carDataObj = {
      id,
      name,
      color,
      selectBtn: selectCarBtn,
      deleteBtn: deleteCarBtn,
      startBtn: engineStartBtn,
      stopBtn: engineStopBtn,
      svg,
      flag: finishFlagSpan,
      animationID: 0,
      // nameSpan: carNameSpan,
    };
    this.cars[id] = carDataObj;
  }

  public bindCreateCar(handler: CreateCarHandler) {
    this.formCreate.addEventListener('submit', async (e) => {
      e.preventDefault();
      const elements = this.formCreate.elements as FormElements;
      const name = elements.name.value;
      const color = elements.color.value;
      elements.name.value = '';
      this.formCreate.setAttribute('disabled', '');
      await handler({ name, color });
      this.formCreate.removeAttribute('disabled');
    });
  }

  public bindUpdateCar(handler: (x: Car) => void) {
    this.formUpdate.addEventListener('submit', async (e) => {
      e.preventDefault();
      const elements = this.formUpdate.elements as FormElements;
      const name = elements.name.value;
      const color = elements.color.value;
      const id = this.selectedCar;
      [...elements].forEach((el) => {
        el.setAttribute('disabled', '');
        if (el.tagName === 'BUTTON') el.classList.remove('btn-secondary');
      });
      elements.name.value = '';
      await handler({ id, name, color });
    });
  }

  public bindGenerateRandomCars(callabck: (x?: number) => void) {
    this.generateCarsBtn.addEventListener('click', async () => {
      this.generateCarsBtn.setAttribute('disabled', '');
      this.generateCarsBtn.classList.remove('btn-secondary');
      await callabck();
      this.generateCarsBtn.removeAttribute('disabled');
      this.generateCarsBtn.classList.add('btn-secondary');
    });
  }

  public updateGarage({ carsArr, count, page }: RenderGarageParams) {
    this.carsCountHeading.innerText = `Garage (${count} cars)`;
    this.garagePage.innerText = `Page #${page}`;
    this.carsList.innerHTML = '';
    this.cars = {};
    carsArr.forEach((car) => {
      this.insertCarLi(car);
      this.handleSelectCar(car.id);
      this.handleDeleteCar(car.id);
      this.handleStartEngine(car.id);
    });
    this.handlePaginationStyles(count, page);
  }

  private handlePaginationStyles(count: number, page: number) {
    if (page === 1) {
      this.prevPageBtn.setAttribute('disabled', '');
      this.prevPageBtn.classList.remove('btn-primary');
    } else {
      this.prevPageBtn.removeAttribute('disabled');
      this.prevPageBtn.classList.add('btn-primary');
    }
    if (count <= MAX_CARS_ON_PAGE || page * MAX_CARS_ON_PAGE >= count) {
      this.nextPageBtn.setAttribute('disabled', '');
      this.nextPageBtn.classList.remove('btn-primary');
    } else {
      this.nextPageBtn.removeAttribute('disabled');
      this.nextPageBtn.classList.add('btn-primary');
    }
  }

  private handleSelectCar(id: number) {
    this.cars[id].selectBtn.addEventListener('click', () => {
      this.selectedCar = id;
      const elements = this.formUpdate.elements as FormElements;
      elements.name.value = this.cars[id].name;
      elements.color.value = this.cars[id].color;
      [...elements].forEach((el) => {
        el.removeAttribute('disabled');
        if (el.tagName === 'BUTTON') el.classList.add('btn-secondary');
      });
      elements.name.focus();
    });
  }

  public bindDeleteCar(callback: (id: number) => void) {
    this.deleteCarByModel = callback;
  }

  private handleDeleteCar(id: number) {
    this.cars[id].deleteBtn.addEventListener('click', async () => {
      await this.deleteCarByModel(id);
    });
  }

  public bindStartEngine(callback: (x: number) => Promise<RaceParams>) {
    this.startEngineByModel = callback;
  }

  public bindDriveCar(callback: DriveHandler) {
    this.driveByModel = callback;
  }

  private handleStartEngine(id: number) {
    this.cars[id].startBtn.addEventListener('click', async () => {
      const { startBtn, stopBtn } = this.cars[id];
      startBtn.classList.remove('btn__start-active');
      startBtn.setAttribute('disabled', '');

      const raceParams = await this.startEngineByModel(id);
      startAnimation(raceParams, this.cars[id]);

      stopBtn.classList.add('btn__stop-active');
      stopBtn.removeAttribute('disabled');
      const { code } = await this.driveByModel(id);
      if (code === 500) {
        window.cancelAnimationFrame(this.cars[id].animationID);
        return { success: false, id };
      }
      return { success: true, id };
    });
  }

  public bindNextPage(callback: (x: number) => void) {
    this.nextPageBtn.addEventListener('click', () => {
      this.nextPageBtn.setAttribute('disabled', '');
      this.nextPageBtn.classList.remove('btn-primary');
      callback(1);
    });
  }

  public bindPrevPage(callback: (x: number) => void) {
    this.prevPageBtn.addEventListener('click', () => {
      this.prevPageBtn.setAttribute('disabled', '');
      this.prevPageBtn.classList.remove('btn-primary');
      callback(-1);
    });
  }

  public hideGarage() {
    this.garageDiv.classList.add('hidden');
  }

  public showGarage() {
    this.garageDiv.classList.remove('hidden');
  }
}
