export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); //выбрали попап по селектору
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
        this.close();
      }
  }

  // слушатель кликов по крестикам
  setEventListeners() {
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._closeButton.addEventListener('click', () => this.close());
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose); // добавляем возможность закрыть попап кнопкой Esc
    this._popup.addEventListener('mousedown', this._handleOverlayClose); // добавляем возможность закрыть попап кликом по оверлею

  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose); // снимаем слушатель Esc со всего документа
    this._popup.removeEventListener('mousedown', this._handleOverlayClose); // снимаем слушатель клика по оверлею
  }
}
