const formSettingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

/* Функция отображения ошибки валидации */
const showInputError = (formElement, inputElement, formSettings, errorMessage) => {
  const inputError = formElement.querySelector(`#${inputElement.id}-error`); // span с текстом ошибки
  inputElement.classList.add(formSettings.inputErrorClass); // выделяет инпут с ошибкой
  inputError.textContent = errorMessage;
  inputError.classList.add(formSettings.errorClass);
};

/* Функция скрытия ошибки валидации */
const hideInputError = (formElement, inputElement, formSettings) => {
  const inputError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formSettings.inputErrorClass);
  inputError.textContent = '';
  inputError.classList.remove(formSettings.errorClass);
};

/* Функция проверки валидности инпута */
const isValid = (formElement, inputElement, formSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, formSettings, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, formSettings);
  }
};

/* Функция проверки наличия невалидных инпутов в форме */
const hasInvalid = (inputList) => {
  return inputList.some((inputElement) => {
    return !(inputElement.validity.valid);
  })
}

/* Функция определения состояния кнопки сабмит */
const setButtonState = (inputList, submitButton, formSettings) => {
  // Если есть невалидные инпуты в форме, кнопка становится недоступна
  if (hasInvalid(inputList)) {
    submitButton.classList.add(formSettings.inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.classList.remove(formSettings.inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
}

/* Функция установки обработчиков на инпуты */
const setEventListeners = (formElement, formSettings) => {
  // Найти все поля формы и сделать из них массив
  const inputList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));

  // Найти кнопку сабмита формы
  const submitButton = formElement.querySelector(formSettings.submitButtonSelector);

  // Устанавливаем начальное состояние кнопки сабмита
  setButtonState(inputList, submitButton, formSettings);

  // Проходимся по массиву инпутов, каждому вешаем слушатель ввода,
  // в реальном времени следим за состоянием кнопки сабмита
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, formSettings);
      setButtonState(inputList, submitButton, formSettings);
    });
  });
};

/* Функция запуска валидации форм */
const enableValidation = (formSettings) => {
  // Ищем все формы и делаем из них массив
  const formList = Array.from(document.querySelectorAll(formSettings.formSelector));

  // На каждую форму отменяем действие по умолчанию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    // Вешаем слушатели на инпуты формы
    setEventListeners(formElement, formSettings);
  });
}

//Включаем валидацию форм
enableValidation(formSettingsObject);

