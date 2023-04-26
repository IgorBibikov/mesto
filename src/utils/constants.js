// Массив данных карточек

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassTemplate: '.popup__input-error_type_',
  activeErrorClass: 'popup__input-error',
  submitButtonSelector: '.popup__submit-button',
  invalidSubmitButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
};

//Кнопка открытия попап редактирования профиля
export const buttonEditProfile = document.querySelector(
  '.profile__edit-button'
);
//Кнопка открытия попап добавления карточек
export const buttonAddPlace = document.querySelector('.profile__add-button');

//Контейнер для карточек
export const containerSelector = '.places';

// Находим форму в DOM
export const formProfileElement = document.forms['profile-form'];
export const formPlaceElement = document.forms['card-form'];
