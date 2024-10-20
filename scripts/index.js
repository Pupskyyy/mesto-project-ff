const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCards (initialCards, deleteCard){
	initialCards.forEach(function (element){
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  card.querySelector(".card__image").src = element.link;
  card.querySelector(".card__title").textContent = element.name;
  cardList.append(card);
  deleteButton.addEventListener("click", deleteCard);});
}

function deleteCard(item) {
  item.target.parentElement.remove();
}

createCards (initialCards, deleteCard);