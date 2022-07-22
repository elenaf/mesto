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

    //console.log(this._formValues);
    return this._formValues;
  }

  setEventListeners() {
    //console.log('sdfdsf');
    super.setEventListeners();
    //console.log(this._form);
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(); // может надо убрать

      this._handleFormSubmit(this._getInputValues());

      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();

  }
}
