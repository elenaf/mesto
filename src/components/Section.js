export class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer; // передается при создании экземпляра класса
    this._container = container;
  }

  // отрисовка всех элементов
  renderItems(items) {
    this._items = items;
    this._items.forEach(item => this._renderer(item));
  }

  // готовая разметка экземпляра класса, вставляем в html код
  addItem(element) {
    this._container.prepend(element);
  }
}
