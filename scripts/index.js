import {FormValidator} from './FormValidator.js'
import { Card } from './Card.js';

const formSettingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

/* --- Добавляем шесть карточек "из коробки" --- */
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#card').content; /* Шаблон одной карточки */
const elements = document.querySelector('.elements'); /* Секция, в которую будем добавлять карточки */
const element = cardTemplate.querySelector('.element'); /* div, в котором должна размещаться карточка */
export const popupShowImage = document.querySelector('.popup_image-show'); /* Попап для открытия большой картинки */

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
const formEditProfile = new FormValidator(formSettingsObject, formPopupEditProfile);
formEditProfile.enableValidation();

const formAddPlace = new FormValidator(formSettingsObject, formPopupAddPlace);
formAddPlace.enableValidation();

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

/* Функция для сброса форм и ошибок в них в тех попапах, где они есть */
function resetForm(popup) {
  const popupForm = popup.querySelector('.popup__form');
  const popupFormValidation = new FormValidator(formSettingsObject, popupForm);
  if (popupForm !== null) {
    popupForm.reset();
    const popupInputs = Array.from(popupForm.querySelectorAll(`.${formSettingsObject.inputErrorClass}`));
    popupInputs.forEach((popupInput) => {
      popupFormValidation.hideInputError(popupInput); // FormValidator.js
    })
    const submitButton = popupForm.querySelector(formSettingsObject.submitButtonSelector);;
    submitButton.classList.add(formSettingsObject.inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  }
}

/* Открытие попапа */
export function openPopup(popup) {
  resetForm(popup); // не оставляем введенные значения при открытии попапа
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc); // добавляем возможность закрыть попап кнопкой Esc
  popup.addEventListener('mousedown', closeWithOverlay); // добавляем возможность закрыть попап кликом по оверлею
}

/* Закрыть попап */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc); // снимаем слушатель Esc со всего документа
  popup.removeEventListener('click', closeWithOverlay); // снимаем слушатель клика по оверлею

}

/* Кнопка "редактировать" */
buttonEdit.addEventListener('click', function () {
  openPopup(popupEditProfile);
  setPopupFields(profileTitle, profileSubtitle);

});

/* Кнопка "+" */
buttonAdd.addEventListener('click', function () {
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

/* Закрытие попапа кнопкой Esc */
const closePopupWithEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
      closePopup(popup);
  }
}

/* Закрытие попапа кликом по затемненной области */
const closeWithOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_opened');
      closePopup(popup);
    }
}

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
      name: `${popupPlaceName.value}`,
      link: `${popupPlaceLink.value}`
    };
  renderCards(newCard, true);
  this.reset();
  closePopup(popupAddPlace);
}

/* Кнопка "Создать" */
formPopupAddPlace.addEventListener('submit', createNewCard);
