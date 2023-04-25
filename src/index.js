import './pages/index.css';
import { initialCards } from './utils/initial-сards.js';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassTemplate: '.popup__input-error_type_',
  activeErrorClass: 'popup__input-error',
  submitButtonSelector: '.popup__submit-button',
  invalidSubmitButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
};
//Кнопка открытия попап редактирования профиля
const buttonEditProfile = document.querySelector('.profile__edit-button');
//Кнопка открытия попап добавления карточек
const buttonAddPlace = document.querySelector('.profile__add-button');

//Контейнер для карточек
const containerSelector = '.places';

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

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();
// Функция открытия попап с картинкой
function handleCardClick(name, link) {
  popupWithImage.open({ name, link });
}

const popupWithFormProfile = new PopupWithForm(
  '.popup_type_profile',
  handleFormSubmitProfile
);
popupWithFormProfile.setEventListeners();

const popupWithFormPlace = new PopupWithForm(
  '.popup_type_place',
  handleFormSubmitPlace
);
popupWithFormPlace.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userOccupationSelector: '.profile__subtitle',
});

function handleFormSubmitProfile(data) {
  userInfo.setUserInfo(data.name, data.occupation);
}
// Функция «отправки» формы карточек
function handleFormSubmitPlace() {
  //Новые значения из input в place
  const name = placeNameInput.value;
  const link = placeLinkInput.value;
  const card = [
    {
      name: name,
      link: link,
    },
  ];
  addCard(card);
}

// Обработчик событий для открытия popup:
buttonEditProfile.addEventListener('click', () => {
  const dataUserInfo = userInfo.getUserInfo();
  profileNameInput.value = dataUserInfo.userName;
  profileOccupationInput.value = dataUserInfo.userOccupation;
  profileFormValidator.resetValidation();
  popupWithFormProfile.open();
});

buttonAddPlace.addEventListener('click', () => {
  newCradFormValidator.disableButton();
  newCradFormValidator.resetValidation();
  popupWithFormPlace.open();
});

//Функция создания карточки
function createCard(item) {
  const card = new Card(item, '.place-template', handleCardClick);
  const cardElement = card.generateCard();
  section.addItem(cardElement);
}

//Функция добавления карточки  +
function addCard(card) {
  const section = new Section(
    { items: card, renderer: createCard },
    containerSelector
  );
  section.renderItems();
}

// //Добавление 6 первых карточек +
const section = new Section(
  { items: initialCards, renderer: createCard },
  containerSelector
);
section.renderItems();
