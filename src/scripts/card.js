import {likeCardServer, delteLikeCardServer} from "./api";
const cardTemplate = document.querySelector("#card-template").content;

export function likeCard(likeButton, cardLikesNumber, cardId) {
  if (!likeButton.classList.contains("card__like-button_is-active")){
  likeCardServer(cardId)
  .then((res) => {
    likeButton.classList.toggle("card__like-button_is-active");
    cardLikesNumber.textContent = res.likes.length;
  });
  }
  else {
    delteLikeCardServer(cardId)
    .then((res) => {
      likeButton.classList.toggle("card__like-button_is-active");
      cardLikesNumber.textContent = res.likes.length;
    });
  }
  }

export function deleteCard(card) {
  card.remove();
}

export function createCard(cardData, cardActions) {
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
  deleteButton.addEventListener("click", () => cardActions.popupDelete(card, cardId));
  likeButton.addEventListener("click", () => cardActions.likeCard(likeButton, cardLikesNumber, cardId));
  imageCard.addEventListener("click", () => cardActions.popupImageCard(cardData.link, cardData.name));
  if (cardData.owner._id !== '711ebd9e5cdf0338097fb87c') {
    deleteButton.style.display = 'none';
  };
  cardData.likes.some(like => {
    if (like._id === '711ebd9e5cdf0338097fb87c') {
        likeButton.classList.toggle("card__like-button_is-active");
        return true;
    }
    return false;
});
  return card;
}