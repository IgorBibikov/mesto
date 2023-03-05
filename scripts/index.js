let editProfileButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let profileNameInput = document.querySelector('.popup__input_type_name');
let profileOccupationInput = document.querySelector(
  '.popup__input_type_occupation'
);
// Выберите элементы, куда должны быть вставлены значения полей
let profileNameElement = document.querySelector('.profile__name');
let profileOccupationElement = document.querySelector('.profile__subtitle');
//Функция открытия popup
function popupOpened() {
  popup.classList.add('popup_opened');
  profileNameInput.value = profileNameElement.textContent;
  profileOccupationInput.value = profileOccupationElement.textContent;
}
// Обработчик событий для открытия popup:
editProfileButton.addEventListener('click', popupOpened);

// Функция закрытия popup
function popupClosed() {
  popup.classList.remove('popup_opened');
}
// Обработчик событий для закрытия popup:
popupCloseButton.addEventListener('click', popupClosed);

// Функция «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  popupClosed();
  console.log('Форма отправлена');

  //Новые значения из input в profile
  profileNameElement.textContent = profileNameInput.value;
  profileOccupationElement.textContent = profileOccupationInput.value;
}
// Обработчик событий при отправке формы:
formElement.addEventListener('submit', handleFormSubmit);
