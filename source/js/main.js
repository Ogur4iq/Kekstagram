import './preview-upload.js';
import {setUserFormSubmit} from './validation.js';
import {renderPhotos} from './picture.js';
import {getData} from './fetch.js';
import {filterDefaultButtonClick ,filterRandomButtonClick, filterDiscussedButtonClick} from './filters.js';
import {debounce} from './util.js';

getData((photos) => {
  renderPhotos(photos);
  filterDefaultButtonClick(photos, debounce(renderPhotos, 500));
  filterRandomButtonClick(photos, debounce(renderPhotos, 500));
  filterDiscussedButtonClick(photos, debounce(renderPhotos, 500));
});

setUserFormSubmit();
