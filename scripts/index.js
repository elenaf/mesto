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
const popupShowImage = document.querySelector('.popup__image-show'); /* Попап для открытия большой картинки */


/* Функция рендеринга содержимого карточки */
function renderCards(cardsContent) {
  const cardElement = element.cloneNode(true);
  cardElement.querySelector('.element__image').src = `${cardsContent.link}`;
  cardElement.querySelector('.element__image').alt = `${cardsContent.name}`;
  cardElement.querySelector('.element__place-name').textContent = `${cardsContent.name}`;

  /* Добавляем кнопку лайка */
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
    console.log(evt);
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

  elements.prepend(cardElement);
}

/* Рендерим карточки при загрузке страницы */
initialCards.map(renderCards);

/* -------------------- */

/* Формы добавления карточки и редактирования информации профиля */

const buttonEdit = document.querySelector('.profile__edit-button'); /* Кнопка "редактировать профиль" */
const buttonAdd = document.querySelector('.profile__add-button'); /* Кнопка "добавить карточку" */

const popupEditProfile = document.querySelector('.popup__profile-edit'); /* Попап "редактировать профиль" */
const popupAddPlace = document.querySelector('.popup__place-add'); /* Попап "добавить карточку" */

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
buttonCloseEditProfile.addEventListener('click', function (evt) {
  closePopup(evt.target.closest('.popup_opened'));
});

buttonCloseAddPlace.addEventListener('click', function (evt) {
  closePopup(evt.target.closest('.popup_opened'));
});

buttonCloseImage.addEventListener('click', function (evt) {
  closePopup(evt.target.closest('.popup_opened'));
});

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
  renderCards(newCard);
  popupPlaceName.value = ``;
  popupPlaceLink.value = ``;
  closePopup(popupAddPlace);
}

/* Кнопка "Создать" */
formPopupAddPlace.addEventListener('submit', formCreateHandler);

