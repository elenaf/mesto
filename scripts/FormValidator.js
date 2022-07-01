export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  enableValidation() {
  // В форме отменяем действие по умолчанию при сабмите
  this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    // Вешаем слушатели на инпуты формы
    this._setEventListeners();
  }

/* Установка обработчиков на инпуты */
_setEventListeners() {
  // Найти все поля формы и сделать из них массив
  const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));

  // Найти кнопку сабмита формы
  const submitButton = this._form.querySelector(this._config.submitButtonSelector);

  // Устанавливаем начальное состояние кнопки сабмита
  this._setButtonState(inputList, submitButton);

  // Проходимся по массиву инпутов, каждому вешаем слушатель ввода,
  // в реальном времени следим за состоянием кнопки сабмита
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
      this._setButtonState(inputList, submitButton);
    });
  });
};

/* Определяем состояние кнопки сабмит */
_setButtonState(inputList, submitButton) {
  // Если есть невалидные инпуты в форме, кнопка становится недоступна
  if (this._hasInvalid(inputList)) {
    submitButton.classList.add(this._config.inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.classList.remove(this._config.inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
}

/* Проверка наличия невалидных инпутов в форме */
_hasInvalid(inputList) {
  return inputList.some((inputElement) => {
    return !(inputElement.validity.valid);
  })
}

/* Проверка валидности инпута */
_isValid(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this.hideInputError(inputElement);
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
hideInputError(inputElement) {
  const inputError = this._form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this._config.inputErrorClass);
  inputError.textContent = '';
  inputError.classList.remove(this._config.errorClass);
};

} // class FormValidator

