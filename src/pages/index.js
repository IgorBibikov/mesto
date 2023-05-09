import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import {
  config,
  buttonEditProfile,
  buttonAddPlace,
  containerSelector,
  formProfileElement,
  formPlaceElement,
  formUpdateElement,
  buttonUpdateAvatar,
  profileAvatar,
} from '../utils/constants.js';

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-65');
let userId;
// Отображение данных пользователя при первой загрузке страницы +1
api
  .getProfileData()
  .then((res) => {
    const name = res.name;
    const occupation = res.about;
    const avatar = res.avatar;
    userId = res._id;
    userInfo.setUserInfo(name, occupation);
    profileAvatar.setAttribute('src', avatar);
  })
  // Отображение карточек при первой загрузке страницы (после получения userId )
  .then(() => {
    api
      .getInitialCards()
      .then((res) => {
        return res.reverse();
      })
      .then((res) => {
        section.renderItems(res);
      })
      .catch((err) => {
        console.error(`WARNING ${err}`);
      });
  })
  .catch((err) => {
    console.error(`WARNING ${err}`);
  });

// Создание экземпляра класса валидации формы профиля
const profileFormValidator = new FormValidator(config, formProfileElement);
// Создание экземпляра класса  валидации формы карточек
const newCradFormValidator = new FormValidator(config, formPlaceElement);
// Создание экземпляра класса  валидации формы редактирования аватара
const updateAvatarFormValidator = new FormValidator(config, formUpdateElement);

// Вызов методов валидации всех форм
profileFormValidator.enableValidation();
newCradFormValidator.enableValidation();
updateAvatarFormValidator.enableValidation();

// Создание экземпляра класса попапа с картринкой
const popupWithImage = new PopupWithImage('.popup_type_image');
// Создание экземпляра класса для попапа формы профиля
const popupWithFormProfile = new PopupWithForm(
  '.popup_type_profile',
  handleFormSubmitProfile
);
// Создание экземпляра класса для попапа формы добавления карточек
const popupWithFormPlace = new PopupWithForm(
  '.popup_type_place',
  handleFormSubmitPlace
);
// Создание экземпляра класса для попапа редактирования аватара
const popupWithFormUpdate = new PopupWithForm(
  '.popup_type_update',
  handleFormSubmitAvatar
);
// Создание экземпляра класса для попапа подтверждения удаления карточки карточи
const popupWithConfirm = new PopupWithConfirm('.popup_type_confirm');

// Вызов методов методов установки слушателей всех попапов
popupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormPlace.setEventListeners();
popupWithFormUpdate.setEventListeners();
popupWithConfirm.setEventListeners();

// Функция открытия попап с картинкой
function handleCardClick(name, link) {
  popupWithImage.open({ name, link });
}

// функция создания карточки
function getCard(item) {
  const card = new Card(
    item,
    userId,
    '.place-template',
    handleCardClick,
    (id) => {
      popupWithConfirm.open();
      popupWithConfirm.changeHandleFormSubmit(() => {
        api
          .removeCard(id)
          .then(() => {
            card.hendleRemoveCard();
          })
          .then(() => {
            popupWithConfirm.close();
          })
          .catch((err) => {
            console.error(`WARNING ${err}`);
          });
      });
    },
    (id) => {
      if (card.isLiked()) {
        api
          .removeLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.error(`WARNING ${err}`);
          });
      } else {
        api
          .addLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.error(`WARNING ${err}`);
          });
      }
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// Создание экземпляра класса информации профиля
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userOccupationSelector: '.profile__subtitle',
});

// Функция «отправки» формы профиля ---+++---
function handleFormSubmitProfile(data) {
  popupWithFormProfile.renderLoading(false);
  api
    .editProfileData({
      name: data.name,
      about: data.occupation,
    })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
    })
    .then(() => {
      popupWithFormProfile.close();
    })
    .catch((err) => {
      console.error(`WARNING ${err}`);
    })
    .finally(() => {
      popupWithFormProfile.renderLoading(true);
    });
}

// Функция «отправки» формы карточек ---+++---
function handleFormSubmitPlace(data) {
  popupWithFormPlace.renderLoading(false);
  api
    .addNewCard({
      name: data.place,
      link: data.link,
    })
    .then((res) => {
      createCard(res);
    })
    .then(() => {
      popupWithFormPlace.close();
    })
    .catch((err) => {
      console.error(`WARNING ${err}`);
    })
    .finally(() => {
      popupWithFormPlace.renderLoading(true);
    });
}
// Функция «отправки» формы редактирования аватара
function handleFormSubmitAvatar(data) {
  popupWithFormUpdate.renderLoading(false);
  api
    .setUserAvatar(data.update)
    .then((res) => {
      profileAvatar.setAttribute('src', res.avatar);
    })

    .then(() => {
      popupWithFormUpdate.close();
    })
    .catch((err) => {
      console.error(`WARNING ${err}`);
    })
    .finally(() => popupWithFormUpdate.renderLoading(true));
}

// Обработчик событий для открытия popup редактирования аватара:+++
buttonUpdateAvatar.addEventListener('click', () => {
  updateAvatarFormValidator.resetValidation();
  popupWithFormUpdate.open();
});

// Обработчик событий для открытия popup редактирования профиля:
buttonEditProfile.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  const name = data.userName;
  const occupation = data.userOccupation;
  popupWithFormProfile.setInputValues({ name, occupation });
  profileFormValidator.resetValidation();
  popupWithFormProfile.open();
});
// Обработчик событий для открытия popup добавления карточки:
buttonAddPlace.addEventListener('click', () => {
  newCradFormValidator.resetValidation();
  popupWithFormPlace.open();
});
// //Добавление первых карточек +
const section = new Section({ renderer: createCard }, containerSelector);

//Функция добавления карточки
function createCard(item) {
  const cardElement = getCard(item);
  section.addItem(cardElement);
}
