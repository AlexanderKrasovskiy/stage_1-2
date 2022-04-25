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
  } catch (e) {
    console.error(e)
  }
};

const petsDataArr = await getData('../js/support/pets.json');



//=================== PAGINATION PETS =============================

function activatePagination() {
  const CAROUSEL = document.querySelector('.friends__carousel-pets');
  const BTN_START = document.querySelector('#pagination-btn-start');
  const BTN_END = document.querySelector('#pagination-btn-end');
  const BTN_PREV = document.querySelector('#pagination-btn-previous');
  const BTN_NEXT = document.querySelector('#pagination-btn-next');
  const PAGE_NUMBER = document.querySelector('#pagination-page-number');

  let currentPageNum = 1;
  let cardsInFrame = 8;
  updateNumCardsInFrame();
  let lastPageNum = 48 / cardsInFrame;
  //let direction = ''; // next / prev / end / start

  function updateNumCardsInFrame() {
    if (window.matchMedia("(max-width: 767.9px)").matches) {
      cardsInFrame = 3;
    } else if (window.matchMedia("(max-width: 1279.9px)").matches) {
      cardsInFrame = 6;
    } else {
      cardsInFrame = 8;
    }
  };


  let petsPositionArr = generateRandomPaginationCardsArr(cardsInFrame);
  testpagesArr(petsPositionArr, cardsInFrame);
  
  function generateRandomPaginationCardsArr(cardsPerPage) {
    let pagesNumsArr = [];
    let numsToExclude = [0, 0, 0, 0, 0, 0, 0, 0];
    let minIdxToExclude = 0;
  
    while (pagesNumsArr.length < 48) {
      let frameArr = [];
  
      if (cardsPerPage < 8) {
        while (!numsToExclude.every(val => val === minIdxToExclude)) {
          if (cardsPerPage < 6 && frameArr.length === 3) break;
          let idx = numsToExclude.indexOf(minIdxToExclude);
          frameArr.push(idx);
          numsToExclude[idx] += 1;
          if (numsToExclude.every(val => val === (minIdxToExclude + 1))) {
            minIdxToExclude++
          }
        }
      }
  
      while (frameArr.length < cardsPerPage) {
        let randomNum = Math.floor(Math.random() * 8);
        if (frameArr.includes(randomNum)) continue;
  
        if (numsToExclude[randomNum] === 6) continue;
  
        numsToExclude[randomNum] ? numsToExclude[randomNum] += 1 : (numsToExclude[randomNum] = 1);
  
        frameArr.push(randomNum);
      }
      //console.log('Frame: ', frameArr);
      //console.log('Exclude: ', numsToExclude);
      pagesNumsArr = [...pagesNumsArr, ...frameArr];
    }
    
    return pagesNumsArr;
  };
    
  function testpagesArr(arrToTest, cardsPerPage) {
    //console.log(arrToTest);
    for (let i = 0; i < 8; i++) {
      console.log('Pet id', i, ' repeats', countRepeatsInArr(arrToTest, i), ' times in arr of 48 cards');
    }
  
    function countRepeatsInArr(arr, item) {
      let repeats = 0;
      arr.reduce((acc, curr) => {
  
        if (curr === item) {
          repeats++
        }
  
      }, 0);
      return repeats
    }
  
    // each frame with no repeats
    areNoRepeatsOnEachPage(arrToTest, cardsPerPage);
  
    function areNoRepeatsOnEachPage(arr, numCardsPerPage) {
      let arrCopy = [...arr];
      let uniqueStatus = true;
  
      while (arrCopy.length > 0) {
        let page = arrCopy.splice(0, numCardsPerPage);
        // if (page.every(item => item === page[0]));
        let set = new Set(page);
        if (page.length !== set.size) {
          uniqueStatus = false;
          console.log('Page with duplicates: ', page);
          break;
        }
      }
  
      console.log('Each page has no duplicates: ', uniqueStatus);
    }
  
  };


  fillPageWithCards();

  function fillPageWithCards() {
    CAROUSEL.innerHTML = '';
    let firstPageIndexes = petsPositionArr.slice(0, cardsInFrame);
    let cardsArr = prepareCards(firstPageIndexes);
    CAROUSEL.innerHTML = cardsArr.join(' ');
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
    let { id, img, type, name } = petsDataArr[indexOfPet];
    let card = `
    <div class="friends__card" data-pet-id="${id}">
      <img src="${img}" alt="${type}">
      <h4 class="friends__name">${name}</h4>
      <div class="btn btn__learn">Learn more</div>
    </div>
    `;

    return card;
  };

  
  BTN_NEXT.addEventListener('click', moveNext);
  //BTN_PREV.addEventListener('click', movePrev);
  BTN_END.addEventListener('click', moveEnd);
  //BTN_START.addEventListener('click', moveStart);


  function moveNext() {
    //direction = 'next';
    CAROUSEL.classList.add('active');

    currentPageNum++;
    PAGE_NUMBER.textContent = currentPageNum;

    if (currentPageNum === lastPageNum) {
      BTN_NEXT.classList.add('inactive');
      BTN_END.classList.add('inactive');
    }

    if (currentPageNum !== 1) {
      BTN_START.classList.remove('inactive');
      BTN_PREV.classList.remove('inactive');
    }

    removeAllBtnEventListeners()
  };

  function movePrev() {
    //direction = 'prev';
    CAROUSEL.classList.add('active');

    currentPageNum--;
    PAGE_NUMBER.textContent = currentPageNum;

    if (currentPageNum === 1) {
      BTN_START.classList.add('inactive');
      BTN_PREV.classList.add('inactive');
    }

    if (currentPageNum !== lastPageNum) {
      BTN_NEXT.classList.remove('inactive');
      BTN_END.classList.remove('inactive');
    }

    removeAllBtnEventListeners();
  };

  function moveEnd() {
    //direction = 'end';
    CAROUSEL.classList.add('active');

    currentPageNum = lastPageNum;
    PAGE_NUMBER.textContent = currentPageNum;

    BTN_NEXT.classList.add('inactive');
    BTN_END.classList.add('inactive');

    BTN_START.classList.remove('inactive');
    BTN_PREV.classList.remove('inactive');

    removeAllBtnEventListeners()
  };

  function moveStart() {
    //direction = 'start';
    CAROUSEL.classList.add('active');

    currentPageNum = 1;
    PAGE_NUMBER.textContent = currentPageNum;

    BTN_START.classList.add('inactive');
    BTN_PREV.classList.add('inactive');

    BTN_NEXT.classList.remove('inactive');
    BTN_END.classList.remove('inactive');

    removeAllBtnEventListeners();
  }

  function removeAllBtnEventListeners() {
    BTN_NEXT.removeEventListener('click', moveNext);
    BTN_PREV.removeEventListener('click', movePrev);
    BTN_END.removeEventListener('click', moveEnd);
    BTN_START.removeEventListener('click', moveStart);
  };



  CAROUSEL.addEventListener('transitionend', (e) => {
    if (e.propertyName !== 'opacity') return '';
    CAROUSEL.classList.remove('active');

    insertCardsToCurrentPage();

    if (!(currentPageNum === lastPageNum)) {
      BTN_NEXT.addEventListener('click', moveNext);
      BTN_END.addEventListener('click', moveEnd);
    }

    if (currentPageNum !== 1) {
      BTN_PREV.addEventListener('click', movePrev);
      BTN_START.addEventListener('click', moveStart);
    }
  });

  function insertCardsToCurrentPage() {
    //currentPageNum // 1
    //cardsInFrame // 8
    // direction - next / prev / end / start
    //petsPositionArr // 0-47
    //prepareCards(arrOfPageCardIds)
    let idxFrom;
    let idxTo;

    //if (direction === 'next') {
      idxTo = currentPageNum * cardsInFrame;
      idxFrom = idxTo - cardsInFrame;
    //}

    let pageIdsArr = petsPositionArr.slice(idxFrom, idxTo);
    let cardsArr = prepareCards(pageIdsArr);
    CAROUSEL.innerHTML = cardsArr.join(' ');
  };

};

