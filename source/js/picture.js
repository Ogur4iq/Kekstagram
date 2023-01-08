import {show, openBigPicture} from './big-picture.js';
import {makeFilterSectionActive} from './filters.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

const renderPhotos = (photosArray) => {
  photosArray.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    picturesFragment.appendChild(pictureElement);

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture();
      show(photo);
    });
  });

  picturesContainer.appendChild(picturesFragment);
  makeFilterSectionActive();
}

export {renderPhotos};
