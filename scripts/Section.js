export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer; // передается при создании экземпляра класса
    this._container = containerSelector;
  }

  // отрисовка всех элементов
  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  // готовая разметка экземпляра класса, вставляем в html код
  addItem(element) {
    this._container.prepend(element);
  }
}
