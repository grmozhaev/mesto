class Card {
  constructor(
    imageUrl,
    name,
    imageContent,
    closeImageButton,
    createImagePopup
  ) {
    this.imageUrl = imageUrl;
    this.name = name;
    this.imageContent = imageContent;
    this.closeImageButton = closeImageButton;
    this.createImagePopup = createImagePopup;
  }

  like(event) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }

  remove(event) {
    event.stopPropagation();
    this.cardElement.remove();
    this.removeEventListeners();
  }

  setEventListeners = () => {
    this.likeButton.addEventListener("click", this.like);
    this.deleteButton.addEventListener("click", (event) => this.remove(event));
  };

  removeEventListeners = () => {
    this.likeButton.removeEventListener("click", this.like);
    this.deleteButton.removeEventListener("click", (event) =>
      this.remove(event)
    );
  };

  create() {
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");

    const placeImage = document.createElement("div");
    placeImage.classList.add("place-card__image");
    placeImage.setAttribute(
      "style",
      `background-image: url(${this.imageUrl});`
    );

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("place-card__delete-icon");
    this.deleteButton = deleteButton;

    placeImage.appendChild(deleteButton);

    const placeDescription = document.createElement("div");
    placeDescription.classList.add("place-card__description");

    const placeName = document.createElement("h3");
    placeName.textContent = this.name;

    const likeButton = document.createElement("button");
    likeButton.classList.add("place-card__like-icon");
    this.likeButton = likeButton;

    placeDescription.appendChild(placeName);
    placeDescription.appendChild(likeButton);

    placeCard.appendChild(placeImage);
    placeCard.appendChild(placeDescription);

    const imagePopup = this.createImagePopup(
      placeImage,
      this.closeImageButton,
      this.imageContent
    );

    imagePopup.setEventListeners();

    this.cardElement = placeCard;
    this.setEventListeners();
    return placeCard;
  }
}
