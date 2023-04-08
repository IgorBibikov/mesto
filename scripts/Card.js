export class Card {
  constructor(
    data,
    templateSelector,
    opemPopupBigImage,
    hendleAddLike,
    hendleRemoveCard
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._opemPopupBigImage = opemPopupBigImage;
    this._hendleAddLike = hendleAddLike;
    this._hendleRemoveCard = hendleRemoveCard;
  }
  // Получаем темплейт
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.place')
      .cloneNode(true);
    return cardElement;
  }
  //Создание карточки
  generateCard() {
    this._newCard = this._getTemplate();
    this._newCard.querySelector('.place__title').textContent = this._name;
    this._imageButton = this._newCard.querySelector('.place__foto');
    this._placeRemoveButtom = this._newCard.querySelector(
      '.place__remove-button'
    );
    this._placeLike = this._newCard.querySelector('.place__like');
    this._imageButton.setAttribute('src', this._link);
    this._imageButton.setAttribute('alt', `Фотография ${this._name}`);
    this._setEventListeners();
    return this._newCard;
  }
  _setEventListeners() {
    //Добавление слушателя для открытия попап с картинкой
    this._imageButton.addEventListener('click', () => {
      this._opemPopupBigImage(this._name, this._link);
    });
    //Добавление слушателя для добавления лайка
    this._placeLike.addEventListener('click', () => {
      this._hendleAddLike(this._placeLike);
    });
    //Добавление слушателя для удаления карточек
    this._placeRemoveButtom.addEventListener('click', () => {
      this._hendleRemoveCard(this._placeRemoveButtom);
    });
  }
}
