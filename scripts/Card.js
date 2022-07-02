import {openPopup, popupShowImage} from './utils.js';

export class Card {
  constructor(cardContent, cardTemplateSelector) {
    this._cardContent = cardContent;
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardTemplateElement = cardTemplateSelector.querySelector('.element');
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
    this._elementImage.src = `${this._cardContent.link}`;
    this._elementImage.alt = `${this._cardContent.name}`;
    this._elementPlaceName.textContent = `${this._cardContent.name}`;
  }

  // Установить слушатели событий
  _setEventListeners = () => {
    /* Обработчик кнопки лайка */
    this._likeButton.addEventListener('click', this._toggleLikeButton);

    /* Обработчик кнопки удаления карточки */
    this._trashButton.addEventListener('click', this._deleteCard);

    /* Обработчик увеличения картинки по клику */
    this._cardElement.querySelector('.element__image').addEventListener('click', () => this._openPopup());
  }

  // Метод обработки картинки при ее открытии
  _openPopup = () => {
    const popupImage = popupShowImage.querySelector('.popup__image');
    popupImage.src = `${this._cardContent.link}`;
    popupImage.alt = `${this._cardContent.name}`;
    popupShowImage.querySelector('.popup__image-caption').textContent = `${this._cardContent.name}`;;
    openPopup(popupShowImage);
  }

  // Создать карточку
  createCard() {
    this._cardElement = this._cardTemplateElement.cloneNode(true);
    this._likeButton = this._cardElement.querySelector('.element__like-button');
    this._trashButton = this._cardElement.querySelector('.element__trash-button');
    this._elementImage = this._cardElement.querySelector('.element__image');
    this._elementPlaceName = this._cardElement.querySelector('.element__place-name');

    this._fillCardContent();

    this._setEventListeners();

    return this._cardElement;

  }
}
