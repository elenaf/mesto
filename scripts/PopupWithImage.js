import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
  }

  open( {name, link}) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popup.querySelector('.popup__image-caption').textContent = name;
    super.open();
  }
}
