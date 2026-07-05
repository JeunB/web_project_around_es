import { Popup } from "./Popup";

export type SubmitCallback = (
  data: Record<string, string>
) => void;

export class PopupWithForm extends Popup {
  private _form: HTMLFormElement;
  private _handleSubmit: SubmitCallback;

  constructor(selector: string, handleSubmit: SubmitCallback) {
    super(selector);

    this._form = this._popup.querySelector(
      ".popup__form"
    ) as HTMLFormElement;

    this._handleSubmit = handleSubmit;
  }

  private _getInputValues(): Record<string, string> {
    const values: Record<string, string> = {};

    const inputs = Array.from(
      this._form.querySelectorAll<HTMLInputElement>(
        ".popup__input"
      )
    );

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  public override setEventListeners(): void {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();

      this._handleSubmit(
        this._getInputValues()
      );
    });
  }

  public override close(): void {
    super.close();
    this._form.reset();
  }
}