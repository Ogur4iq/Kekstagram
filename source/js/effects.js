import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const Slider = {
  MAX: 100,
  MIN: 0,
};

const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview > img');

effectLevel.classList.add('visually-hidden');

let lastClass = '';

effectsList.addEventListener('change', (evt) => {
  let currentClass = `effects__preview--${evt.target.value}`;
  lastClass = currentClass;
  imagePreview.classList = '';
  imagePreview.style.filter = '';
  imagePreview.classList.add(currentClass);

  if (evt.target.value !== 'none') {
    effectLevel.classList.remove('visually-hidden');
  }

  if (evt.target.value === 'none') {
    effectLevel.classList.add('visually-hidden');
  }

  changeSliderOnRadioCheck(evt);
});

// Слайдер

noUiSlider.create(effectLevelSlider, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const changeSliderOnRadioCheck = (evt) => {
  if (evt.target.value === 'chrome' || evt.target.value === 'sepia') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (evt.target.value === 'marvin') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  } else if (evt.target.value === 'phobos') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  } else  if (evt.target.value === 'heat') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
};

effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  effectLevelValue.value = values[handle];
  const effects = {
    chrome: `grayscale(${effectLevelValue.value})`,
    sepia: `sepia(${effectLevelValue.value})`,
    marvin: `invert(${effectLevelValue.value}%)`,
    phobos: `blur(${effectLevelValue.value}px)`,
    heat: `brightness(${effectLevelValue.value})`,
  };
  imagePreview.style.filter = effects[lastClass.replace('effects__preview--', '')];
  return effectLevelValue.value;
});

export {effectLevel};
