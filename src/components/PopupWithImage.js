import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
  }

  open( {place_name, picture_link}) {
    this._popupImage.src = picture_link;
    this._popupImage.alt = place_name;
    this._popupImageCaption.textContent = place_name;
    super.open();
  }
}
