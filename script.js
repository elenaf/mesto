let buttonEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__close-button');
let form = document.querySelector('.popup__container');
let popupName = document.querySelector('.popup__name');
let popupOccupation = document.querySelector('.popup__occupation');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

popupName.value = profileTitle.textContent;
popupOccupation.value = profileSubtitle.textContent;

buttonEdit.addEventListener('click', function() {
  popup.classList.add('popup__opened');
});

buttonClose.addEventListener('click', function() {
  popup.classList.remove('popup__opened');
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupOccupation.value;
  popup.classList.remove('popup__opened');
}

form.addEventListener('submit', formSubmitHandler);


