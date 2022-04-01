let buttonEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__close-button');
let form = document.querySelector('.popup__form');

/* Поля попапа */
let popupName = document.querySelector('.popup__input_field_name');
let popupOccupation = document.querySelector('.popup__input_field_occupation');

/* Данные из профиля */
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');


/* Заполняем поля попапа данными из профиля */
function setPopupFields (field1, field2) {
  popupName.value = field1.textContent;
  popupOccupation.value = field2.textContent;
}

/* Заполняем профиль данными из попапа */
function setProfileData (popupData1, popupData2) {
  profileTitle.textContent = popupData1.value;
  profileSubtitle.textContent = popupData2.value;
}

/* Открыть попап, при открытии в поля попапа попадают данные из профиля*/
function openPopup() {
  popup.classList.add('popup_opened');
  setPopupFields(profileTitle, profileSubtitle);
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
  setProfileData(popupName, popupOccupation);
  closePopup();
}

/* Кнопка "Сохранить" */
form.addEventListener('submit', formSubmitHandler);


