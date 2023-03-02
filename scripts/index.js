// Открытие popup

let editProfileButton = document.querySelector(".edit-button");
if (!editProfileButton) {
  throw new Error("No editProfileButton");
}
let popup = document.querySelector(".popup");
editProfileButton.addEventListener("click", function () {
  popup.classList.remove("popup_closed");
});
// Закрытие popup
let popupCloseButton = document.querySelector(".popup__close-button");
if (!popupCloseButton) {
  throw new Error("No popupCloseButton");
}
popupCloseButton.addEventListener("click", function () {
  popup.classList.add("popup_closed");
});

// Находим форму в DOM
let formElement = document.querySelector(".popup__container");
// Находим поля формы в DOM
let profileNameInput = document.querySelector(".popup__name-input");
let profileOccupationInput = document.querySelector(".popup__text-input");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault();
  popup.classList.add("popup_closed");
  console.log("Форма отправлена");

  // Получите значение полей jobInput и nameInput из свойства value
  profileNameInput.value;
  profileOccupationInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  let profileNameElement = document.querySelector(".profile__name");
  let profileOccupationElement = document.querySelector(".profile__subtitle");

  // Вставьте новые значения с помощью textContent
  profileNameElement.textContent = profileNameInput.value;
  profileOccupationElement.textContent = profileOccupationInput.value;
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);
