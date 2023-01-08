import {isEscEvent} from './util.js';

let commentsLoadStep = 5;

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const commentTemplate = bigPicture.querySelector('#comment').content.querySelector('.social__comment');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsFragment = document.createDocumentFragment();

const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const renderComment = (comments) => {
  let commentsLoaded = comments.slice(0, commentsLoadStep);
  commentsLoaded.forEach((comment) => {
    const commentsElement = commentTemplate.cloneNode(true);
    commentsElement.querySelector('.social__picture').src = comment.avatar;
    commentsElement.querySelector('.social__picture').alt = comment.name;
    commentsElement.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(commentsElement);
  })
  commentsList.appendChild(commentsFragment);

  commentsLoader.addEventListener('click', () => {
    commentsList.innerHTML = '';
    commentsLoadStep += commentsLoadStep;
    renderComment(comments);
  });

  if (commentsLoaded.length === comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  commentCount.textContent = `${commentsLoaded.length} из ${comments.length} комментариев`;
};

const show = (photo) => {
  bigPicture.querySelector('.big-picture__img > img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  renderComment(photo.comments);
};

// Закрытие окна

const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = () => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeBigPicture = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentsList.innerHTML = '';
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentsLoadStep = 5;
};

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});

export {show, openBigPicture};
