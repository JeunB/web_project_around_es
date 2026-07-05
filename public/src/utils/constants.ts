export interface FormConfig {
    formSelector: string;
    inputSelector: string;
    submitButtonSelector: string;
    inactiveButtonClass: string;
    inputErrorClass: string;
    errorClass: string;
}

export const defaultFormConfig: FormConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_invalid",
    errorClass: "popup__input-error_active",

};