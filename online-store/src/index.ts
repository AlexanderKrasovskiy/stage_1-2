import './scss/global.scss';

//===========================================
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

console.log(priceSlider.noUiSlider?.get()); // GET str
console.log(priceSlider.noUiSlider?.get(true)); // GET num
priceSlider.noUiSlider?.set([300, 950]); // SET
//priceSlider.noUiSlider?.reset(); // RESET
