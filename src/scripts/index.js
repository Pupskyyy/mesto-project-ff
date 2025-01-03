import '../pages/index.css';
import {openModal, closeModal} from "./modal.js";
import {createCard, deleteCard} from "./card.js";
import {enableValidation, clearValidation} from "./validation.js";
import {patchInitialCards, patchProfileData, patchProfileImage, getInitialUser, getInitialCards, deleteCardServer, likeCardServer, deleteLikeCardServer} from "./api.js";

const cardList = document.querySelector(".places__list");

const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupProfileEditForm = document.forms['edit-profile'];
const popupProfileEditName = popupProfileEditForm.elements.name;
const popupProfileEditDescription = popupProfileEditForm.elements.description;
const popupProfileEditSubmitButton = popupProfileEditForm.querySelector('[type="submit"]');
const popupProfileEditSubmitButtonText = popupProfileEditSubmitButton.textContent;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const profileEditButton = document.querySelector(".profile__edit-button");

const popupCreateNewCard = document.querySelector(".popup_type_new-card");
const popupCreateNewCardForm = document.forms['new-place'];
const popupCreateNewCardName = popupCreateNewCardForm.elements['place-name'];
const popupCreateNewCardLink = popupCreateNewCardForm.elements.link;
const popupCreateNewCardSubmitButton = popupCreateNewCardForm.querySelector('[type="submit"]');
const popupCreateNewCardSubmitButtonText = popupCreateNewCardSubmitButton.textContent;
const addCardButton = document.querySelector(".profile__add-button");

const popupEditProfileImage = document.querySelector(".popup_type_edit_profile-img");
const popupEditProfileImageForm = document.forms['renew-avatar'];
const popupEditProfileImageLink = popupEditProfileImageForm.elements.link;
const popupEditProfileImageSubmitButton = popupEditProfileImageForm.querySelector('[type="submit"]');
const popupEditProfileImageSubmitButtonText = popupEditProfileImageSubmitButton.textContent;
const editProfileImageButton = document.querySelector(".profile__image");

const popupImage = document.querySelector(".popup_type_image");
const popupImageURL = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

const popupDeleteCard = document.querySelector(".popup_type_delete_card");
const popupDeleteCardForm = document.forms['delete-card-button'];
const popupDeleteCardSubmitButton = popupDeleteCardForm.querySelector('[type="submit"]');
const popupDeleteCardSubmitButtonText = popupDeleteCardSubmitButton.textContent;
let cardToDelete;
let cardToDeleteId;

let userId; 

Promise.all([getInitialUser(), getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    cardsData.reverse().forEach((card) => {
      renderCard(card, cardActions, userId); 
    });
  })
  .catch((err) => {
    console.error(err);
  });

const cardActions = {
  openPopupImageCard,
  likeCard,
  deleteCard,
  openPopupDelete
};

function likeCard(likeButton, cardLikesNumber, cardId) {
  const likeMethod = likeButton.classList.contains("card__like-button_is-active") 
    ? deleteLikeCardServer 
    : likeCardServer;

  likeMethod(cardId)
    .then((res) => {
      likeButton.classList.toggle("card__like-button_is-active");
      cardLikesNumber.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error(err);
      alert("Не удалось обновить лайк. Попробуйте позже.");
    });
}

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input_text_error_active'
};

enableValidation(validationSettings);

function openPopupImageCard(cardLink, cardName) {
  popupImageURL.src = cardLink;
  popupImageURL.alt = `Фотография: ${cardName}`;
  popupImageCaption.textContent = cardName;
  openModal(popupImage);
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) { 
  closeModal(evt.currentTarget); 
} 
}
[popupProfileEdit, popupCreateNewCard, popupImage, popupEditProfileImage, popupDeleteCard].forEach(popup => popup.addEventListener("click", handleOverlayClick));


profileEditButton.addEventListener("click", () => {
  popupProfileEditName.value = profileTitle.textContent;
  popupProfileEditDescription.value = profileDescription.textContent;
  clearValidation(popupProfileEditForm, validationSettings);
  openModal(popupProfileEdit);
});

