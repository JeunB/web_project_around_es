import { FormConfig } from "../utils/constants";

export class FormValidator {
    private _config: FormConfig;
    private _formElement: HTMLFormElement;
    private _inputList: HTMLInputElement[];
    private _buttonElement: HTMLButtonElement;

    constructor(config: FormConfig, formElement: HTMLFormElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(
            formElement.querySelectorAll(config.inputSelector)) as HTMLInputElement[];
        this._buttonElement =
        formElement.querySelector(
            config.submitButtonSelector) as HTMLButtonElement;

    }

    private _getErrorElement(inputElement: HTMLInputElement): HTMLElement | null {
    return this._formElement.querySelector<HTMLSpanElement>(
      `.popup__input-error_type_${inputElement.name}`,
    );
  }


    private _showInputError(inputElement: HTMLInputElement): void {

    const errorElement =
    this._getErrorElement(inputElement);

    if (!errorElement) return;

    inputElement.classList.add(
        this._config.inputErrorClass);

    errorElement.textContent =
        inputElement.validationMessage;

    errorElement.classList.add(
        this._config.errorClass);
}

private _hideInputError(
    inputElement: HTMLInputElement): void {

    const errorElement =
    this._getErrorElement(inputElement);

    if (!errorElement) return;

    inputElement.classList.remove(
        this._config.inputErrorClass);

    errorElement.classList.remove(
        this._config.errorClass);

    errorElement.textContent = "";
}

    private _checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  private _hasInvalidInput(): boolean {
    return this._inputList.some((input) => !input.validity.valid);
  }

  private _toggleButtonState(): void {
    const invalid = this._hasInvalidInput();

    this._buttonElement.disabled = invalid;

    this._buttonElement.classList.toggle(
      this._config.inactiveButtonClass,
      invalid,
    );
}
private _setEventListeners(): void {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (_event: Event) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  public enableValidation(): void {
    this._setEventListeners();
  }

  public resetValidation(): void {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState();
  }
}