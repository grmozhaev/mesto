class Api {
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
    return (
      fetch(`${this.baseUrl}/cards`, {
        headers: {
          authorization: `${this._token}`,
        },
      })
        /*
      Можно лучше: проверка ответа сервера и преобразование из json
      дублируется во всех методах класса Api, лучше вынести в отдельный метод:
        _getResponseData(res) {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
        }
      Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
      не используется вне класса Api   
    */
        .then((res) => {
          return this._getResponseData(res);
        })

      /*
      Надо исправить: здесь и далее для проверки кода ответа сервера лучше использовать res.ok
      и если res.ok === false возвращать отклоненный промис 

      if (!res.ok) {     //если запрос выполнился неудачно возвращаем отклоненный промис
						return Promise.reject(`Ошибка: ${res.status}`); 
			}
			return res.json(); //если res.ok===true возвращаем результат запроса
    */
      /*
          Надо исправить: класс Api не должен взаимодействовать со страницей
          Его методы могут использоваться в разных частях программы и не везде может
          быть необходимо отображать прелоудер. Класс Api должен делать запрос и возвращать
          ответ сервера. Нужно перенести скрытие прелоудера туда где запрос вызывается
        */
      /*
        Надо исправить: здесь и далее, из метода класса возвращается промис, и его обработка продолжается там, где метод
        класса Api был вызван. Получается обработчик catch который располагается здесь находится в 
        середине цепочки then. Он обработает ошибку и выполнение продолжится как будто ошибки 
        не было. Из за это например при ошибке запроса карточек с сервера падает ошибка:
        Uncaught (in promise) TypeError: Cannot read property 'forEach' of undefined
        т.е. несмотря на то что карточки с сервера не пришли, программа попыталась отрисовать их
        и упала с ошибкой, такое поведение не корректно.

        Поэтому нужно поместить блок catch только в самом конце цепочки
      */
    );
  }

  async getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `${this._token}`,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
    /* Можно лучше: этот блок не имеет смысла т.к. возвращает то же самое что и получил */
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
    /* Можно лучше: этот блок не имеет смысла т.к. возвращает то же самое что и получил */
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
    /* Можно лучше: этот блок не имеет смысла т.к. возвращает то же самое что и получил */
  }
}
