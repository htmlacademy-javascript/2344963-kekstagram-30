import { isEscapeKey } from './util.js';
import { photosData } from './thumbnail-images.js';

const COMMENTS_PER_PAGE = 5;

const bodyElement = document.querySelector('body');

const bigPictureElement = document.querySelector('.big-picture');
const overlayCloseButton = bigPictureElement.querySelector('.big-picture__cancel');
const picturesContainerElement = document.querySelector('.pictures');

const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

let commentsArray = [];
let currentIndex = 0;

function fillBigPicture({ url, description, likes, comments }) {
  bigPictureElement.querySelector('.big-picture__img')
    .querySelector('img').src = url;
  bigPictureElement.querySelector('.big-picture__img')
    .querySelector('img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
}

function createCommentElement({ name, message, avatar }) {
  const сommentElement = commentTemplate.cloneNode(true);
  сommentElement.querySelector('.social__picture').src = avatar;
  сommentElement.querySelector('.social__picture').alt = name;
  сommentElement.querySelector('.social__text').textContent = message;


  return сommentElement;
}

function renderComments() {
  commentsListElement.innerHTML = '';
  loadComments();
}

function loadComments() {
  for (let i = 0; i < COMMENTS_PER_PAGE; i++) {
    if (currentIndex >= commentsArray.length) {
      commentsLoaderElement.classList.add('hidden');
      break;
    }

    const comment = commentsArray[currentIndex];
    const сommentElement = createCommentElement(comment);
    commentsListElement.append(сommentElement);

    currentIndex++;
    bigPictureElement.querySelector('.social__comment-shown-count').textContent = currentIndex;
  }

  if (currentIndex >= commentsArray.length) {
    commentsLoaderElement.classList.add('hidden');
  }
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onOverlayCloseButton() {
  closeBigPicture();
}

function openBigPicture() {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onPicturesContainerClick(evt) {
  if (evt.target.closest('.picture__img')) {
    const targetId = evt.target.closest('.picture').id;
    const pictureData = photosData.find((element) => element.id === Number(targetId));

    evt.preventDefault();
    openBigPicture();

    currentIndex = 0;
    commentsLoaderElement.classList.remove('hidden');
    commentsArray = [];
    bigPictureElement.querySelector('.social__comment-shown-count').textContent = 0;

    commentsArray = pictureData.comments;

    fillBigPicture(pictureData);
    renderComments();
  }
}

function onCommentsLoaderElement() {
  loadComments();
}

picturesContainerElement.addEventListener('click', onPicturesContainerClick);
picturesContainerElement.addEventListener('keydown', onPicturesContainerClick);
overlayCloseButton.addEventListener('click', onOverlayCloseButton);
commentsLoaderElement.addEventListener('click', onCommentsLoaderElement);

