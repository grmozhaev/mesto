class ImagePopup {
  constructor(trigger, closeButton, content, biggerImage, createPopup) {
    this.trigger = trigger;
    this.closeButton = closeButton;
    this.content = content;
    this.popup = createPopup(content);
    this.biggerImage = biggerImage;
  }

  setEventListeners = () => {
    this.trigger.addEventListener("click", () => {
      ImagePopup.openImage(this.trigger, this.biggerImage);
      this.popup.open();
    });

    this.closeButton.addEventListener("click", () => {
      this.popup.close();
    });
  };

  static openImage(trigger, biggerImage) {
    const pattern = /"([^"]*)"/;
    const imageUrl = trigger.style.backgroundImage.match(pattern)[1];

    biggerImage.setAttribute("src", imageUrl);
  }
}
