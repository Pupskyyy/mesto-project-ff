const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(imageSource, textDescription, deleteCard) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  card.querySelector(".card__image").src = imageSource;
  card.querySelector(".card__image").alt = `Фотография: ${textDescription}`;
  card.querySelector(".card__title").textContent = textDescription;
  deleteButton.addEventListener("click", deleteCard);
  return card;
}

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

function renderCard(imageSource, textDescription) {
  cardList.append(createCard(imageSource, textDescription, deleteCard));
}

initialCards.forEach(function (element) {
  renderCard(element.link, element.name);
});