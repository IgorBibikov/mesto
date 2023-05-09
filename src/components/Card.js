export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleRemoveIconClick,
    hendleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveIconClick = handleRemoveIconClick;
    this._hendleLikeClick = hendleLikeClick;
    this._likes = data.likes;
    this._cardId = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
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
    this.setLikes(this._likes);
    if (this._ownerId !== this._userId) {
      this._placeRemoveButtom.classList.add('place__remove-button_hidden');
    }

    return this._newCard;
  }

  // Поиск среди  юзеров лайнувших карту
  isLiked() {
    const userHasLikeCard = this._likes.find(
      (user) => user._id === this._userId
    );

    return userHasLikeCard;
  }
  //Удаление карточки
  hendleRemoveCard() {
    this._newCard.remove();
    this._newCard = null;
  }
  // Добавление закрашивания лайка
  _hendleAddLike() {
    this._placeLike.classList.add('place__like_active');
  }
  // Удаление закрашивания лайка
  _hendleRemoveLike() {
    this._placeLike.classList.remove('place__like_active');
  }

  setLikes(likes) {
    this._likes = likes;
    const likeSumElement = this._newCard.querySelector('.place__sum-likes');
    likeSumElement.textContent = this._likes.length;

    if (this.isLiked()) {
      this._hendleAddLike();
    } else {
      this._hendleRemoveLike();
    }
  }

  _setEventListeners() {
    //Добавление слушателя для открытия попап с картинкой
    this._imageButton.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    //Добавление слушателя для добавления лайка
    this._placeLike.addEventListener('click', () => {
      // this._hendleAddLike();
      this._hendleLikeClick(this._cardId);
    });
    //Добавление слушателя для удаления карточек
    this._placeRemoveButtom.addEventListener('click', () => {
      this._handleRemoveIconClick(this._cardId);

      // this._hendleRemoveCard();
    });
  }
}
