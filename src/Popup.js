export default class Popup {
  constructor(popup, content) {
    this.popup = popup;
    this.content = content;
  }

  open() {
    this.popup.classList.add("popup_is-opened");
    this.content.classList.add("popup__content_is-opened");
  }

  close() {
    this.popup.classList.remove("popup_is-opened");
    this.content.classList.remove("popup__content_is-opened");
  }
}
