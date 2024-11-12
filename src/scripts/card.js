import {initialCards} from "./cards.js";
import {popupImageCard} from "./index.js";

const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function likeCard(evt) {
    evt.target.classList.add("card__like-button_is-active");
  }

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

function createCard(imageSource, textDescription, deleteCard, likeCard, popupImageCard) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const ImageCard = card.querySelector(".card__image");
  ImageCard.src = imageSource;
  ImageCard.alt = `Фотография: ${textDescription}`;
  card.querySelector(".card__title").textContent = textDescription;
  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCard);
  ImageCard.addEventListener("click", popupImageCard);
  return card;
}

export function renderCard(imageSource, textDescription) {
  cardList.prepend(createCard(imageSource, textDescription, deleteCard, likeCard, popupImageCard));
}

initialCards.reverse().forEach(function (element) {
  renderCard(element.link, element.name);
});