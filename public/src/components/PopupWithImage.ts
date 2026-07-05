import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  private _image: HTMLImageElement;
  private _caption: HTMLElement;

  constructor(selector: string) {
    super(selector);

    this._image = this._popup.querySelector(
      ".popup__image"
    ) as HTMLImageElement;

    this._caption = this._popup.querySelector(
      ".popup__caption"
    ) as HTMLElement;
  }

  public openImage(name: string, link: string): void {
  this._image.src = link;
  this._image.alt = name;
  this._caption.textContent = name;

  super.open();
  }
}