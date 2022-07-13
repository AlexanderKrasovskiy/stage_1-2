import Controller from './components/controller';
import './scss/global.scss';

const app = new Controller();
app.start();

// =
// ==
// === SLIDER ===================================================
// import * as noUiSlider from 'nouislider';
// import 'nouislider/dist/nouislider.css';

// const priceSlider = document.getElementById('price__slider') as noUiSlider.target;
// const yearSlider = document.getElementById('year__slider') as noUiSlider.target;

// noUiSlider.create(priceSlider, {
//   start: [300, 1500],
//   connect: true,
//   range: {
//     min: 300,
//     max: 1300,
//   },
//   step: 100,
//   tooltips: {
//     to: function (numericValue) {
//       return numericValue.toFixed();
//     },
//   },
//   margin: 200,
// });

// noUiSlider.create(yearSlider, {
//   start: [2019, 2022],
//   connect: true,
//   range: {
//     min: 2019,
//     max: 2022,
//   },
//   step: 1,
//   tooltips: {
//     to: function (numericValue) {
//       return numericValue.toFixed();
//     },
//   },
//   //margin: 1,
// });

// slider.noUiSlider?.on('change', function (handles, idx: number) {
//   snapValues[idx].innerHTML = ('$' + Math.round(+handles[idx])) as string;
// });

//console.log(priceSlider.noUiSlider?.get()); // GET str
//console.log(priceSlider.noUiSlider?.get(true)); // GET num
//priceSlider.noUiSlider?.set([300, 950]); // SET
//priceSlider.noUiSlider?.reset(); // RESET

// === LOAD IMGs ================================================================================

const cache: Record<string, string> = {};

function importAll(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach((key) => (cache[key] = r(key)));
}

importAll(require.context('./assets/images/', true, /\.(png|svg|jpg|jpeg|gif)$/i));

// ===___ FORM Filters
// $0.addEventListener('change', (evt) => {
//   console.dir(evt.target);
//   console.log('name: ', evt.target.name);
//   console.log('value', evt.target.value);
//   console.log('checked', evt.target.checked);
// });
// $0.addEventListener('reset', (evt) => {
//   console.dir(evt.target);
// });
