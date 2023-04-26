import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  initialCards,
  config,
  buttonEditProfile,
  buttonAddPlace,
  containerSelector,
  formProfileElement,
  formPlaceElement,
} from '../utils/constants.js';

// Создание экземпляра класса валидации формы профиля
const profileFormValidator = new FormValidator(config, formProfileElement);
profileFormValidator.enableValidation();
// Создание экземпляра класса  валидации формы карточек
const newCradFormValidator = new FormValidator(config, formPlaceElement);
newCradFormValidator.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

// Функция открытия попап с картинкой
function handleCardClick(name, link) {
  popupWithImage.open({ name, link });
}
// Создание экземпляра класса для попапа формы профиля
const popupWithFormProfile = new PopupWithForm(
  '.popup_type_profile',
  handleFormSubmitProfile
);
popupWithFormProfile.setEventListeners();

// Создание экземпляра класса для попапа формы добавления карточек
const popupWithFormPlace = new PopupWithForm(
  '.popup_type_place',
  handleFormSubmitPlace
);
popupWithFormPlace.setEventListeners();

// Создание экземпляра класса информации профиля
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userOccupationSelector: '.profile__subtitle',
});
// Функция «отправки» формы профиля
function handleFormSubmitProfile(data) {
  userInfo.setUserInfo(data.name, data.occupation);
}
// Функция «отправки» формы карточек
function handleFormSubmitPlace(data) {
  //Новые значения из input в place
  const name = data.place;
  const link = data.link;
  const card = { name: name, link: link };
  createCard(card);
}

// Обработчик событий для открытия popup редактирования профиля:
buttonEditProfile.addEventListener('click', () => {
  const dataUserInfo = userInfo.getUserInfo();
  const name = dataUserInfo.userName;
  const occupation = dataUserInfo.userOccupation;
  popupWithFormProfile.setInputValues({ name, occupation });
  profileFormValidator.resetValidation();
  popupWithFormProfile.open();
});
// Обработчик событий для открытия popup добавления карточки:
buttonAddPlace.addEventListener('click', () => {
  newCradFormValidator.resetValidation();
  popupWithFormPlace.open();
});

//Функция добавления карточки
function createCard(item) {
  const cardElement = getCard(item);
  section.addItem(cardElement);
}
// функция создания карточки
function getCard(item) {
  const card = new Card(item, '.place-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// //Добавление 6 первых карточек +
const section = new Section(
  { items: initialCards, renderer: createCard },
  containerSelector
);
section.renderItems();
