export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  enableValidation() {
    // Вешаем слушатели на инпуты формы
    this._setEventListeners();
  }

/* Установка обработчиков на инпуты */
_setEventListeners() {
  // Найти все поля формы и сделать из них массив
  this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));

  // Найти кнопку сабмита формы
  this._submitButton = this._form.querySelector(this._config.submitButtonSelector);

  // Устанавливаем начальное состояние кнопки сабмита
  this._setButtonState();

  // Проходимся по массиву инпутов, каждому вешаем слушатель ввода,
  // в реальном времени следим за состоянием кнопки сабмита
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
      this._setButtonState();
    });
  });
};

/* Определяем состояние кнопки сабмит */
_setButtonState() {
  // Если есть невалидные инпуты в форме, кнопка становится недоступна
  if (this._hasInvalid()) {
    this._disableSubmitButton();
  } else {
    this._enableSubmitButton();
  }
}

/* Проверка наличия невалидных инпутов в форме */
_hasInvalid() {
  return this._inputList.some((inputElement) => {
    return !(inputElement.validity.valid);
  })
}

// Сделать кнопку сабмит неактивной
_disableSubmitButton() {
  this._submitButton.classList.add(this._config.inactiveButtonClass);
  this._submitButton.setAttribute('disabled', true);
}

// Сделать кнопку сабмит активной
_enableSubmitButton() {
  this._submitButton.classList.remove(this._config.inactiveButtonClass);
  this._submitButton.removeAttribute('disabled');
}

/* Проверка валидности инпута */
_isValid(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
};

/* Отображение ошибки валидации */
_showInputError(inputElement, errorMessage) {
  const inputError = this._form.querySelector(`#${inputElement.id}-error`); // span с текстом ошибки
  inputElement.classList.add(this._config.inputErrorClass); // выделяет инпут с ошибкой
  inputError.textContent = errorMessage;
  inputError.classList.add(this._config.errorClass);
};

/* Скрытие ошибки валидации, используется в т.ч. для ресета форм и ошибок при открытии */
_hideInputError(inputElement) {
  const inputError = this._form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this._config.inputErrorClass);
  inputError.textContent = '';
  inputError.classList.remove(this._config.errorClass);
};

/* Сбросить ошибки в форме */
_resetFormErrors() {
  this._inputList.forEach((popupInput) => {
    this._hideInputError(popupInput);
  });
}

/* Сброс валидации */
resetValidation() {
  this._setButtonState();
  this._resetFormErrors();
}



} // class FormValidator

