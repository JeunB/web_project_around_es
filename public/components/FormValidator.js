export class FormValidator {
    _config;
    _formElement;
    _inputList;
    _buttonElement;
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        this._buttonElement =
            formElement.querySelector(config.submitButtonSelector);
    }
    _getErrorElement(inputElement) {
        return this._formElement.querySelector(`.popup__input-error_type_${inputElement.name}`);
    }
    _showInputError(inputElement) {
        const errorElement = this._getErrorElement(inputElement);
        if (!errorElement)
            return;
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent =
            inputElement.validationMessage;
        errorElement.classList.add(this._config.errorClass);
    }
    _hideInputError(inputElement) {
        const errorElement = this._getErrorElement(inputElement);
        if (!errorElement)
            return;
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = "";
    }
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        }
        else {
            this._hideInputError(inputElement);
        }
    }
    _hasInvalidInput() {
        return this._inputList.some((input) => !input.validity.valid);
    }
    _toggleButtonState() {
        const invalid = this._hasInvalidInput();
        this._buttonElement.disabled = invalid;
        this._buttonElement.classList.toggle(this._config.inactiveButtonClass, invalid);
    }
    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", (_event) => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }
    enableValidation() {
        this._setEventListeners();
    }
    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }
}
