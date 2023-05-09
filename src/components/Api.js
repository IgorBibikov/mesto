export class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._headers = {
      authorization: 'e725f469-9ad9-4c05-b58f-3c379e0514c5',
      'Content-Type': 'application/json',
    };
  }
  _checkRequestStatus(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      (res) => this._checkRequestStatus(res)
    );
  }
  editProfileData(user) {
    return fetch(`${this._baseUrl}/users/me `, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then((res) => this._checkRequestStatus(res));
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      (res) => this._checkRequestStatus(res)
    );
  }
  addNewCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((res) => this._checkRequestStatus(res));
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    }).then((res) => this._checkRequestStatus(res));
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    }).then((res) => this._checkRequestStatus(res));
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    }).then((res) => this._checkRequestStatus(res));
  }

  setUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._checkRequestStatus(res));
  }
}
