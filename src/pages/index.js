import './index.css';
import {
  formSettingsObject,
  cardTemplate, /* Шаблон одной карточки */
  cardsContainer, /* Секция, в которую будем добавлять карточки */
  buttonEdit, /* Кнопка "редактировать профиль" */
  buttonAdd, /* Кнопка "добавить карточку" */
  popupEditProfile, /* Три попапа на выбор, для передачи в класс Попапа */
  popupAddPlace,
  popupImageShow,
  formPopupEditProfile, /* Формы попапов */
  formPopupAddPlace,
  popupName, /* Поля попапа редактирования профиля, имя и род занятий */
  popupOccupation
} from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards } from '../utils/cards.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

/* Включение валидации форм */
const formEditProfileValidator = new FormValidator(formSettingsObject, formPopupEditProfile);
const formAddPlaceValidator = new FormValidator(formSettingsObject, formPopupAddPlace);

formEditProfileValidator.enableValidation();
formAddPlaceValidator.enableValidation();

// Создаем экземпляр userinfo

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userInfoSelector: '.profile__subtitle'
});

// Создаем экземпляр попапа для редактирования данных
const popupUserEdit = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (profileInfoData) => {
    userInfo.setUserInfo(profileInfoData);
  }
});
popupUserEdit.setEventListeners();

// Создаем экземпляр попапа для показа большой картинки
const popupWithImage = new PopupWithImage(popupImageShow);

// Функция создания карточки
function createCardElement(item) {
  const newCard = new Card(
    item,
    cardTemplate,
    () => {
      popupWithImage.setEventListeners();
      popupWithImage.open(item);
    });

  const cardElement = newCard.createCard();
  return cardElement;
}

/* Создаем экземпляр Section, куда сразу размещаем дефолтные карточки */
const sectionForCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCardElement(item);
    sectionForCards.addItem(cardElement);
  },
},
cardsContainer);
sectionForCards.renderItems();

// создаем экземпляр попапа для добавления карточки
const popupCardAdd = new PopupWithForm({
  popupSelector: popupAddPlace,
  handleFormSubmit: (formValues) => {
    const newCard = createCardElement(formValues);
    sectionForCards.addItem(newCard);
    popupCardAdd.close();
  }
});
popupCardAdd.setEventListeners();

/* -------------------- */

/* Кнопка "редактировать" */
buttonEdit.addEventListener('click', () => {
  formEditProfileValidator.resetValidation();

  popupUserEdit.setInputValues(userInfo.getUserInfo());

  popupUserEdit.open();
})

/* Кнопка "добавить" */
buttonAdd.addEventListener('click', () => {
  formAddPlaceValidator.resetValidation();
  popupCardAdd.open();
});
