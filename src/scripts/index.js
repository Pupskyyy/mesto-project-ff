import '../pages/index.css';
import {openPopup, closePopup, currentPopup} from "./modal.js";
import {renderCard} from "./card.js";

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditForm = document.forms['edit-profile'];
const popupEditName = popupEditForm.elements.name;
const popupEditDescription = popupEditForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupCardForm = document.forms['new-place'];
const popupCardName = popupCardForm.elements['place-name'];
const popupCardLink = popupCardForm.elements.link;

const popupImage = document.querySelector(".popup_type_image");
const popupImageURL = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("profile__edit-button")) {
    popupEditName.value = profileTitle.textContent;
    popupEditDescription.value = profileDescription.textContent;
    openPopup(popupEdit);

  }
  else if (evt.target.classList.contains("profile__add-button")) {
    openPopup(popupNewCard);
  }
});

export function handleEscClose(evt) {
  if (evt.key === "Escape") {
    closePopup(currentPopup);
  }
}

export function handleOverlayClick(evt) {
  if (evt.target === currentPopup || evt.target.classList.contains("popup__close")) {
    closePopup(currentPopup);
  }
}

export function popupImageCard (evt){
  popupImageURL.src = evt.target.src;
  popupImageCaption.textContent = evt.target.closest(".card").querySelector(".card__title").textContent;
  openPopup(popupImage);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupEditName.value;
  profileDescription.textContent = popupEditDescription.value;
  closePopup(currentPopup);
}

popupEditForm.addEventListener('submit', handleFormSubmit); 

function handlecardSubmit(evt) {
  evt.preventDefault();
  renderCard(popupCardLink.value, popupCardName.value)
  closePopup(currentPopup);
  popupCardLink.value = "";
  popupCardName.value = "";
}

popupCardForm.addEventListener('submit', handlecardSubmit); 