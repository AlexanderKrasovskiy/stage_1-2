import './scss/global.scss';

//=== SLIDER ========================================
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const priceSlider = document.getElementById('price__slider') as noUiSlider.target;
const yearSlider = document.getElementById('year__slider') as noUiSlider.target;

noUiSlider.create(priceSlider, {
  start: [50, 1500],
  connect: true,
  range: {
    min: 50,
    max: 1500,
  },
  step: 50,
  tooltips: {
    to: function (numericValue) {
      return numericValue.toFixed();
    },
  },
  margin: 250,
});

noUiSlider.create(yearSlider, {
  start: [2015, 2022],
  connect: true,
  range: {
    min: 2015,
    max: 2022,
  },
  step: 1,
  tooltips: {
    to: function (numericValue) {
      return numericValue.toFixed();
    },
  },
  //margin: 1,
});

// slider.noUiSlider?.on('change', function (handles, idx: number) {
//   snapValues[idx].innerHTML = ('$' + Math.round(+handles[idx])) as string;
// });

//console.log(priceSlider.noUiSlider?.get()); // GET str
//console.log(priceSlider.noUiSlider?.get(true)); // GET num
//priceSlider.noUiSlider?.set([300, 950]); // SET
//priceSlider.noUiSlider?.reset(); // RESET

// === IMAGES =====================================================

const cache: Record<string, string> = {};
// {./google/pixel-6-green.jpg: "http://127.0.0.1:5500/dist/assets/icons/pixel-6-green.jpg"}
// {./google/pixel-6-green.jpg: "http://localhost:8080/assets/icons/pixel-6-green.jpg"}

function importAll(r: __WebpackModuleApi.RequireContext) {
  //console.log(r.keys()); // ['./google/pixel-6-green.jpg']

  r.keys().forEach((key) => (cache[key] = r(key)));
  console.log(cache);
}

importAll(require.context('./assets/images/', true, /\.(png|svg|jpg|jpeg|gif)$/i));

// === TEST ADDING IMAGES ======================================================

// const div = document.createElement('div');
// div.style.width = '150px';
// div.style.height = '150px';
// div.style.margin = '20px';
// div.style.padding = '20px';
// div.style.backgroundSize = 'contain';
// div.style.backgroundRepeat = 'no-repeat';

// div.style.backgroundImage = `url('./assets/icons/pixel-6-green.jpg')`;
// document.body.prepend(div);

// === CLONE CARDS ==================================
// let products = document.querySelector('.products');
// let card = document.querySelector('.card');

// for (let i = 0; i < 20; i++) {
//   let copy = card.cloneNode(true);
//   products.append(copy);
// }
