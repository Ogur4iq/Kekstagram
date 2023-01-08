import {isEscEvent, showError, showSuccess} from './util.js';
import {sendData} from './fetch.js';
import {closeUploadModal} from './preview.js';

const MAX_HASGTAG_LENGTH = 20;
const MAX_HASHTAGS = 5;

const inputHashtag = document.querySelector('.text__hashtags');
const inputDescription = document.querySelector('.text__description');

inputHashtag.addEventListener('input', () => {
  let inputArray = inputHashtag.value.toLowerCase().trim().split(/\s+/);

  const doesNotStartFromHashtag = inputArray.some(el => el[0] !== '#');
  const containsForbiddenSymbols = inputArray.some((el) => {
    for (let i = 1; i < el.length; i++) {
      if (/[- ^ @ № # $ & * % + = ! ? , . : ; _ ( ) { } \\[ \] ' " / \\ |]/.test(el[i])) {
        return true;
      }
    }

    if (/\p{So}/u.test(el)) {
      return true;
    }
  });
  const consistOfHashtagOnly = inputArray.some(el => el.length == 1);
  const isHashtagLong = inputArray.some(el => el.length > MAX_HASGTAG_LENGTH);
  const isRepeatingHashtag = inputArray.some((el, i, arr) => {
    return arr.indexOf(el, i + 1) >= i + 1;
  });

  const errorBorder = () => inputHashtag.style.setProperty('--color', 'red');

  if (doesNotStartFromHashtag && inputHashtag.value !== '') {
    inputHashtag.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
    errorBorder();
  } else if (containsForbiddenSymbols) {
    inputHashtag.setCustomValidity('Хэш-тег не может содержать спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.) и эмодзи');
    errorBorder();
  } else if (consistOfHashtagOnly) {
    inputHashtag.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
    errorBorder();
  } else if (isHashtagLong) {
    inputHashtag.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
    errorBorder();
  } else if (isRepeatingHashtag) {
    inputHashtag.setCustomValidity('Хэш-теги не должны повторяться');
    errorBorder();
  } else if (inputArray.length > MAX_HASHTAGS) {
    inputHashtag.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    errorBorder();
  } else {
    inputHashtag.setCustomValidity('');
    inputHashtag.style.setProperty('--color', 'black');
  }

  inputHashtag.reportValidity();
});

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

inputHashtag.addEventListener('keydown', onPopupEscKeydown);
inputDescription.addEventListener('keydown', onPopupEscKeydown);

// Отправка формы

const imgUploadForm = document.querySelector('.img-upload__form');

const onSuccess = () => {
  closeUploadModal();
  showSuccess('Изображение успешно загружено', 'Круто!');
  imgUploadForm.reset();
};

const onError = () => {
  closeUploadModal();
  showError('Ошибка загрузки файла', 'Загрузить другой файл');
  imgUploadForm.reset();
};

const setUserFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData (onSuccess, onError, new FormData(evt.target));
  });
};

export {setUserFormSubmit}
