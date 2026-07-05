export class Card {
    _data;
    _templateSelector;
    _handleCardClick;
    _element;
    _imageElement;
    _titleElement;
    _likeButton;
    _deleteButton;
    constructor(data, templateSelector, handleCardClick) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    /*** Obtiene una copia del template de la tarjeta*/
    _getTemplate() {
        const template = document.querySelector(this._templateSelector);
        if (!template) {
            throw new Error(`No se encontró el template: ${this._templateSelector}`);
        }
        return template.content
            .querySelector(".card")
            .cloneNode(true);
    }
    /*** Cambia el estado del botón Like.*/
    _handleLikeClick() {
        this._likeButton.classList.toggle("card__like-button_is-active");
    }
    /*** Elimina la tarjeta.*/
    _handleDeleteClick() {
        this._element.remove();
    }
    /*** Agrega todos los listeners de la tarjeta.*/
    _setEventListeners() {
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
    generateCard() {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector(".card__image");
        this._titleElement = this._element.querySelector(".card__title");
        this._likeButton = this._element.querySelector(".card__like-button");
        this._deleteButton = this._element.querySelector(".card__delete-button");
        this._imageElement.src = this._data.link;
        this._imageElement.alt = this._data.name;
        this._titleElement.textContent = this._data.name;
        this._setEventListeners();
        return this._element;
    }
}
