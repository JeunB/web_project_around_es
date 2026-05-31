import { enableValidation, resetValidation } from "./validate.js";

// =========================
// CONFIG VALIDACIÓN
// =========================

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "form__input-error_active",
};

// Activar validación global
enableValidation(validationConfig);

// =========================
// VARIABLES Y DATOS INICIALES
// =========================

let initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// =========================
// ELEMENTOS DEL DOM
// =========================

// Perfil
const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const closeButton = editModal.querySelector(".popup__close");
const formElement = document.querySelector("#edit-profile-form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector('[name="name"]');
const aboutInput = document.querySelector('[name="description"]');

// Add card
const addButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const addCardCloseButton = addCardModal.querySelector(".popup__close");
const addCardForm = document.querySelector("#new-card-form");
const addCardNameInput = document.querySelector('[name="place-name"]');
const addCardLinkInput = document.querySelector('[name="link"]');
const cardTemplate = document.querySelector("#card-template").content;

// Imagen modal
const imageModal = document.querySelector("#image-popup");
const imageModalCloseButton = imageModal.querySelector(".popup__close");
const imageModalImage = imageModal.querySelector(".popup__image");
const imageModalTitle = imageModal.querySelector(".popup__caption");

// Contenedor
const cardsContainer = document.querySelector(".cards__list");

// =========================
// FUNCIONES UTILITARIAS
// =========================

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// =========================
// CONTROLADORES
// =========================

function handleOpenEditModal() {
  fillProfileForm();
  resetValidation(formElement, validationConfig);
  openModal(editModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;

  closeModal(editModal);
}

function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleImageClick(cardData) {
  imageModalImage.src = cardData.link;
  imageModalImage.alt = cardData.name;
  imageModalTitle.textContent = cardData.name;

  openModal(imageModal);
}

function handleOpenAddCardModal() {
  resetValidation(addCardForm, validationConfig);
  openModal(addCardModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: addCardNameInput.value,
    link: addCardLinkInput.value,
  };

  renderCard(newCardData, cardsContainer);

  addCardForm.reset();
  resetValidation(addCardForm, validationConfig);
  closeModal(addCardModal);
}

// =========================
// CREACIÓN DE TARJETAS
// =========================

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileDescription.textContent;
}

function getCardElement({ name, link }) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", handleLikeClick);

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => {
      evt.target.closest(".card").remove();
    });

  cardImage.addEventListener("click", () => {
    handleImageClick({ name, link });
  });

  return cardElement;
}

function renderCard(cardData, container) {
  container.prepend(getCardElement(cardData));
}

// =========================
// EVENT LISTENERS
// =========================

editButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener("click", () => closeModal(editModal));
formElement.addEventListener("submit", handleProfileFormSubmit);

addButton.addEventListener("click", handleOpenAddCardModal);
addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));
addCardForm.addEventListener("submit", handleCardFormSubmit);

imageModalCloseButton.addEventListener("click", () => closeModal(imageModal));

editModal.addEventListener("click", handleOverlayClick);
addCardModal.addEventListener("click", handleOverlayClick);
imageModal.addEventListener("click", handleOverlayClick);

document.addEventListener("keydown", handleEscClose);

// =========================
// RENDER INICIAL
// =========================

initialCards.forEach((card) => renderCard(card, cardsContainer));
