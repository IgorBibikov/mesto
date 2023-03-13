const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupPlace = document.querySelector('.popup_type_place');
const popupImage = document.querySelector('.popup_type_image');

const placeTemplate = document.querySelector('.place-template').content;
const cardsContainer = document.querySelector('.places');

const bigFoto = document.querySelector('.popup__big-foto');
const bigFotoTitle = document.querySelector('.popup__image-title');

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

//Функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Обработчик событий для открытия popup:
editProfileButton.addEventListener('click', function () {
  openPopup(popupProfile);
  profileNameInput.value = profileNameElement.textContent;
  profileOccupationInput.value = profileOccupationElement.textContent;
});
addPlaceButton.addEventListener('click', function () {
  openPopup(popupPlace);
});

// Обработчик событий для закрытия popup:
popupCloseButtons.forEach(function (closeButton) {
  const popup = closeButton.closest('.popup');
  closeButton.addEventListener('click', function () {
    closePopup(popup);
  });
});

// Функция «отправки» формы профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  closePopup(popupProfile);

  //Новые значения из input в profile
  profileNameElement.textContent = profileNameInput.value;
  profileOccupationElement.textContent = profileOccupationInput.value;
}
// Обработчик событий при отправке формы профиля:
formProfileElement.addEventListener('submit', handleFormSubmitProfile);

// Функция создания карточек
function createCard(card) {
  const newCard = placeTemplate.querySelector('.place').cloneNode(true);
  const placeTitle = newCard.querySelector('.place__title');
  const placeFoto = newCard.querySelector('.place__foto');
  const placeRemoveButtom = newCard.querySelector('.place__remove-button');
  const imageButton = newCard.querySelector('.place__foto');
  placeTitle.textContent = card.name;
  placeFoto.setAttribute('src', card.link);
  placeFoto.setAttribute('alt', `Фотография ${card.name}`);
  placeRemoveButtom.addEventListener('click', hendleRemoveCard);
  // ОТкрытие попап
  imageButton.addEventListener('click', function () {
    openPopup(popupImage);
    bigFoto.setAttribute('src', card.link);
    bigFoto.setAttribute('alt', `Фотография ${card.name}`);
    bigFotoTitle.textContent = card.name;
  });
  newCard
    .querySelector('.place__like')
    .addEventListener('click', function (evt) {
      evt.target.classList.toggle('place__like_active');
    });
  return newCard;
}
//Функция добавления карточки
function addCard(card, cardsContainer) {
  const newCardElement = createCard(card);
  cardsContainer.prepend(newCardElement);
}

initialCards.forEach(function (data) {
  addCard(data, cardsContainer);
});

// Функция удаления карточек
function hendleRemoveCard(event) {
  const button = event.target;
  const place = button.closest('.place');
  place.remove();
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
}
// Обработчик событий при отправке формы профиля:

formPlaceElement.addEventListener('submit', handleFormSubmitPlace);
