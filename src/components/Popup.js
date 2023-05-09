export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(
      '.popup__close-button'
    );
    this._submitButton = this._popupElement.querySelector(
      '.popup__submit-button'
    );
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose = (evt) => {
    if (evt.code === 'Escape') {
      this.close();
    }
  };
  _handleOverlayClose(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение';
    } else {
      this._submitButton.textContent = 'Сохранение...';
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._popupElement.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    });
  }
}
