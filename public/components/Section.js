export class Section {
    _items;
    _renderer;
    _container;
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        const container = document.querySelector(containerSelector);
        if (!container) {
            throw new Error(`No se encontró el contenedor: ${containerSelector}`);
        }
        this._container = container;
    }
    /*** Agrega un elemento al principio del contenedor.*/
    addItem(element) {
        this._container.append(element);
    }
    /*** Renderiza todos los elementos iniciales.*/
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
}
