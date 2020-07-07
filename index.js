"use strict";

(async function () {
  const showNewCardPopUpButton = document.querySelector(".user-info__button");
  const showProfileEditor = document.querySelector(".user-info__edit-button");
  const closeImageButton = document.querySelector("#close-image");
  const imageContent = document.querySelector(".popup__image-content");
  const { new: formNewCardPopup, bio: formBioPopup } = document.forms;
  const closePopUpButtonNew = document.querySelector("#close-new");
  const closePopUpButtonBio = document.querySelector("#close-bio");
  const popup = document.querySelector(".popup");
  const userName = document.querySelector(".user-info__name");
  const userJob = document.querySelector(".user-info__job");
  const userAvatar = document.querySelector(".user-info__photo");
  const biggerImage = document.querySelector(".popup__image-link");

  const cohortId = "cohort11";
  const token = "caffd67b-3792-447a-8734-73a9aba7e2ea";
  const baseUrl = "https://praktikum.tk/";
  const spinner = document.querySelector(".spinner");

  function hidePreloader() {
    spinner.classList.add("spinner_hidden");
  }

  function createApi() {
    return new Api(cohortId, token, baseUrl);
  }

  function createCard(link, name, imageContent, closeImageButton, imagePopup) {
    return new Card(link, name, imageContent, closeImageButton, imagePopup);
  }

  function createPopup(content) {
    return new Popup(popup, content);
  }

  function createImagePopup(trigger, closeButton, content) {
    return new ImagePopup(
      trigger,
      closeButton,
      content,
      biggerImage,
      createPopup
    );
  }

  function createUserInfo(userName, userJob, userAvatar) {
    return new UserInfo(userName, userJob, userAvatar, createApi);
  }

  function createFormValidator(form) {
    return new FormValidator(form);
  }

  const cardList = new CardList(
    document.querySelector(".places-list"),
    createCard,
    imageContent,
    closeImageButton,
    createImagePopup,
    createApi
  );

  /*
    Надо исправить: обрабтка ошибок должна быть здесь
    Если используется async/await она делается с помощью try catch

    try {
        await cardList.getCards();
        ....... рендерим карточки, скрываем прелоудер
    } catch (e) {
        .... обрабатываем ошибку
    }

  */

  try {
    await cardList.getCards();
    hidePreloader();
    cardList.render();
  } catch (err) {
    console.log(`Couldn't get cards from server: ${err}`);
  }

  const formBio = new FormBio(
    showProfileEditor,
    formBioPopup.parentNode,
    closePopUpButtonBio,
    createPopup,
    createFormValidator,
    createUserInfo,
    userName,
    userJob,
    userAvatar,
    createApi
  );
  formBio.setEventListeners();

  const formNewCard = new FormNewCard(
    showNewCardPopUpButton,
    formNewCardPopup.parentNode,
    closePopUpButtonNew,
    createPopup,
    createFormValidator,
    createCard,
    cardList,
    imageContent,
    closeImageButton,
    createImagePopup
  );
  formNewCard.setEventListeners();
})();

/*
  Неплохая работа, класс Api создан, запросы на сервер выполняются. Но к организации кода есть замечания:

  Надо исправить:
  - для проверки корректности выполнения запроса использовать res.ok, и возвращать
  отклоненный промис если res.ok===false
  - класс Api не должен взаимодействовать со страницей
  - убрать из методов класса Api обработку ошибок блоком catch
  - обработка ошибок должна быть там, где запрос к серверу производится, т.е. в классах FormBio и FormNewCard
  - при отправке данных пользователя нужно использовать данные которые вернул сервер, а не делать запрос ещё раз
  - закрывать попап, очищать форму и т.д. только если запрос на сервер выполнился успешно

  Можно лучше: 
  - проверка ответа сервера и преобразование из json
  дублируется во всех методах класса Api, лучше вынести в отдельный метод
  - блок then((result) => {return result; }) не имеет смысла т.к. возвращает то же самое что и получил

  Мне показалось, что Вы ещё не полностью освоились с async/await и если при исправлении замечаний
  возникнут сложности лучше воспользуйтесь промисами

*/

/** REVIEW:
 *
 * В целом по работе:
 *
 * Все критические ошибки были исправлены, отличная работа! Спасибо за усилия и старания, удачи в следующем спринте
 * и успехов в дальнейшем обучении
 *
 * Можно лучше: 1) Реализовать закрытие попапов по клику на Escape
 * 3) Функцию появления/скрытия модального окна можно представить одной функцией. Для этого функция переключения
 * модального окна должна принимать минимум один параметр - модальное окно, которое требуется открыть.
 * Повесьте слушатели событий точечно на необходимые кнопки: открытия и закрытия модального окна. Внутри этого
 * слушателя вызывайте функцию переключения модального окна. В качестве параметра передайте то модальное окно,
 * к которому относится кнопка открытия или закрытия модального окна. Вместо classList.add()/.remove() удобно
 * использовать classList.toggle() - для класса Popup
 */