activatePagination();



//=================== MODAL PETS =============================

function activatePetsModal() {
  const MODAL = document.querySelector('.modal__overlay');
  const CAROUSEL_LINE = document.querySelector('.friends__carousel-pets');
  const PAGE_BODY = document.body;

  CAROUSEL_LINE.addEventListener('click', (e) => {
    if (e.target.closest('.friends__card')) {
      let targetId = +e.target.closest('.friends__card').dataset.petId;
      composeModalData(targetId);
      openModal();
    }
  });

  function composeModalData(id) {
    let { img, type, name, breed, description, age, inoculations, diseases, parasites } = petsDataArr[id];
    MODAL.innerHTML = `
    <div class="modal__card">

      <div class="btn btn__round btn__round-cross"></div>

      <div class="modal__img">
        <img src="${img}" alt="${type}">
      </div>

      <div class="modal__content">
        <h4 class="modal__name">${name}</h4>
        <p class="modal__breed">${type} - ${breed}</p>
        <p class="modal__description">${description}</p>
        <ul class="modal__specs">
          <li>
            <span>Age:</span> ${age}
          </li>
          <li>
            <span>Inoculations:</span> ${inoculations.join(', ')}
          </li>
          <li>
            <span>Diseases:</span> ${diseases.join(', ')}
          </li>
          <li>
            <span>Parasites:</span> ${parasites.join(', ')}
          </li>
        </ul>
      </div>

    </div>
    `;
  };

  function openModal() {
    MODAL.classList.add('active');
    PAGE_BODY.classList.add('active');

    let crossBtn = document.querySelector('.btn__round-cross');
    crossBtn.addEventListener('click', (e) => closeModal(e));
    MODAL.addEventListener('click', (e) => closeModal(e));
  }

  function closeModal(e) {
    if (e.target.classList.contains('btn__round-cross') || e.target.classList.contains('modal__overlay')) {

      MODAL.classList.remove('active');
      PAGE_BODY.classList.remove('active');

      let crossBtn = document.querySelector('.btn__round-cross');
      crossBtn.removeEventListener('click', closeModal);
      MODAL.removeEventListener('click', closeModal);

    }
  }
};

activatePetsModal();