import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  // Собираем данные, которые вводятся в поля формы
  _getInputValues() {
    // Достали все элементы полей
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value; // в св-во с именем как у инпута положили значение инпута в объекте formValues
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      this._handleFormSubmit(this._getInputValues());
      this.close();
      this._form.reset();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
