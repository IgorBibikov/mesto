const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup-profile');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
const popupPlace = document.querySelector('.popup-place');
const popupImage = document.querySelector('.popup-image');

const bigFoto = document.querySelector('.popup-image__big-foto');
const bigFotoTitle = document.querySelector('.popup-image__title');

// Находим форму в DOM
const formProfileElement = document.querySelector('.popup__form_type_profile');
const formPlaceElement = document.querySelector('.popup__form_type_place');
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

const placeNameElement = document.querySelector('.place__title');
const placeLinkElement = document.querySelector('.place__foto');

//Функция открытия popup
function popupOpened(popup) {
  popup.classList.add('popup_opened');
}

// Обработчик событий для открытия popup:
editProfileButton.addEventListener('click', function () {
  popupOpened(popupProfile);
  profileNameInput.value = profileNameElement.textContent;
  profileOccupationInput.value = profileOccupationElement.textContent;
});
addPlaceButton.addEventListener('click', function () {
  popupOpened(popupPlace);
});

// Функция закрытия popup
function popupClosed() {
  popupProfile.classList.remove('popup_opened');
  popupPlace.classList.remove('popup_opened');
  popupImage.classList.remove('popup_opened');
}

// Обработчик событий для закрытия popup:
popupCloseButton.forEach(function (CloseButton) {
  CloseButton.addEventListener('click', popupClosed);
});

// Функция «отправки» формы профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  popupClosed();
  console.log('Форма отправлена');

  //Новые значения из input в profile
  profileNameElement.textContent = profileNameInput.value;
  profileOccupationElement.textContent = profileOccupationInput.value;
}
// Обработчик событий при отправке формы профиля:
formProfileElement.addEventListener('submit', handleFormSubmit);

// Массив данных карточек

const initialCards = [
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

const places = document.querySelector('.places');
// Функция добавления карточек
function createCard(card) {
  const newCard = document
    .querySelector('.place-template')
    .content.cloneNode(true);
  const placeTitle = newCard.querySelector('.place__title');
  placeTitle.textContent = card.name;

  const placeFoto = newCard.querySelector('.place__foto');
  placeFoto.setAttribute('src', card.link);
  placeFoto.setAttribute('alt', `Фотография ${card.name}`);
  const placeRemoveButtom = newCard.querySelector('.place__remove-button');
  placeRemoveButtom.addEventListener('click', hendeleRemoveCard);
  // ОТкрытие попап
  const imageButton = newCard.querySelector('.place__foto');
  imageButton.addEventListener('click', function () {
    popupOpened(popupImage);
    bigFoto.setAttribute('src', card.link);
    bigFoto.setAttribute('alt', `Фотография ${card.name}`);
    bigFotoTitle.textContent = card.name;
  });

  newCard
    .querySelector('.place__like')
    .addEventListener('click', function (evt) {
      evt.target.classList.toggle('place__like_active');
      console.log('НАЖАТ ЛАЙК');
    });
  places.prepend(newCard);
}

initialCards.forEach(createCard);
// Функция удаления карточек
function hendeleRemoveCard(event) {
  const button = event.target;
  const place = button.closest('.place');
  place.remove();
}
// Функция «отправки» формы карточек
function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  popupClosed();
  console.log('Форма отправлена');

  //Новые значения из input в place
  const name = placeNameInput.value;
  const link = placeLinkInput.value;
  const card = {
    name: name,
    link: link,
  };
  createCard(card);
}
// Обработчик событий при отправке формы профиля:

formPlaceElement.addEventListener('submit', handleFormSubmitPlace);
