import {shuffleArray} from './util.js';

const filtersSection = document.querySelector('.img-filters');
const filterDefaultButton = filtersSection.querySelector('#filter-default');
const filterRandomButton = filtersSection.querySelector('#filter-random');
const filterDiscussedButton = filtersSection.querySelector('#filter-discussed');

const makeFilterSectionActive = () => {
  filtersSection.classList.remove('img-filters--inactive');
}

const removeActiveClass = () => {
  let activeFilter = filtersSection.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
}

const removePhotos = () => {
  const images = document.querySelectorAll('.picture');
  images.forEach(el => el.remove());
}

const filterDefaultButtonClick = (arr, cb) => {
  filterDefaultButton.addEventListener('click', () => {
    removePhotos();
    removeActiveClass();
    cb(arr);
    filterDefaultButton.classList.add('img-filters__button--active');
  });
}

const filterRandomButtonClick = (arr, cb) => {
  filterRandomButton.addEventListener('click', () => {
    removePhotos();
    removeActiveClass();
    cb(shuffleArray(arr.slice(0, 10)));
    filterRandomButton.classList.add('img-filters__button--active');
  });
}

const filterDiscussedButtonClick = (arr, cb) => {
  filterDiscussedButton.addEventListener('click', () => {
    removePhotos();
    removeActiveClass();
    cb(arr.slice().sort((a, b) => b.comments.length - a.comments.length));
    filterDiscussedButton.classList.add('img-filters__button--active');
  });
}

export {makeFilterSectionActive, filterDefaultButtonClick, filterRandomButtonClick, filterDiscussedButtonClick}
