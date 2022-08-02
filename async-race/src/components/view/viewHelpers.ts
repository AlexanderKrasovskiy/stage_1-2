export const createElement = (tag: string, className?: string, text?: string, id?: string, disabled?: boolean) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.innerText = text;
  if (id) el.id = id;
  if (disabled) el.setAttribute('disabled', '');
  return el;
};

export const createForm = (disabled: boolean) => {
  const form = createElement('form', 'form') as HTMLFormElement;
  const name = `<input class="form__name" type="text" name="name" autocomplete="off" required ${
    disabled ? 'disabled' : ''
  }>`;
  const color = `<input class="form__color" type="color" name="color" value="#ffffff" ${disabled ? 'disabled' : ''}>`;
  const btn = `<button class="btn${disabled ? '' : ' btn-secondary'}" type="submit" ${disabled ? 'disabled' : ''}>${
    disabled ? 'UPDATE' : 'CREATE'
  }</button>`;
  const formContent = `${name}${color}${btn}`;
  form.innerHTML = formContent;
  return form;
};

export const createCarSvgText = (color: string) =>
  `<svg style="fill:${color};width:50px" class="svg__img" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 375.5"><path d="M61.43 149.9v30.07h53.72V39.98H61.43V149.9zm287.95 164.55c-2.78 15.13-10.18 28.69-20.65 39.16-13.5 13.5-32.14 21.89-52.64 21.89H74.53c-20.51 0-39.15-8.39-52.65-21.89S0 321.48 0 300.97c0-11.6 2.68-22.6 7.46-32.42v-72.1c0-22.86 16.69-42 38.49-45.85V27.87H25.58V0h221.01l7.87 27.87h-18.52l12.94 88.06-6.19 33.97h50.35v-41.86c0-1.97 1.62-3.59 3.59-3.59h25.16c1.97 0 3.59 1.62 3.59 3.59v41.86h20.63c15.38 0 27.95 12.58 27.95 27.95v107.37h22.82V153.65c0-2.03 1.66-3.69 3.7-3.69h31.06C424.47 315.89 512 345.67 512 345.35v16.39c0 2.03-1.67 3.7-3.7 3.7H400.48a3.71 3.71 0 0 1-3.7-3.7v-47.29h-47.4zM70.94 283.43c9.35 0 16.93 7.58 16.93 16.93 0 9.36-7.58 16.94-16.93 16.94-9.36 0-16.94-7.58-16.94-16.94 0-9.35 7.58-16.93 16.94-16.93zm203.67 0c9.35 0 16.93 7.58 16.93 16.93 0 9.36-7.58 16.94-16.93 16.94-9.36 0-16.94-7.58-16.94-16.94 0-9.35 7.58-16.93 16.94-16.93zm-67.89 0c9.35 0 16.93 7.58 16.93 16.93 0 9.36-7.58 16.94-16.93 16.94-9.36 0-16.94-7.58-16.94-16.94 0-9.35 7.58-16.93 16.94-16.93zm-67.89 0c9.35 0 16.93 7.58 16.93 16.93 0 9.36-7.58 16.94-16.93 16.94-9.36 0-16.94-7.58-16.94-16.94 0-9.35 7.58-16.93 16.94-16.93zm137.26-43.57c33.61 0 61.11 27.5 61.11 61.11s-27.5 61.11-61.11 61.11H74.53c-33.61 0-61.11-27.5-61.11-61.11 0-32.64 26.61-61.11 61.11-61.11h201.56zm19.73-183.49c-1.44-1.48-.86-3.49 1.29-4.49 2.15-.99 5.06-.59 6.5.89 9.58 9.9 4.98 17.9.56 25.57-3.28 5.71-6.44 11.19-.67 16.64 1.53 1.44 1.08 3.47-1.01 4.52-2.09 1.06-5.03.75-6.56-.69-8.82-8.33-4.73-15.45-.46-22.85 3.52-6.13 7.2-12.52.35-19.59zm16.11 0c-1.44-1.48-.86-3.49 1.28-4.49 2.15-.99 5.06-.59 6.5.89 9.59 9.9 4.98 17.9.57 25.57-3.29 5.71-6.45 11.19-.68 16.64 1.54 1.44 1.08 3.47-1.01 4.52-2.08 1.06-5.02.75-6.55-.69-8.82-8.33-4.73-15.45-.47-22.85 3.53-6.13 7.21-12.52.36-19.59zM140.77 149.9v31.68h79.03l5.91-31.68 6.33-33.97-12.24-75.95h-79.03V149.9z"/></svg>`;
