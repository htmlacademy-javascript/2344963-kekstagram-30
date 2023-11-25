import { isEnterKey, debounce, getRandomArrayElement } from './util.js';
import { renderPictures, photosData } from './thumbnail-images.js';

const filters = document.querySelector('.img-filters');
const filterDefaultButton = filters.querySelector('#filter-default');
const filterRandomButton = filters.querySelector('#filter-random');
const filterDiscussedButton = filters.querySelector('#filter-discussed');

const RERENDER_DELAY = 500;
const RANDOM_ARRAY_ELEMENT_COUNT = 10;

filterDefaultButton.disabled = true;

function showFilters() {
  filters.classList.remove('img-filters--inactive');
}

function onFiltersButton(evt) {
  if (evt.target.closest('.img-filters__button') || isEnterKey(evt)) {
    const activeButton = filters.querySelector('.img-filters__button--active');
    activeButton.disabled = false;
    activeButton.classList.remove('img-filters__button--active');
    evt.preventDefault();
    evt.target.classList.add('img-filters__button--active');
    evt.target.disabled = true;
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

function getRandomArray(arr) {
  const result = [];
  let count = RANDOM_ARRAY_ELEMENT_COUNT;
  if (count > arr.length) {
    count = arr.length;
  }
  const tempArr = [...arr];
  for (let i = 0; i < count; i++) {
    const randomElement = getRandomArrayElement(tempArr);
    result.push(randomElement);
    tempArr.splice(tempArr.indexOf(randomElement), 1);
  }
  return result;
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
  onFiltersButton,
  RERENDER_DELAY,
));

export { showFilters };
