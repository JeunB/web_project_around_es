import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  _image;
  _caption;
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__caption");
  }
  openImage(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
