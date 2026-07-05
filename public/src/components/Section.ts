export interface SectionRenderer<T> {
  items: T[];
  renderer: (item: T) => void;
}

export class Section<T> {
  private _items: T[];
  private _renderer: (item: T) => void;
  private _container: HTMLElement;

  constructor(
    { items, renderer }: SectionRenderer<T>,
    containerSelector: string
  ) {
    this._items = items;
    this._renderer = renderer;

    const container = document.querySelector<HTMLElement>(
      containerSelector
    );

    if (!container) {
      throw new Error(
        `No se encontró el contenedor: ${containerSelector}`
      );
    }

    this._container = container;
  }

  /*** Agrega un elemento al principio del contenedor.*/
  public addItem(element: HTMLElement): void {
    this._container.append(element);
  }

  /*** Renderiza todos los elementos iniciales.*/
  public renderItems(): void {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}