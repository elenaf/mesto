import {openPopup, popupShowImage} from './utils.js';

export class Card {
  constructor(cardContent, cardTemplateSelector, handleCardClick) {
    this._cardContent = cardContent;
    this._handleCardClick = handleCardClick; // логика открытия попапа
    this._cardTemplateSelector = cardTemplateSelector; // содержимое тега template
    this._cardTemplateElement = cardTemplateSelector.querySelector('.element'); // див-контейнер с разметкой карточки
  }

  // Переключить кнопку лайка
  _toggleLikeButton = () => {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  // Удалить карточку
  _deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // Заполнить содержимое карточки
  _fillCardContent = () => {
    this._elementImage.src = `${this._cardContent.picture_link}`;
    this._elementImage.alt = `${this._cardContent.place_name}`;
    this._elementPlaceName.textContent = `${this._cardContent.place_name}`;
  }

  // Установить слушатели событий
  _setEventListeners = () => {
    /* Обработчик кнопки лайка */
    this._likeButton.addEventListener('click', this._toggleLikeButton);

    /* Обработчик кнопки удаления карточки */
    this._trashButton.addEventListener('click', this._deleteCard);

    /* Обработчик увеличения картинки по клику */
    this._cardElement.querySelector('.element__image').addEventListener('click', () => this._handleCardClick());
  }

  // Клонируем див-контейнер с разметкой из шаблона для дальнейшего наполнения
  _getTemplate() {
    const cardElement = this._cardTemplateElement.cloneNode(true);
    return cardElement;
  }

  // Создать карточку
  createCard() {
    this._cardElement = this._getTemplate(); //клон дива element из шаблона

    this._likeButton = this._cardElement.querySelector('.element__like-button');
    this._trashButton = this._cardElement.querySelector('.element__trash-button');
    this._elementImage = this._cardElement.querySelector('.element__image');
    this._elementPlaceName = this._cardElement.querySelector('.element__place-name');

    this._fillCardContent();

    this._setEventListeners();

    return this._cardElement;

  }
}
