/* --- Добавляем шесть карточек "из коробки" --- */

const cardTemplate = document.querySelector('#card').content; /* Шаблон одной карточки */
const elements = document.querySelector('.elements'); /* Секция, в которую будем добавлять карточки */
const element = cardTemplate.querySelector('.element'); /* div, в котором должна размещаться карточка */
const popupShowImage = document.querySelector('.popup_image-show'); /* Попап для открытия большой картинки */

/* Формы добавления карточки и редактирования информации профиля */

const buttonEdit = document.querySelector('.profile__edit-button'); /* Кнопка "редактировать профиль" */
const buttonAdd = document.querySelector('.profile__add-button'); /* Кнопка "добавить карточку" */

const popupEditProfile = document.querySelector('.popup_profile-edit'); /* Попап "редактировать профиль" */
const popupAddPlace = document.querySelector('.popup_place-add'); /* Попап "добавить карточку" */

const buttonsClose = document.querySelectorAll('.popup__close-button'); /* Кнопки закрытия попапов */


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

/* Функция создания карточки */
function createCard(cardContent) {
  const cardElement = element.cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  const elementPlaceName = cardElement.querySelector('.element__place-name');
  elementImage.src = `${cardContent.link}`;
  elementImage.alt = `${cardContent.name}`;
  elementPlaceName.textContent = `${cardContent.name}`;

  /* Добавляем кнопку лайка */
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  /* Обработчик кнопки удаления карточки */
  cardElement.querySelector('.element__trash-button').addEventListener('click', function() {
    cardElement.remove();
  });

  /* Открытие попапа с большой картинкой при клике на картинку из карточки */
  cardElement.querySelector('.element__image').addEventListener('click', function(evt) {
    openPopup(popupShowImage);
    popupShowImage.querySelector('.popup__image').src = `${evt.target.src}`;
    popupShowImage.querySelector('.popup__image').alt = `${evt.target.alt}`;
    popupShowImage.querySelector('.popup__image-caption').textContent = `${evt.target.alt}`;
  });

  return cardElement;

}

/* Функция рендеринга содержимого карточки */
function renderCards(card, needToPrepend = false) {
  if (needToPrepend) {
    elements.prepend(createCard(card));
  } else {elements.append(createCard(card))};
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

/* Открытие попапа */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/* Закрыть попап */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

buttonsClose.forEach(function (button) {
  button.addEventListener('click', function(evt) {
    closePopup(evt.target.closest('.popup_opened'));
  })
})

/* Сохранить и закрыть */
function formSubmitHandler (evt) {
  evt.preventDefault();
  setProfileData(popupName, popupOccupation);
  closePopup(popupEditProfile);
}

/* Кнопка "Сохранить" */
formPopupEditProfile.addEventListener('submit', formSubmitHandler);

/* Создать новую карточку, очистить поля и закрыть */
function formCreateHandler (evt) {
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
formPopupAddPlace.addEventListener('submit', formCreateHandler);

