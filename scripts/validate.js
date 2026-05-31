// =========================
// VALIDACIÓN DE INPUT
// =========================

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`,
  );

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`,
  );

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config,
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// =========================
// ESTADO DEL BOTÓN
// =========================

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, config) {
  const isInvalid = hasInvalidInput(inputList);

  buttonElement.disabled = isInvalid;
  buttonElement.classList.toggle(config.inactiveButtonClass, isInvalid);
}

// =========================
// EVENT LISTENERS
// =========================

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector),
  );

  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

// =========================
// RESET VALIDATION
// =========================

function resetValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector),
  );

  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
}

// =========================
// ACTIVADOR GLOBAL
// =========================

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// =========================
// EXPORTS
// =========================

export { enableValidation, resetValidation };
