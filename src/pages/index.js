import './index.css';
import {
  formSettingsObject,
  configRequest,
  cardTemplate, /* Шаблон одной карточки */
  cardsContainer, /* Секция, в которую будем добавлять карточки */
  buttonEdit, /* Кнопка "редактировать профиль" */
  buttonAdd, /* Кнопка "добавить карточку" */
  buttonUpdate, /* Кнопка "поменять аватар" */
  popupEditProfile, /* Три попапа на выбор, для передачи в класс Попапа */
  popupAddPlace,
  popupImageShow,
  popupAcceptRemoving,
  popupUpdateAvatar,
  formPopupEditProfile, /* Формы попапов */
  formPopupAddPlace,
  formPopupUpdateAvatar
} from '../utils/constants.js';
import { Api } from '../components/Api.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
/* Включение валидации форм */
const formEditProfileValidator = new FormValidator(formSettingsObject, formPopupEditProfile);
const formAddPlaceValidator = new FormValidator(formSettingsObject, formPopupAddPlace);
const formUpdateAvatarValidator = new FormValidator(formSettingsObject, formPopupUpdateAvatar);

formEditProfileValidator.enableValidation();
formAddPlaceValidator.enableValidation();
formUpdateAvatarValidator.enableValidation();

// Подключаем API
const api = new Api(configRequest);

// Создаем экземпляр Section
const sectionForCards = new Section({
   renderer: (item) => {
      const cardElement = createCardElement(item);
      sectionForCards.addItem(cardElement);
    },
  },
  cardsContainer);

// Создаем экземпляр Userinfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userInfoSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
});

// Заполняем страницу дефолтными данными с сервера - карточки, юзер инфо
const cards = api.getInitialCards(); // это промис
const user = api.getUserInfo();

const promises = [cards, user];

//let userId = '';

Promise.all(promises)
.then((data) => {
  const [ cardsData, userData ] = data;

  userInfo.setUserInfo(userData); // Получаем данные профиля пользователя с сервера
  userInfo.getUserId(userData._id);

  userInfo.setUserAvatar(userData); // Грузим аватар

  sectionForCards.renderItems(cardsData.reverse()); //Грузим с сервера дефолтные карточки в Section
})
.catch((err) => {
  console.log(err);
})


// Создаем экземпляр попапа для редактирования данных
const popupUserEdit = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (profileInfoData) => {
    popupUserEdit.renderLoading(true);
    api.editProfile(profileInfoData)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupUserEdit.renderLoading(false);
    });
  }
});
popupUserEdit.setEventListeners();

// Создаем экземпляр попапа для показа большой картинки
const popupWithImage = new PopupWithImage(popupImageShow);
popupWithImage.setEventListeners();

// создаем экземпляр попапа для подтверждения удаления карточки
const popupRemoveCardSubmit = new PopupWithConfirmation({
  popupSelector: popupAcceptRemoving
});
popupRemoveCardSubmit.setEventListeners();

// Функция создания карточки
function createCardElement(item) {

  const newCard = new Card({
    cardContent: item,
    cardTemplate: cardTemplate,
    ownerId: userInfo.id,

    handleCardClick: () => {
      popupWithImage.open(item);
    },
    handleLikeClick: (card) => {
      api.changeLikeStatus(item._id, card.isLiked())
      .then((data) => {
        card.updateLikeInfo(data.likes);
      })
      .catch((err) => console.log(err))

    },
    handleTrashClick: (card) => {
      console.log(card)
      popupRemoveCardSubmit.open();
      popupRemoveCardSubmit.setSubmitHandler(() => {
        debugger
        api.deleteCard(card._cardContent._id)
        .then((data) => {
          card.deleteCard();
        })
        .catch((err) => console.log(err))
      })
    }
  });

  const cardElement = newCard.createCard();
  return cardElement;
}

// создаем экземпляр попапа для обновления аватарки
const popupAvatarUpdate = new PopupWithForm({
  popupSelector: popupUpdateAvatar,
  handleFormSubmit: (formValues) => {
    popupAvatarUpdate.renderLoading(true);
    api.updateAvatar(formValues)
    .then(() => {
      userInfo.setUserAvatar(formValues);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAvatarUpdate.renderLoading(false);
    });
  }
});
popupAvatarUpdate.setEventListeners();

// создаем экземпляр попапа для добавления карточки
const popupCardAdd = new PopupWithForm({
  popupSelector: popupAddPlace,
  handleFormSubmit: (formValues) => {
    popupCardAdd.renderLoading(true);
    api.addNewCard(formValues)
    .then((data) => {
      const newCard = createCardElement(data);
      sectionForCards.addItem(newCard);
      popupCardAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCardAdd.renderLoading(false);
    })
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

/* Кнопка "поменять аватар" */
buttonUpdate.addEventListener('click', () => {
  formUpdateAvatarValidator.resetValidation();
  popupAvatarUpdate.open();
})
