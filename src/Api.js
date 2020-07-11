export default class Api {
  constructor(cohortId, token, baseUrl) {
    this._token = token;
    this.baseUrl = `${baseUrl}${cohortId}`;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  async getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: `${this._token}`,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  async getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `${this._token}`,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  async setUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  async addCard(link, name) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}
