import { isEscapeKey, isEnterKey } from './util.js';
import { photosData } from './data.js';

const bigPictureElement = document.querySelector('.big-picture');
const picturesContainerElement = document.querySelector('.pictures');
const overlayCloseButton = bigPictureElement.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

function fillBigPicture({ url, description, likes, comments }) {
  bigPictureElement.querySelector('.big-picture__img')
    .querySelector('img').src = url;
  bigPictureElement.querySelector('.big-picture__img')
    .querySelector('img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__comment-shown-count').textContent = bigPictureElement.querySelectorAll('.social__comment').length;
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

function renderComments(commentsData) {
  commentsListElement.innerHTML = '';
  const commentsContainerFragment = document.createDocumentFragment();
  commentsData.forEach((commentData) => {
    const сommentElement = createCommentElement(commentData);
    commentsContainerFragment.append(сommentElement);
  });

  commentsListElement.append(commentsContainerFragment);
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function openBigPicture() {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
}

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');
}

function onPicturesContainerClick(evt) {
  const targetId = evt.target.parentNode.id;
  const pictureData = photosData.find((element) => element.id === Number(targetId));

  if (evt.target.matches('.picture__img')) {
    evt.preventDefault();
    openBigPicture();
  }

  renderComments(pictureData.comments);
  fillBigPicture(pictureData);
}

function onPicturesContainerKeydown(evt) {
  const targetId = evt.target.id;
  const pictureData = photosData.find((element) => element.id === Number(targetId));

  if (isEnterKey(evt)) {
    evt.preventDefault();
    openBigPicture();
  }

  renderComments(pictureData.comments);
  fillBigPicture(pictureData);
}

picturesContainerElement.addEventListener('click', onPicturesContainerClick);
picturesContainerElement.addEventListener('keydown', onPicturesContainerKeydown);
overlayCloseButton.addEventListener('click', closeBigPicture);

