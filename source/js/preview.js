import {isEscEvent} from './util.js';
import {effectLevel} from './effects.js';

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const body = document.querySelector('body');
const uploadInput = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadModalCloseButton = document.querySelector('#upload-cancel');
const effectNoneInput = document.querySelector('#effect-none');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

uploadInput.addEventListener('change', () => {
  resetSettings();
  uploadModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
});

const closeUploadModal = () => {
  body.classList.remove('modal-open');
  uploadModal.classList.add('hidden');
  uploadInput.value = '';
  document.removeEventListener('keydown', onPopupEscKeydown);
};

uploadModalCloseButton.addEventListener('click', () => {
  closeUploadModal();
});

const resetSettings = () => {
  inputScaleValue.value = '100%';
  imagePreview.style = 'transform: scale(1)';
  imagePreview.style.filter = '';
  imagePreview.classList = '';
  effectLevel.classList.add('visually-hidden');
  effectNoneInput.checked = true;
}

// Радактирование масштаба изображения

const decreaseSizeButton = document.querySelector('.scale__control--smaller');
const increaseSizeButton = document.querySelector('.scale__control--bigger');
const inputScaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview > img');

const decreaseOrIncreaseSize = (evt) => {
  let scale;

  if (evt.target === decreaseSizeButton) {
    scale = parseInt(inputScaleValue.value, 10) - Scale.STEP;
  } else if (evt.target === increaseSizeButton) {
    scale = parseInt(inputScaleValue.value, 10) + Scale.STEP;
  }

  if (scale <= Scale.MIN) {
    scale = Scale.MIN;
  } else if (scale >= Scale.MAX) {
    scale = Scale.MAX;
  }

  inputScaleValue.value = scale + '%';
  scale = scale/100;
  imagePreview.style.transform = 'scale('+ scale +')';
}

decreaseSizeButton.addEventListener('click', decreaseOrIncreaseSize);
increaseSizeButton.addEventListener('click', decreaseOrIncreaseSize);

export {closeUploadModal};
