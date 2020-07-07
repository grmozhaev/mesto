class CardList {
  constructor(
    container,
    createCard,
    imageContent,
    closeImageButton,
    imagePopup,
    createApi
  ) {
    this.container = container;
    this.createCard = createCard;
    this.imageContent = imageContent;
    this.closeImageButton = closeImageButton;
    this.imagePopup = imagePopup;
    this.api = createApi();
  }

  addCard(card) {
    this.container.appendChild(card);
  }

  uploadCard(card) {
    this.addCard(card.create());
    return this.api.addCard(card.imageUrl, card.name);
  }

  async getCards() {
    this.cards = await this.api.getCards();
  }

  render() {
    this.cards.forEach((card) => {
      const newCard = this.createCard(
        card.link,
        card.name,
        this.imageContent,
        this.closeImageButton,
        this.imagePopup
      );
      this.addCard(newCard.create());
    });
  }
}