function handlePopupProfileEditSubmit(evt) {
  evt.preventDefault();
  popupProfileEditSubmitButton.textContent = 'Создание...';
  popupProfileEditSubmitButton.disabled = true;
  patchProfileData(popupProfileEditName.value, popupProfileEditDescription.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupProfileEdit);
    })
    .catch((err) => {
      console.error(err);
      alert('Не удалось обновить профиль. Попробуйте позже.');
    })
    .finally(() => {
      popupProfileEditSubmitButton.textContent = popupProfileEditSubmitButtonText;
      popupProfileEditSubmitButton.disabled = false;
    });
}

popupProfileEditForm.addEventListener('submit', handlePopupProfileEditSubmit); 

addCardButton.addEventListener("click", () => {
  openModal(popupCreateNewCard);
}); 

function handlePopupAddCardSubmit(evt) {
  evt.preventDefault();
  popupCreateNewCardSubmitButton.textContent = 'Создание...';
  popupCreateNewCardSubmitButton.disabled = true;
  const createCardData = {
    name: popupCreateNewCardName.value,
    link: popupCreateNewCardLink.value,
  };
  patchInitialCards(createCardData)
    .then((res) => {
      renderCard(res, cardActions, userId);
      closeModal(popupCreateNewCard);
      popupCreateNewCardForm.reset();
      clearValidation(popupCreateNewCardForm, validationSettings);
    })
    .catch((err) => {
      console.error(err);
      alert('Не удалось создать карточку. Попробуйте позже.');
    })
    .finally(() => {
      popupCreateNewCardSubmitButton.textContent = popupCreateNewCardSubmitButtonText;
      popupCreateNewCardSubmitButton.disabled = false;
    });
}

popupCreateNewCardForm.addEventListener('submit', handlePopupAddCardSubmit);

editProfileImageButton.addEventListener("click", () => {
  clearValidation(popupEditProfileImage, validationSettings);
  openModal(popupEditProfileImage);
});

function handlepopupEditProfileImageSubmit(evt) {
  evt.preventDefault();
  popupEditProfileImageSubmitButton.textContent = 'Сохранение...';
  popupEditProfileImageSubmitButton.disabled = true;
  patchProfileImage(popupEditProfileImageLink.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      closeModal(popupEditProfileImage);
      popupEditProfileImageForm.reset();
      clearValidation(popupEditProfileImageForm, validationSettings);
    })
    .catch((err) => {
      console.error(err);
      alert('Не удалось обновить аватар. Попробуйте позже.');
    })
    .finally(() => {
      popupEditProfileImageSubmitButton.textContent = popupEditProfileImageSubmitButtonText;
      popupEditProfileImageSubmitButton.disabled = false;
    });
}

popupEditProfileImageForm.addEventListener('submit', handlepopupEditProfileImageSubmit);

function openPopupDelete(card, cardId) {
    cardToDelete = card;
    cardToDeleteId = cardId;
    openModal(popupDeleteCard);
  }

  function handlePopupDeleteCardSubmit(evt) {
    evt.preventDefault();
    popupDeleteCardSubmitButton.textContent = 'Удаление...';
    popupDeleteCardSubmitButton.disabled = true;
  
    deleteCardServer(cardToDeleteId)
      .then(() => {
        deleteCard(cardToDelete);
        closeModal(popupDeleteCard);
      })
      .catch((err) => {
        console.error(err);
        alert('Не удалось удалить карточку. Попробуйте позже.');
      })
      .finally(() => {
        popupDeleteCardSubmitButton.textContent = popupDeleteCardSubmitButtonText;
        popupDeleteCardSubmitButton.disabled = false;
      });
  }

popupDeleteCardForm.addEventListener('submit', handlePopupDeleteCardSubmit);

function renderCard(cardData, cardActions, userId) {
  cardList.prepend(createCard(cardData, cardActions, userId));
}