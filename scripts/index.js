let buttonEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__close-button');
let form = document.querySelector('.popup__container');
let popupName = document.querySelector('.popup__input_field_name');
let popupOccupation = document.querySelector('.popup__input_field_occupation');

/* Данные из профиля */
let fieldsData = document.querySelectorAll('.profile__person-text');

/* Поля попапа */
let popupValues = document.querySelectorAll('[class*="popup__input_field_"]');;

/* Заполняем поля попапа данными из профиля */
function setPopupFields (fields) {
  for (let i = 0; i < fields.length; i++) {
    popupValues[i].value = fields[i].textContent;
  }
}

/* Заполняем профиль данными из попапа */
function setProfileData (profileData) {
  for (let i = 0; i < profileData.length; i++) {
    fieldsData[i].textContent = profileData[i].value;
  }
}

/* Открыть попап, при открытии в поля попапа попадают данные из профиля*/
function openPopup() {
  popup.classList.add('popup_opened');
  setPopupFields(fieldsData);
}

/* Закрыть попап */
function closePopup() {
  popup.classList.remove('popup_opened');
}

/* Кнопка "редактировать" */
buttonEdit.addEventListener('click', openPopup);

/* Крестик в правом верхнем углу */
buttonClose.addEventListener('click', closePopup);

/* Сохранить и закрыть */
function formSubmitHandler (evt) {
  evt.preventDefault();
  setProfileData(popupValues);
  closePopup();
}

/* Кнопка "Сохранить" */
form.addEventListener('submit', formSubmitHandler);


