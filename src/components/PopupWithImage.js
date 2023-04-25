import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._bigFoto = document.querySelector('.popup__big-foto');
    this._bigFotoTitle = document.querySelector('.popup__image-title');
  }
  open(data) {
    this._name = data.name;
    this._link = data.link;
    this._popupSelector.classList.add('popup_opened');
    this._bigFoto.setAttribute('src', this._link);
    this._bigFoto.setAttribute('alt', `Фотография ${this._name}`);
    this._bigFotoTitle.textContent = this._name;
  }
}
