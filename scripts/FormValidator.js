export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    this._submitButton = this._form.querySelector(
      this._config.submitButtonSelector
    );
  }
  //Включение НЕАКТИВНОГО состояния кнопки
  _disableButton() {
    this._submitButton.classList.add(this._config.invalidSubmitButtonClass);
    this._submitButton.disabled = true;
  }
  //Включение АКТИВНОГО состояния кнопки
  _enableButton() {
    this._submitButton.classList.remove(this._config.invalidSubmitButtonClass);
    this._submitButton.disabled = false;
  }
  // Функция проверки ИНПУТОВ формы на валидность
  _checkInputValidity(input) {
    this._errorTextElement = document.querySelector(
      `${this._config.errorClassTemplate}${input.name}`
    );
    if (!input.validity.valid) {
      this._showInputError(input);
      input.classList.add(this._config.inputErrorClass);
    } else {
      this._hideInputError();
      input.classList.remove(this._config.inputErrorClass);
    }
  }
  // //Функция отображения ошибки
  _showInputError(input) {
    this._errorTextElement.textContent = input.validationMessage;
    this._errorTextElement.classList.add(this._config.activeErrorClass);
  }
  // //Функция скрытия ошибки
  _hideInputError() {
    this._errorTextElement.classList.remove(this._config.activeErrorClass);
    this._errorTextElement.textContent = '';
  }
  _hasInvalidInput() {
    return Array.from(this._inputList).some((input) => !input.validity.valid);
  }
  //Функция изменения состояния кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }
  // // Функция слушателя событи отправки формы
  _setEventListerens() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._inputList.forEach((input) => {
      input.addEventListener('input', (e) => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }
  // Функция проверки формы на валидность
  enableValidation() {
    this._setEventListerens();
  }
}
