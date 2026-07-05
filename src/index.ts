import { Card, type CardData } from "./components/Card";
import { Section } from "./components/Section";
import { PopupWithImage } from "./components/PopupWithImage";
import { PopupWithForm } from "./components/PopupWithForm";
import { UserInfo } from "./components/UserInfo";
import { FormValidator } from "./components/FormValidator";

import {
  defaultFormConfig, initialCards
} from "./utils/constants";

// ======================================
// ELEMENTOS DEL DOM
// ======================================

const editButton = document.querySelector(
  ".profile__edit-button"
) as HTMLButtonElement;

const addButton = document.querySelector(
  ".profile__add-button"
) as HTMLButtonElement;

const editForm = document.querySelector(
  "#edit-profile-form"
) as HTMLFormElement;

const addCardForm = document.querySelector(
  "#new-card-form"
) as HTMLFormElement;

const nameInput = editForm.querySelector(
  '[name="name"]'
) as HTMLInputElement;

const aboutInput = editForm.querySelector(
  '[name="description"]'
) as HTMLInputElement;

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

const editFormValidator = new FormValidator(
  defaultFormConfig,
  editForm
);

editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  defaultFormConfig,
  addCardForm
);

addCardFormValidator.enableValidation();

// ======================================
// POPUP IMAGEN
// ======================================

const imagePopup = new PopupWithImage(
  "#image-popup"
);

imagePopup.setEventListeners();

// ======================================
// SECTION
// ======================================

const cardsSection = new Section<CardData>(
  {
    items: initialCards,

    renderer: (item) => {
      const card = new Card(
        item,
        "#card-template",

        (cardData) => {
          imagePopup.openImage(
            cardData.name,
            cardData.link
          );
        }
      );

      cardsSection.addItem(
        card.generateCard()
      );
    },
  },

  ".cards__list"
);

// ======================================
// POPUP PERFIL
// ======================================

const editPopup = new PopupWithForm(
  "#edit-popup",

  (data) => {
    userInfo.setUserInfo({
      name: data["name"],
      job: data["description"],
    });

    editPopup.close();
  }
);

editPopup.setEventListeners();

// ======================================
// POPUP NUEVA TARJETA
// ======================================

const addCardPopup = new PopupWithForm(
  "#new-card-popup",

  (data) => {
    const card = new Card(
      {
        name: data["place-name"],
        link: data["link"],
      },

      "#card-template",

      (cardData) => {
        imagePopup.openImage(
          cardData.name,
          cardData.link
        );
      }
    );

    cardsSection.addItem(
      card.generateCard()
    );

    addCardPopup.close();
  }
);

addCardPopup.setEventListeners();

// ======================================
// BOTÓN EDITAR PERFIL
// ======================================

editButton.addEventListener(
  "click",
  () => {
    const currentUser =
      userInfo.getUserInfo();

    nameInput.value = currentUser.name;
    aboutInput.value = currentUser.job;

    editFormValidator.resetValidation();

    editPopup.open();
  }
);

// ======================================
// BOTÓN NUEVA TARJETA
// ======================================

addButton.addEventListener(
  "click",
  () => {
    addCardFormValidator.resetValidation();
    addCardPopup.open();
  }
);

// ======================================
// RENDER INICIAL
// ======================================

cardsSection.renderItems();