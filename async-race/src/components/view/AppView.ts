import { Handler } from '../types';
import { createElement } from './viewHelpers';

export class AppView {
  toGarageBtn;
  toWinnersBtn;

  constructor(root: HTMLElement) {
    this.toGarageBtn = createElement('button', 'btn', 'TO GARAGE');
    this.toWinnersBtn = createElement('button', 'btn btn-primary', 'TO WINNERS');
    this.render(root);
  }

  render(rootElement: HTMLElement) {
    const root = rootElement;
    const nav = createElement('nav', 'nav');
    this.toGarageBtn.setAttribute('disabled', '');
    nav.append(this.toGarageBtn, this.toWinnersBtn);
    root.append(nav);
    document.body.append(root);
  }

  bindSwitchToGarage(handler: Handler) {
    this.toGarageBtn.addEventListener('click', () => {
      this.toGarageBtn.setAttribute('disabled', '');
      this.toGarageBtn.classList.remove('btn-primary');
      handler();
      this.toWinnersBtn.removeAttribute('disabled');
      this.toWinnersBtn.classList.add('btn-primary');
    });
  }

  bindSwitchToWinners(handler: Handler) {
    this.toWinnersBtn.addEventListener('click', () => {
      this.toWinnersBtn.setAttribute('disabled', '');
      this.toWinnersBtn.classList.remove('btn-primary');
      handler();
      this.toGarageBtn.removeAttribute('disabled');
      this.toGarageBtn.classList.add('btn-primary');
    });
  }
}
