const cardTemplate = document.querySelector("#card-template").content;

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
  }

export function deleteCard(card) {
  card.remove();
}

export function createCard(cardData, cardActions) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const imageCard = card.querySelector(".card__image");
  imageCard.src = cardData.link;
  imageCard.alt = `Фотография: ${cardData.name}`;
  card.querySelector(".card__title").textContent = cardData.name;
  deleteButton.addEventListener("click", () => cardActions.deleteCard(card));
  likeButton.addEventListener("click", () => cardActions.likeCard(likeButton));
  imageCard.addEventListener("click", () => cardActions.popupImageCard(cardData.link, cardData.name));
  return card;
}