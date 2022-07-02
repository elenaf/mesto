import {FormValidator} from './FormValidator.js'
import { Card } from './Card.js';
import {initialCards} from './cards.js';
import { popupShowImage, openPopup, closePopup } from './utils.js';

const formSettingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const cardTemplate = document.querySelector('#card').content; /* Шаблон одной карточки */
const elements = document.querySelector('.elements'); /* Секция, в которую будем добавлять карточки */

/* Формы добавления карточки и редактирования информации профиля */

const buttonEdit = document.querySelector('.profile__edit-button'); /* Кнопка "редактировать профиль" */
const buttonAdd = document.querySelector('.profile__add-button'); /* Кнопка "добавить карточку" */

const popupEditProfile = document.querySelector('.popup_profile-edit'); /* Попап "редактировать профиль" */
const popupAddPlace = document.querySelector('.popup_place-add'); /* Попап "добавить карточку" */

const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button'); /* Кнопки закрытия */
const buttonCloseAddPlace = popupAddPlace.querySelector('.popup__close-button');           /* попапов */
const buttonCloseImage = popupShowImage.querySelector('.popup__close-button');

const formPopupEditProfile = popupEditProfile.querySelector('.popup__form');   /* Формы */
const formPopupAddPlace = popupAddPlace.querySelector('.popup__form');        /* попапов */

/* Поля попапа редактирования профиля, имя и род занятий */
const popupName = popupEditProfile.querySelector('.popup__input_field_name');
const popupOccupation = popupEditProfile.querySelector('.popup__input_field_occupation');

/* Поля попапа добавления новой карточки, название места и ссылка на картинку */
const popupPlaceName = popupAddPlace.querySelector('.popup__input_field_place-name');
const popupPlaceLink = popupAddPlace.querySelector('.popup__input_field_picture-link');

/* Данные из профиля */
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

/* Включение валидации форм */
const formEditProfileValidator = new FormValidator(formSettingsObject, formPopupEditProfile);
const formAddPlaceValidator = new FormValidator(formSettingsObject, formPopupAddPlace);

formEditProfileValidator.enableValidation();
formAddPlaceValidator.enableValidation();

/* Функция рендеринга содержимого карточки */
function renderCards(card, needToPrepend = false) {
  /* Экземпляр карточки */
  const newCard = new Card(card, cardTemplate);
  if (needToPrepend) {
    elements.prepend(newCard.createCard());
  } else {elements.append(newCard.createCard())};
}

/* Рендерим карточки при загрузке страницы */
initialCards.forEach(function (card) {
  renderCards(card);
});

/* -------------------- */

/* Заполнение полей попапа данными из профиля */
function setPopupFields (field1, field2) {
  popupName.value = field1.textContent;
  popupOccupation.value = field2.textContent;
}

/* Заполнение профиля данными из попапа */
function setProfileData (popupData1, popupData2) {
  profileTitle.textContent = popupData1.value;
  profileSubtitle.textContent = popupData2.value;
}

/* Кнопка "редактировать" */
buttonEdit.addEventListener('click', function () {
  formEditProfileValidator.resetFormErrors();
  formEditProfileValidator.setButtonState();
  openPopup(popupEditProfile);
  setPopupFields(profileTitle, profileSubtitle);

});

/* Кнопка "+" */
buttonAdd.addEventListener('click', function () {
  formAddPlaceValidator.setButtonState();
  openPopup(popupAddPlace);
});

/* Крестики в правом верхнем углу*/

buttonCloseEditProfile.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

buttonCloseAddPlace.addEventListener('click', function () {
  closePopup(popupAddPlace);
});

buttonCloseImage.addEventListener('click', function () {
  closePopup(popupShowImage);
});

/* Сохранить и закрыть */
function submitProfileForm (evt) {
  evt.preventDefault();
  setProfileData(popupName, popupOccupation);
  closePopup(popupEditProfile);
}

/* Кнопка "Сохранить" */
formPopupEditProfile.addEventListener('submit', submitProfileForm);

/* Создать новую карточку, очистить поля и закрыть */
function createNewCard (evt) {
  evt.preventDefault();
  const newCard = {
      name: popupPlaceName.value,
      link: popupPlaceLink.value
    };
  renderCards(newCard, true);
  this.reset();
  closePopup(popupAddPlace);
}

/* Кнопка "Создать" */
formPopupAddPlace.addEventListener('submit', createNewCard);
