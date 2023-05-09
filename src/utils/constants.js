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
export const formUpdateElement = document.forms['update-form'];
//Кнопка открытия попап редактирования аватара
export const buttonUpdateAvatar = document.querySelector(
  '.profile__avatar-container'
);
//Картанка аватара профиля
export const profileAvatar = document.querySelector('.profile__avatar');
