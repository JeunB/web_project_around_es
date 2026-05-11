// I. VARIABLES Y DATOS INICIALES
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

//II. SELECCIÓN DE ELEMENTOS DEL DOM

// Elementos del perfil
const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const closeButton = editModal.querySelector(".popup__close");
const formElement = document.querySelector("#edit-profile-form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector('[name="name"]');
const aboutInput = document.querySelector('[name="description"]');

// Elementos para la ventana emergente "Agregar tarjeta"
const addButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const addCardCloseButton = addCardModal.querySelector(".popup__close");
const addCardForm = document.querySelector("#new-card-form");
const addCardNameInput = document.querySelector('[name="place-name"]');
const addCardLinkInput = document.querySelector('[name="link"]');
const cardTemplate = document.querySelector("#card-template").content;

//Elementos del modal de imagen
const imageModal = document.querySelector("#image-popup");
const imageModalCloseButton = imageModal.querySelector(".popup__close");

const imageModalImage = imageModal.querySelector(".popup__image");
const imageModalTitle = imageModal.querySelector(".popup__caption");

// Contenedor principal
const cardsContainer = document.querySelector(".cards__list");

// III. FUNCIONES UTILITARIAS (Abrir/cerrar modales)
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// IV. FUNCIONES CONTROLADORAS DE EVENTOS

function handleOpenEditModal() {
  // Paso 1: Rellenar el formulario
  fillProfileForm();

  // Paso 2: Abrir el modal
  openModal(editModal);
}

function handleProfileFormSubmit(evt) {
  // Paso 1: Prevenir el comportamiento por defecto
  evt.preventDefault();

  // Paso 2: Obtener los valores de los campos

  const nameValue = nameInput.value; // Lo que el usuario escribió
  const aboutValue = aboutInput.value; // Lo que el usuario escribió

  // Paso 3: Actualizar los elementos de la página

  profileTitle.textContent = nameValue;
  profileDescription.textContent = aboutValue;

  // Paso 4: Cerrar el modal
  closeModal(editModal);
}

function handleLikeClick(evt) {
  //Obtener el botón que fue clickeado
  const likeButton = evt.target;

  //Alternar la clase que cambia la apariencia
  likeButton.classList.toggle("card__like-button_is-active");
}

function handleImageClick(cardData) {
  // Establecer el contenido del modal
  imageModalImage.src = cardData.link;
  imageModalImage.alt = cardData.name;
  imageModalTitle.textContent = cardData.name;

  // Abrir el modal usando la función reutilizable
  openModal(imageModal);
}

// Función para abrir el modal de agregar tarjeta
function handleOpenAddCardModal() {
  openModal(addCardModal);
}

// Función para manejar el envío del formulario
function handleCardFormSubmit(evt) {
  // Paso 1: Prevenir el comportamiento por defecto
  evt.preventDefault();

  // Paso 2: Obtener los valores de los campos

  const nameValue = addCardNameInput.value;
  const linkValue = addCardLinkInput.value;

  // Paso 3: Crear objeto con los datos de la nueva tarjeta
  const newCardData = {
    name: nameValue,
    link: linkValue,
  };

  // Paso 4: Renderizar la nueva tarjeta (al inicio)
  renderCard(newCardData, cardsContainer);

  // Paso 5: Limpiar el formulario
  addCardForm.reset();

  // Paso 6: Cerrar el modal
  closeModal(addCardModal);
}

// V. FUNCIONES DE CREACIÓN Y RENDERIZADO

function fillProfileForm() {
  //  Transferir los valores
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileDescription.textContent;
}

function getCardElement({
  name = "Sin título",
  link = "./images/placeholder.jpg",
}) {
  //clonar el template
  const cardElement = cardTemplate.cloneNode(true);

  //Llenar los datos

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  //Configurar el botón "Me gusta"
  //Paso 1: Seleccionar el botón "Me gusta"
  const likeButton = cardElement.querySelector(".card__like-button");

  //Paso 2: Agregar el event listener
  likeButton.addEventListener("click", handleLikeClick);

  //Configuración de el botón de eliminación
  //1. Seleccionar el botón
  const deleteButton = cardElement.querySelector(".card__delete-button");
  //2. Event listener para eliminar
  deleteButton.addEventListener("click", () => {
    //Función que elimina la tarjeta:
    const cardToDelete = deleteButton.closest(".card");
    cardToDelete.remove();
  });

  // Configuración de la funcionalidad de agrandar imágenes

  // PAso 2: Establecer detector de clics en la imagen
  cardImage.addEventListener("click", () => {
    handleImageClick({ name, link });
  });

  return cardElement;
}

function renderCard(cardData, container) {
  const cardElement = getCardElement(cardData);
  container.prepend(cardElement);
}

// VI. EVENT LISTENERS PRINCIPALES
// 1. Modal de edición de perfil
editButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener("click", function () {
  closeModal(editModal);
});
formElement.addEventListener("submit", handleProfileFormSubmit);

// 2. Modal agregar tarjeta
addButton.addEventListener("click", handleOpenAddCardModal);
addCardCloseButton.addEventListener("click", function () {
  closeModal(addCardModal);
});
addCardForm.addEventListener("submit", handleCardFormSubmit);

//3. Modal de imagen
imageModalCloseButton.addEventListener("click", function () {
  closeModal(imageModal);
});

// VII. RENDERIZAR TARJETAS INICIALES
initialCards.forEach(function (cardData) {
  renderCard(cardData, cardsContainer);
});
