import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._bigFoto = this._popupElement.querySelector('.popup__big-foto');
    this._bigFotoTitle = this._popupElement.querySelector(
      '.popup__image-title'
    );
  }
  open(data) {
    this._name = data.name;
    this._link = data.link;
    this._bigFoto.setAttribute('src', this._link);
    this._bigFoto.setAttribute('alt', `Фотография ${this._name}`);
    this._bigFotoTitle.textContent = this._name;
    super.open();
  }
}
