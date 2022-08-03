export class Card {
  constructor({
    cardContent,
    cardTemplate,
    ownerId,
    handleCardClick,
    handleLikeClick,
    handleTrashClick
  }) {
    this._cardContent = cardContent;
    this._ownerId = ownerId;
    this._handleCardClick = handleCardClick; // логика открытия попапа
    this._handleLikeClick = handleLikeClick;
    this._handleTrashClick = handleTrashClick;
    this._likes = this._cardContent.likes;
    this._cardTemplate = cardTemplate; // содержимое тега template
    this._cardTemplateElement = cardTemplate.querySelector('.element'); // див-контейнер с разметкой карточки
  }

   addLikeButton = () => {
    this._likeButton.classList.add('element__like-button_active');
  }

  removeLikeButton = () => {
    this._likeButton.classList.remove('element__like-button_active');

  }

  toggleLikeButton = () => {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  checkLikeStatus() {
    if (this._cardContent.likes.some((like) => like._id === this._ownerId)) {
      return true;
    }
    return false;
  }

  isLiked() {
    if (this._likeButton.classList.contains('element__like-button_active')) {
      return true;
    }
    return false;
  }

  setLikeStatus() {
    if (this.checkLikeStatus()) {
      this.addLikeButton();
    }
  }

updateLikeInfo = (likes) => {
    this.toggleLikeButton();
    this.setLikeAmount(/* this._ */likes);
 }

  // Установить количество лайков
  setLikeAmount = (likes) => {
    const likesNumber = likes.length;
    if (likesNumber > 0) {
      this._likeAmount.classList.add('element__like-amount_liked');
    }
    if (likesNumber === 0) {
      this._likeAmount.classList.remove('element__like-amount_liked');
    }
    this._likeAmount.textContent = likesNumber;
  }

  // Удалить карточку
  deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // Заполнить содержимое карточки
  _fillCardContent = () => {
    this._elementImage.src = `${this._cardContent.link}`;
    this._elementImage.alt = `${this._cardContent.name}`;
    this._elementPlaceName.textContent = `${this._cardContent.name}`;
    this.setLikeAmount(this._cardContent.likes);
   }

  // Установить слушатели событий
  _setEventListeners = () => {
    /* Обработчик кнопки лайка */
    this._likeButton.addEventListener('click', () => {

        this._handleLikeClick(this);

    });

    /* Обработчик кнопки удаления карточки */
    this._trashButton.addEventListener('click', () => {
      this._handleTrashClick(this/* ._cardContent */);
    });

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
    this._trashButton = this._cardElement.querySelector('.element__trash-button');

    this._likeButton = this._cardElement.querySelector('.element__like-button');
    this._likeAmount = this._cardElement.querySelector('.element__like-amount');

    this._elementImage = this._cardElement.querySelector('.element__image');
    this._elementPlaceName = this._cardElement.querySelector('.element__place-name');

    this._fillCardContent();

    this._setEventListeners();

    if (this._ownerId !== this._cardContent.owner._id) {
      this._trashButton.remove();
    }
    this.checkLikeStatus();
    this.setLikeStatus();

    return this._cardElement;

  }
}
