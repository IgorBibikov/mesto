import { initialCards } from './initial-сards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassTemplate: '.popup__input-error_type_',
  activeErrorClass: 'popup__input-error',
  submitButtonSelector: '.popup__submit-button',
  invalidSubmitButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
};

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddPlace = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupPlace = document.querySelector('.popup_type_place');
const popupImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

// const placeTemplate = document.querySelector('.place-template');
const cardsContainer = document.querySelector('.places');

const bigFoto = document.querySelector('.popup__big-foto');
const bigFotoTitle = document.querySelector('.popup__image-title');

// Находим форму в DOM
const formProfileElement = document.querySelector('.popup__form_type_profile');
const formPlaceElement = document.querySelector('.popup__form_type_place');

// Создание экземпляра класса валидации формы профиля
const profileFormValidator = new FormValidator(config, formProfileElement);
profileFormValidator.enableValidation();
// Создание экземпляра класса  валидации формы карточек
const newCradFormValidator = new FormValidator(config, formPlaceElement);
newCradFormValidator.enableValidation();

// Находим поля формы в DOM
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileOccupationInput = document.querySelector(
  '.popup__input_type_occupation'
);
const placeNameInput = document.querySelector('.popup__input_type_place-name');
const placeLinkInput = document.querySelector('.popup__input_type_link');

// Выберите элементы, куда должны быть вставлены значения полей
const profileNameElement = document.querySelector('.profile__name');
const profileOccupationElement = document.querySelector('.profile__subtitle');

// Функция закрытия попап по ESC
function handleEscClose(evt) {
  if (evt.code === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}
//Функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Обработчик событий для открытия popup:
buttonEditProfile.addEventListener('click', function () {
  profileNameInput.value = profileNameElement.textContent;
  profileOccupationInput.value = profileOccupationElement.textContent;
  openPopup(popupProfile);
});
buttonAddPlace.addEventListener('click', function () {
  openPopup(popupPlace);
});

// Обработчик событий для закрытия popup по кнопке:
popupCloseButtons.forEach(function (closeButton) {
  const popup = closeButton.closest('.popup');
  closeButton.addEventListener('click', function () {
    closePopup(popup);
  });
});

// Обработчик событий для закрытия popup по оверлей:
popups.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

// Функция «отправки» формы профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  //Новые значения из input в profile
  profileNameElement.textContent = profileNameInput.value;
  profileOccupationElement.textContent = profileOccupationInput.value;
  closePopup(popupProfile);
}
// Обработчик событий при отправке формы профиля:
formProfileElement.addEventListener('submit', handleFormSubmitProfile);

// Функция открытия попап с картинкой
function opemPopupBigImage(name, link) {
  openPopup(popupImage);
  bigFoto.setAttribute('src', link);
  bigFoto.setAttribute('alt', `Фотография ${name}`);
  bigFotoTitle.textContent = name;
}
//Функция создания карточки
function createCard(item) {
  const card = new Card(item, '.place-template', opemPopupBigImage);
  const cardElement = card.generateCard();
  return cardElement;
}
//Добавление 6 первых карточек +
initialCards.forEach((item) => {
  // Добавляем в DOM  +
  cardsContainer.append(createCard(item));
});

//Функция добавления карточки  +
function addCard(card, cardsContainer) {
  createCard(card);
  cardsContainer.prepend(createCard(card));
}

// Функция «отправки» формы карточек
function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  //Новые значения из input в place
  const name = placeNameInput.value;
  const link = placeLinkInput.value;
  const card = {
    name: name,
    link: link,
  };
  addCard(card, cardsContainer);
  closePopup(popupPlace);
  formPlaceElement.reset();
  newCradFormValidator.enableValidation();
}
// Обработчик событий при отправке формы профиля:

formPlaceElement.addEventListener('submit', handleFormSubmitPlace);
