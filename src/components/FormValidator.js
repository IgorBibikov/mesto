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
  disableButton() {
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
    } else {
      this._hideInputError(input);
    }
  }

  // //Отображение ошибки
  _showInputError(input) {
    this._errorTextElement.textContent = input.validationMessage;
    this._errorTextElement.classList.add(this._config.activeErrorClass);
    input.classList.add(this._config.inputErrorClass);
  }
  // //Функция скрытия ошибки
  _hideInputError(input) {
    this._errorTextElement.classList.remove(this._config.activeErrorClass);
    this._errorTextElement.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
  }
  _hasInvalidInput() {
    return Array.from(this._inputList).some((input) => !input.validity.valid);
  }
  //Функция изменения состояния кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  }
  // // Функция слушателя событи
  _setEventListerens() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', (e) => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }
  //Очистка формы и состояние кнопки
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      this._checkInputValidity(input);
      this._hideInputError(input);
    });
  }
  // Функция проверки формы на валидность
  enableValidation() {
    this._setEventListerens();
  }
}
