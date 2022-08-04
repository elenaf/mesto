import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  open() {
    super.open();
  }

  setSubmitHandler(action) {
    return this._handleSubmitCallback = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }

}
