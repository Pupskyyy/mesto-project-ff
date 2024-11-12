import {handleEscClose, handleOverlayClick} from "./index.js";

export let currentPopup = null;

export function openPopup(popup) {
  currentPopup = popup;
  popup.classList.add("popup_is-opened");
  document.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscClose);
}

export function closePopup(currentPopup) {
    currentPopup.classList.remove("popup_is-opened");
    document.removeEventListener("click", handleOverlayClick);
    document.removeEventListener("keydown", handleEscClose);
    currentPopup = null;
}

