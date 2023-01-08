// Случайное число

const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Проверка строки

const isTextFit = (text, maxLength) => {
  return text.length <= maxLength;
}

// Случайный элемент массива

const getRandonElementOfArr = (array) => {
  return array[getRandomInt(0, array.length - 1)];
}

// Перемешать массив

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

// Проверка нажатой клавиши

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

// Сообщения об ошибке и успешной отправке

const main = document.querySelector('main');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorFragment = document.createDocumentFragment();

const removeAlert = (alert, callbackOne, callbackTwo) => {
  document.querySelector(alert).remove();
  document.removeEventListener('keydown', callbackOne);
  document.removeEventListener('click', callbackTwo);
};

const onSuccessAlertEscKeydown = (evt) => {
  if(isEscEvent(evt)) {
    evt.preventDefault();
    removeAlert('.success', onSuccessAlertEscKeydown, onSuccessAlertOutsideMouseClick);
  }
};

const onErrorAlertEscKeydown = (evt) => {
  if(isEscEvent(evt)) {
    evt.preventDefault();
    removeAlert('.error', onErrorAlertEscKeydown, onErrorAlertOutsideMouseClick);
  }
};

const onSuccessAlertOutsideMouseClick = (evt) => {
  if (!evt.target.closest('.success__inner')) {
    removeAlert('.success', onSuccessAlertEscKeydown, onSuccessAlertOutsideMouseClick);
  }
};

const onErrorAlertOutsideMouseClick = (evt) => {
  if (!evt.target.closest('.error__inner')) {
    removeAlert('.error', onErrorAlertEscKeydown, onErrorAlertOutsideMouseClick);
  }
};

const showError = (text, button) => {
  const errorElement = errorTemplate.cloneNode(true);

  errorElement.querySelector('.error__title').textContent = text;
  errorElement.querySelector('.error__button').textContent = button;

  const errorButtonClose = errorElement.querySelector('.error__button');

  errorButtonClose.addEventListener('click' , () => {
    removeAlert('.error', onErrorAlertEscKeydown, onErrorAlertOutsideMouseClick);
  });

  document.addEventListener('keydown', onErrorAlertEscKeydown);

  document.addEventListener('click', onErrorAlertOutsideMouseClick);

  errorFragment.appendChild(errorElement);
  main.appendChild(errorFragment);
};

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successFragment = document.createDocumentFragment();

const showSuccess = (text, button) => {
  const successElement = successTemplate.cloneNode(true);

  successElement.querySelector('.success__title').textContent = text;
  successElement.querySelector('.success__button').textContent = button;

  const successButtonClose = successElement.querySelector('.success__button');

  successButtonClose.addEventListener('click' , () => {
    removeAlert('.success', onSuccessAlertEscKeydown, onSuccessAlertOutsideMouseClick);
  });

  document.addEventListener('keydown', onSuccessAlertEscKeydown);

  document.addEventListener('click', onSuccessAlertOutsideMouseClick);

  successFragment.appendChild(successElement);
  main.appendChild(successFragment);
};

// Debounce

const debounce = (cb, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, args);
    }, delay);
  }
}

export {getRandomInt, getRandonElementOfArr, isEscEvent, isEnterEvent, isTextFit, showError, showSuccess, shuffleArray, debounce};
