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

initialCards.forEach(function (elemento) {
  console.log(elemento.name);
});

const editButton = document.querySelector(".profile__edit-button");
console.log(editButton);

const editModal = document.querySelector("#edit-popup");
const closeButton = editModal.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// Para abrir el modal (botón "Editar perfil"):

// 1. Agregar el event listener al abrir
editButton.addEventListener("click", handleOpenEditModal);

// 2. Para cerrar el modal (botón X):

closeButton.addEventListener("click", function () {
  closeModal(editModal);
});

//  Para el formulario :
const formElement = document.querySelector("#edit-profile-form");

formElement.addEventListener("submit", handleProfileFormSubmit);

function fillProfileForm() {
  // Paso 1: Obtener los elementos de la página usando las clases específicas
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  // Paso 2: Obtener los campos del formulario
  const nameInput = document.querySelector('[name="name"]'); // Campo nombre
  const aboutInput = document.querySelector('[name="description"]'); // Campo descripción

  // Paso 3: Transferir los valores
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  // Paso 1: Rellenar el formulario
  fillProfileForm();

  // Paso 2: Abrir el modal
  openModal(editModal);
}
