export interface CardData {
    name: string;
    link: string;
}

export class Card {
  private _data: CardData;
  private _templateSelector: string;
  private _handleCardClick: (data: CardData) => void;

  private _element!: HTMLElement;
  private _imageElement!: HTMLImageElement;
  private _titleElement!: HTMLElement;
  private _likeButton!: HTMLButtonElement;
  private _deleteButton!: HTMLButtonElement;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: (data: CardData) => void
  ) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  /*** Obtiene una copia del template de la tarjeta*/
  private _getTemplate(): HTMLElement {
    const template = document.querySelector<HTMLTemplateElement>(
      this._templateSelector
    );

    if (!template) {
      throw new Error(`No se encontró el template: ${this._templateSelector}`);
    }

    return template.content
      .querySelector(".card")!
      .cloneNode(true) as HTMLElement;
  }

  /*** Cambia el estado del botón Like.*/
  private _handleLikeClick(): void {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  /*** Elimina la tarjeta.*/
  private _handleDeleteClick(): void {
    this._element.remove();
  }

  /*** Agrega todos los listeners de la tarjeta.*/
  private _setEventListeners(): void {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });
  }

  /*** Construye y devuelve la tarjeta.*/
  public generateCard(): HTMLElement {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(
      ".card__image"
    ) as HTMLImageElement;

    this._titleElement = this._element.querySelector(
      ".card__title"
    ) as HTMLElement;

    this._likeButton = this._element.querySelector(
      ".card__like-button"
    ) as HTMLButtonElement;

    this._deleteButton = this._element.querySelector(
      ".card__delete-button"
    ) as HTMLButtonElement;

    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.name;

    this._titleElement.textContent = this._data.name;

    this._setEventListeners();

    return this._element;
  }
}