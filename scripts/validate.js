//Функция отображения ошибки
const showInputError = (
  errorTextElement,
  validationMessage,
  activeErrorClass
) => {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(activeErrorClass);
};
//Функция скрытия ошибки
const hideInputError = (errorTextElement, activeErrorClass) => {
  errorTextElement.classList.remove(activeErrorClass);
  errorTextElement.textContent = '';
};
//Функция включения НЕАКТИВНОГО состояния кнопки
const disableButton = (submitButton, invalidSubmitButtonClass) => {
  submitButton.classList.add(invalidSubmitButtonClass);
  submitButton.desabled = true;
};
//Функция включения АКТИВНОГО состояния кнопки
const enableButton = (submitButton, validSubmitButtonClass) => {
  submitButton.classList.remove(validSubmitButtonClass);
  submitButton.desabled = false;
};
// Функция проверки ИНПУТОВ формы на валидность
const checkInputValidity = (
  input,
  errorClassTemplate,
  activeErrorClass,
  inputErrorClass
) => {
  const errorTextElement = document.querySelector(
    `${errorClassTemplate}${input.name}`
  );
  console.log(errorTextElement);
  console.log(input);
  if (!input.validity.valid) {
    showInputError(errorTextElement, input.validationMessage, activeErrorClass);
    input.classList.add(inputErrorClass);
  } else {
    hideInputError(errorTextElement, activeErrorClass);
    input.classList.remove(inputErrorClass);
  }
};
const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((input) => !input.validity.valid);
};
//Функция изменения состояния кнопки
const toggleButtonState = (
  submitButton,
  invalidSubmitButtonClass,
  inputList
) => {
  if (hasInvalidInput(inputList)) {
    disableButton(submitButton, invalidSubmitButtonClass);
  } else {
    enableButton(submitButton, invalidSubmitButtonClass);
  }
};

// Функция слушателя событи отправки формы
const setEventListerens = (
  form,
  inputList,
  errorClassTemplate,
  activeErrorClass,
  invalidSubmitButtonClass,
  submitButton,
  inputErrorClass
) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  inputList.forEach((input) => {
    input.addEventListener('input', (e) => {
      checkInputValidity(
        input,
        errorClassTemplate,
        activeErrorClass,
        inputErrorClass
      );
      toggleButtonState(submitButton, invalidSubmitButtonClass, inputList);
    });
  });
};
// Функция проверки формы на валидность
const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    setEventListerens(
      form,
      inputList,
      config.errorClassTemplate,
      config.activeErrorClass,
      config.invalidSubmitButtonClass,
      submitButton,
      config.inputErrorClass
    );
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassTemplate: '.popup__input-error_type_',
  activeErrorClass: 'popup__input-error',
  submitButtonSelector: '.popup__submit-button',
  invalidSubmitButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
});
