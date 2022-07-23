export const formSettingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const cardTemplate = document.querySelector('#card').content; /* Шаблон одной карточки */
export const cardsContainer = document.querySelector('.elements'); /* Секция, в которую будем добавлять карточки */

export const buttonEdit = document.querySelector('.profile__edit-button'); /* Кнопка "редактировать профиль" */
export const buttonAdd = document.querySelector('.profile__add-button'); /* Кнопка "добавить карточку" */

/* Три попапа на выбор, для передачи в класс Попапа */
export const popupEditProfile = '.popup_profile-edit'; /* Попап "редактировать профиль" */
export const popupAddPlace = '.popup_place-add'; /* Попап "добавить карточку" */
export const popupImageShow = '.popup_image-show'; /* Попап "показать картинку" */

export const formPopupEditProfile = document.querySelector(popupEditProfile).querySelector('.popup__form');   /* Формы */
export const formPopupAddPlace = document.querySelector(popupAddPlace).querySelector('.popup__form');        /* попапов */

/* Поля попапа редактирования профиля, имя и род занятий */
export const popupName = document.querySelector(popupEditProfile).querySelector('.popup__input_field_name');
export const popupOccupation = document.querySelector(popupEditProfile).querySelector('.popup__input_field_occupation');
