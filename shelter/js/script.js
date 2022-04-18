//=================== BURGER =============================

function activateBurgerMenu() {
  const burgerBtn = document.querySelector('.burger');
  const burgerOverlay = document.querySelector('.burger__overlay');
  const burgerMenu = document.querySelector('.header__nav');

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
  };

  function closeMenu() {
    burgerBtn.classList.remove('active');
    burgerOverlay.classList.remove('active');
    burgerMenu.classList.remove('active');
  };
};

activateBurgerMenu();

//=================== LINKS =============================

function updateLinks() {
  const linkBtns = document.querySelectorAll('.nav__link');
  const helpLink = linkBtns[2];
  const contacts = linkBtns[3];

  helpLink.removeAttribute('href');
  contacts.removeAttribute('href');
  // classList add inactive ?

  
  // !!! just for main page !!!
  const makeAFriendBtn = document.querySelector('.hero__content .btn__link');
  makeAFriendBtn.setAttribute('href', './pets.html');
};

updateLinks()