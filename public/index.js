import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
// ======================================
// ELEMENTOS DEL DOM
// ======================================
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editForm = document.querySelector("#edit-profile-form");
const addCardForm = document.querySelector("#new-card-form");
const nameInput = editForm.querySelector('[name="name"]');
const aboutInput = editForm.querySelector('[name="description"]');
// ======================================
// USER INFO
// ======================================
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});
// ======================================
// VALIDADORES
// ======================================
const editFormValidator = new FormValidator(defaultFormConfig, editForm);
editFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(defaultFormConfig, addCardForm);
addCardFormValidator.enableValidation();
// ======================================
// POPUP IMAGEN
// ======================================
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
// ======================================
// SECTION
// ======================================
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", (cardData) => {
        imagePopup.openImage(cardData.name, cardData.link);
      });
      cardsSection.addItem(card.generateCard());
    },
  },
  ".cards__list",
);
// ======================================
// POPUP PERFIL
// ======================================
const editPopup = new PopupWithForm("#edit-popup", (data) => {
  userInfo.setUserInfo({
    name: data["name"],
    job: data["description"],
  });
  editPopup.close();
});
editPopup.setEventListeners();
// ======================================
// POPUP NUEVA TARJETA
// ======================================
const addCardPopup = new PopupWithForm("#new-card-popup", (data) => {
  const card = new Card(
    {
      name: data["place-name"],
      link: data["link"],
    },
    "#card-template",
    (cardData) => {
      imagePopup.openImage(cardData.name, cardData.link);
    },
  );
  cardsSection.addItem(card.generateCard());
  addCardPopup.close();
});
addCardPopup.setEventListeners();
// ======================================
// BOTÓN EDITAR PERFIL
// ======================================
editButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name;
  aboutInput.value = currentUser.job;
  editFormValidator.resetValidation();
  editPopup.open();
});
// ======================================
// BOTÓN NUEVA TARJETA
// ======================================
addButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});
// ======================================
// RENDER INICIAL
// ======================================
cardsSection.renderItems();
