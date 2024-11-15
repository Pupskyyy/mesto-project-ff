import '../pages/index.css';
import {initialCards} from "./cards.js";
import {openModal, closeModal} from "./modal.js";
import {createCard, likeCard, deleteCard} from "./card.js";

const cardList = document.querySelector(".places__list");

const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupProfileEditForm = document.forms['edit-profile'];
const popupProfileEditName = popupProfileEditForm.elements.name;
const popupProfileEditDescription = popupProfileEditForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");

const popupCreateNewCard = document.querySelector(".popup_type_new-card");
const popupCreateNewCardForm = document.forms['new-place'];
const popupCreateNewCardName = popupCreateNewCardForm.elements['place-name'];
const popupCreateNewCardLink = popupCreateNewCardForm.elements.link;
const addCardButton = document.querySelector(".profile__add-button");

const popupImage = document.querySelector(".popup_type_image");
const popupImageURL = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

const cardActions = {
  popupImageCard,
  likeCard,
  deleteCard
};

function popupImageCard(cardLink, cardName) {
  popupImageURL.src = cardLink;
  popupImageURL.alt = `Фотография: ${cardName}`;
  popupImageCaption.textContent = cardName;
  openModal(popupImage);
}

function handleOverlayClick(evt, popup) {
  if (evt.target === popup || evt.target === popup.querySelector(".popup__close")) {
    closeModal(popup);
  }
}

popupProfileEdit.addEventListener("click", (evt) => handleOverlayClick(evt, popupProfileEdit));
popupCreateNewCard.addEventListener("click", (evt) => handleOverlayClick(evt, popupCreateNewCard));
popupImage.addEventListener("click", (evt) => handleOverlayClick(evt, popupImage));

profileEditButton.addEventListener("click", () => {
  popupProfileEditName.value = profileTitle.textContent;
  popupProfileEditDescription.value = profileDescription.textContent;
  openModal(popupProfileEdit);
});

addCardButton.addEventListener("click", () => {
  openModal(popupCreateNewCard);
});

function handlePopupProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupProfileEditName.value;
  profileDescription.textContent = popupProfileEditDescription.value;
  closeModal(popupProfileEdit);
}

popupProfileEditForm.addEventListener('submit', handlePopupProfileEditSubmit); 

function handlePopupAddCardSubmit(evt) {
  evt.preventDefault();
  const createCardData = {
    name: popupCreateNewCardName.value,
    link: popupCreateNewCardLink.value
  };
  renderCard(createCardData, cardActions);
  closeModal(popupCreateNewCard);
  popupCreateNewCardForm.reset();
}

popupCreateNewCardForm.addEventListener('submit', handlePopupAddCardSubmit); 

function renderCard(cardData, cardActions) {
  cardList.prepend(createCard(cardData, cardActions));
}

initialCards.reverse().forEach(function (element) {
  renderCard(element, cardActions);
});