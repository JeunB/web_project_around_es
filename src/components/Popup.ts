export class Popup {
  protected _popup: HTMLElement;

  constructor(selector: string) {
    const popup = document.querySelector<HTMLElement>(selector);

    if (!popup) {
      throw new Error(`Popup no encontrado: ${selector}`);
    }

    this._popup = popup;
  }

  private _handleEscClose = (evt: KeyboardEvent): void => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  public open(): void {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  public close(): void {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  public setEventListeners(): void {
    const closeButton = this._popup.querySelector(".popup__close");

    closeButton?.addEventListener("click", () => this.close());

    this._popup.addEventListener("click", (evt: MouseEvent) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}