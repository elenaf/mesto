/* Попап для открытия большой картинки */
export const popupShowImage = document.querySelector('.popup_image-show');

/* Открытие попапа */
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc); // добавляем возможность закрыть попап кнопкой Esc
  popup.addEventListener('mousedown', closeWithOverlay); // добавляем возможность закрыть попап кликом по оверлею
}

/* Закрытие попапа кнопкой Esc */
const closePopupWithEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
      closePopup(popup);
  }
}

/* Закрытие попапа кликом по затемненной области */
const closeWithOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_opened');
      closePopup(popup);
    }
}

/* Закрыть попап */
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc); // снимаем слушатель Esc со всего документа
  popup.removeEventListener('click', closeWithOverlay); // снимаем слушатель клика по оверлею

}
