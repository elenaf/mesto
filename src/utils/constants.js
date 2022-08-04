export const formSettingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const configRequest = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-46/',
  headers: {
    authorization: '1cbac3de-e369-4b86-95d5-992d89bef9af',
    "content-type": "application/json"
  }
}

export const cardTemplate = document.querySelector('#card').content; /* Шаблон одной карточки */
export const cardsContainerSelector = '.elements'; /* Секция, в которую будем добавлять карточки */

export const buttonEdit = document.querySelector('.profile__edit-button'); /* Кнопка "редактировать профиль" */
export const buttonAdd = document.querySelector('.profile__add-button'); /* Кнопка "добавить карточку" */
export const buttonUpdate = document.querySelector('.profile__avatar-overlay'); /* Кнопка "поменять аватар" */

/* Попапы на выбор, для передачи в класс Попапа */
export const popupEditProfile = '.popup_profile-edit'; /* Попап "редактировать профиль" */
export const popupAddPlace = '.popup_place-add'; /* Попап "добавить карточку" */
export const popupImageShow = '.popup_image-show'; /* Попап "показать картинку" */
export const popupAcceptRemoving = '.popup_remove-submit'; /* Попап "подтвердите удаление" */
export const popupUpdateAvatar = '.popup_avatar-update'; /* Попап "обновить аватар" */

export const formPopupEditProfile = document.querySelector(popupEditProfile).querySelector('.popup__form');   /* Формы */
export const formPopupAddPlace = document.querySelector(popupAddPlace).querySelector('.popup__form');        /* попапов */
export const formPopupUpdateAvatar = document.querySelector(popupUpdateAvatar).querySelector('.popup__form');


/* Поля попапа редактирования профиля, имя и род занятий */
export const popupName = document.querySelector(popupEditProfile).querySelector('.popup__input_field_name');
export const popupOccupation = document.querySelector(popupEditProfile).querySelector('.popup__input_field_occupation');
