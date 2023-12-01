import { isEnterKey, debounce, getRandomArrayElement } from './util.js';
import { renderPictures, photosData } from './thumbnail-images.js';

const filters = document.querySelector('.img-filters');
const filterDefaultButton = filters.querySelector('#filter-default');
const filterRandomButton = filters.querySelector('#filter-random');
const filterDiscussedButton = filters.querySelector('#filter-discussed');

const RERENDER_DELAY = 500;
const RANDOM_ARRAY_ELEMENT_COUNT = 10;

function showFilters() {
  filters.classList.remove('img-filters--inactive');
}

function onFiltersButtonClick(evt) {
  if (evt.target.closest('.img-filters__button') || isEnterKey(evt)) {
    evt.preventDefault();
    switch (evt.target) {
      case filterDefaultButton:
        renderPictures(photosData);
        break;
      case filterRandomButton:
        renderPictures(getRandomArray(photosData));
        break;
      case filterDiscussedButton:
        renderPictures(getDiscussedArray(photosData));
        break;
    }
  }
}

function onFilterButtonMouseup(evt) {
  if (evt.target.closest('.img-filters__button') || isEnterKey(evt)) {
    const activeButton = filters.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    evt.preventDefault();
    evt.target.classList.add('img-filters__button--active');
  }
}

function getRandomArray(arr) {
  const randomPictures = [];
  let count = RANDOM_ARRAY_ELEMENT_COUNT;
  if (count > arr.length) {
    count = arr.length;
  }
  const tempElements = [...arr];
  for (let i = 0; i < count; i++) {
    const randomElement = getRandomArrayElement(tempElements);
    randomPictures.push(randomElement);
    tempElements.splice(tempElements.indexOf(randomElement), 1);
  }
  return randomPictures;
}

function getDiscussedArray(arr) {
  return arr.slice().sort(discussedPhotos);
}

function discussedPhotos(photoA, photoB) {
  const rankA = photoA.comments.length;
  const rankB = photoB.comments.length;

  return rankB - rankA;
}

filters.addEventListener('click', debounce(
  onFiltersButtonClick,
  RERENDER_DELAY,
));

filters.addEventListener('mouseup', onFilterButtonMouseup);


export { showFilters };
