function showInputError(formElement, element, errorMessage) {
  const errorElement = formElement.querySelector(`.${element.id}-input-error`);
  element.classList.add("popup__input_invalid");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

function hideInputError(formElement, element) {
  const errorElement = formElement.querySelector(`.${element.id}-input-error`);
  element.classList.remove("popup__input_invalid");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_disabled");
  }
}

function setEventListeners(formElement) {
  // Obtiene inputs
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));

  // Obtiene botón submit
  const buttonElement = formElement.querySelector(".popup__button");

  // Estado inicial
  toggleButtonState(inputList, buttonElement);

  // Escucha cada input
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
}

function resetValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));

  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });

  toggleButtonState(inputList, buttonElement);
}

export {
  showInputError,
  hideInputError,
  setEventListeners,
  toggleButtonState,
  resetValidation,
};
