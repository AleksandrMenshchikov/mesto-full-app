const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor(address) {
    this._address = address;
  }

  getAppInfo() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  getCardList() {
    return fetch(`${this._address}/cards`, {
      credentials: `include`,
    })
      .then(getResponse);
  }

  addCard({
    name,
    link
  }) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
      credentials: `include`,
    })
      .then(getResponse);
  }

  removeCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: `include`,
    })
      .then(getResponse);
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: `include`,
    })
      .then(getResponse);
  }

  setUserInfo({
    name,
    about
  }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      }),
      credentials: `include`,
    })
      .then(getResponse);
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar,
      }),
      credentials: `include`,
    })
      .then(getResponse);
  }

  changeLikeCardStatus(cardId, like) {

    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: `include`,
    })
      .then(getResponse);
  }

  register(email, password) {
    return fetch(`${this._address}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(getResponse);
  }

  login(email, password) {
    return fetch(`${this._address}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
      credentials: `include`,
    })
      .then(getResponse)
  }

  checkToken() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: `include`,
    })
      .then(getResponse);
  }

  crash() {
    return fetch(`${this._address}/crash-test`, {
      method: 'GET'
    })
      .then(getResponse);
  }

  signout() {
    return fetch(`${this._address}/users/signout`, {
      method: 'GET',
      credentials: `include`,
    })
      .then(getResponse);
  }
}

// Замените на адрес вашего бэкенда
const api = new Api(`${process.env.NODE_ENV !== 'development'
  ? 'https://api.mesto-app.website'
  : 'http://localhost:4000'}`);

export default api;
