//=================== BURGER =============================

function activateBurgerMenu() {
  const burgerBtn = document.querySelector('.burger');
  const burgerOverlay = document.querySelector('.burger__overlay');
  const burgerMenu = document.querySelector('.header__nav');

  const bodyTag = document.body;

  burgerBtn.addEventListener('click', toggleActive);
  burgerOverlay.addEventListener('click', closeMenu);
  burgerMenu.addEventListener('click', (e) => {
    const targetClassList = e.target.classList;
    //console.dir(targetClassList)
    if (targetClassList.contains('nav__logo')
    || targetClassList.contains('logo__title')
    || targetClassList.contains('logo__subtitle')
    || targetClassList.contains('nav__link')
    || targetClassList.contains('nav__item')) {
      closeMenu();
    }
  });

  function toggleActive() {
    burgerBtn.classList.toggle('active');
    burgerOverlay.classList.toggle('active');
    burgerMenu.classList.toggle('active');

    bodyTag.classList.toggle('active');
  };

  function closeMenu() {
    burgerBtn.classList.remove('active');
    burgerOverlay.classList.remove('active');
    burgerMenu.classList.remove('active');

    bodyTag.classList.remove('active');
  };
};

activateBurgerMenu();



//=================== FETCH PETS Data =============================

async function getData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch(e) {
    console.error(e)
  }
};

const petsDataArr = await getData('../js/support/pets.json');



//=================== SLIDER =============================

function activateSlider() {
  const BTN_LEFT = document.querySelector('.btn__round-left');
  const BTN_RIGHT = document.querySelector('.btn__round-right');
  const CAROUSEL = document.querySelector('.friends__carousel');
  const FRAME_LEFT = document.querySelector("#frame-left");
  const FRAME_RIGHT = document.querySelector("#frame-right");
  const FRAME_ACTIVE = document.querySelector("#frame-active");

  let leftFrameIndexesArr = [];
  let centerFrameIndexesArr = [];
  let rightFrameIndexesArr = [];

  let cardsInFrame = 3;
  updateNumCardsInFrame();

  function updateNumCardsInFrame() {
    if (window.matchMedia( "(max-width: 767.9px)" ).matches) {
      cardsInFrame = 1;
    } else if (window.matchMedia( "(max-width: 1279.9px)" ).matches) {
      cardsInFrame = 2;
    } else {
      cardsInFrame = 3;
    }
  };

  let petsPositionArr = generateRandomArr(cardsInFrame);

  function generateRandomArr(cardPerFrame) {
    let startToCenter = [];

    while (startToCenter.length < (cardPerFrame * 2)) {
      let newNum = Math.floor(Math.random() * 8); // 0 - 7
      if (startToCenter.includes(newNum)) continue;
      startToCenter.push(newNum);
    }

    let middleToEnd = startToCenter.slice(cardPerFrame);

    while (middleToEnd.length < (cardPerFrame * 2)) {
      let newNum = Math.floor(Math.random() * 8); // 0 - 7
      if (middleToEnd.includes(newNum)) continue;
      middleToEnd.push(newNum);
    }

    leftFrameIndexesArr = startToCenter.slice(0, cardPerFrame);
    centerFrameIndexesArr = middleToEnd.slice(0, cardPerFrame);
    rightFrameIndexesArr = middleToEnd.slice(cardPerFrame);

    return [...startToCenter, ...middleToEnd.slice(cardPerFrame)];
  }


  fillPageWithCards();

  function fillPageWithCards() {

    let FRAMES = document.querySelectorAll('.card__frame');

    FRAMES.forEach(frame => {
      frame.innerHTML = '';
      let subRandomArr = petsPositionArr.splice(0, cardsInFrame);
      let cardsArr = prepareCards(subRandomArr);
      frame.innerHTML = cardsArr.join(' ')
    })
  };

  function prepareCards(arrOfIndexes) {
    let result = [];

    arrOfIndexes.forEach(idx => {
      let card = composePetCard(idx);
      result.push(card);
    });

    return result;
  };

  function composePetCard(indexOfPet) {
    let {id, img, type, name} = petsDataArr[indexOfPet];
    let card = `
    <div class="friends__card" data-pet-id="${id}">
      <img src="${img}" alt="${type}">
      <h4 class="friends__name">${name}</h4>
      <div class="btn btn__learn">Learn more</div>
    </div>
    `;

    return card;
  };



  BTN_LEFT.addEventListener('click', moveLeft);
  BTN_RIGHT.addEventListener('click', moveRight);

  function moveLeft() {
    CAROUSEL.classList.add("transition-left");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
  }

  function moveRight() {
    CAROUSEL.classList.add("transition-right");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
  }

  function buildFrameOfRandomCards(exludeIndexesArr) {
    let randomNumbersArr = [];

    while (randomNumbersArr.length < cardsInFrame) {
      let randomNum = Math.floor(Math.random() * 8);;
      if (exludeIndexesArr.includes(randomNum)) continue;
      if (randomNumbersArr.includes(randomNum)) continue;
      randomNumbersArr.push(randomNum);
    }

    leftFrameIndexesArr = randomNumbersArr;
    rightFrameIndexesArr = randomNumbersArr;

    let arrOfCards = prepareCards(randomNumbersArr);

    return arrOfCards;
  }



  CAROUSEL.addEventListener('animationend', (animationEvent) => {

    if (animationEvent.animationName === 'move-left') {
      CAROUSEL.classList.remove("transition-left");
      FRAME_ACTIVE.innerHTML = FRAME_LEFT.innerHTML;
      centerFrameIndexesArr = leftFrameIndexesArr;
    } else {
      CAROUSEL.classList.remove("transition-right");
      FRAME_ACTIVE.innerHTML = FRAME_RIGHT.innerHTML;
      centerFrameIndexesArr = rightFrameIndexesArr;
    }


    let cards = buildFrameOfRandomCards(centerFrameIndexesArr).join(' ');
    FRAME_LEFT.innerHTML = cards;
    FRAME_RIGHT.innerHTML = cards;
    

    BTN_LEFT.addEventListener('click', moveLeft);
    BTN_RIGHT.addEventListener('click', moveRight);
  });

};

activateSlider();


//=================== MODAL =============================


// 4) MODAL card (wrapper) onclick -> ( compose + open ) modal + fix body
//  - close modal