export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeButton = this._popupSelector.querySelector(
      '.popup__close-button'
    );
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);

    console.log(this._popupSelector);
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.code === 'Escape') {
      this.close();
    }
  }
  _handleOverlayClose(evt) {
    if (evt.target === this._popupSelector) {
      this.close();
    }
  }
  setEventListeners() {
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._popupSelector.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    });
  }
}
