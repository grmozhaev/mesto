import "./pages/index.css";
import Api from "./Api";
import Card from "./Card";
import CardList from "./CardList";
import Popup from "./Popup";
import ImagePopup from "./ImagePopup";
import UserInfo from "./UserInfo";
import FormValidator from "./FormValidator";
import FormBio from "./FormBio";
import FormNewCard from "./FormNewCard";

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

  const isDev = process.env.NODE_ENV === "development";

  const cohortId = "cohort11";
  const token = "caffd67b-3792-447a-8734-73a9aba7e2ea";
  const baseUrl = isDev ? "http://praktikum.tk/" : "https://praktikum.tk/";
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
