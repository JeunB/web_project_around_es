import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  _form;
  _handleSubmit;
  constructor(selector, handleSubmit) {
    super(selector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleSubmit = handleSubmit;
  }
  _getInputValues() {
    const values = {};
    const inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
