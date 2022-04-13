const menuButton = document.querySelector('.header__burger-button ');
const menuButtonContainer = document.querySelector('.header__menu-button-container');
const menuContainer = document.querySelector('.header__nav');
const logo = document.querySelector('.page__logo');
const contactForm = document.querySelector('.reservation__contact-form');
const page = document.querySelector('.page');
const cards = document.querySelectorAll('.tour-card__container');

let menuIsOpened = false;
menuContainer.classList.add('header__nav--closed');
logo.classList.remove('page__logo--nojs');
document.querySelector('.header__content-wrapper').classList.remove('header__content-wrapper--no-js');
menuContainer.querySelector('.page__menu-list').classList.remove('page__menu-list--nojs');

const onMenuClick = () => {
  if (menuButton.className === ('header__burger-button')) {
    menuButton.className = ('header__burger-button--close');
    menuButtonContainer.classList.toggle('header__burger');
    menuContainer.classList.toggle('header__nav--closed');
    logo.classList.toggle('page__logo-menu--opened');
    page.classList.toggle('page__overflow');
    const darkBackground = document.createElement('div');
    darkBackground.classList.add('page__darkBackground');
    page.appendChild(darkBackground);
    menuIsOpened = true;
    document.querySelector('.page__darkBackground').addEventListener('click', onMenuClick);
    return;
  }
  menuButton.className = ('header__burger-button');
  menuButtonContainer.classList.toggle('header__burger');
  menuContainer.classList.toggle('header__nav--closed');
  logo.classList.toggle('page__logo-menu--opened');
  page.classList.toggle('page__overflow');
  document.querySelector('.page__darkBackground').remove();
  menuIsOpened = false;
  document.querySelector('.page__darkBackground').removeEventListener('click', onMenuClick);
};

menuButtonContainer.addEventListener('click', onMenuClick);

const smoothLinks = document.querySelectorAll('.page__menu-link');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', function (e) {
    e.preventDefault();
    const targetClassName = smoothLink.getAttribute('href').replace('#', '.');
    if (targetClassName !== '.') {
      document.querySelector(targetClassName).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    if ((window.screen.width < 768)&&(menuIsOpened)) {
      onMenuClick();
    }
  });
}

if (window.screen.width < 1040) {
  const tourImages = document.querySelectorAll('.tour-card__container');
  for (const tourImage of tourImages) {
    tourImage.addEventListener('click', () => {
      tourImage.querySelectorAll('.tour-card__h3').forEach((card)=>card.classList.remove('tour-card__h3--click'));
      tourImages.forEach((card)=>card.classList.remove('tour-card__container--click'));
      tourImage.querySelector('.tour-card__h3').classList.add('tour-card__h3--click');
      tourImage.classList.add('tour-card__container--click');
    });
  }
}

cards.forEach((card)=> {
  const onCardFocus = () => {
    card.classList.add('tour-card__container--active');
    card.querySelector('.tour-card__button').focus();
  }

  const onTabPressEvent = (evt) => (evt.key === 'Tab')?cards.forEach((card)=>card.classList.remove('tour-card__container--active')):'';

  card.addEventListener('keydown', onTabPressEvent );
  card.addEventListener('focus', onCardFocus);
});

const onModalSubmit = (evt) => {
  evt.preventDefault();

  const regexpTel = /^\d+$/;
  const regexpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexpName = /^[А-Яа-яa-zA-Z\s]*$/;

  const name = document.querySelector('.contact-form__input[name=name]');
  const email = document.querySelector('.contact-form__input[name=email]');
  const phone = document.querySelector('.contact-form__input[name=phone]');

  name.classList.remove('contact-form__invalid-input');
  email.classList.remove('contact-form__invalid-input');
  phone.classList.remove('contact-form__invalid-input');

  let valid = true;

  if (!regexpName.test(name.value)) {
    name.classList.add('contact-form__invalid-input');
    valid = false;
  }
  if (!regexpEmail.test(email.value)) {
    email.classList.add('contact-form__invalid-input');
    valid = false;
  }
  if (!regexpTel.test(phone.value)) {
    phone.classList.add('contact-form__invalid-input');
    valid = false;
  }

  if (valid) {
    contactForm.submit();
    localStorage.setItem('Antarctica-data',JSON.stringify({name: name.value, email: email.value, phone: phone.value,}));
  }
};

contactForm.addEventListener('submit', onModalSubmit);
