export default class FormNewCard {
  constructor(
    trigger,
    content,
    closeButton,
    createPopup,
    createFormValidator,
    createCard,
    cardList,
    imageContent,
    closeImageButton,
    createImagePopup
  ) {
    this.trigger = trigger;
    this.popup = createPopup(content);
    this.createImagePopup = createImagePopup;
    this.closeButton = closeButton;
    this.createPopup = createPopup;
    this.form = content.querySelector("form");
    this.createCard = createCard;
    this.cardList = cardList;

    this.formValidator = createFormValidator(this.form);
    this.formValidator.setEventListeners();

    this.imageContent = imageContent;
    this.closeImageButton = closeImageButton;
  }

  setEventListeners = () => {
    this.trigger.addEventListener("click", () => {
      this.popup.open();
    });

    this.closeButton.addEventListener("click", () => {
      this.popup.close();
      this.formValidator.resetErrorMessage();
      this.form.reset();
    });

    this.form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const { name, link } = this.form.elements;

      const card = this.createCard(
        link.value,
        name.value,
        this.imageContent,
        this.closeImageButton,
        this.createImagePopup
      );

      try {
        await this.cardList.uploadCard(card);

        this.popup.close();

        const submitButton = this.form.querySelector(".button");
        submitButton.setAttribute("disabled", true);
        submitButton.classList.remove("popup__button_enabled");

        this.form.reset();
      } catch (err) {
        console.log(`Couldn't add card to the server: ${err}`);
      }
    });
  };
}
