const cardTemplate = document.querySelector("#card-template").content;

export function deleteCard(card) {
  card.remove();
}

export function createCard(cardData, cardActions, userId) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const imageCard = card.querySelector(".card__image");
  const cardLikesNumber = card.querySelector('.card__likes-counter');
  const cardId = cardData._id;
  imageCard.src = cardData.link;
  imageCard.alt = `Фотография: ${cardData.name}`;
  cardLikesNumber.textContent = cardData.likes.length;
  card.querySelector(".card__title").textContent = cardData.name;
  likeButton.addEventListener("click", () => cardActions.likeCard(likeButton, cardLikesNumber, cardId));
  imageCard.addEventListener("click", () => cardActions.openPopupImageCard(cardData.link, cardData.name));
  if (cardData.owner._id !== userId) {
    deleteButton.style.display = 'none';
  }
  else {
    deleteButton.addEventListener("click", () => cardActions.openPopupDelete(card, cardId));
  };
  if(cardData.likes.some(like => like._id === userId)){ 
    likeButton.classList.add("card__like-button_is-active"); 
};
  return card;
}