import {FormValidator} from '../scripts/FormValidator.js'
import { Card } from '../scripts/Card.js';
import { Section } from '../scripts/Section.js';
import { UserInfo } from '../scripts/UserInfo.js';
 import { Popup } from '../scripts/Popup.js';
import {initialCards} from '../scripts/cards.js';
import { popupShowImage, openPopup, closePopup } from '../scripts/utils.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';

const formSettingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const cardTemplate = document.querySelector('#card').content; /* Шаблон одной карточки */
const cardsContainer = document.querySelector('.elements'); /* Секция, в которую будем добавлять карточки */

/* Формы добавления карточки и редактирования информации профиля */

const buttonEdit = document.querySelector('.profile__edit-button'); /* Кнопка "редактировать профиль" */
const buttonAdd = document.querySelector('.profile__add-button'); /* Кнопка "добавить карточку" */

/* Три попапа на выбор, для передачи в класс Попапа */
const popupEditProfile = document.querySelector('.popup_profile-edit'); /* Попап "редактировать профиль" */
const popupAddPlace = document.querySelector('.popup_place-add'); /* Попап "добавить карточку" */
const popupImageShow = document.querySelector('.popup_image-show'); /* Попап "показать картинку" */

/* const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button'); /* Кнопки закрытия */
/* const buttonCloseAddPlace = popupAddPlace.querySelector('.popup__close-button');      */      /* попапов */
/* const buttonCloseImage = popupShowImage.querySelector('.popup__close-button'); */

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

// создаем экземпляр userinfo

const userInfo = new UserInfo({
  /* userNameSelector: popupName,
  userInfoSelector: popupOccupation */
  userNameSelector: '.popup__input_field_name',
  userInfoSelector: '.popup__input_field_occupation'
});

// создаем экземпляр попапа для редактирования данных
const popupUserEdit = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (profileInfoData) => {
    userInfo.setUserInfo(profileInfoData);
  }
});
popupUserEdit.setEventListeners();

// создаем экземпляр попапа для добавления карточки
const popupCardAdd = new PopupWithForm({
  popupSelector: popupAddPlace,
  handleFormSubmit: (formValues) => {
    console.log(formValues);
    const newCard = new Card(formValues, cardTemplate, () => {
      const popupWithImage = new PopupWithImage(popupShowImage);
      popupWithImage.open(item);
    });
    defaultCards.addItem(newCard.createCard());
    //console.log(newCard);
    popupCardAdd.close();
  }
});
/* console.log(popupCardAdd);
console.log(popupCardAdd.setEventListeners); */
popupCardAdd.setEventListeners();

/* Создаем экземпляр Section, куда сразу размещаем дефолтные карточки */
const defaultCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(
      item,
      cardTemplate,
      () => {
        const popupWithImage = new PopupWithImage(popupShowImage);
        popupWithImage.open(item);
      } );
    const cardElement = newCard.createCard();
    defaultCards.addItem(cardElement);
  },
},
cardsContainer);
defaultCards.renderItems();

/* -------------------- */

/* Кнопка "редактировать" */
/* buttonEdit.addEventListener('click', function () {
  formEditProfileValidator.resetFormErrors();
  formEditProfileValidator.setButtonState();
  openPopup(popupEditProfile);
  setPopupFields(profileTitle, profileSubtitle);

}); */
buttonEdit.addEventListener('click', () => {
  formEditProfileValidator.resetFormErrors();
  formEditProfileValidator.setButtonState();
  popupUserEdit.open();

  userInfo.getUserInfo();
})


/* Кнопка "+" */
/* buttonAdd.addEventListener('click', function () {
  formAddPlaceValidator.setButtonState();
  openPopup(popupAddPlace);
}); */

buttonAdd.addEventListener('click', () => {
  formAddPlaceValidator.setButtonState();
  popupCardAdd.open();
});


/* Сохранить и закрыть */
function submitProfileForm (evt) {
  evt.preventDefault();
  setProfileData(popupName, popupOccupation);
  closePopup(popupEditProfile);
}

/* Кнопка "Сохранить" */
/* formPopupEditProfile.addEventListener('submit', submitProfileForm); */

/* Создать новую карточку, очистить поля и закрыть */
/* function createNewCard (evt) {
  evt.preventDefault();
  const newCard = new Card({
      name: popupPlaceName.value,
      link: popupPlaceLink.value
    }, cardTemplate);
    const cardElement = newCard.createCard();
    defaultCards.addItem(cardElement);
  this.reset();
  closePopup(popupAddPlace);
} */

/* Кнопка "Создать" */
/* formPopupAddPlace.addEventListener('submit', createNewCard); */
